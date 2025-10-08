import { test, expect } from '@playwright/test';
import { loginPage } from '../Pages/loginPage';

test.skip('login for booking train ticket', async ({ page }) => {
    const login = new loginPage(page);
    await login.navigate();
    await login.fillLoginDetails("8409584727", 'auth.json');
});