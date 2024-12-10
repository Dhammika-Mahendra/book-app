import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../books/books.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  bookForm: FormGroup;
  books: any[] = [];

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      date : ['', Validators.required],
    });

    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }


  onAddBook() {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe(() => {
        this.fetchBooks();
        this.bookForm.reset();
      });
    }
  }

  onDeleteBook(id: string) {
    const bookId = Number(id); 
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.fetchBooks();
    });
  }


}
