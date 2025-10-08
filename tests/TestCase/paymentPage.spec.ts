import { test, expect } from '@playwright/test';
import { PaymentPage } from '../Pages/paymentPage';
import { PassengersDetails } from '../Pages/passengersDetails';

let payment: PaymentPage;
let passenger: PassengersDetails;

test.only('login for booking train ticket', async ({ page }) => {
    payment = new PaymentPage(page);
    passenger = new PassengersDetails(page);
    await page.pause();

    await passenger.navigate();
    await passenger.otherDetailsAndPay();
});