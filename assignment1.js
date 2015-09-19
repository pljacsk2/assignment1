var http = require('http'); /* expose http object to var http */
var url = require('url'); /* expose url object to var url */
var querystring = require('querystring');


/*
 * the callback function triggered when the server recieves a request
 * */

var fibRecursion = function(n){
    if(n == 2){
        return [0, 1];
    }
    else if( n == 1){
        return [0];
    }
    else{
        var x = fibRecursion(n-1);
        x[x.length] = x[x.length -1] + x[x.length - 2]
        return x;
    }


}

var callback = function (req, res) { // req -> request object; res -> response object

    var query = url.parse(req.url).query;
    var spliturl = req.url.split("?");
    var route = spliturl[0];
    var params = querystring.parse(query);

    console.log(req.url);
    console.log(route);
    console.log(params);


    if(route === "/getfibonacci"){ // if route is addNumbers
        var r = parseFloat(params.r);

        res.writeHead(200, {'Content-Type': 'text/plain'}); // send response header
        res.end(fibRecursion(r).toString()); // send response body
    }

    else{ // if route is not in any of the above
        res.writeHead(200, {'Content-Type': 'text/plain'}); // send response header
        res.end("unidentified route"); // send response body
    }
}




var server = http.createServer(callback) // create an http server
var port = 1243
server.listen(port, "127.0.0.1"); // make server listen to port 1337

console.log(fibRecursion(10));
console.log('Server running at http://127.0.0.1:' + port + '/');