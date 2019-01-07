import {Entity} from './entity.model';

export class Vale extends Entity {

  public idConvenio: number;

  public idEmpresaCliente: number;

  public empresa: string;

  public idEmpleadoSolicitante: number;

  public idEmpleadoBeneficiario: number;

  public esTercero: string;

  public tipoVale: string;

  public numeroDocumento: string;

  public nombrePasajero: string;

  public estado: string;

  public cedula: string;

  public conductor: string;

  public fechaHora: string;
}
