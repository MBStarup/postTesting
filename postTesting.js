// We need this to build our post string
var http = require("http");
var fs = require("fs");

// This is an async file read
fs.readFile(process.argv[2], "utf-8", function (err, data) {
  if (err) {
    console.log(err);
  }
  else if (data) {
    // Set up the request
    var post_req = http.request(
      {
        host: process.argv[3],
        //host: "130.225.57.221",
        // host: "127.0.0.1",
        //port: "443",
        port: process.argv[4],
        path: "/",
        method: "POST",
        headers: {
          "Content-Type": "text/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      function (res) {
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
          console.log("Response: " + chunk);
        });
      }
    );

    // post the data
    post_req.write(data);
    post_req.end();
  }
});