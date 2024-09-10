import { Component, Input, Output } from '@angular/core';
import { BookService, Shelf } from '../services/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'add-book-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  @Input() shelves: Shelf[] | null | undefined = null;
  @Input() addBookModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter();
  booksFound: any[] | null = null;
  titleInput = '';
  selectedShelf: string = '';
  selectedBook = '';

  searching = false;
  addedSuccessfully: boolean | null = null;
  errorMsg: string = '';
  constructor(private bookService: BookService) {}

  searchByTitle(title: string) {
    this.errorMsg = '';
    this.searching = true;
    this.addedSuccessfully = null;
    if (this.titleInput) {
      this.bookService
        .lookupBookByTitle(this.titleInput)
        .subscribe((results) => {
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
    this.bookService.addBook(this.selectedBook, this.selectedShelf).subscribe({
      next: () => {
        this.bookService.refreshBooks().subscribe();
        this.addedSuccessfully = true;
        this.booksFound = null;
      },
      error: (error) => {
        console.error('Failed to add book or update shelf:', error);
        this.addedSuccessfully = false;
        this.errorMsg = `Error adding book:${error}`;
      },
    });
  }
  closeModalBox() {
    this.addBookModalOpen = false;
    this.addedSuccessfully = null;
    this.errorMsg = '';
    this.closeModal.emit();
  }
}
