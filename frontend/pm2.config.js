// yarn build && pm2 start pm2.config.js
module.exports = {
  apps: [
    {
      name: "jaso.ai",
      script: "./server.js",
      instances: 0,
      exec_mode: "cluster"
    }
  ]
};
