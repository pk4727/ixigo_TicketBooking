import { test } from '@playwright/test';
import { loginPage } from '../Pages/loginPage';
import { SearchPage } from '../Pages/searchPage';
import { TrainSelection } from '../Pages/trainSelectionPage';
import { PassengersDetails } from '../Pages/passengersDetails';
import { PaymentPage } from '../Pages/paymentPage';

let login: loginPage;
let searchPage: SearchPage;
let selectedTrain: TrainSelection;
let passenger: PassengersDetails;
let payment: PaymentPage;

test.skip('for Saving login for booking train ticket', async ({ page }) => {
    login = new loginPage(page);
    await login.navigate();
    await login.fillLoginDetails("8409584727", 'auth.json');
});

test.skip('Search train between two cities', async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.navigate();
    await searchPage.fillJourneyDetails("Patna", "Ranchi");
    await searchPage.clickSearch();

    selectedTrain = new TrainSelection(page);
    await selectedTrain.navigate();
    await selectedTrain.selectTrainDetails();

    passenger = new PassengersDetails(page);
    await passenger.navigate();
    await passenger.selectMemberFromList("Pradhuman kumar");
    await passenger.addNewMemberDetails("Gaurav shrma", "24", "Female");
    await passenger.editMemberDetails("Gaurav shrma", "Gaurav sharma", "24", "Male");
    await passenger.deleteMemberDetails("Gaurav sharma");
    await passenger.otherDetailsAndPay();

    payment = new PaymentPage(page);
    await payment.chooseAndVerifyPaymentDetails("kumarpriyevart@ptaxis");
    await page.pause();
});