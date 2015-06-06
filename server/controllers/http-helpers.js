var headers = {
  // Default CORS Headers:
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  // Custom headers
  "Content-Type": "application/json"
};

exports.sendResponse = function(res, statusCode, data) {
  var messageObj = { results: data };
  res.writeHead(statusCode, headers);
  res.end( JSON.stringify(messageObj) );
};





