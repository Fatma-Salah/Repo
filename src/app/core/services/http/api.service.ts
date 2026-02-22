import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.baseUrl;

  // --- Helpers ---
  private buildParams(params?: Record<string, any>): HttpParams {
    return params
      ? new HttpParams({
          fromObject: Object.fromEntries(
            Object.entries(params).filter(
              ([, value]) =>
                value !== undefined && value !== null && value !== ''
            )
          ),
        })
      : new HttpParams();
  }

  private buildHeaders(headers?: Record<string, string>): HttpHeaders {
    return headers ? new HttpHeaders(headers) : new HttpHeaders();
  }

  // --- Generic Request Method ---
  private request<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    body?: any,
    options?: {
      params?: Record<string, any>;
      headers?: Record<string, string>;
    }
  ): Observable<any> {
    const requestOptions: any = {
      params: this.buildParams(options?.params),
      headers: this.buildHeaders(options?.headers),
    };

    if (body !== undefined && body !== null) {
      requestOptions.body = body;
    }

    return this.http.request<T>(method, this.baseUrl + url, requestOptions);
  }

  Get<T>(
    url: string,
    options?: { params?: Record<string, any>; headers?: Record<string, string> }
  ) {
    return this.request<T>('get', url, undefined, options);
  }
  GetById<T>(
    url: string,
    id: number | string,
    options?: { params?: Record<string, any>; headers?: Record<string, string> }
  ) {
    return this.request<T>('get', `${url}/${id}`, undefined, options);
  }

  // Post<T>(
  //   url: string,
  //   body: any,
  //   options?: { params?: Record<string, any>; headers?: Record<string, string> }
  // ) {
  //   return this.request<T>('post', url, body, options);
  // }

  Put<T>(
    url: string,
    body: any,
    options?: { params?: Record<string, any>; headers?: Record<string, string> }
  ) {
    return this.request<T>('put', url, body, options);
  }

  Patch<T>(
    url: string,
    body: any,
    options?: { params?: Record<string, any>; headers?: Record<string, string> }
  ) {
    return this.request<T>('patch', url, body, options);
  }

  Delete<T>(
    url: string,
    body?: any,
    options?: { params?: Record<string, any>; headers?: Record<string, string> }
  ) {
    return this.request<T>('delete', url, body, options);
  }
 Post<T>(
  url: string,
  body: any,
  options?: { params?: Record<string, any>; headers?: Record<string, string> }
,sendFormdata:boolean=true) {
  const formData =sendFormdata==true? this.toFormData(body):body;
  return this.request<T>('post', url, formData, options);
}
private toFormData(data: any, form: FormData = new FormData(), parentKey: string | null = null): FormData {

  if (data === null || data === undefined) {
    return form;
  }

  if (data instanceof File) {
    //  Handle File directly
    form.append(parentKey ?? "file", data);
  }
  else if (Array.isArray(data)) {
    //  Handle Arrays
    data.forEach((item, index) => {
      const key = parentKey ? `${parentKey}[${index}]` : String(index);
      this.toFormData(item, form, key);
    });
  }
  else if (typeof data === "object") {
    //  Handle Objects (recursive)
    Object.keys(data).forEach(key => {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;
      this.toFormData(data[key], form, fullKey);
    });
  }
  else {
    //  Handle Primitives (string, number, boolean)
    if (parentKey) {
      form.append(parentKey, String(data));
    }
  }

  return form;
}


}
