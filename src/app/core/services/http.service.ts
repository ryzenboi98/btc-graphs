import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly _httpClient: HttpClient) {}

  public fetchByParams<T>(
    routeURL: string,
    httpParams: HttpParams
  ): Observable<T> {
    return this._httpClient.get<T>(`${environment.apiURL}/${routeURL}`, {
      params: httpParams,
    });
  }
}
