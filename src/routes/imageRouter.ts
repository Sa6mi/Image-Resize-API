import { Router, type Request, type Response } from 'express';
import { proccessImage } from '../utils/imageProcessor.js';
import fs from "fs"
export const imageRouter = Router();

imageRouter.get('/', async (req: Request, res: Response): Promise<Response | void> => {
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
  const width = Number(query.width);
  const height = Number(query.height);  
  if (isNaN(width) || width <= 0 ||!Number.isInteger(width)|| isNaN(height) || height <= 0 ||!Number.isInteger(height)) {
    return res.status(400).send('Height And Width must be positive integers');
  }
  const result = await proccessImage(query.filename as string, width, height);
  
  if (result.success && result.outputPath) {
    res.status(200).sendFile(result.outputPath);
  } else if (result.error === 'FILE_NOT_FOUND') {
    res.status(404).send('Image file is not found');
  } else {
    res.status(500).send('Error processing image');
  }
});
