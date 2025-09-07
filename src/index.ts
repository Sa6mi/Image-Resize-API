import express from 'express';
import { imageRouter } from './routes/imageRouter.js';

export const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Api is running at port ${port}`);
});

app.use(imageRouter);
