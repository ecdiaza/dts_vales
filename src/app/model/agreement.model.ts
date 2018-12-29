import {Entity} from './entity.model';

export class Agreement extends Entity {
  taxiCompanyId: number;
  clientCompanyId: number;
  startDate: string;
  finalDate: string;
  monthlyAmount: number;
  isEspecial: string;
  isSurcharge: string;
}
