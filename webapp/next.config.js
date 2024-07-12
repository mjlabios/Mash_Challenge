
const nextConfig = {
    i18n: {
      locales: ["en", "hi", "es"],
      defaultLocale: "en",
    },
    reactStrictMode: false,
    webpack(config) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
  
      return config;
    },
  };
  
  module.exports = nextConfig;