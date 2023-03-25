import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

import App from "./App.vue";
import "./assets/styles/variables.scss";
import router from "./router";
import store from "./store";


const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: "myCustomLightTheme",
		themes: {
			myCustomLightTheme: {
				dark: false,
				colors: {
					background: "#3fec8d",
					dark: "#2a2b27",
					error: "#B00020",
					info: "#2196F3",
					light: "#f2f2f2",
					primary: "#95dba2",
					"primary-light": "#b6f2c1",
					secondary: "#03DAC6",
					success: "#4CAF50",
					warning: "#ffd1d1",
					white: "#FFFFFF"
				}
			}
		}
	}
});


createApp(App).provide("$store", store).use(store).use(router).use(vuetify).mount("#app");
