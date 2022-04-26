import { prismaClient } from "../dataBase";


export class GetProfileUserService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

   return user;
  }
}