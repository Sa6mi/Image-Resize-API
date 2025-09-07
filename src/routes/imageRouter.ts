import { Router, type Request, type Response } from 'express';
import sharp from 'sharp';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
export const imageRouter = Router();

const outPutPath = './outputImages';
imageRouter.get('/', async (req: Request, res: Response) => {
const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
});
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

  const outputFilePath = `${outPutPath}/${query.filename}-resized-${query.width}x${query.height}.jpg`;
  if (fs.existsSync(outputFilePath)) {
    const operation = `Accessed Resized Image: ${query.filename} ${query.width}x${query.height}`;
    const loggingfile = await fsPromises.open('Logger.txt', 'a+');
    loggingfile.write(`[${timestamp}]: ${operation} \n`);
    return res.sendFile(path.resolve(outputFilePath));
  }
  sharp(`./images/${query.filename}.jpg`)
    .resize(Number(query.width), Number(query.height))
    .toFile(outputFilePath)
    .then(() => {
      res.sendFile(path.resolve(outputFilePath));
    })
    .then(async () => {
      const operation = `Resized Image: ${query.filename} to ${query.width}x${query.height}`;
      const loggingfile = await fsPromises.open('Logger.txt', 'a+');
      loggingfile.write(`[${timestamp}]: ${operation}\n`);
    })
    .catch(() => {
      res.status(500).send('Error processing image');
    });
});
