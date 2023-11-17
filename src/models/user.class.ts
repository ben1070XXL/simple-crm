export class User {
  firstname: string;
  lastname: string;
  birthdate: number;
  street: string;
  zipCode: number;
  city: string;

  constructor(obj?: any) {
    this.firstname = obj ? obj.firstname : '';
    this.lastname = obj ? obj.lastname : '';
    this.birthdate = obj ? obj.birthdate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
  }
}
