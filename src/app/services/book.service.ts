import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
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
  lccn: string;
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
  private apiUrl = environment.apiUrl;
  private booksSubject = new BehaviorSubject<PopulatedShelves | null>(null);
  public books$ = this.booksSubject.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.getAllBooks();
  }

  getAllBooks(): Observable<PopulatedShelves> {
    const token: string | null = this.authService.getToken();

    const userId = this.userService.getCurrentUser()?._id;
    console.log(userId);

    if (!userId) {
      throw new Error('No User ID, User ID required');
    }

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    console.log('getting books');

    return this.http
      .get<PopulatedShelves>(
        `${this.apiUrl}/users/${userId}/shelves/books`,
        header
      )
      .pipe(
        map((res: PopulatedShelves) => {
          if (!res.shelvedBooks) {
            throw new Error('Invalid response structure');
          }
          console.log('res', res);

          this.booksSubject.next(res);
          console.log('shelves popped');
          return res;
        })
      );
  }

  refreshBooks() {
    console.log('refreshing');

    return this.getAllBooks();
  }

  lookupBookByTitle(title: string): Observable<any[]> {
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

  isBookInDatabase(isbn: string): Observable<any> {
    return this.http
      .get<{ book_found: Book }>(`${this.apiUrl}/books/${isbn}`)
      .pipe(
        map((res) => {
          if (res && res.book_found) {
            return res.book_found;
          } else {
            return false;
          }
        }),
        catchError((error) => {
          console.error('Error checking database:', error);
          return of(false);
        })
      );
  }

  addBook(selectedBook: any, selectedShelf: string): Observable<any> {
    console.log('adding book');

    return new Observable((bookObserver) => {
      this.isBookInDatabase(selectedBook.isbn[0]).subscribe({
        next: (bookFound) => {
          console.log(bookFound);
          if (!bookFound) {
            const formattedBook = {
              title: selectedBook.title,
              author: selectedBook.author_name[0],
              isbn: selectedBook.isbn[0],
              lccn: selectedBook.lccn[0],
              published: selectedBook.first_publish_year,
              publisher: selectedBook.publisher[0],
              genres: selectedBook.subject.slice(0, 3),
              cover: selectedBook.cover_i,
            };

            this.http.post(`${this.apiUrl}/books`, formattedBook).subscribe({
              next: (res: any) => {
                if (res && res.added_book) {
                  this.patchShelf(
                    selectedShelf,
                    res.added_book._id,
                    bookObserver
                  );
                } else {
                  console.error('Failed to add book');
                }
              },
            });
          } else {
            this.patchShelf(selectedShelf, bookFound._id, bookObserver);
          }
        },
        error: (error) => {
          console.error('Error adding book:', error);
        },
      });
    });
  }

  patchShelf(shelfId: string, bookId: string, bookObserver: any): void {
    this.http
      .patch(`${this.apiUrl}/shelves/${shelfId}`, {
        book_id: bookId,
      })
      .subscribe({
        next: (res) => {
          console.log('found, patching...');

          bookObserver.next(res);
          bookObserver.complete;
        },
        error: (error) => {
          bookObserver.error(error);
        },
      });
  }

  addShelf(shelfName: string, userId: string | undefined): Observable<any> {
    const body = {
      user_id: userId,
      shelf_name: shelfName,
      books: [],
    };
    console.log(body);

    return this.http.post(`${this.apiUrl}/users/${userId}/shelves`, body);
  }
}
