# Cypress SauceDemo E2E Tests

End-to-end tests for [SauceDemo](https://www.saucedemo.com/) using Cypress. Covers the complete user journey: **Login → Add ALL Items to Cart → Checkout → Logout**.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd Cypress_Saucedemo

# Install dependencies
npm install
```

### Running Tests

```bash
# Run tests in headless mode (CI-friendly) - uses Firefox Developer Edition
npm run test

# Open Cypress Test Runner (interactive mode) - uses Firefox Developer Edition
npm run test:open
```

## Project Structure

```
Cypress_Saucedemo/
├── package.json              # Dependencies & scripts
├── cypress.config.js         # Cypress configuration
├── cypress.env.json.example  # Example environment config
├── cypress/
│   ├── support/
│   │   ├── e2e.js           # Global hooks (runs before each test)
│   │   └── commands.js      # Custom Cypress commands
│   └── e2e/
│       └── saucedemo.cy.js  # Main test specifications (2 tests)
```

## Test Scenarios

| Test | Description |
|------|-------------|
| `Login → Add ALL items → Checkout → Logout` | **Primary test** - Full flow: Login → Add all 6 products to cart → Checkout with user info → Verify order success → Logout |
| `Verify cart persistence after logout and login` | **Secondary test** - Verifies cart state after logout and re-login (SauceDemo persists cart per user) |

### Test Flow Details (Primary Test)

1. **Login** - Uses `standard_user` / `secret_sauce` (configurable via env)
2. **Add to Cart** - Adds **ALL 6 products** to cart using `cy.addAllItemsToCart()`
3. **Cart Verification** - Confirms cart badge shows 6 items, all buttons show "Remove"
4. **Go to Cart** - Navigates to cart page, verifies all 6 items listed
5. **Checkout** - Fills shipping info (first name, last name, postal code)
6. **Order Overview** - Verifies all 6 items, subtotal, tax, and total
7. **Complete Order** - Clicks Finish, verifies success message
8. **Logout** - Opens sidebar menu and logs out
9. **Verification** - Confirms return to login page

### Test Flow Details (Secondary Test)

1. **Add all items** to cart
2. **Logout**
3. **Login again** with same user
4. **Verify cart state** - SauceDemo persists cart per user (badge still shows 6 items)

## Custom Commands

Defined in `cypress/support/commands.js`:

| Command | Description |
|---------|-------------|
| `cy.login(user?, pass?)` | Logs in using credentials (cached via `cy.session()`) |
| `cy.addToCart(productName)` | Adds single product to cart by name |
| `cy.addAllItemsToCart()` | Adds **ALL** products to cart |
| `cy.removeFromCart(productName)` | Removes single product from cart by name |
| `cy.goToCart()` | Navigates to cart page |
| `cy.checkout(info?)` | Completes checkout with shipping info |
| `cy.logout()` | Logs out via sidebar menu |

## Configuration

### Base URL
Set in `cypress.config.js`:
```js
baseUrl: 'https://www.saucedemo.com'
```

### Default Credentials
```js
env: {
  username: 'standard_user',
  password: 'secret_sauce'
}
```

### Full cypress.config.js
```js
{
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    viewportWidth: 2056,
    viewportHeight: 1329,
    browser: 'chrome'
  },
  env: {
    username: 'standard_user',
    password: 'secret_sauce'
  }
}
```

### Override Credentials via CLI
```bash
# Command line
npx cypress run --env username=your_user,password=your_pass

# Or create cypress.env.json (gitignored)
{
  "username": "your_user",
  "password": "your_pass"
}
```

### Example Config File
See `cypress.env.json.example` for reference.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests headlessly (Firefox Developer Edition) |
| `npm run test:open` | Open Cypress UI for interactive testing (Firefox Developer Edition) |

## Test Reports

After running `npm run test`:
- **Screenshots** on failure → `cypress/screenshots/`
- **Videos** of each run → `cypress/videos/`

## CI/CD Example (GitHub Actions)

```yaml
name: Cypress E2E
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: cypress-videos
          path: cypress/videos
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `ENOTFOUND registry.npmjs.org` | Check internet connection / proxy settings |
| Tests timeout | Increase `defaultCommandTimeout` in `cypress.config.js` |
| Element not found | Verify selectors match current SauceDemo DOM |
| Login fails | Confirm credentials are valid for SauceDemo |
| Firefox not found | Install Firefox Developer Edition or change browser in package.json |

## License

MIT - Feel free to use for learning or testing purposes.