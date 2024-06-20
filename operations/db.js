const winston = require("winston");
const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGODB_URI;

const logger = winston.createLogger({
    level: 'info', // Set the desired log level
    format: winston.format.combine(
      winston.format.colorize(), // Add color to console output
      winston.format.simple() // Use a simple format
    ),
    transports: [
      new winston.transports.Console() // Add a console transport
      // Can add other transports (e.g., file, database) here
    ]
  });



mongoose.set("strictQuery", false);

module.exports = function () {mongoose.
  connect("mongodb+srv://freemanluka:OJpyYm7RVuAbSbcJ@eateryapplication.wcqe3lm.mongodb.net/").
  then(() => logger.info('Eatery Application DB reconnected successfully!'));
}
