```javascript
var console = require('/lib/console');

console.time('my loop');
for(var i = 0; i < 100; i++) {
  console.dir(i);
  xdmp.sleep(50);
}
console.timeEnd('my loop');
```