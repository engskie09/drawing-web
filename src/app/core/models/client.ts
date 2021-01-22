import { ClientBuilder } from '../builders/client-builder';

export class Client {
  id: string;
  name: string;
  address: string;
  refFormat: string;
  city: string;
  country: string;
  zipCode: string;

  constructor(
    private clientBuilder: ClientBuilder
  ) {
    this.id = clientBuilder.id;
    this.name = clientBuilder.name;
    this.address = clientBuilder.address;
    this.refFormat = clientBuilder.refFormat;
    this.zipCode = clientBuilder.zipCode;
    this.country = clientBuilder.country;
    this.city = clientBuilder.city;
  }
}