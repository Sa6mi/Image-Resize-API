import supertest from 'supertest';
import { app } from '../index.js';
import { proccessImage } from '../utils/imageProcessor.js';
import fs from 'fs';
import path from 'path';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('Endpoint is running Test', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(response.status).toEqual(200);
  });
  it('Query inputs missing Test', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200');
    expect(response.status).toEqual(400);
  });
  it('Wrong Filename Test (Image is missing)', async () => {
    const response = await request.get(
      '/api/images?filename=fjord22&width=200&height=200'
    );
    expect(response.status).toEqual(404);
  });
});


describe('Image Processing Function Tests', () => {
  const testFilename = 'fjord';
  const testWidth = 100;
  const testHeight = 100;
  const outputDir = './outputImages';
  const expectedOutputPath = path.resolve(`${outputDir}/${testFilename}-resized-${testWidth}x${testHeight}.jpg`);

  beforeEach(() => {
    if (fs.existsSync(expectedOutputPath)) {
      fs.unlinkSync(expectedOutputPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(expectedOutputPath)) {
      fs.unlinkSync(expectedOutputPath);
    }
  });

  it('Image Proccess Test to not throw errors', async () => {
    expect(async () => {
      await proccessImage(testFilename, testWidth, testHeight);
    }).not.toThrow();
  });

  it('Image Process Test to return expected values', async () => {
    const result = await proccessImage(testFilename, testWidth, testHeight);
    
    expect(result.success).toBe(true);
    expect(result.outputPath).toBeDefined();
    expect(result.cached).toBe(false);
    expect(fs.existsSync(result.outputPath!)).toBe(true);
  });

  it('cached image return test', async () => {
    await proccessImage(testFilename, testWidth, testHeight);
    const result = await proccessImage(testFilename, testWidth, testHeight);
    expect(result.success).toBe(true);
    expect(result.cached).toBe(true);
  });

  it('non-existent image test', async () => {
    const result = await proccessImage('nonexistent', testWidth, testHeight);
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

});
