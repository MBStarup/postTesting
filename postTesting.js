var http = require("http");
var fs = require("fs");

// This is an async file read
try { 
  fs.readFile(process.argv[4], "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    }
    else if (data) {
      // Set up the request
      var post_req = http.request(
        {
          host: process.argv[2],
          port: process.argv[3],
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
} catch (error) {
  console.log("Usage: postTesting <ip-address> <port> <json filepath>")
}