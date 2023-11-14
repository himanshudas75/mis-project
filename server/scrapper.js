const puppeteer = require('puppeteer');

const url = 'https://www.joshwcomeau.com/';
const scrapper=async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.screenshot({
        path: 'screenshot.jpg',
      });
    await browser.close();
} 
scrapper();