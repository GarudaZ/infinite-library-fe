import { Component, Input, Output } from '@angular/core';
import { UsersBookRef } from '../services/book.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'book-details-component',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  @Input() bookDetails: UsersBookRef | null = null;
  @Output() closeDetails = new EventEmitter();

  closePopUp() {
    this.closeDetails.emit();
  }
}
