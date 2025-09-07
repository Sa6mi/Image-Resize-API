import sharp from 'sharp';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

export interface ProcessingResult {
  success: boolean;
  outputPath?: string;
  error?: string;
  cached: boolean;
}
export const proccessImage = async (
  filename: string,
  width: number,
  height: number
): Promise<ProcessingResult> => {
  const outPutPath = './outputImages';
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  });
  if (!fs.existsSync(outPutPath)) {
    fs.mkdirSync(outPutPath);
  }
  const outputFilePath = `${outPutPath}/${filename}-resized-${width}x${height}.jpg`;
  const inputFilePath = `./images/${filename}.jpg`;
  if (!fs.existsSync(inputFilePath)) {
    return {
      success: false,
      error: 'FILE_NOT_FOUND',
      cached: false,
    };
  }

  if (fs.existsSync(outputFilePath)) {
    const operation = `Accessed Resized Image: ${filename} ${width}x${height}`;
    loggingFunction(timestamp, operation);
    return {
      success: true,
      outputPath: path.resolve(outputFilePath),
      cached: true,
    };
  }

  try {
    await sharp(inputFilePath)
      .resize(width, height)
      .toFile(outputFilePath);

    const operation = `Resized Image: ${filename} to ${width}x${height}`;
    loggingFunction(timestamp, operation);
    return {
      success: true,
      outputPath: path.resolve(outputFilePath),
      cached: false,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error Encountered",
      cached: false,
    };
  }
};
export const loggingFunction = async (timeStamp: string, operation: string):Promise<void> => {
  const loggingfile = await fsPromises.open('Logger.txt', 'a+');
  loggingfile.write(`[${timeStamp}]: ${operation} \n`);
};
