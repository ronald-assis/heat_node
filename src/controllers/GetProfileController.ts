import { Request, Response } from "express";
import { GetProfileUserService } from "../services/GetProfileUserService";

export class GetProfileUserControllers {
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req
  
      const service = new  GetProfileUserService();
      const result = await service.execute(user_id);

      return res.status(200).json(result)
    } catch (err) {
      return res.status(404).json({message: err.message})
    }
  }
}