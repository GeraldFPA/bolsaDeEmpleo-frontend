import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "bolsaDeEmpleoAPP",
  webDir: "dist",
server: {
  androidScheme: "http",
},
  plugins: {

    StatusBar: {
      overlaysWebView: false,
    },
    Keyboard: {
      resize : "body",
    },

    SplashScreen: {
      launchAutoHide: true,
    },
    
  },
};

export default config;
