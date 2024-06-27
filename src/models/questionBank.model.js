import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: String,
  votes: {
    type: Number,
    default: 0,
  },
  link_to_vote: String,
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [optionSchema],
});

export const questionModel = mongoose.model("questions", questionSchema);
