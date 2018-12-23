import {Entity} from './entity.model';

export class ClientCompany extends Entity {
  name: string;
  nit: string;
  administrator: string;
  address: string;
  phone: string;
  urlLogo: string;
  urlSignature: string;
  root: string;
  companyId: number;
  bucketName: string;
  SDMCompanyId: string;
  isTaxiCompany: string;
  ownNetwork: string;
  synergy: string;
  numcvn: number;
}
