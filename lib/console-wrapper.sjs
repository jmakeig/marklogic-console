var process = {};
process.stdout = process.stderr = require('log');
module.exports = new require('console').Console(process.stdout, process.stderr);