import { Request, Response } from "express";
import { CreatedMessageService } from "../services/CreateMessageService";


export class CreatedMessageController {
  async handle(req: Request, res: Response) {
    try {
      const {message} = req.body
      const { user_id } = req

      const service = new CreatedMessageService();
      const result = await service.execute(message, user_id)

      return res.json(result);    
    } catch (err) {
      return res.json({error: err.message})
    }
  } 
}