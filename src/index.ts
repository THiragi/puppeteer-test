import puppeteer from "puppeteer-core";

const LAUNCH_OPTION = {
  // headless: false,
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  slowMo: 500,
  args: [
    "--guest",
    "--window-size=1280,800",
    "--start-fullscreen",
    "--disable-infobars",
    "--incognito",
  ],
};

(async () => {
  const browser = await puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();
  await page.goto("https://takahira.io");
  const dimensions = await page.evaluate(() => {
    return {
      title: (<HTMLMetaElement>(
        document.head.querySelector('meta[property="og:title"]')
      ))?.content,
    };
  });
  console.log(dimensions);

  await browser.close();
})();
