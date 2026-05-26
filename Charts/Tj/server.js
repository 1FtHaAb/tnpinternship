// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 3000;

const N = 1_000_000;
const CHUNK = 5000;

/* generate dataset */

const points = [];

for (let i = 0; i < N; i++) {
  points.push({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });
}

console.log("Dataset generated");

/* chunk API */

app.get("/stream", (req, res) => {
  const start = Number(req.query.start || 0);
  const end = Math.min(start + CHUNK, N);

  const slice = points.slice(start, end);

  res.json({
    points: slice,
    next: end,
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
