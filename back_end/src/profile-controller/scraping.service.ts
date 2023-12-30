import { Injectable, HttpException } from '@nestjs/common';
import { Builder, By, until, WebDriver, Capabilities } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

@Injectable()
export class ScrapingService {
  private driver: WebDriver;

async  scrapeLinkedInProfile(profileUrl: string) {
  const options = new chrome.Options();
  options.headless();
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to LinkedIn profile
    await driver.get(profileUrl);

    // Wait for the name element to load
    await driver.wait(until.elementLocated(By.css('.pv-top-card-section__name')), 10000);
    
    // Extract the name
    const nameElement = await driver.findElement(By.css('.pv-top-card-section__name'));
    const name = await nameElement.getText();

    return name;

  

  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}



}
