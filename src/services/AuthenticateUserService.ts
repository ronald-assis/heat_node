import axios from 'axios';
import { prismaClient } from '../dataBase';
import { sign } from 'jsonwebtoken';

type IAccessTokenResponse = {
  access_token: string;
}

type IUserResponse = {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

export class AuthenticateUserService {
  async execute(code: string) {
    const URL = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(URL, null, { // Toda informação que é retornada, é inserida dentro do data.
      params:{
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    })
     
    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    const {id, name, login, avatar_url} = response.data;
    
    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          name,
          github_id: id,
          avatar_url,
          login,
        }
      });
    };

    const token = sign({
      user: {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
      },
    },
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: "1d",
    }
    )

    return {token, user};
  };
};
