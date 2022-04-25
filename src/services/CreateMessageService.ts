import { prismaClient } from "../dataBase";


export class CreatedMessageService {
  async execute(text: string, user_id: string) {
    
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
            login: true,
          }
        },
      },
    });

    return message;
  }
}