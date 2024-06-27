import { CustomErrorHandler } from "../middlewares/errorHandler.middleware.js";
import { questionModel } from "../models/questionBank.model.js";

export default class QuestionRepository {
  // Create a question
  static async createQuestion(question) {
    return await questionModel.create({
      title: question,
    });
  }

  // Add Options
  static async addOptions(questionId, options) {
    return await questionModel.findByIdAndUpdate(
      questionId,
      {
        $push: { options },
      },
      { new: true }
    );
  }

  // Add Vote To Option
  static async addVote(questionId, optionId) {
    // Increment the vote count for the specific option and update the link_to_vote
    const updateResult = await questionModel.findOneAndUpdate(
      {
        _id: questionId,
        "options._id": optionId,
      },
      {
        $inc: { "options.$.votes": 1 },
        $set: {
          "options.$.link_to_vote": `http://localhost:8080/options/${questionId}/${optionId}/add_vote`,
        },
      },
      { new: true, projection: { options: { $elemMatch: { _id: optionId } } } }
    );

    if (!updateResult) {
      throw new CustomErrorHandler(400, "Question or option not found");
    }

    return updateResult;
  }

  // View Question
  static async findById(questionId) {
    const question = await questionModel.findById(questionId);

    if (!question) {
      throw new CustomErrorHandler(400, "Invalid Question Id!");
    }

    return question;
  }

  // Delete Question
  // Note: Question Cant Be Deleted If Any Of Its Option Has Votes.
  static async deleteOne(questionId) {
    // Find the question with only the options field
    const question = await questionModel.findById(questionId).select("options");

    if (!question) {
      throw new CustomErrorHandler(400, "Invalid Question Id!");
    }

    // Checking if any option has been voted
    const hasVotedOption = question.options.some((option) => option.votes > 0);

    if (hasVotedOption) {
      throw new CustomErrorHandler(
        400,
        "This Question Can't Be Deleted Because Its Option Has Been Voted."
      );
    }

    // Deletion
    await questionModel.deleteOne({ _id: questionId });
  }

  // Delete Option
  // Note: An option can’t be deleted if it has even one vote given to it)
  static async deleteOption(questionId, optionId) {
    // Find the question with only the options field
    const question = await questionModel.findOne({
      _id: questionId,
    });

    if (!question) {
      throw new CustomErrorHandler(400, "Invalid Question Id!");
    }

    const options = question.options;

    const optionIn = options.findIndex(
      (option) => option._id.toString() == optionId
    );

    if (optionIn == -1) {
      throw new CustomErrorHandler(400, "Invalid Option Id!");
    }

    if (options[optionIn].votes) {
      throw new CustomErrorHandler(
        400,
        "This Option Can't Be Deleted Because It Has Votes."
      );
    }

    // Deletion
    options.splice(optionIn, 1);

    // Saving
    await question.save();
  }
}
