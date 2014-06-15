gzip-no-pipe
=======
Node.js module.
Allow use options in gzip compression without using pipes.

##Using

```npm install gzip-no-pipe```

```
    var gzip=require('gzip-no-pipe');
    gzip('Hello World', options,function(err,data){
        console.log(err||data);
    });
```

##Options
See http://nodejs.org/api/zlib.html#zlib_options


##Strategies
Add addition option strategies -- array of compress strategies. See strategy option.

If this param is set gzip-no-pipe will be use all strategies and return best compressed data.

