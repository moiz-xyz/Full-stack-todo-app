import express from "express";
import "dotenv/config";
import router from "./routes/routes.js";
import connectDB from "./db/db.js";
import cors from "cors"


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(cors({
}))
connectDB()

app.use("/api", router)

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
