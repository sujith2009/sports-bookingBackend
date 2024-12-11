const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect(process.env.DB_URL).then((con) => {
    console.log("mongodb connected to" + con.connection.host);
  });
};
module.exports = connection;
