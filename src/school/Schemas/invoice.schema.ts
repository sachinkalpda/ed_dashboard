import {Prop, Schema , SchemaFactory} from "@nestjs/mongoose";



@Schema({ timestamps: true })

export class Invoice {
    

  }
  

  export const InvoiceSchema = SchemaFactory.createForClass(Invoice);