# CI/CD Pipeline Documentation

## Overview
This project includes a complete CI/CD pipeline for automated testing using Playwright and GitHub Actions.

## What's Included

### 1. GitHub Actions Workflow
**File:** `.github/workflows/playwright-tests.yml`

Automated testing on:
- Triggers: Push to `main` and `develop` branches, Pull Requests
- Scheduled: Daily at 2 AM UTC
- Node versions: 18.x and 20.x
- Browsers: Chromium

**Features:**
- Parallel test execution across multiple Node versions
- Automatic artifact uploads (HTML reports, test results)
- PR comments with test status
- 30-day artifact retention
- TypeScript linting validation

### 2. Docker Support
**Files:**
- `Dockerfile` - Standard Playwright image with dependencies
- `docker-compose.yml` - Local containerized test execution

**Usage:**
```bash
# Build and run tests in Docker
docker-compose up

# Or manually build and run
docker build -t playwright-tests .
docker run playwright-tests
```

### 3. NPM Scripts
Added to `package.json`:

```bash
npm test              # Run tests (headless in CI)
npm run test:headed   # Run with browser visible
npm run test:debug    # Run in debug mode
npm run test:ui       # Run with interactive UI
npm run report        # Open HTML report
```

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Run tests:
   ```bash
   npm test
   ```

## GitHub Actions Configuration

### Push/PR Triggers
Tests automatically run when you:
- Push code to `main` or `develop`
- Create a pull request to these branches

### Scheduled Tests
Tests run daily at 2 AM UTC for regression testing.

### Artifacts
- HTML reports saved as artifacts for 30 days
- Test results directories preserved for analysis
- Accessible from GitHub Actions run summary

### PR Comments
Automatic comments posted on PRs with test status.

## Optional Enhancements

### 1. Slack Notifications
Add to `.github/workflows/playwright-tests.yml`:
```yaml
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "Playwright tests failed on ${{ github.ref }}"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### 2. Test Reports Upload
Consider using:
- **Allure Reports**: Already in dependencies (`allure-playwright`)
- **TestRail**: For test management integration

### 3. Code Coverage
Add to playwright.config.ts:
```typescript
reporter: [
  ['html'],
  ['json', { outputFile: 'test-results/results.json' }]
]
```

### 4. Performance Testing
Add performance assertions in tests:
```typescript
expect(page).toHaveURL(/url/, { timeout: 5000 });
```

## Troubleshooting

### Tests fail in CI but pass locally
- Check Node version compatibility
- Verify all environment variables are set
- Review browser versions in CI vs local

### Artifacts not uploading
- Ensure test-results and playwright-report directories exist
- Check GitHub Actions permissions
- Verify retention-days setting

### Docker build fails
- Pull latest Playwright image: `docker pull mcr.microsoft.com/playwright:v1.57.0-focal`
- Ensure Docker daemon is running
- Check disk space

## CI/CD Best Practices

1. **Keep tests independent** - No shared state between tests
2. **Use page objects** - Already implemented in `/page` directory
3. **Maintain test data** - Store in config files
4. **Monitor flakiness** - Use retries strategically
5. **Archive reports** - Preserve for analysis
6. **Review logs** - Check error-context.md files

## Next Steps

1. Push to GitHub with these files
2. Add GitHub repo secrets if using webhooks
3. Monitor first test run in Actions
4. Adjust retries/timeouts based on results
5. Integrate with your team's workflow

For more info: https://playwright.dev/docs/ci
