import http from "http";
import path from "path";
import fs from "fs/promises";
import url from "url";

const PORT = process.env.PORT;

// res.setHeader('Content-Type', 'text/html');
// res.statusCode = 404;
// res.write('<h1>Hello World</h1>');
// res.writeHead(500, { "Content-Type": "application/json" });
// res.end(JSON.stringify({ message: "Server Error" }));

// get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("Not Found");
      }

      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    console.log("error", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
