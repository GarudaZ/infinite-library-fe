import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpTesting: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), BookService],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('isBookInDatabase', () => {
    it('should return true if book is in database', async () => {
      const isbn = '0330258648';
      const mockResponse = {
        book_found: {
          _id: '123',
          title: 'Test Book',
          author: 'Test Author',
          isbn: '0330258648',
        },
      };
      service.isBookInDatabase(isbn).subscribe((res) => {
        expect(res).toBeTrue();
      });
      const req = httpTesting.expectOne(
        `https://infinite-library.vercel.app/api/books/${isbn}`
      );
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
    });
  });
});
