FROM mcr.microsoft.com/playwright:v1.57.0-focal

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Run tests
CMD ["npm", "test"]
