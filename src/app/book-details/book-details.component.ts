import { Component, Input } from '@angular/core';
import { Book, UsersBookRef } from '../services/book.service';

@Component({
  selector: 'book-details-component',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  @Input() bookDetails: UsersBookRef | null = null;
}
