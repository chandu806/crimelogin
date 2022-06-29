const mongoose = require(`mongoose`);

class mongo {
  constructor() {
    this.createMongoConnect();
  }
  createMongoConnect() {
    mongoose.connect(`mongodb://127.0.0.1:27017`);
    mongoose.connect.once(`open`, () => {
      console.log(`Mongodb is connect`);
    });
    mongoose.connect.on(`error`, () => {
      console.log(`Error in mongo connection`);
    });
  }
}
module.exports = mongo;