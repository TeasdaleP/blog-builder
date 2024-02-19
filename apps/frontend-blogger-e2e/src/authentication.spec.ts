import { test, expect } from '@playwright/test';

test('Auth Page navigation amd form validation', async({ page }) => {
    let person = {
        firstname: 'joe',
        lastname: 'bloggs',
        email: 'joe@bloggs.com',
        password: 'wordpass'
    }

    await page.goto('/login');

    expect(await page.locator('.hero-link').innerText()).toContain('Return To Homepage');
    expect(await page.locator('.login-heading').innerText()).toContain('Log In');
    expect(await page.locator('.button-inline').innerText()).toContain('Sign up');
    await page.locator('.button-inline').click();

    await page.waitForURL('**/signup');
    expect(await page.locator('.hero-link').innerText()).toContain('Return To Login');
    expect(await page.locator('.signup-heading').innerText()).toContain('Sign up');
    expect(await page.locator('.signup-content').innerText()).toContain("Join the blog so you can leave comments and like photos. If you upgrade, you'll be able to create your own posts too!");
    
    await page.getByLabel('First Name').fill('');
    expect(await page.getByText('Your name is required')).toBeDefined();
    await page.getByLabel('First Name').fill(person.firstname);

    await page.getByLabel('Last Name').fill('');
    expect(await page.getByText('Your name is required')).toBeDefined();
    await page.getByLabel('Last Name').fill(person.lastname);

    await page.getByLabel('Email Address').fill('');
    expect(await page.getByText('Your email is required')).toBeDefined();
    await page.getByLabel('Email Address').fill(person.email);

    await page.getByLabel('Password').fill('');
    expect(await page.getByText('Your password is required')).toBeDefined();
    await page.getByLabel('Password').fill(person.password);

    await page.locator('.hero-link').click();
    await page.waitForURL('**/login');
});

test('Auth Login form errors', async({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email Address').fill('phil');
    await page.getByLabel('Password').fill('password');

    await page.getByRole('button').click();
    expect(await page.locator('.form-error').innerText()).toContain('The email is invalid');
});

test('Auth Login happy path', async({ page }) => {
    const email = 'phil@teasdale.com';

    await page.goto('/login');

    await page.getByLabel('Email Address').fill(email);
    await page.getByLabel('Password').fill('password');

    await page.getByRole('button').click();
    await page.waitForURL(`**/profile`);

    expect(await page.locator('div').filter({ hasText: /^Phil Teasdale$/ })).toBeDefined();
    expect(await page.getByText(`Email: ${email}`)).toBeDefined()
});