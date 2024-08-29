import { Component } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { BookService, PopulatedShelves } from '../services/book.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user: User | null = null;
  books: PopulatedShelves | null = null;
  displayedShelf: string = 'All';

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
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
    });
  }
}
// }
