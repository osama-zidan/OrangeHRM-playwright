# OrangeHRM Test Automation Project

This project contains automated tests for the OrangeHRM demo application using Playwright. The tests cover both UI interactions and API testing for various HR management functionalities.

## 🚀 Features

- **UI Testing**: End-to-end tests for admin user management
- **API Testing**: REST API tests for recruitment candidate management
- **Page Object Model**: Well-structured page objects for maintainable tests
- **Session Management**: Automatic cookie handling for authenticated API calls

## 📁 Project Structure

```
Task/
├── Page/
│   ├── LoginPage.ts          # Login page object
│   ├── AdminPage.ts          # Admin page object
│   ├── constants.ts          # Application constants
│   └── utilites/
│       └── utility.ts        # Utility functions
├── tests/
│   ├── e2e-admin-flow-tests.spec.ts      # UI tests for admin functionality
│   └── api-recruitment-candidate-delete.spec.ts  # API tests for candidate deletion
├── playwright.config.ts      # Playwright configuration
├── package.json             # Project dependencies
└── yarn.lock               # Dependency lock file
```

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Task
```

2. Install dependencies:
```bash
yarn install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test Files

**UI Tests (Admin Flow):**
```bash
npx playwright test e2e-admin-flow-tests.spec.ts
```

**API Tests (Recruitment):**
```bash
npx playwright test api-recruitment-candidate-delete.spec.ts
```

### Run Tests in UI Mode
```bash
npx playwright test --ui
```

### Run Tests in Headed Mode
```bash
npx playwright test --headed
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

## 📋 Test Descriptions

### 1. Admin Flow Tests (`e2e-admin-flow-tests.spec.ts`)

**Test Scenario**: Complete admin user management workflow

**Steps**:
1. Login to OrangeHRM with admin credentials
2. Navigate to Admin module
3. Add a new user with random username
4. Verify user creation (record count increases)
5. Search for the created user
6. Delete the user
7. Reset the search form
8. Verify user deletion (record count decreases)

**Test Data**:
- Username: `Admin`
- Password: `admin123`
- New User: `Osama{randomNumber}`

### 2. API Recruitment Tests (`api-recruitment-candidate-delete.spec.ts`)

**Test Scenario**: Delete recruitment candidates using REST API

**Steps**:
1. Login to OrangeHRM via UI to obtain session cookies
2. Get current candidates list via API
3. Delete the first candidate in the list
4. Verify deletion by checking updated candidates list

**API Endpoints Used**:
- `GET /api/v2/recruitment/candidates` - Retrieve candidates
- `DELETE /api/v2/recruitment/candidates` - Delete candidate by ID

## 🏗️ Page Objects

### LoginPage
- Handles login functionality
- Methods: `navigateToLoginPage()`, `login()`, `fillUsername()`, `fillPassword()`, `clickLogin()`

### AdminPage
- Manages admin user operations
- Methods: `navigateToAdminTab()`, `getRecordsCount()`, `addNewUser()`, `searchUser()`, `deleteUser()`

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)
- Browser configuration
- Test timeout settings
- Screenshot and video capture settings
- Test directory configuration

### Constants (`Page/constants.ts`)
- Base URL: `https://opensource-demo.orangehrmlive.com`

## 📊 Test Reports

After running tests, reports are generated in:
- `playwright-report/` - HTML test report
- `test-results/` - Test artifacts (screenshots, videos, traces)

View the HTML report:
```bash
npx playwright show-report
```

## 🐛 Debugging

### View Test Traces
```bash
npx playwright show-trace test-results/trace.zip
```

### Debug Failed Tests
```bash
npx playwright test --debug
```

### Run Tests with Screenshots
```bash
npx playwright test --screenshot=on
```

## 📝 Logging

Tests include comprehensive console logging:
- Record counts before and after operations
- Candidate information during API operations
- Success/failure messages for each step

## 🔒 Authentication

- Tests use the demo OrangeHRM application
- Default credentials: `Admin` / `admin123`
- Session cookies are automatically managed for API calls

## 🚨 Error Handling

- Graceful handling of missing candidates
- Proper HTTP status code validation
- Comprehensive error messages and logging

## 📈 Best Practices

1. **Page Object Model**: All UI interactions are abstracted into page objects
2. **API Testing**: Uses Playwright's built-in API testing capabilities
3. **Session Management**: Automatic cookie extraction for authenticated API calls
4. **Random Data**: Uses random numbers to avoid test conflicts
5. **Verification**: Multiple verification points to ensure test reliability

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Add appropriate logging for debugging
3. Include proper error handling
4. Update this README for new features

## 📞 Support

For issues or questions:
1. Check the test logs for detailed error information
2. Review the Playwright documentation
3. Ensure all dependencies are properly installed

## 🔄 Continuous Integration

The tests are designed to run in CI/CD environments:
- Headless mode compatible
- Proper exit codes for CI systems
- Configurable timeouts and retries 