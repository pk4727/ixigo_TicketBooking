import { test, expect } from '@playwright/test';
import { PassengersDetails } from '../Pages/passengersDetails';

let passenger: PassengersDetails;

test.skip('Fill passengers Details', async ({ page }) => {
    passenger = new PassengersDetails(page);
    await passenger.navigate();

    await passenger.selectMemberFromList("Pradhuman kumar");
    await passenger.addNewMemberDetails("Gaurav shrma", "24", "Female");
    await passenger.editMemberDetails("Gaurav shrma", "Gaurav sharma", "24", "Male");
    await passenger.deleteMemberDetails("Gaurav sharma");
    await passenger.otherDetailsAndPay();
});