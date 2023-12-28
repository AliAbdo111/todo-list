import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScrapingService } from './scraping.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Get('/:profileUrl')
  async getProfileData(@Param('profileUrl') profileUrl: string): Promise<any> {
    const profileData = await this.scrapingService.scrapeProfileData(profileUrl);
    return profileData;
  }
}
