const selenium = require('selenium-webdriver');


describe('My Selenium Tests', function () {

    let driver;

    beforeAll(async function () {
        driver = await new selenium.Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('http://localhost:3000/');
    });

    afterAll(async function () {
        await driver.quit();
    })

    test(' should verify h1 text', async function () {
        const h1Element = await driver.findElement(selenium.By.css('h1'));
        const actualText = await h1Element.getText();
        const expectedText = 'Things I should stop procrastinating:';

        expect(actualText).toBe(expectedText);
    })

    test('Add Item to List', async () => {
        const inputElement = await driver.findElement(selenium.By.css('[placeholder="Type an item here"]'));

        for (const char of 'Eat more ice cream') {
            await inputElement.sendKeys(char);
            await new Promise(resolve => setTimeout(resolve, 200)); // Add a delay of 50 milliseconds
        }

        await inputElement.sendKeys(selenium.Key.RETURN);
        
        const listItems = await driver.findElements(selenium.By.css('li'));
        const lastItemText = await listItems[listItems.length - 1].getText();

        expect(lastItemText).toBe('Eat more ice cream');
    });

    // Todo 
    // Test definition: This test checks that clicking the "Finished the list!" button
    // successfully deletes all elements from the list, ensuring the list is empty afterwards.
    test('Clicking on "Finished the list!" will delete all elements in the list', async () => {
        // Locate the "Finished the list!" button by its text content using XPath.
        // This assumes the button uniquely contains the text "Finished the list!".
        const finishTheListBtn = await driver.findElement(selenium.By.xpath("//button[normalize-space()='Finished the list!']"));

        // Click on the "Finished the list!" button to trigger the deletion of all list items.
        await finishTheListBtn.click();
        // Wait for 1 second to allow the application to process the click event and update the UI.
        // Note: It's generally better to use explicit waits to wait for a specific condition
        // rather than using sleep, as it makes the test more reliable and usually faster.
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find all list item elements (li) to check the current state of the list.
        // This locates all li elements, assuming each to-do item is rendered as a list item.
        const listOfItems = await driver.findElements(selenium.By.css("ul li"));
        
        // Assert that the length of the listItems is 0, meaning there are no items in the list,
        // which should be the case after clicking the "Finished the list!" button.
        expect(listOfItems.length).toBe(0);
    });

});