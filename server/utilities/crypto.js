const crypto = require("crypto");

const id = crypto.randomBytes(30).toString("hex");
console.log(id);