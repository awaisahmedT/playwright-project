import { test, expect } from '@playwright/test';

test.describe('Add to Cart – Separate Test Cases', () => {

    test('Verify that the user can navigate to the Sauce Demo homepage', async ({ page }) => {
        await page.goto('https://sauce-demo.myshopify.com/');
        await expect(page).toHaveTitle(/Sauce Demo/i);
    });

    test('Verify that the user can open a product details page from the homepage catalog', async ({ page }) => {
        await page.goto('https://sauce-demo.myshopify.com/');
        await page.getByRole('link', { name: /Noir jacket Noir jacket £/i }).click();

        await expect(
            page.getByRole('heading', { name: 'Noir jacket' })
        ).toBeVisible();
    });

    test('Verify that the user can select a size for the product', async ({ page }) => {
        await page.goto('https://sauce-demo.myshopify.com/');
        await page.getByRole('link', { name: /Noir jacket Noir jacket £/i }).click();

        await page.getByLabel('Size').selectOption('L');
        await expect(page.getByLabel('Size')).toHaveValue('L');
    });

    test('Verify that the user can select a color for the product', async ({ page }) => {
        await page.goto('https://sauce-demo.myshopify.com/');
        await page.getByRole('link', { name: /Noir jacket Noir jacket £/i }).click();

        await page.getByLabel('Color').selectOption('Red');
        await expect(page.getByLabel('Color')).toHaveValue('Red');
    });

    test('Verify that the user can add the selected product to the cart', async ({ page }) => {
        await page.goto('https://sauce-demo.myshopify.com/');
        await page.getByRole('link', { name: /Noir jacket Noir jacket £/i }).click();

        await page.getByLabel('Size').selectOption('L');
        await page.getByLabel('Color').selectOption('Red');
        await page.getByRole('button', { name: /Add to Cart/i }).click();

        // Cart icon opens successfully
        await page.locator('a.toggle-drawer.cart.desktop').click();
        await expect(
            page.getByRole('heading', { name: 'Noir jacket' })
        ).toBeVisible();
    });

    test('Verify that the added product is displayed in the cart', async ({ page }) => {
        await page.goto('https://sauce-demo.myshopify.com/');
        await page.getByRole('link', { name: /Noir jacket Noir jacket £/i }).click();

        await page.getByLabel('Size').selectOption('L');
        await page.getByLabel('Color').selectOption('Red');
        await page.getByRole('button', { name: /Add to Cart/i }).click();

        await page.locator('a.toggle-drawer.cart.desktop').click();

        await expect(
            page.getByRole('heading', { name: 'Noir jacket' })
        ).toBeVisible();
    });

});
