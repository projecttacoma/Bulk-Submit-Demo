export interface DRQuery {
  endpoint: string;
  params: DRParameter;
}

export interface DRParameter {
  [key: string]: string;
}

export interface APIParams {
  _type: string;
  _typeFilter?: string;
}
