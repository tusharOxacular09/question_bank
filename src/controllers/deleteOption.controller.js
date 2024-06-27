import QuestionRepository from "../repositories/questions.repository.js";
import { CustomErrorHandler } from "../middlewares/errorHandler.middleware.js";
import mongoose from "mongoose";

export const deleteOption = async (req, res, next) => {
  try {
    const optionId = req.params.optionId;
    const questionId = req.params.questionId;

    if (!questionId || !mongoose.Types.ObjectId.isValid(questionId)) {
      throw new CustomErrorHandler(400, "Valid Question Id Is Required!");
    }

    if (!optionId || !mongoose.Types.ObjectId.isValid(optionId)) {
      throw new CustomErrorHandler(400, "Valid Option Id Is Required!");
    }

    // View Question
    await QuestionRepository.deleteOption(questionId, optionId);

    res.status(200).json({
      success: true,
      message: "Successfully Deleted The Option.",
    });
  } catch (error) {
    next(error);
  }
};
