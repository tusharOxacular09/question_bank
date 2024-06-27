import QuestionRepository from "../repositories/questions.repository.js";
import { CustomErrorHandler } from "../middlewares/errorHandler.middleware.js";
import mongoose from "mongoose";

export const deleteQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;

    if (!questionId || !mongoose.Types.ObjectId.isValid(questionId)) {
      throw new CustomErrorHandler(400, "Valid Question Id Is Required!");
    }

    // View Question
    await QuestionRepository.deleteOne(questionId);

    res.status(200).json({
      success: true,
      message: "Successfully Deleted The Question.",
    });
  } catch (error) {
    next(error);
  }
};
