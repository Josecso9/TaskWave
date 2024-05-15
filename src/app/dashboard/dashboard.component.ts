import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Arrays para almacenar las tarjetas en diferentes estados.
  todoCards: Card[] = [];
  doingCards: Card[] = [];
  doneCards: Card[] = [];

  // Objeto para crear una nueva tarjeta.
  newCard: Card = { user: '', title: '', description: '', status: 'to-do' };

  // Objeto para mantener la tarjeta actualmente en edición.
  editingCard: Card | null = null;
  
  isLoading = false;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  // Carga todas las tarjetas del usuario y las clasifica según su estado.
  loadCards(): void {
    this.isLoading = true;
    this.cardService.getCardsByUser().subscribe(
      cards => {
        console.log('Cards loaded:', cards);
        this.todoCards = cards.filter(card => card.status === 'to-do');
        this.doingCards = cards.filter(card => card.status === 'doing');
        this.doneCards = cards.filter(card => card.status === 'done');
        this.isLoading = false;
      },
      error => {
        console.error('Error loading cards:', error);
        this.isLoading = false;
      }
    );
  }

  // Maneja la creación de una nueva tarjeta.
  onSubmit(): void {
    this.isLoading = true;
    this.cardService.createCard(this.newCard).subscribe(
      card => {
        console.log('Card created:', card);
        this.loadCards();
        this.newCard = { user: '', title: '', description: '', status: 'to-do' };
        this.isLoading = false;
      },
      error => {
        console.error('Error creating card:', error);
        this.isLoading = false;
      }
    );
  }

  // Prepara una tarjeta para ser editada.
  onEdit(card: Card): void {
    this.editingCard = { ...card };  // Copiamos la tarjeta para editarla
  }

  // Actualiza una tarjeta existente.
  onUpdate(): void {
    if (this.editingCard && this.editingCard._id) {
      this.isLoading = true;
      this.cardService.updateCard(this.editingCard).subscribe(
        updatedCard => {
          console.log('Card updated:', updatedCard);
          this.loadCards();
          this.editingCard = null;  // Limpiamos la tarjeta en edición
          this.isLoading = false;
        },
        error => {
          console.error('Error updating card:', error);
          this.isLoading = false;
        }
      );
    }
  }

  // Elimina una tarjeta por su ID.
  onDelete(cardId: string): void {
    this.isLoading = true;
    this.cardService.deleteCard(cardId).subscribe(
      response => {
        console.log('Card deleted:', response);
        this.loadCards();
        this.isLoading = false;
      },
      error => {
        console.error('Error deleting card:', error);
        this.isLoading = false;
      }
    );
  }
}
