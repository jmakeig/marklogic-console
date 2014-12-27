An adapter for the [Node.js console](http://nodejs.org/api/console.html) that writes `stdout` and `stderr` to MarkLogic’s logs, using `xdmp.log`.

### Approach
I’ve started with sources of `assert.js`, `console.js`, and `util.js` from the [v0.10.35](https://github.com/joyent/node/tree/v0.10.35) tag. I’ve modified as little as possible to get these three libraries to run in MarkLogic 8.0. Most of the changes were places where the code was expecting the global `process` object along with removing references to `Buffer` types in `assert`. 

```javascript
var console = require('/lib/console');

console.time('my loop');
for(var i = 0; i < 10; i++) {
  console.log('Log %d', i);
  console.warn('%j', {"iteration": i });
  console.error('Error %d and a %s', i, 'string');
  xdmp.sleep(100);
}
console.timeEnd('my loop');

//console.assert(4 > 5, 'Four should never be greater than five');

function phonyStack() {
  (function() {
    console.trace();
  })()
}
phonyStack();
```