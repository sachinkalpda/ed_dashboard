import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School } from './Schemas/school.schema';
import * as mongoose from 'mongoose';
import { Transaction } from './Schemas/Transaction.schema';
import { Student } from './Schemas/student.schema';
import { Section } from './Schemas/section.schema';
import { Invoice } from './Schemas/invoice.schema';
@Injectable()
export class SchoolService {
    constructor(
        @InjectModel(School.name)
        private schoolModel: mongoose.Model<School>,
        @InjectModel(Transaction.name)
        private transactionModel: mongoose.Model<Transaction>,
        @InjectModel(Student.name)
        private studentModel: mongoose.Model<Student>,
        @InjectModel(Section.name)
        private sectionModel: mongoose.Model<Section>,
        @InjectModel(Invoice.name)
        private invoiceModel: mongoose.Model<Invoice>
    ) { }
    // method for finding school information
    async findSchoolInfo() {
        // getting school by id
        const school = await this.schoolModel.findById('63ff2138742d8bdfbc91d5c9');

        // getting total amount of collection
        const total_amount = await this.transactionModel.aggregate([
            {
                $match: {
                    school: school._id,
                    status: 'SUCCESS'
                }
            },
            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: { $toInt: "$amount" }
                    }
                }
            }
        ]);
        return {
            success: true,
            total_amount: total_amount[0],
            school,
        };
    }


    async getDetails() {
        const current = new Date();
        const year = current.getFullYear();
        const month = current.getMonth();
        let start = new Date(`${year}-${month}-01`);
        let end = new Date(`${year}-${month}-31`);
        // getting school info
        const school = await this.schoolModel.findById('63ff2138742d8bdfbc91d5c9');
        // getting students of given schools
        const students = await this.studentModel.find({ school_id: school._id });
        // getting sections of given school
        const sections = await this.sectionModel.find({ school_id: school._id });
        // getting monthly collection of school
        const monthly_collection = await this.transactionModel.aggregate([
            {
                $match: {
                    school: school._id,
                    status: 'SUCCESS',
                    createdAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: null,
                    amount: { $sum: { $toInt: "$amount" } },
                }
            }
        ]);

        // calculating fine of school
        const fines = await this.invoiceModel.aggregate([
            {
                $match: {
                    school: school._id
                }
            },
            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: '$fine_amount'
                    }
                }
            }
        ]);

        return {
            success: true,
            students_count: students.length,
            sections_count: sections.length,
            fine_amount: fines[0].amount,
            monthly_collection: monthly_collection[0].amount,
        }
    }


    async getYearlyCollection() {
        const current = new Date();
        const year = current.getFullYear();
        let start = new Date(`${year}-01-01`);
        let end = new Date(`${year}-12-31`);

        // getting school information
        const school = await this.schoolModel.findById('63ff2138742d8bdfbc91d5c9');
        // getting monthwise collection of school
        const monthwise_collection = await this.transactionModel.aggregate([
            {
                $match: {
                    school: school._id,
                    status: 'SUCCESS',
                    createdAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                    },
                    amount: { $sum: { $toInt: "$amount" } },
                }
            }
        ]);
        let result = new Map();
        let total = 0;

        monthwise_collection.forEach(element => {
            result.set(element._id.month, element.amount);
            total += element.amount;
        });
        //initial months array with percentage of collection 
        let monthwise_percentage = [
            {
                id: 1,
                name: 'Jan',
                height: 0,
            },
            {
                id: 2,
                name: 'Feb',
                height: 0,
            },
            {
                id: 3,
                name: 'Mar',
                height: 0,
            },
            {
                id: 4,
                name: 'Apr',
                height: 0,
            },
            {
                id: 5,
                name: 'May',
                height: 0,
            },
            {
                id: 6,
                name: 'Jun',
                height: 0,
            },
            {
                id: 7,
                name: 'Jul',
                height: 0,
            },
            {
                id: 8,
                name: 'Aug',
                height: 0,
            },
            {
                id: 9,
                name: 'Sep',
                height: 0,
            },
            {
                id: 10,
                name: 'Oct',
                height: 0,
            },
            {
                id: 11,
                name: 'Nov',
                height: 0,
            },
            {
                id: 12,
                name: 'Dec',
                height:0,
            }
        ]
        // calculating percentage for monthwise collection
        monthwise_percentage.forEach(element => {
            if(result.has(element.id)){
                let value = result.get(element.id);
                let percentage = (value*100)/total;
                element.height = Math.round(percentage);
            }
        });
        
        
        return monthwise_percentage; 
    }
}
