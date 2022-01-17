const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 8080;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.get("*", (req, res) => handle(req, res));

  server.listen(PORT, () => {
    console.log(`> Ready on port ${PORT}`);
  });
});
