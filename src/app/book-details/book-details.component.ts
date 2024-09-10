import { Component, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersBookRef } from '../services/book.service';
import { EventEmitter } from '@angular/core';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'book-details-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  @Input() clickedBookDetails: UsersBookRef | null = null;
  @Input() shelfId: string | null = null;
  @Output() closeDetails = new EventEmitter();
  bookTags = '';
  reViews = '';
  editing: boolean = false;
  updateSuccessful: boolean | null = null;

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) {}

  closePopUp() {
    this.updateSuccessful = null;
    this.closeDetails.emit();
  }
  updateDetails() {
    const userId = this.userService.getCurrentUser()?._id;
    const updates = {
      tags: this.bookTags,
      reviews: this.reViews,
    };
    this.bookService
      .patchUsersBook(userId, this.clickedBookDetails, this.shelfId, updates)
      .subscribe({
        next: (res) => {
          this.bookService.refreshBooks().subscribe();
          this.editing = false;
          this.updateSuccessful = true;
        },
        error: (error) => {
          console.error('Error updating', error);
        },
      });
  }
  startEditing() {
    this.editing = true;
    this.updateSuccessful = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clickedBookDetails'] && this.clickedBookDetails) {
      this.bookTags = this.clickedBookDetails.tags.join(', ') || '';
      this.reViews = this.clickedBookDetails.reviews || '';
    }
  }
}
