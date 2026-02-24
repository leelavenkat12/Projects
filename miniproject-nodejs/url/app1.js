import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import crypto from "crypto";

const PORT = 5000;
const DATA_FILE = path.join("data", "links.json");

const servefile = async (res, filepath, contentType) => {
  try {
    const data = await readFile(filepath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 page not found");
  }
};

const loadlinks = async () => {
  try {
    let data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
};

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    return servefile(res, path.join("public", "index.html"), "text/html");
  }

  if (req.url === "/style.css") {
    return servefile(res, path.join("public", "style.css"), "text/css");
  }

  if (req.url === "/links") {
    const links = await loadlinks();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(links));
  }

  if (req.method === "GET") {
    const links = await loadlinks();
    const shortCode = req.url.slice(1);

    if (links[shortCode]) {
      res.writeHead(302, { Location: links[shortCode] });
      return res.end();
    }
  }

  if (req.method === "POST" && req.url === "/shorten") {
    const links = await loadlinks();
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => {
      const { url, shortCode } = JSON.parse(body);

      if (!url) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("url is required");
      }

      const finalShortCode =
        shortCode || crypto.randomBytes(4).toString("hex");

      if (links[finalShortCode]) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Short code already exists");
      }

      links[finalShortCode] = url;
      await saveLinks(links);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, shortCode: finalShortCode }));
    });

    return;
  }

  // ⭐ fallback (THIS WAS MISSING)
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Route not found");
});

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);