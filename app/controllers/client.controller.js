const ColorsBehavior = require("../models/colors_behavior.model.js");

// Find by Id
exports.findOne = (req, res) => {
  ColorsBehavior.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  ColorsBehavior.updateById(
    req.params.id,
    new ColorsBehavior(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};
