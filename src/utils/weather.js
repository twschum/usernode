const https = require("https");

module.exports = function FetchWeather(lat, long) {
  const options = {
    hostname: "api.weather.gov",
    port: 80,
    path: `/points/${lat},${long}`,
    method: "GET",
  };

  var weather;
  const req = https.request(options, (res) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      weather = JSON.parse(data);
      res.end();
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();

  return weather;
};
