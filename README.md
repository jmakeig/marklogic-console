An adapter for the [Node.js console](http://nodejs.org/api/console.html) that writes `stdout` and `stderr` to MarkLogic’s logs, using `xdmp.log`.

## Approach
I’ve started with sources of `assert.js`, `console.js`, and `util.js` from the [v0.10.35](https://github.com/joyent/node/tree/v0.10.35) tag. I’ve modified as little as possible to get these three libraries to run in MarkLogic 8.0. Most of the changes were places where the code was expecting the global `process` object along with removing references to `Buffer` types in `assert`. 

## Example

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

Run from [Query Console](http://docs.marklogic.com/guide/qconsole):
```
2014-12-27 00:22:10.858 Info: App-Services: Log 0
2014-12-27 00:22:10.858 Warning: App-Services: {"iteration":0}
2014-12-27 00:22:10.858 Error: App-Services: Error 0 and a string
2014-12-27 00:22:10.960 Info: App-Services: Log 1
2014-12-27 00:22:10.960 Warning: App-Services: {"iteration":1}
2014-12-27 00:22:10.960 Error: App-Services: Error 1 and a string
2014-12-27 00:22:11.064 Info: App-Services: Log 2
2014-12-27 00:22:11.064 Warning: App-Services: {"iteration":2}
2014-12-27 00:22:11.064 Error: App-Services: Error 2 and a string
2014-12-27 00:22:11.165 Info: App-Services: Log 3
2014-12-27 00:22:11.166 Warning: App-Services: {"iteration":3}
2014-12-27 00:22:11.166 Error: App-Services: Error 3 and a string
2014-12-27 00:22:11.266 Info: App-Services: Log 4
2014-12-27 00:22:11.266 Warning: App-Services: {"iteration":4}
2014-12-27 00:22:11.266 Error: App-Services: Error 4 and a string
2014-12-27 00:22:11.372 Info: App-Services: Log 5
2014-12-27 00:22:11.372 Warning: App-Services: {"iteration":5}
2014-12-27 00:22:11.372 Error: App-Services: Error 5 and a string
2014-12-27 00:22:11.478 Info: App-Services: Log 6
2014-12-27 00:22:11.478 Warning: App-Services: {"iteration":6}
2014-12-27 00:22:11.478 Error: App-Services: Error 6 and a string
2014-12-27 00:22:11.582 Info: App-Services: Log 7
2014-12-27 00:22:11.582 Warning: App-Services: {"iteration":7}
2014-12-27 00:22:11.582 Error: App-Services: Error 7 and a string
2014-12-27 00:22:11.686 Info: App-Services: Log 8
2014-12-27 00:22:11.686 Warning: App-Services: {"iteration":8}
2014-12-27 00:22:11.686 Error: App-Services: Error 8 and a string
2014-12-27 00:22:11.790 Info: App-Services: Log 9
2014-12-27 00:22:11.790 Warning: App-Services: {"iteration":9}
2014-12-27 00:22:11.790 Error: App-Services: Error 9 and a string
2014-12-27 00:22:11.894 Info: App-Services: my loop: 1037ms
2014-12-27 00:22:11.897 Error: App-Services: Trace
2014-12-27 00:22:11.897 Error: App-Services:     at <anonymous>:16:13
2014-12-27 00:22:11.897 Error: App-Services:     at phonyStack (<anonymous>:17:5)
2014-12-27 00:22:11.897 Error: App-Services:     at <anonymous>:19:1
2014-12-27 00:22:11.897 Error: App-Services:     at doEval (/MarkLogic/appservices/qconsole/qconsole-js-amped.sjs:5:19)
2014-12-27 00:22:11.897 Error: App-Services:     at /qconsole/endpoints/evaljs.sjs:105:29
```

## Acknowledgements
`console` and `util` are adapted from Node.js (v0.10.35) which is copyright Joyent, Inc. and other Node contributors. `assert` is used as-is from Node.js, which adapted code from narwhal.js, copyright [Thomas Robinson](http://280north.com).