import { test, expect } from '@playwright/test';
import { PassengersDetails } from '../Pages/passengersDetails';

test.skip('Fill passengers Details', async ({ page }) => {
    const contact = new PassengersDetails(page);
    await contact.navigate();

    await contact.selectMemberFromList("Pradhuman kumar");
    await contact.addNewMemberDetails("Gaurav shrma", "24", "Female");
    await contact.editMemberDetails("Gaurav shrma", "Gaurav sharma", "24", "Male");
    await contact.deleteMemberDetails("Gaurav sharma");
    await contact.otherDetailsAndPay();
});