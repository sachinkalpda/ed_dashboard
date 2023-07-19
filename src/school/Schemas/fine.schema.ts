import {Prop, Schema , SchemaFactory} from "@nestjs/mongoose";



@Schema({ timestamps: true })

export class Fine {
    

  }
  

  export const FineSchema = SchemaFactory.createForClass(Fine);