// @ts-check
const { test, expect } = require('@playwright/test');

// Define the base URL for the tests
const BASE_URL = 'https://sauce-demo.myshopify.com/';

/**
 * Group of tests for the Sauce Demo Shopify site.
 */
test.describe('Sauce Demo Shopify E2E Tests', () => {

    // Test 1: Verify the homepage loads and has the correct title
    test('should load the homepage and verify the title', async ({ page }) => {
        // Navigate to the base URL
        await page.goto(BASE_URL);

        // Assert that the page title contains "Sauce"
        await expect(page).toHaveTitle(/Sauce/);

        // Assert that the main product listing container is visible
        const productGrid = page.locator('.product-grid');
        await expect(productGrid).toBeVisible();
        console.log('Test 1: Homepage title and product grid verified successfully.');
    });

    // Test 2: Verify navigation to a specific product detail page
    test('should navigate to a product detail page', async ({ page }) => {
        await page.goto(BASE_URL);

        // Find the link for the first product (assuming it has a specific name or structure)
        // We look for a link that is part of a product item and has text that includes "Backpack"
        const productLink = page.locator('a:has-text("Sauce Labs Backpack")').first();

        // Check if the link exists before clicking
        await expect(productLink).toBeVisible();

        // Click the product link
        await productLink.click();

        // Assert that the URL contains '/products/' and the product handle
        await expect(page).toHaveURL(/.*\/products\/sauce-labs-backpack/);

        // Assert that the product name is visible on the detail page
        const productNameHeader = page.getByRole('heading', { name: 'Sauce Labs Backpack' });
        await expect(productNameHeader).toBeVisible();
        console.log('Test 2: Product detail navigation verified successfully.');
    });

    // Test 3: Test the Add to Cart functionality
    test('should add an item to the cart and verify the cart count', async ({ page }) => {
        // Navigate directly to a product page to simplify the test flow
        await page.goto(`${BASE_URL}products/sauce-labs-backpack`);

        // The Add to Cart button is usually a button with a specific text or role
        // We'll look for a button with the text "Add to cart"
        const addToCartButton = page.getByRole('button', { name: 'Add to cart' });

        // Click the button to add the item to the cart
        await addToCartButton.click();

        // Wait for the mini-cart or confirmation element to appear.
        // In this Shopify theme, a sidebar usually slides in, or the cart icon updates.
        // We will look for the cart notification or the cart icon that displays the item count.

        // The cart icon on this site typically uses a specific class or ID to display the count.
        // Let's assume the cart icon has a visible text/number indicating the count.
        // We'll look for an element that represents the cart count badge (often a span)
        const cartCountBadge = page.locator('.cart-notification__count');

        // Wait for the cart count to update and verify it's '1'
        await expect(cartCountBadge).toHaveText('1');

        // Click on the View Cart button inside the notification to navigate to the cart page
        const viewCartButton = page.getByRole('link', { name: 'View cart' });
        await viewCartButton.click();

        // Verify we are on the cart page
        await expect(page).toHaveURL(/.*\/cart/);

        // Verify the added item is present in the cart
        const itemInCart = page.getByText('Sauce Labs Backpack');
        await expect(itemInCart).toBeVisible();
        console.log('Test 3: Add to Cart functionality verified successfully.');
    });
});