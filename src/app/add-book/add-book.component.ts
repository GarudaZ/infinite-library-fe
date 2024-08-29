import { Component, Input } from '@angular/core';
import { BookService, Shelf } from '../services/book.service';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'add-book-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  @Input() shelves: Shelf[] | null | undefined = null;
  booksFound: any[] | null = null;
  titleInput = '';

  constructor(private bookService: BookService) {}

  searchByTitle(title: string) {
    console.log('searching');
    if (this.titleInput) {
      this.bookService
        .lookupBookByTitle(this.titleInput)
        .subscribe((results) => {
          console.log(results);

          this.booksFound = results;
        });
    } else {
      new Error('No title given for search');
    }
  }
}
