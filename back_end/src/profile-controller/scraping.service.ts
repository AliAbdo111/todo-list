import { Injectable, HttpException } from '@nestjs/common';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';

@Injectable()
export class ScrapingService {
  private driver: WebDriver;

  constructor() {
    // this.driver = new Builder().forBrowser('chrome').build();
  }  
 
  async scrapeProfileData(profileUrl: string): Promise<any> {
    try {
      await this.driver.get(profileUrl);
   
      // Wait for the name element to be present
      await this.driver.wait(until.elementLocated(By.css('h1.pv-top-card-section__name')), 5000);
      const nameElement = await this.driver.findElement(By.css('h1.pv-top-card-section__name'));
      const name = await nameElement.getText(); 
  console.log(name) 
      // Wait for the headline element to be present
      await this.driver.wait(until.elementLocated(By.css('h2.pv-top-card-section__headline')), 5000);
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

    } catch (error) {
      throw new HttpException('Error occurred while scraping profile data:', error);
    } finally {
      await this.driver.quit();
    }
  }
}
  