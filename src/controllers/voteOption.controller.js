import QuestionRepository from "../repositories/questions.repository.js";
import { CustomErrorHandler } from "../middlewares/errorHandler.middleware.js";
import mongoose from "mongoose";

// Add Vote To Options
export const voteOption = async (req, res, next) => {
  try {
    const optionId = req.params.optionId;
    const questionId = req.params.questionId;

    if (!questionId || !mongoose.Types.ObjectId.isValid(questionId)) {
      throw new CustomErrorHandler(400, "Valid Question Id Is Required!");
    }

    if (!optionId || !mongoose.Types.ObjectId.isValid(optionId)) {
      throw new CustomErrorHandler(400, "Valid Option Id Is Required!");
    }

    // Add vote
    const updatedOption = await QuestionRepository.addVote(
      questionId,
      optionId
    );

    res.status(200).json({
      success: true,
      message: "Successfully Added Vote To Option.",
      data: updatedOption,
    });
  } catch (error) {
    next(error);
  }
};
