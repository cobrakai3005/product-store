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

app.use("/api/products", prodcuctRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }
app.listen(5000, async () => {
  await connectDB();
  console.log("Server running on http://localhost:" + port);
});
