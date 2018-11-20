import {Entity} from './entity.model';

export class User extends Entity {
  public document: string;
  public name: string;
  public phone: string;
  public email: string;
  public password: string;
  public companyId: number;
  public Permissions: number[];
  public cloudFolder: string;
}
