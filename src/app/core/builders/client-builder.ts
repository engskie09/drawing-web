import { Client } from '../models/client';

export class ClientBuilder {
  private _id: string;
  private _name: string;
  private _address: string;
  private _city: string;
  private _country: string;
  private _zipCode: string;
  private _refFormat: string;

  constructor(
    id: string,
    name: string,
  ) {
    this._id = id;
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  setId(id: string): ClientBuilder {
    this._id = id;

    return this;
  }

  get name(): string {
    return this._name;
  }

  setName(name: string): ClientBuilder {
    this._name = name;

    return this;
  }

  get address(): string {
    return this._address;
  }

  setAddress(address: string): ClientBuilder {
    this._address = address;

    return this;
  }

  get refFormat(): string {
    return this._refFormat;
  }

  setRefFormat(format: string): ClientBuilder {
    this._refFormat = format;

    return this;
  }

  get city(): string {
    return this._city;
  }

  setCity(city: string): ClientBuilder {
    this._city = city;

    return this;
  }

  get country(): string {
    return this._country;
  }

  setCountry(country: string): ClientBuilder {
    this._country = country;

    return this;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  setZipCode(zipCode: string): ClientBuilder {
    this._zipCode = zipCode;

    return this;
  }

  build(): Client {
    return new Client(this);
  }
}