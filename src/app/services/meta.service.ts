import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private apiUrl = 'http://localhost:3000/meta';

  constructor(private http: HttpClient) {}

  getMetas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  listarMetasPorUsuario(_id: string, token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/${_id}`, { headers });
  }

  criarMeta(meta: { titulo: string}, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, meta, { headers });
  }

  editarMeta(meta: any, token: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/${meta._id}`, meta, { headers });
  }

  deletarMeta(meta: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${meta._id}`, { headers });
  }
}

