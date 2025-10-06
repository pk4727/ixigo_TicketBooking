import { test } from '@playwright/test';
import { TrainSelection } from '../Pages/trainSelectionPage';

test('Select train', async ({ page }) => {
    let selectedTrain = new TrainSelection(page);
    await selectedTrain.navigate();
    await selectedTrain.selectTrainDetails();
});