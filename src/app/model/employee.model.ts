import {Entity} from './entity.model';

export class Employee extends Entity {
  names: String;
  lastNames: String;
  documentType: String;
  document: String;
  phone: String;
  emailCompany: String;
}
