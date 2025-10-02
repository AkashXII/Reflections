import express from "express";
import cors from "cors";
import reflectionsRouter from "./routes/reflections.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reflections", reflectionsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
