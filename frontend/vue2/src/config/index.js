let API_VERSION = "v1"; //default
let SERVER = "node";

let url;

if (process.env.NODE_ENV === "production") {
  url = `/api/${API_VERSION}/${SERVER}`;
} else {
  url = `http://localhost:3001/api/${API_VERSION}/${SERVER}`;
}

module.exports = {
  url,
};
