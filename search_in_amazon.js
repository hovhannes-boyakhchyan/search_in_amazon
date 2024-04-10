const puppeteer = require('puppeteer');

async function scrapeProduct(searchQuery) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to Amazon's website
  await page.goto('https://www.amazon.com');

  // Enter the search query into Amazon's search bar (Note: the selector might change)
  await page.type('#twotabsearchtextbox', searchQuery);

  // Click the search button (Note: the selector might change)
  await page.click('input.nav-input[type="submit"]');

  // Wait for the results page to load and display the results
   await page.waitForSelector('.s-main-slot');

  // Scrape the first product title and URL (adjust the selector as needed)
  const product = await page.evaluate(() => {
    const productElement = document.querySelector('.s-result-item .a-link-normal.a-text-normal');
    if (!productElement) return null;

    const title = productElement.textContent || null;
    const url = productElement.href || null;

    return { title, url };
  });

  console.log('------------product------------', product);

  await browser.close();
}

// Usage
scrapeProduct('SQL for Beginners');
