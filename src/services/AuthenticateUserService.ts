import axios from 'axios';

type IAccessTokenResponse = {
  access_token: string;
}

type IUserResponse = {
  id: number;
  login: string;
  name: string;
  avata_url: string;
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
    
    return response.data;
  };
};
