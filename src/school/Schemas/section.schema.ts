import {Prop, Schema , SchemaFactory} from "@nestjs/mongoose";



@Schema({ timestamps: true })

export class Section {
    

  }
  

  export const SectionSchema = SchemaFactory.createForClass(Section);