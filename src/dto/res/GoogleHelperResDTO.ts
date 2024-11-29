export class GoogleHelperResDTO {
  email: string;
  picture: string;
  name: string;
  valid: boolean;
  constructor(email: string, picture: string, name: string, valid: boolean) {
    this.email = email;
    this.picture = picture;
    this.name = name;
    this.valid = valid;
  }
}
