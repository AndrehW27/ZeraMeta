import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) {}

  buscarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsuarioComDados(_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${_id}`);
  }

  criarUsuario(usuario: { nome: string, email: string, senha: string}): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  editarUsuario(usuario: any, usuario_id: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${usuario_id}`, usuario);
  }

  deletarUsuario(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${_id}`);
  }

}

