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

ColorsBehavior.updateById = async (id, body, result) => {
  const colorPicker = await query(
    `SELECT * FROM colors_behavior WHERE id = ${id}`
  );

  const { colors_behavior } = body;
  let queryString = "";
  if (colors_behavior == "red") {
    queryString = `${colors_behavior} = ${colorPicker[0].red++}`;
  } else if (colors_behavior == "blue") {
    queryString = `${colors_behavior} = ${colorPicker[0].blue++}`;
  } else if (colors_behavior == "yellow") {
    queryString = `${colors_behavior} = ${colorPicker[0].yellow++}`;
  }

  sql.query(
    `UPDATE colors_behavior SET ${queryString} WHERE id = ${id}`,
    [id],
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
      result(null, { id: id });
    }
  );
};

function query(values) {
  return new Promise((resolve, reject) => {
    sql.query(values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = ColorsBehavior;
