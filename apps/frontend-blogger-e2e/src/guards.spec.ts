import { test, expect } from '@playwright/test';
import { backendUrl } from '../playwright.config';
import { MOCK_POST } from './mocks/post.mock';

test('Routing guards to details', async ({ page }) => {
    await page.route(`${backendUrl}/posts`, async (route) => {
        const response = await route.fetch();
        const json = await response.json()

        json.push(MOCK_POST);

        await route.fulfill({ response, json });
    });
    
    await page.goto('/list');
    expect(await page.locator('.button-primary').last().innerText()).toContain('Read More');
    await page.locator('.button-primary').last().click();

    await page.waitForURL(`**/details/${MOCK_POST.id}`);
    expect(await page.locator('.hero-link').innerText()).toContain(' Return To The Blog List');
    await page.locator('.hero-link').click();
    await page.waitForURL(`**/list`);

    await page.goto('/details');
    await page.waitForURL(`**/list`);
});

test('Routing guards to profile page', async ({ page }) => {
    const email = 'phil@teasdale.com';

    await page.goto('/login');
    expect(await page.locator('.login-heading').innerText()).toContain('Log In');
    expect(await page.locator('.button-inline').innerText()).toContain('Sign up');

    await page.goto('/profile');
    await page.waitForURL(`**/login`);

    await page.getByLabel('Email Address').fill(email);
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button').click();
    await page.waitForURL(`**/profile`);
    expect(await page.getByText(`Email: ${email}`)).toBeDefined();
});

test('Routing to wildcard locations', async ({ page }) => {
    await page.goto('/login');
    expect(await page.locator('.login-heading').innerText()).toContain('Log In');
    expect(await page.locator('.button-inline').innerText()).toContain('Sign up');

    await page.goto('/aaaaaaaaaaaaa');
    await page.waitForURL(`**/list`);

    expect(await page.locator('.hero-title').innerText()).toContain('Welcome To My Blog!');
    expect(await page.locator('.list-heading').innerText()).toContain('Latest Posts');
});