module.exports = {
  apps: [
    {
      name: 'diaspo-boost-api',
      script: 'dist/index.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
