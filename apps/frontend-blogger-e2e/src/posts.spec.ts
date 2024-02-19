import { test, expect } from '@playwright/test';
import { MOCK_POST } from './mocks/post.mock';
import { backendUrl } from 'apps/frontend-blogger-e2e/playwright.config';

test('List page with Blog posts', async ({ page }) => {
    await page.route(`${backendUrl}/posts`, async (route) => {
        const response = await route.fetch();
        const json = await response.json()

        json.push(MOCK_POST);

        await route.fulfill({ response, json });
    });

    await page.goto('/list');

    expect(await page.locator('.hero-title').innerText()).toContain('Welcome To My Blog!');
    expect(await page.locator('.list-heading').innerText()).toContain('Latest Posts');
    expect(await page.locator('.list-subheading').innerText()).toContain('Dive into our latest blog posts and tell us what you think...');

 
    expect(await page.locator('.post-title').last().innerText()).toContain(MOCK_POST.title);
    expect(await page.locator('.button-primary').last().innerText()).toContain('Read More');
});

test('List page with Blog posts and navigating to details page', async({ page }) => {
    await page.route(`${backendUrl}/posts`, async (route) => {
        const response = await route.fetch();
        const json = await response.json()

        json.push(MOCK_POST);

        await route.fulfill({ response, json });
    });

    await page.goto('/list');

    expect(await page.locator('.post-title').last().innerText()).toContain(MOCK_POST.title);
    expect(await page.locator('.button-primary').last().innerText()).toContain('Read More');
    await page.locator('.button-primary').last().click();

    await page.waitForURL(`**/details/${MOCK_POST.id}`);
    expect(await page.locator('.hero-link').innerText()).toContain(' Return To The Blog List');
});