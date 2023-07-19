import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolSchema } from './Schemas/school.schema';
import { TransactionSchema } from './Schemas/Transaction.schema';
import { SectionSchema } from './Schemas/section.schema';
import { StudentSchema } from './Schemas/student.schema';
import { InvoiceSchema } from './Schemas/invoice.schema';

@Module({
  imports : [MongooseModule.forFeature([
    {name : 'School',schema : SchoolSchema},
    {name : 'Transaction',schema : TransactionSchema},
    {name : 'Section',schema : SectionSchema},
    {name : 'Student',schema : StudentSchema},
    {name : 'Invoice',schema : InvoiceSchema},
  ])],
  controllers: [SchoolController],
  providers: [SchoolService]
})
export class SchoolModule {}
