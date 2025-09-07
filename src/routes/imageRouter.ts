import { Router, type Request, type Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
export const imageRouter = Router();

const outPutPath = './outputImages';
imageRouter.get('/api/images', (req: Request, res: Response) => {
  if (!fs.existsSync(outPutPath)) {
    fs.mkdirSync(outPutPath);
  }
  const query = req.query;

  if (!query.filename) {
    return res.status(400).send('No filename entered');
  }
  if (!query.width) {
    return res.status(400).send('No width entered');
  }
  if (!query.height) {
    return res.status(400).send('No height entered');
  }

  const outputFilePath = `${outPutPath}/${query.filename}-resized.jpg`;
  if (fs.existsSync(outputFilePath)) {
    return res.sendFile(path.resolve(outputFilePath));
  }
  sharp(`./images/${query.filename}.jpg`)
    .resize(Number(query.width), Number(query.height))
    .toFile(outputFilePath)
    .then(() => {
      res.sendFile(path.resolve(outputFilePath));
    })
    .catch(() => {
      res.status(500).send('Error processing image');
    });
});
