import { test } from '@playwright/test';
import { SearchPage } from '../Pages/searchPage';
import { TrainSelection } from '../Pages/trainSelectionPage';
import { PassengersDetails } from '../Pages/passengersDetails';
import { PaymentPage } from '../Pages/paymentPage';

let searchPage: SearchPage;
let selectedTrain: TrainSelection;
let passenger: PassengersDetails;
let payment: PaymentPage;

test('Start to End process', async ({ page }) => {
    searchPage = new SearchPage(page);
    selectedTrain = new TrainSelection(page, 2);
    passenger = new PassengersDetails(page);
    payment = new PaymentPage(page);
    await searchPage.navigate();
    await searchPage.fillJourneyDetails("Pune Jn (PUNE)", "New Delhi (NDLS)", 'tomorrow');
    await searchPage.clickSearch();
    await selectedTrain.selectTrainDetails();
    await passenger.selectMemberFromList("Pradhuman kumar");
    await passenger.otherDetailsAndPay();
    await payment.chooseAndVerifyPaymentDetails("kumarpriyevart@ptaxis");
    console.log("Ticket booked successfully");
    await page.pause();
});