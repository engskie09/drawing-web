import { Injectable } from '@angular/core';
import { ClientBuilder } from '../builders/client-builder';
import { Client } from '../models/client';

// TODO: Add Project Relationship.
@Injectable()
export class ClientAdapter {
  adapt(request): Client  {
    const {
      id,
      client_name: name,
      city,
      address,
      country,
      zip_code,
      ref_format,
    } = request;
    
    const client = new ClientBuilder(id, name)
      .setAddress(address)
      .setRefFormat(ref_format)
      .setCity(city)
      .setCountry(country)
      .setZipCode(zip_code)
      .build();

    return client;
  }
}