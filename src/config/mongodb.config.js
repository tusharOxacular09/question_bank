import mongoose from "mongoose";
import { CustomErrorHandler } from "../middlewares/errorHandler.middleware.js";

export const mongoDbConnector = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("🎉 Successfully Made Connection With MongoDB Database.🎉");
      })
      .catch((error) => {
        throw new CustomErrorHandler(
          500,
          "Error While Connection With MongoDB Database."
        );
      });
  } catch (error) {
    throw new CustomErrorHandler(
      500,
      "Error While Connection With MongoDB Database."
    );
  }
};
