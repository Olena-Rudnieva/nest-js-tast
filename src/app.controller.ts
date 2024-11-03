import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './app.service';
import { Book } from './FakeDatabase';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Book | undefined {
    const bookID = +id;
    return this.booksService.findById(bookID);
  }

  @Post()
  addBook(@Body() book: Partial<Book>): Book | undefined {
    const bookData = book;

    if (!bookData.title || !bookData.author || !bookData.publicationYear)
      return undefined;
    return this.booksService.create(bookData);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Body() book: Partial<Book>,
  ): Book | undefined {
    return this.booksService.update(+id, book);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): Book | undefined {
    return this.booksService.delete(+id);
  }
}
