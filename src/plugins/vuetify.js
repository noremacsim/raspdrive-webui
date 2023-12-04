import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import {createVuetify} from "vuetify";

export default createVuetify({
	components: {},
	theme: {
		themes: {
			light: {
				colors: {
					primary: "#569fff",
					secondary: "#5CBBF6",
          aqua: "#00d2d3",
          purple: "#5f27cd",
          green: "#1cd1a1",
					semgreen: "#a7d037",
					semdarkgreen: "#82a329",
					semorange: "#f6861c",
					semdanger: "#f64b1c",
				},
			},
		},
	},
});
