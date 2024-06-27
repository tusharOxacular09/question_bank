import { Router } from "express";
import {
  addOptions,
  createQuestion,
  deleteQuestion,
  viewQuestion,
  voteOption,
  deleteOption,
} from "../controllers/index.js";

const questionBankRouter = Router();

questionBankRouter
  .post("/questions/create", createQuestion)
  .post("/questions/:id/options/create", addOptions)
  .get("/options/:questionId/:optionId/add_vote", voteOption)
  .get("/questions/:id", viewQuestion)
  .delete("/questions/:id/delete", deleteQuestion)
  .delete("/options/:questionId/:optionId/delete", deleteOption);

export default questionBankRouter;
