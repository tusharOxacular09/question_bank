import QuestionRepository from "../repositories/questions.repository.js";
import { CustomErrorHandler } from "../middlewares/errorHandler.middleware.js";

// Create a question
export const createQuestion = async (req, res, next) => {
  try {
    const question = req.body.title;
    if (!question) {
      throw new CustomErrorHandler(400, "Please provide title of question.");
    }

    // Creating Question
    const newQuestion = await QuestionRepository.createQuestion(question);

    res.status(201).json({
      success: true,
      message: "Successfully Created New Question!",
      data: newQuestion,
    });
  } catch (error) {
    next(error);
  }
};
