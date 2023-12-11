const sql = require("./db.js");

// constructor
const ColorsBehavior = function (colors_behavior) {
  this.red = colors_behavior.red;
  this.blue = colors_behavior.blue;
  this.yellow = colors_behavior.yellow;
};

ColorsBehavior.findById = (id, result) => {
  sql.query(`SELECT * FROM colors_behavior WHERE Id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found data: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found data with the id
    result({ kind: "not_found" }, null);
  });
};

ColorsBehavior.updateById = (id, colors_behavior, result) => {
  sql.query(
    `UPDATE colors_behavior SET red = ${colors_behavior.red}, blue = ${colors_behavior.blue}, yellow = ${colors_behavior.yellow} WHERE id = ${id}`,
    [colors_behavior.red, colors_behavior.blue, colors_behavior.yellow, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found data with the id
        result({ kind: "not_found" }, null);
        return;
      }

      //console.log("updated data: ", { id: id, ...colors_behavior });
      result(null, { id: id, ...colors_behavior });
    }
  );
};

module.exports = ColorsBehavior;
