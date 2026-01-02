import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Flow', () => {

    let loginPage: LoginPage;

    // Run before each test
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate('https://www.saucedemo.com/'); // Sauce Demo URL
    });

    // 1. Verify user can login with valid credentials
    test('should login with valid credentials', async () => {
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.submitLogin();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Redirects to inventory page
    });

    // 2. Verify error message on invalid username
    test('should show error message on invalid username', async () => {
        await loginPage.enterUsername('invaliduser');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.submitLogin();
        await expect(loginPage.errorMessage).toBeVisible();
    });

    // 3. Verify error message on invalid password
    test('should show error message on invalid password', async () => {
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('invalidpassword');
        await loginPage.submitLogin();
        await expect(loginPage.errorMessage).toBeVisible();
    });

    // 4. Verify error on empty username field
    test('should show error message for empty username field', async () => {
        await loginPage.enterUsername('');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.submitLogin();
        await expect(loginPage.errorMessage).toBeVisible();
    });

    // 5. Verify error on empty password field
    test('should show error message for empty password field', async () => {
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('');
        await loginPage.submitLogin();
        await expect(loginPage.errorMessage).toBeVisible();
    });

    // 6. Verify user can logout
    test('should log out successfully', async () => {
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.submitLogin();
        await loginPage.logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    // 7. Verify login redirection after successful login
    test('should redirect to inventory after successful login', async () => {
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.submitLogin();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    // 8. Verify login button is disabled for empty credentials
    test('should disable login button for empty credentials', async () => {
        await loginPage.enterUsername('');
        await loginPage.enterPassword('');
        await expect(loginPage.submitButton).toBeDisabled();
    });

    // 9. Verify remember me option works
    test('should remember user on next visit', async () => {
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.rememberMe();
        await loginPage.submitLogin();
        // Logout and visit the login page again
        await loginPage.logout();
        await loginPage.navigate('https://www.saucedemo.com/');
        await expect(loginPage.usernameField).toHaveValue('standard_user');
    });

    // 10. Verify login fails for unregistered user
    test('should show error message for unregistered user', async () => {
        await loginPage.enterUsername('unregistereduser');
        await loginPage.enterPassword('somepassword');
        await loginPage.submitLogin();
        await expect(loginPage.errorMessage).toBeVisible();
    });

});
