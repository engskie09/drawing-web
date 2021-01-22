import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ){}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
  }

  post(path: string, body: Object = {}): Observable<any> {
    const formData = this.createFormData(body);

    return this.http.post(
      `${environment.api_url}${path}`,
      formData,
    )
  }

  put(path: string, body: Object = {}): Observable<any> {
    const formData = new FormData()

    Object.keys(body).forEach((value, key) => {
      formData.append(value, body[value])
    })
    
    return this.http.put(
      `${environment.api_url}${path}`,
      formData,
    )
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`)
  }

  createFormData(object: Object, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();

    for (let property in object) {
      if (!object.hasOwnProperty(property) && object[property] == null && object[property] === undefined) {
        continue;
      }
      const formKey = namespace ? `${namespace}[${property}]` : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (typeof object[property] === 'object' && !(object[property] instanceof File) && !(object[property] instanceof Blob)) {
        this.createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }
}