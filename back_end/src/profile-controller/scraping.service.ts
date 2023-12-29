import { Injectable, HttpException } from '@nestjs/common';
import { Builder, By, until, WebDriver, Capabilities } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

@Injectable()
export class ScrapingService {
  private driver: WebDriver;

  async scrapeProfileData(profileUrl: string): Promise<any> {
    try {
      const options = new ChromeOptions();  // Ensure correct import
      options.addArguments(`--user-data-dir=${process.env.HOME}/.chrome-profile`);
     options.addArguments('--remote-debugging-port=9222');

      const capabilities = Capabilities.chrome(); 
      capabilities.set('goog:loggingPrefs', { browser: 'ALL' });


      this.driver = await new Builder() 
        .forBrowser('EDGE')
        .setEdgeOptions(options)
        .withCapabilities(capabilities) // Apply capabilities
        .build();
      // Navigate to the profile URL 
      await this.driver.get(profileUrl);

      // Wait for the name element to be present
      await this.driver.wait(until.elementLocated(By.css('h1.pv-top-card-section__name')), 10000);
      const nameElement = await this.driver.findElement(By.css('h1.pv-top-card-section__name'));
      const name = await nameElement.getText();
      console.log(name);

      // Wait for the headline element to be present
      await this.driver.wait(until.elementLocated(By.css('h2.pv-top-card-section__headline')), 10000);
      const headlineElement = await this.driver.findElement(By.css('h2.pv-top-card-section__headline'));
      const headline = await headlineElement.getText();

      // Retrieve the image source URL
      const imageElement = await this.driver.findElement(By.css('img.pv-top-card-section__photo'));
      const imageSrc = await imageElement.getAttribute('src');

      return {
        name,
        headline,
        imageSrc
      };
      // Rest of your code...
    } catch (error) {
      throw new HttpException('Error occurred while scraping profile data:', error);
    } finally {
      // Check if the driver is defined before quitting
      if (this.driver) {
        try {
          await this.driver.quit();
        } catch (quitError) {
          console.error('Error quitting WebDriver:', quitError);
        } finally {
          // Set the driver to undefined after quitting
          this.driver = undefined;
        }
      }
    }
  }
}
