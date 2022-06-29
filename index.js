const http = require("http");
const PORT = 5000;
const app = require("./app");
const connectDB = require("./MongoDb");

http.createServer(app).listen(PORT, () => {
  new connectDB();
  console.log(`Server is running at port no. ${PORT}`);
});