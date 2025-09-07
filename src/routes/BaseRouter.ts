import { Router } from "express";
import { imageRouter } from "./imageRouter.js";

export const BaseRouter = Router();     

BaseRouter.use("/images", imageRouter);