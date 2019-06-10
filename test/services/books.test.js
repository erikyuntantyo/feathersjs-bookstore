const app = require('../../src/app');

describe('\'books\' service', () => {
  const booksSvc = app.service('books');
  const genresSvc = app.service('genres');

  it('registered the service', () => {
    expect(booksSvc).toBeTruthy();
    expect(genresSvc).toBeTruthy();
  });

  let book = {
    title: 'Book Title',
    isbn: '978-3-16-148410-0',
    author: 'Book Author',
    published: '2019-01-01'
  };

  let genre = {
    name: 'Fiction'
  };

  it('creates a book', async () => {
    const _genre = await genresSvc.create(genre);

    // Assigns genre
    book.genre = _genre._id;

    const _book = await booksSvc.create(book);

    // Make sure book created
    expect(_book).toHaveProperty('_id');
    expect(_book).toHaveProperty('title');
    expect(_book).toHaveProperty('genre');
    expect(_book).toHaveProperty('isbn');
    expect(_book).toHaveProperty('author');
    expect(_book).toHaveProperty('published');

    // Verify book created as expect
    expect(_book.title).toEqual(book.title);

    // Assigns the result to reusable variable
    book = { ..._book };
  });

  it('gets created book', async () => {
    const foundBook = await booksSvc.get(book._id);

    // Verify book found as expect
    expect(foundBook.title).toEqual(book.title);
  });

  it('finds created book', async () => {
    const foundBook = await booksSvc.find({ query: { title: book.title } });

    // Verify book found as expect
    expect(foundBook.total).toEqual(1);
    expect(foundBook.data[0].title).toEqual(book.title);
  });

  it('updates created book', async () => {
    const updatedBook = await booksSvc.patch(book._id, {
      title: 'Book Renamed'
    });

    // Verify book updated as expect
    expect(updatedBook.title).toBe('Book Renamed');
  });

  it('deletes created book', async () => {
    const deletedBook = await booksSvc.remove(book._id);

    await genresSvc.remove(book.genre);

    // Make sure created book deleted
    expect(book._id).toEqual(deletedBook._id);
  });

  it('creates multiple books failed', async () => {
    // Make sure cannot create multiple books
    expect(booksSvc.create([{ ...book }])).rejects.toThrowError(new Error('Can not create multiple entries'));
  });
});
