# Image Resize API Udacity Project

## Scripts

```bash
npm start     # Start dev server
npm run build # Compile TypeScript to Js code
npm run test  # Run tests using jasmine and supertest
npm run lint  # Runs esLint
npm run format # Formats the code using prettier
```

## API Endpoint

### GET `/api/images`

**Parameters:**
- `filename` - Image name 
- `width` - Target width px
- `height` - Target height px

**Example:**
```
GET localhost:3000/api/images?filename=fjord&width=200&height=300
```

## Logging
Contains a logger that logs:
- Resize operations
- Cache hits

## File Structure

- Source images: `./images/` 
- Output images: `./outputImages/` 
- Logs: `Logger.txt`
