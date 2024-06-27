import QuestionRepository from "../repositories/questions.repository.js";
import { CustomErrorHandler } from "../middlewares/errorHandler.middleware.js";
import mongoose from "mongoose";

// Add a question
export const addOptions = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const options = req.body.options;
    if (!questionId || !mongoose.Types.ObjectId.isValid(questionId)) {
      throw new CustomErrorHandler(400, "Valid Question Id Is Required!");
    }

    if (!options || !options.length) {
      throw new CustomErrorHandler(
        400,
        "Please provide options for the question."
      );
    }

    // Creating Question
    const addedOptions = await QuestionRepository.addOptions(
      questionId,
      options
    );

    if (!addedOptions) {
      throw new CustomErrorHandler(400, "Invalid Question Id.");
    }

    res.status(200).json({
      success: true,
      message: "Successfully Added Options!",
      data: addedOptions,
    });
  } catch (error) {
    next(error);
  }
};
