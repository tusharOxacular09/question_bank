import express from "express";
import questionBankRouter from "./src/routes/questionBank.router.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware.js";
import { invalidRoutesHandlerMiddleware } from "./src/middlewares/invalidRoute.middleware.js";
import { welcomeMessage } from "./src/utils/welcomeMessage.util.js";

const app = express();

// Middlewares
app.use(express.json());

// Welcome Message
app.get("/", welcomeMessage);

// Routes
app.use(questionBankRouter);

// Invalid Route
app.use(invalidRoutesHandlerMiddleware);

// Handeling Errors in Application Level
app.use(errorHandlerMiddleware);

export default app;
