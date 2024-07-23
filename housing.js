const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    console.log('Navigating to URL...');
    await page.goto('https://bomayangu.go.ke/projects', { waitUntil: 'networkidle2' });
    
    console.log('Waiting for elements to load...');
    await page.waitForSelector('.flex-1', { timeout: 60000 });

    console.log('Extracting data...');
    const data = await page.evaluate(() => {
      const elements = document.querySelectorAll('.flex-1');
      console.log('Found elements:', elements.length);

      const results = Array.from(elements).map(element => {
        const priceElement = element.querySelector('.text-xl.leading-10.font-semibold.text-gray-900');
        const countyElement = element.querySelector('.mt-3.text-base.text-gray-500.flex.capitalize');
        
        const price = priceElement ? priceElement.textContent.trim() : 'N/A';
        const county = countyElement ? countyElement.textContent.trim() : 'N/A';

        console.log('Extracted:', { price, county });
        return { price, county };
      });

      return results;
    });

    console.log('Data extracted:', data);

    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const jsonFilePath = path.join(outputDir, 'housing_data.json');
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${jsonFilePath}`);

    await browser.close();
    console.log('Browser closed.');
  } catch (error) {
    console.error('Puppeteer error:', error);
  }
})();
