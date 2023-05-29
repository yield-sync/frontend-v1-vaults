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
	components: {
		...components
	},
	directives,
	theme: {
		defaultTheme: "myCustomLightTheme",
		themes: {
			myCustomLightTheme: {
				dark: false,
				colors: {
					dark: "#1c261e",
					info: "#2196F3",
					light: "#e6e6e6",
					primary: "#56733d",
					"primary-light": "#676e62",
					secondary: "#03DAC6",
					success: "#4CAF50",
					warning: "#ffd712",
					danger: "#ff0000",
					white: "#FFFFFF"
				},
			}
		}
	}
});


createApp(App).provide("$store", store).use(store).use(router).use(vuetify).mount("#app");
