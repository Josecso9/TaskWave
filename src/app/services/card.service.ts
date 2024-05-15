import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private baseUrl = 'http://localhost:3000/api/cards';

  constructor(private http: HttpClient) {}

  // Método para leer una card.
  getCardsByUser(): Observable<Card[]> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Card[]>(this.baseUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear una card.
  createCard(card: Card): Observable<Card> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Card>(this.baseUrl, card, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar una card.
  updateCard(card: Card): Observable<Card> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Card>(`${this.baseUrl}/${card._id}`, card, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar una card.
  deleteCard(cardId: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/${cardId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método privado para manejar errores HTTP.
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something bad happened; please try again later.');
  }
}