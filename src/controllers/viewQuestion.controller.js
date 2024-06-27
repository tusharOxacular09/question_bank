import QuestionRepository from "../repositories/questions.repository.js";
import { CustomErrorHandler } from "../middlewares/errorHandler.middleware.js";
import mongoose from "mongoose";

// Add Vote To Options
export const viewQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;

    if (!questionId || !mongoose.Types.ObjectId.isValid(questionId)) {
      throw new CustomErrorHandler(400, "Valid Question Id Is Required!");
    }

    // View Question
    const getQuestion = await QuestionRepository.findById(questionId);

    res.status(200).json({
      success: true,
      message: "Successfully got the question with votes.",
      data: getQuestion,
    });
  } catch (error) {
    next(error);
  }
};
