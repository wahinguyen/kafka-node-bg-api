module.exports = (app) => {
  const colors_behavior = require("../controllers/client.controller.js");

  var router = require("express").Router();

  // Retrieve a single with id
  router.get("/:id", colors_behavior.findOne);

  // Update with id
  router.put("/:id", colors_behavior.update);

  app.use("/api", router);
};
