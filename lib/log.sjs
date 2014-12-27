'use strict';
function XDMPLogWriter() {};
XDMPLogWriter.prototype.write = function(str, /*optional*/ level) {
  // Chop off a trailing line break
  if('\n' === str[str.length - 1]) {
    str = Array.prototype.slice.call(str, 0, -1).join('');
  }
  xdmp.log(str, level || 'info');
}
module.exports = new XDMPLogWriter;
module.exports.XDMPLogWriter = XDMPLogWriter;
