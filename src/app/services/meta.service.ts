import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private apiUrl = 'http://localhost:3000/api/metas';

  constructor(private http: HttpClient) {}

  getMetas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  criarMeta(meta: { titulo: string}): Observable<any> {
    return this.http.post<any>(this.apiUrl, meta);
  }

  editarMeta(meta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${meta.id}`, meta);
  }

  deletarMeta(meta: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${meta.id}`, meta);
  }
}

