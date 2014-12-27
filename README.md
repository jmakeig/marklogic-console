```javascript
var console = require('/lib/console-wrapper');

console.time('my loop');
for(var i = 0; i < 10; i++) {
  console.log(i);
  console.warn(i);
  console.error(i);
  xdmp.sleep(100);
}
console.timeEnd('my loop');
//console.assert(4 > 5, 'Four should be greater than 5');
function phonyStack() {
  (function() {
    console.trace();
  })()
}
phonyStack();
```