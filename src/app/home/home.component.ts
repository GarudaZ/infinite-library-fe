import { Component } from '@angular/core';
import { UserService, User } from '../services/user.service';
import {
  BookService,
  PopulatedShelves,
  UsersBookRef,
} from '../services/book.service';
import { AddBookComponent } from '../add-book/add-book.component';
import { AddShelfComponent } from '../add-shelf/add-shelf.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddBookComponent, AddShelfComponent, BookDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user: User | null = null;
  books: PopulatedShelves | null = null;
  displayedShelf: string = 'All';
  detailsOpen = false;
  clickedBook: UsersBookRef | null = null;
  clickedBookShelf: string | null = null;

  constructor(
    private userService: UserService,
    private bookService: BookService
  ) {}

  onShelfSelected(shelfValue: string) {
    this.displayedShelf = shelfValue;
  }

  displayFilteredBooks() {
    if (this.displayedShelf === 'All') {
      return this.books?.shelvedBooks;
    } else {
      return this.books?.shelvedBooks.filter(
        (shelf) => shelf.shelf_name === this.displayedShelf
      );
    }
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
    this.bookService.books$.subscribe((books) => {
      console.log(books);
      this.books = books;
    });
    this.bookService.refreshBooks().subscribe();
  }

  selectBook(bookDetails: UsersBookRef, shelfId: string) {
    console.log(bookDetails);

    this.clickedBook = bookDetails;
    this.clickedBookShelf = shelfId;
  }
  clearClickedBook() {
    this.clickedBook = null;
  }
}
