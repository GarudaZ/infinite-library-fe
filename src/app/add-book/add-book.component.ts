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
  selectedShelf: string = '';
  selectedBook = '';

  searching = false;
  addedSuccessfully = false;

  constructor(private bookService: BookService) {}

  searchByTitle(title: string) {
    this.searching = true;
    if (this.titleInput) {
      this.bookService
        .lookupBookByTitle(this.titleInput)
        .subscribe((results) => {
          console.log(results);
          this.booksFound = results;
          this.searching = false;
        });
    } else {
      new Error('No title given for search');
    }
  }

  selectBook(value: string) {
    this.selectedBook = value;
  }

  selectShelf(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedShelf = target.value;
  }
  addBookToUser() {
    this.bookService.addBook(this.selectedBook, this.selectedShelf);
    this.addedSuccessfully = true;
  }
}
