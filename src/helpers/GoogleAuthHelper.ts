import { HttpException } from '@nestjs/common';
import { log } from 'console';
import { GoogleHelperResDTO } from 'src/dto/res/GoogleHelperResDTO';
export async function GoogleAuthHelper(
  token: string,
): Promise<GoogleHelperResDTO> {
  log('reached google auth helper');
  try {
    let response = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    log('Response from google', response);
    if (response.status == 200) {
      let data = await response.json();
      log(data, 'data');
      console.log(data, 'data');
      if (data.email) {
        // return [data.email, data.picture, data.name, true];
        return new GoogleHelperResDTO(
          data.email,
          data.picture,
          data.name,
          true,
        );
      }
    }
  } catch (e) {
    log(e);
    throw new HttpException('failed to fetch google user', 500);
  }
  return new GoogleHelperResDTO('', '', '', false);
}
