import {Prop, Schema , SchemaFactory} from "@nestjs/mongoose";



@Schema({ timestamps: true })

export class Student {
    

  }
  

  export const StudentSchema = SchemaFactory.createForClass(Student);