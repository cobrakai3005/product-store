import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import prodcuctRoutes from "./routes/product.route.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json()); //allows  us to accept json data in req.body

// Set proper MIME types for static files
app.use(
  express.static(path.join(__dirname, "/front/dist"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.use("/api/products", prodcuctRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get(/^(?!\/api).*/, (req, res) => {
//     res.sendFile(path.resolve(__dirname, "front", "dist", "index.html"));
//   });
// }

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Catch all handler: send back React's index.html file for any non-API routes
  // Exclude static assets and API routes
  app.get(/^(?!\/api).*/, (req, res) => {
    // Don't serve index.html for API routes or static assets
    if (
      req.path.startsWith("/api") ||
      req.path.includes(".js") ||
      req.path.includes(".css") ||
      req.path.includes(".png") ||
      req.path.includes(".jpg") ||
      req.path.includes(".ico") ||
      req.path.includes(".svg")
    ) {
      return res.status(404).send("Not found");
    }
    return res.sendFile(path.resolve(__dirname, "front", "dist", "index.html"));
  });
}
app.listen(5000, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${port}`);
});
