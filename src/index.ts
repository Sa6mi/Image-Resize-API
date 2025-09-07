import express from 'express';
import { BaseRouter } from './routes/BaseRouter.js';

const port = 3000;
export const app = express();
app.use("/api",BaseRouter);
app.listen(port, () => {
  console.log(`Api is running at port ${port}`);
});
