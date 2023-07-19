import {Prop, Schema , SchemaFactory} from "@nestjs/mongoose";
import {now, Date } from "mongoose";



@Schema({ timestamps: true })

export class School {
    @Prop()
    edviron_id: number;
  
    @Prop()
    student_count: number;
  
    @Prop({type : Object})
    address: object;

    @Prop({type : Object})
    bank_details : object

    // @Prop({default: now()})
    // date_of_establishment : Date

    @Prop()
    email_id : String

    @Prop({type : Object})
    legal_details : Object

    @Prop()
    logo_url : String

    @Prop()
    name : String

    @Prop()
    phone_number : String

    @Prop()
    school_type : String

    @Prop()
    fee_collection_date : number

    @Prop()
    late_fee : number

    @Prop()
    late_fee_grace_period : number

    // @Prop({default: now()})
    // updatedAt : Date

    @Prop()
    convenience_fee : number

  }
  

  export const SchoolSchema = SchemaFactory.createForClass(School);