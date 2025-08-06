import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b99a154bb96d4edf869d9653294321dd',
  appName: 'Task Manager',
  webDir: 'dist',
  server: {
    url: 'https://b99a154b-b96d-4edf-869d-9653294321dd.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;