import {cacheBustinguURL, delay, callCgi} from './helper';

export function triggerArchiveSync() {
    return callCgi('/cgi-bin/trigger_sync.sh', 'trigger sync');
}

export async function getUSBEvents() {
  const content = await callCgi(`/cgi-bin/usb_events.sh`, 'get usb events');

  const output = [];

  const lines = content.split('\n');

  lines.forEach(line => {
    let item = line.split(':');
    output.push({ log: item[1], type: item[0] });
  });

  return output
}

export async function updateWifi(ssid, password) {
  await callCgi(`/cgi-bin/update_wifi.sh?ssid=${ssid}&password=${password}`, 'Update Wifi Settings');
}

export async function reboot() {
    await callCgi('/cgi-bin/reboot.sh', 'reboot');
    await delay(5000);
    while (!(await checkAlive())) {
        await delay(1000);
    }
}

export async function scanWifi() {
  const content = await callCgi('/cgi-bin/scan_wifi.sh', 'get wifi networks');
  const result = JSON.parse(content);
  return result
}

export async function toggleDrives() {
    await callCgi('/cgi-bin/toggledrives.sh', 'toggledrives');
}

export async function getWifiStats() {
  const res = await callCgi('/cgi-bin/status.sh', 'getPiStatus');
  const result = JSON.parse(res);
  return {
    wifi_ssd: result.wifi_ssid,
  };
}

export async function getPiStatus() {
    const res = await callCgi('/cgi-bin/status.sh', 'getPiStatus');
    const result = JSON.parse(res);
    return {
        freeSize: parseInt(result.free_space, 10),
        totalSize: parseInt(result.free_space, 10),
        sizePercent: (((parseInt(result.total_space, 10) - parseInt(result.free_space, 10)) / parseInt(result.total_space, 10)) * 100),
        total_gb: Math.round(parseInt(result.total_space) / (1024 ** 3)),
        used_gb: Math.round(parseInt(result.used_space) / (1024 ** 3)),
        cpuTemp: (parseInt(result.cpu_temp, 10) / 1000).toFixed(1) + " C",
        drivesActive: result.drives_active,
        uptime: uptime(parseInt(result.uptime, 10))
    };
}

async function checkAlive() {
    const url = cacheBustinguURL('index.html');
    const response = await fetch(url, {method: 'GET'});
    return response.ok;
}

function uptime(secs) {
  secs = Math.round(secs);
  let  days = Math.trunc(secs / (24 * 3600));
  let  hours = Math.trunc(secs % (24 * 3600) / 3600);
  let  minutes = Math.trunc(secs % (3600) / 60);
  let  seconds = Math.trunc(secs % 60);
  let  out = "";
  if (days === 1) {
    out = "1 day, "
  } else if (days > 1) {
    out = days + " days, "
  }
  return out + hours.toString().padStart(2, 0) + ":" +
    minutes.toString().padStart(2,0) + ":" +
    seconds.toString().padStart(2,0);
}
