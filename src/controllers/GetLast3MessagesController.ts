import { Request, Response } from "express";
import { GetLast3MessagesService } from "../services/GetLast3MessagesService";

export class GetLast3MessagesController {
  async handle(_req: Request, res:Response) {
    try {
      const service = new GetLast3MessagesService();
      const result = await service.execute();
  
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({error: err.message})
    }
  }
}