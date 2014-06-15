var zlib = require('zlib');
function gzip(data, options,cb){
    var arr=options.strategies;
    if(!arr){
        if(options.strategy)
            arr=[options.strategy];
        else
            arr=[zlib.Z_DEFAULT_STRATEGY];
    }
    var warErr=false;
    var out=[];
    for(var i=0;i<arr.length;i++){
        gzip0(data, arr[i], options,function(err,data){
            if(warErr)
                return;
            if(err)
                return cb(err);
            out.push(data);
            if(arr.length===out.length){
                var minLen=Infinity;
                var best=false;
                for(var j=0;j<out.length;j++){
                    if(out[j].length<minLen){
                        minLen=out[j].length;
                        best=out[j];
                    }
                }
                cb(false,min);
            }
        });
    }
}
function gzip0(data, strategy, options,cb){
    var opts={};
    for(var i in options) if(options.hasOwnProperty(i))
        opts[i]=options[i];
    opts.strategy=strategy;
    var gzip = zlib.createGzip(opts);
    var buffers=[];
    function destroy(){
        gzip.removeAllListeners();
        gzip=null;
    }
    gzip.on('error', function(err) {
        cb(err);
        destroy();
    });
    gzip.on('data', function(chunk) {
        buffers.push(chunk);
    });
    gzip.on('end', function() {
        cb(false,Buffer.concat(buffers));
        destroy();
    });
    gzip.write(data);
    gzip.end();
}

module.exports=gzip;

//constants
for(var i in zlib)
    if(typeof(i)=='string' && i.indexOf('Z_')===0)
        module.exports.prototype[i]=zlib[i];