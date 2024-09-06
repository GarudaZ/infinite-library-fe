import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService, Shelf } from '../services/book.service';
import { User, UserService } from '../services/user.service';
@Component({
  selector: 'add-shelf-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-shelf.component.html',
  styleUrl: './add-shelf.component.scss',
})
export class AddShelfComponent {
  @Input() shelves: Shelf[] | null | undefined = null;
  shelfNameInput = '';
  adding = false;
  shelfExists = false;

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) {}

  addShelf(shelfNameInput: string) {
    this.shelfExists = false;
    const userId = this.userService.getCurrentUser()?._id;
    if (userId === undefined) {
      return console.error('No user Id set');
    }
    if (
      this.shelves?.some((shelf) =>
        Object.values(shelf).includes(shelfNameInput)
      )
    ) {
      return (this.shelfExists = true);
    }
    this.adding = true;
    this.bookService.addShelf(shelfNameInput, userId).subscribe({
      next: (res) => {
        this.bookService.refreshBooks().subscribe();
        this.adding = false;
      },
      error: (error) => {
        console.error(error);
        this.adding = false;
      },
    });
  }
}
