import { Controller,Get } from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
    constructor(private schoolservice : SchoolService){}

    @Get()
    // for getting school Information
    async getSchool(){
        return this.schoolservice.findSchoolInfo();
    }

    // get request for school financial info
    @Get('details')
    async schoolDetails(){
        return this.schoolservice.getDetails();
    }

    // get request for school monthwise collection
    @Get('monthly')
    async monthlyCollection(){
        return this.schoolservice.getYearlyCollection();
    }
}
