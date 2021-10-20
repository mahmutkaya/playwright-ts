import { test, firefox, expect } from '@playwright/test';

test('dialog test', async ({page}) => {
    // const browser = await firefox.launch({ headless: false, slowMo: 1000 });
    // const page = await browser.newPage();

    await page.goto('https://www.t-mobile.nl/login');

    const cookiesAcceptBtn = await page.$("//label[contains(text(), 'Ja')]");
    if (cookiesAcceptBtn!=null) {
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await cookiesAcceptBtn.click();
    }

    const userName: string = '123456789';
    const password: string = '12345';

    await page.fill('[data-interaction-id=login-username]', userName);
    await page.fill('[data-interaction-id=login-password]', password);
    await page.click('[type=submit]');


    const bundleStatusEl = await page.waitForSelector("//div[@class='bundle-status-unit-value text-error']");
    await bundleStatusEl.scrollIntoViewIfNeeded();
    const bundleStatusTxt: string = await bundleStatusEl.innerText();
    
    expect(bundleStatusTxt).toBe('7000')

    if (parseInt(bundleStatusTxt) < 200) {
        await page.click("//a[@href='/my/aanvullers?nav=dashboard']");
        await page.click("//button[@data-interaction-id='aanvullers_pricebundle']");
    }
    await browser.close();
});
