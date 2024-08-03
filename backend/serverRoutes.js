const fs = require("fs");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");
require("dotenv").config({ path: "./.env" });
const API_VERSION = process.env.API_VERSION;
const SERVER = process.env.SERVER;

const serverRoutes = (app) => {
  const routeFiles = fs.readdirSync(`./routes/${API_VERSION}`);

  routeFiles.forEach((routeFile) => {
    if (routeFile.endsWith(".js")) {
      //route path format converted into kebab-case eg: route-path-name
      const routePath = routeFile
        .replace(".js", "")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();
      const routeModule = require(`./routes/${API_VERSION}/${routeFile}`);
      app.use(`/api/${API_VERSION}/${SERVER}/${routePath}`, routeModule);
      console.log(`/api/${API_VERSION}/${SERVER}/${routePath}`);
      app.use(globalErrorHandler);
    }
  });
};

module.exports = serverRoutes;
