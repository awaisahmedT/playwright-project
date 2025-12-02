// @ts-check
const { test, expect } = require('@playwright/test');

// 1. PAGE OBJECT MODEL (POM) CLASS DEFINITION (Defined Locally)
// This class contains all the locators and actions for the site.
class ShopPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.baseURL = 'https://sauce-demo.myshopify.com/';

        // --- Locators ---
        this.searchButton = page.getByRole('textbox', { name: 'Search' });
        this.productLink = page.getByRole('link', { name: 'Grey jacket Grey jacket £' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.cartDrawerContainer = page.locator('.cart-drawer-container');
        this.cartItemTitle = page.locator('.cart-item-details a.cart-item-title');
        this.cartIconCount = page.locator('.header-cart-count');
        this.checkoutButtonInDrawer = page.getByRole('button', { name: 'Checkout' });
        this.checkoutEmailField = page.locator('#checkout_email');
    }

    // --- Actions ---

    async goto() {
        await this.page.goto(this.baseURL);
        await expect(this.page).toHaveTitle(/Sauce Demo/);
    }

    async searchAndSelectProduct(searchTerm) {
        await this.searchButton.click();
        await this.searchButton.fill(searchTerm);

        // Wait for search results to appear
        await expect(this.productLink).toBeVisible();
        await this.productLink.click();

        // Wait for Product Detail Page (PDP) to load
        await expect(this.addToCartButton).toBeVisible();
    }

    async addItemToCart() {
        await this.addToCartButton.click();
        // Wait for the cart drawer to slide open
        await expect(this.cartDrawerContainer).toBeVisible();
    }

    async proceedToCheckout() {
        await this.checkoutButtonInDrawer.click();
        // Wait for navigation to the secure Shopify checkout domain
        await expect(this.page.url()).toContain('checkout.shopify.com');
    }

    // --- Assertions ---

    async verifyItemInCart(expectedName) {
        await expect(this.cartItemTitle).toHaveText(expectedName);
        await expect(this.cartIconCount).toHaveText('1');
    }

    async verifyCheckoutPageLoaded() {
        await expect(this.checkoutEmailField).toBeVisible();
    }
}

// -------------------------------------------------------------
// 2. TEST SCENARIO DEFINITION (The code the Playwright runner detects)
// -------------------------------------------------------------

test.describe('E2E Shopping Flow Validation', () => {

    test('SCN_001: Validate successful product search and checkout initiation', async ({ page }) => {

        // Instantiate the locally defined Page Object Model
        const shopPage = new ShopPage(page);
        const productName = 'Grey jacket';

        await test.step('1. Navigate and Search', async () => {
            await shopPage.goto();
            await shopPage.searchAndSelectProduct('shirt');
        });

        await test.step('2. Add to Cart and Verify', async () => {
            await shopPage.addItemToCart();
            await shopPage.verifyItemInCart(productName);
        });

        await test.step('3. Proceed to Checkout', async () => {
            await shopPage.proceedToCheckout();
            await shopPage.verifyCheckoutPageLoaded();
        });
    });

});