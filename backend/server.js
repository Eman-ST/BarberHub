const app = require("./app");
const config = require("./config");

app.listen(config.port, () => {
  console.log(`BarberHub API en http://localhost:${config.port}`);
});
