# Playwright Test Project - CI/CD Setup

This project uses GitHub Actions for continuous integration and testing.

## Status Badges

Add this to your `README.md`:

```markdown
![Playwright Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright-tests.yml/badge.svg?branch=main)
```

## Quick Start

```bash
# Install
npm install

# Run tests locally
npm test

# View report
npm run report

# Run in Docker
docker-compose up
```

## CI/CD Pipeline

- **Automated Testing**: Runs on push and PRs to main/develop
- **Multiple Environments**: Node 18.x and 20.x
- **Scheduled Runs**: Daily at 2 AM UTC
- **Artifact Storage**: 30-day retention for reports
- **PR Integration**: Automatic status comments

See [CI-CD-PIPELINE.md](./CI-CD-PIPELINE.md) for detailed documentation.
