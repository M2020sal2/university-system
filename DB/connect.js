import monngoose from "mongoose";
//connect With DataBase
const connectDB = async () => {
  await monngoose
    .connect(`mongodb://root:example@mongo:27017`)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log("error in connection :(", error);
    });
};
export default connectDB;
