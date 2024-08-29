import { Component, Input } from '@angular/core';
import { Shelf } from '../services/book.service';
@Component({
  selector: 'add-book-component',
  standalone: true,
  imports: [],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  @Input() shelves: Shelf[] | null | undefined = null;
}
