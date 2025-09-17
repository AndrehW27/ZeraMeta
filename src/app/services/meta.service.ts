import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  listarMetasPorUsuario(_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${_id}`);
  }

  criarMeta(meta: { titulo: string}): Observable<any> {
    return this.http.post<any>(this.apiUrl, meta);
  }

  editarMeta(meta: any): Observable<any> {
    // console.log('Editar Meta chamada com:', meta._id);
    
    return this.http.put<any>(`${this.apiUrl}/${meta._id}`, meta);
  }

  deletarMeta(meta: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${meta._id}`, meta);
  }
}

