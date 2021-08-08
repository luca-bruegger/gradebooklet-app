import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ch.lucabruegger.gradebooklet',
  appName: 'gradebooklet',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    }
  }
};

export default config;
