const express = require("express");
const cors = require("cors");
const app = express();
const client = require("prom-client");

// Middleware
app.use(cors());
app.use(express.json());

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: "Module-Service",
});

// Create a counter metric
const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// Register the counter with the registry
register.registerMetric(requestCounter);

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Sample Data
const modules = [
  { id: 1, code: "CS1101S", name: "Programming Methodology" },
  { id: 2, code: "CS2030S", name: "Programming Methodology II" },
  { id: 3, code: "CS2040S", name: "Data Structures and Algorithms" },
];

// Middleware to count requests
app.use((req, res, next) => {
  res.on("finish", () => {
    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.originalUrl,
      status_code: res.statusCode,
    });
  });
  next();
});

// GET metrics
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// GET all modules
app.get("/modules", (req, res) => {
  res.send(modules);
});

// GET a single module by ID
app.get("/modules/:id", (req, res) => {
  const module = modules.find((m) => m.id === parseInt(req.params.id));
  if (!module)
    res.status(404).send({
      error: "The module with the given ID was not found.",
    });
  else res.send(module);
});

// POST a new module
app.post("/modules", (req, res) => {
  const { code, name } = req.body;
  const module = {
    id: modules.length + 1,
    code,
    name,
  };
  modules.push(module);
  res.status(201).send(module);
});

// PUT update a module
app.put("/modules/:id", (req, res) => {
  const module = modules.find((m) => m.id === parseInt(req.params.id));
  if (!module) {
    res.status(404).send({
      error: "The module with the given ID was not found.",
    });
    return;
  }

  const { code, name } = req.body;
  module.code = code;
  module.name = name;
  res.status(200).send(module);
});

// DELETE a module
app.delete("/modules/:id", (req, res) => {
  const moduleIndex = modules.findIndex(
    (m) => m.id === parseInt(req.params.id)
  );
  if (moduleIndex === -1) {
    res.status(404).send({
      error: "The module with the given ID was not found.",
    });
    return;
  }

  const deletedModule = modules.splice(moduleIndex, 1);
  res.status(200).send(deletedModule[0]);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Module service running on port ${PORT}`));
