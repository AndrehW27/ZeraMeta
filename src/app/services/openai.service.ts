import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GoalAiService {
  private apiUrl = `${environment.apiUrl}/openai/suggest`;

  constructor(private http: HttpClient) {}

  getSuggestions(userInput: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { userInput });
  }
}
