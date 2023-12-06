import {fromPairs, mapValues, last, intersection} from 'lodash';
import { callCgi } from './helper';


export async function getDirectoryListing(folderPath = '/') {
  const content = await callCgi(`/cgi-bin/filelist.sh?folder=${folderPath}`, 'get file listings');

  const output = [];

  const lines = content.split('\n');

  lines.forEach(line => {
    const type = line.charAt(0);
    const name = line.slice(2);

    if (type === 'd') {
      output.push({ type: 'folder', name, icon: 'mdi-folder'});
    } else if (type === 'f') {
      output.push({ type: 'file', name, icon: ' mdi-file'});
    }
  });

  return output
}

export async function getFileList() {
  await getDirectoryListing();
  const content = `
    folder1
    folder1/LondonJenny_220922_135153.sql
    folder1/hi.text
    folder1/sub1/bye.text
    hi.text
    bye.text`;

  if (content === "") {
    return null;
  }

  const folderStructure = {
    id: 0, // You can set an appropriate root ID
    name: "Root",
    children: []
  };

  function transformFolderStructure(originalStructure, parentItem) {
    originalStructure.forEach(folder => {
      const currentItem = { id: folder.id, name: folder.name, children: [] };

      if (folder.content.length > 0) {
        transformFolderStructure(folder.content, currentItem);
      } else {
        const fileExtension = folder.name.split('.').pop().toLowerCase();
        currentItem.children = [{ id: folder.id + 1, name: folder.name, file: fileExtension }];
      }

      parentItem.children.push(currentItem);
    });
  }

  const paths = content.split('\n').filter(line => line.trim());
  const pathsFolderStructure = [];

  paths.forEach(path => {
    const files = path.split('/');
    let currentLevel = pathsFolderStructure;

    for (let i = 0; i < files.length - 1; i++) {
      const currentFile = files[i];

      let folder = currentLevel.find(item => item.name === currentFile);

      if (!folder) {
        folder = { id: pathsFolderStructure.length + 1, name: currentFile, content: [] };
        currentLevel.push(folder);
      }

      currentLevel = folder.content;
    }

    const lastFile = files[files.length - 1];
    currentLevel.push({ id: pathsFolderStructure.length + 1, name: lastFile, content: [] });
  });

  transformFolderStructure(pathsFolderStructure, folderStructure);

  return JSON.parse(JSON.stringify(folderStructure));
}

function groupDates(dates) {
    const gap = 3600 * 1000;
    return dates.slice(1).reduce(function (ret, date) {
        if (date - last(ret) > gap) {
            ret.push(date);
        }
        return ret;
    }, [dates[0]]);
}

export function getVideoURL(group, sequenceName, filename) {
    return ['http://192.168.1.208/TeslaCam', group, sequenceName, filename].join('/');
}

function parseMp4Filename(filename) {
    // example: 2022-01-06_10-27-31-left_repeater.mp4
    const [, year, month, day, hour, minute, second, pos]
        = filename.match(/^(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})-(\w+)\./);
    const date = new Date(year, month - 1, day, hour, minute, second);
    return {date, key: `${year}-${month}-${day}_${hour}-${minute}-${second}`, pos};
}

function parseDirname(dirname) {
    const [, year, month, day, hour, minute, second, pos]
        = dirname.match(/^(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})$/);
    const date = new Date(year, month - 1, day, hour, minute, second);
    return {date};
}

export function getVideoInfo(url) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    const promise = new Promise(function (resolve, reject) {
        video.addEventListener('loadedmetadata', function () {
            resolve({
                duration: video.duration,
                width: video.videoWidth,
                height: video.videoHeight,
            });
        });
        video.addEventListener('error', function (e) {
            reject(video.error);
        });
    });
    video.src = url;
    return promise;
}
