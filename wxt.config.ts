import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    action: {
      default_title: 'YTimer',
    },
    name: "YTimer",
    permissions: ['storage'],
    icons: {
      128: '/icon/logo_128.png',
    },
  }
});
