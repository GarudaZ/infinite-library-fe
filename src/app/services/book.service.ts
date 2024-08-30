import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';

export interface BookSearchResults {
  booksFound: Book[];
}
export interface UsersBookRef {
  book_id: Book;
  notes: string;
  reviews: string;
  tags: [];
  _id: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  published: string;
  publisher: string;
  genres: string;
  cover: string;
  created_at: string;
  __v: string;
}
export interface Shelf {
  _id: string;
  user_id: string;
  shelf_name: string;
  books: UsersBookRef[];
  created_at: string;
  __v: string;
}
export interface PopulatedShelves {
  shelvedBooks: Shelf[];
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) {}

  getAllBooks(): Observable<PopulatedShelves> {
    const token: string | null = this.authService.getToken();

    const userId = this.userService.getCurrentUser()?._id;
    console.log(userId);

    if (!userId) {
      throw new Error('User ID is not available.');
    }

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    console.log('getting books');

    return this.http
      .get<PopulatedShelves>(
        `https://infinite-library.vercel.app/api/users/${userId}/shelves/books`,
        header
      )
      .pipe(
        map((res: PopulatedShelves) => {
          console.log(res);

          if (!res.shelvedBooks) {
            throw new Error('Invalid response structure');
          }

          return res;
        })
      );
  }

  lookupBookByTitle(title: string): Observable<any[]> {
    console.log('bookservice working');
    console.log(title);

    return this.http
      .get<any>(`https://openlibrary.org/search.json?title=${title}&limit=5`)
      .pipe(
        map((res) => {
          console.log('res:', res);

          if (!res.numFound) {
            throw new Error('Error during api request');
          } else if (res.numFound === '0') {
            throw new Error('No results found for that title');
          } else {
            return res.docs;
          }
        })
      );
  }

  isBookInDatabase(isbn: string): Observable<boolean> {
    return this.http
      .get<{ book_found: Book }>(
        `https://infinite-library.vercel.app/api/${isbn}`
      )
      .pipe(
        map((res) => {
          if (!!res.book_found) {
            return false;
          } else {
            return true;
          }
        }),
        catchError((error) => {
          console.error('Error checking database:', error);
          return of(false);
        })
      );
  }

  addBook(selectedBook: any, selectedShelf: string) {
    //check if book exists yet on DB, if not add to collection

    // get image from api
    const formattedBook = {
      title: selectedBook.title,
      author: selectedBook.author_name[0],
      isbn: selectedBook.isbn[0],
      published: selectedBook.first_publish_year,
      publisher: selectedBook.publisher[0],
      genres: [...selectedBook.subject.slice(0, 3)],
      cover: selectedBook.cover_i,
    };

    this.http
      .post(`https://infinite-library.vercel.app/api/books`, formattedBook)
      .subscribe(
        (res: any) => {
          console.log('posted book:', res);
          this.http
            .patch(
              `https://infinite-library.vercel.app/api/shelves/${selectedShelf}`,
              { book_id: res.added_book._id }
            )
            .subscribe((res: any) => {
              console.log('patched shelf:', res);
              //add book to shelf optimistically
            });
        },

        (error) => {
          console.error('Error adding book:', error);
        }
      );
  }
}
