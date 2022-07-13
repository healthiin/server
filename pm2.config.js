module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
};
