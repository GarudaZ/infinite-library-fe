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
  //  = [
  // {
  //   _id: '66c47de86a6fa723d0269c47',
  //   user_id: '66c465304a078ec5ec51bdff',
  //   shelf_name: 'display-books',
  //   books: [
  //     {
  //       book_id: {
  //         _id: '66bbbec98dc2ccd85cc3a66f',
  //         title: "The Hitchhiker's Guide to the Galaxy",
  //         author: 'Douglas Adams',
  //         isbn: '0330258648',
  //         published: '1979-01-01T00:00:00.000Z',
  //         publisher: 'Pan Books',
  //         genres: ['Comedy', 'Science Fiction'],
  //         cover: 'https://covers.openlibrary.org/b/id/8594906-L.jpg',
  //         created_at: '2024-08-13T20:15:05.219Z',
  //         __v: 0,
  //       },
  //       notes: '',
  //       reviews: '',
  //       tags: [],
  //       _id: '66c47de86a6fa723d0269c48',
  //     },
  //     {
  //       book_id: {
  //         _id: '66bbbec98dc2ccd85cc3a66g',
  //         title: "The Hitchhiker's Guide to the Galaxy 2",
  //         author: 'Douglas Adams 2',
  //         isbn: '0330258648',
  //         published: '1979-01-01T00:00:00.000Z',
  //         publisher: 'Pan Books',
  //         genres: ['Comedy', 'Science Fiction'],
  //         cover: 'https://covers.openlibrary.org/b/id/8594906-L.jpg',
  //         created_at: '2024-08-13T20:15:05.219Z',
  //         __v: 0,
  //       },
  //       notes: '',
  //       reviews: '',
  //       tags: [],
  //       _id: '66c47de86a6fa723d0269c49',
  //     },
  //   ],
  // },
  // {
  //   _id: '66c47de86a6fa723d0269c410',
  //   user_id: '66c465304a078ec5ec51bdff',
  //   shelf_name: 'display-books',
  //   books: [
  //     {
  //       book_id: {
  //         _id: '66bbbec98dc2ccd85cc3a66h',
  //         title: "The Hitchhiker's Guide to the Galaxy",
  //         author: 'Douglas Adams',
  //         isbn: '0330258648',
  //         published: '1979-01-01T00:00:00.000Z',
  //         publisher: 'Pan Books',
  //         genres: ['Comedy', 'Science Fiction'],
  //         cover: 'https://covers.openlibrary.org/b/id/8594906-L.jpg',
  //         created_at: '2024-08-13T20:15:05.219Z',
  //         __v: 0,
  //       },
  //       notes: '',
  //       reviews: '',
  //       tags: [],
  //       _id: '66c47de86a6fa723d0269c411',
  //     },
  //     {
  //       book_id: {
  //         _id: '66bbbec98dc2ccd85cc3a66i',
  //         title: "The Hitchhiker's Guide to the Galaxy 2",
  //         author: 'Douglas Adams 2',
  //         isbn: '0330258648',
  //         published: '1979-01-01T00:00:00.000Z',
  //         publisher: 'Pan Books',
  //         genres: ['Comedy', 'Science Fiction'],
  //         cover: 'https://covers.openlibrary.org/b/id/8594906-L.jpg',
  //         created_at: '2024-08-13T20:15:05.219Z',
  //         __v: 0,
  //       },
  //       notes: '',
  //       reviews: '',
  //       tags: [],
  //       _id: '66c47de86a6fa723d0269c413',
  //     },
  //   ],
  // },
  // ];

  constructor(
    private userService: UserService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
    this.bookService.getAllBooks().subscribe((data) => {
      console.log(data);
      this.books = data;
    });
  }
}
// }
