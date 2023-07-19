import {Prop, Schema , SchemaFactory} from "@nestjs/mongoose";
import {now, Date } from "mongoose";



@Schema({ timestamps: true })

export class Transaction {
    

  }
  

  export const TransactionSchema = SchemaFactory.createForClass(Transaction);