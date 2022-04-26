import { prismaClient } from "../dataBase";


export class GetLast3MessagesService {
  async execute() {
   const messages = await prismaClient.message.findFirst({
     take: 3,
     orderBy: {
       created_at: 'desc',
     },
     include: {
       user: {
         select: {
          name: true,
          avatar_url: true,
         },
       },
     },
   });

   return messages
  }
}