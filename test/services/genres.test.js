const app = require('../../src/app');

describe('\'genres\' service', () => {
  const genresSvc = app.service('genres');

  it('registered the service', () => {
    expect(genresSvc).toBeTruthy();
  });

  let genre = {
    name: 'Genre Name'
  };

  it('creates a genre', async () => {
    const _genre = await genresSvc.create(genre);

    // Make sure genre created
    expect(_genre).toHaveProperty('_id');
    expect(_genre).toHaveProperty('name');

    // Verify genre created as expect
    expect(_genre.name).toEqual(genre.name);

    // Assigns the result to reusable variable
    genre = { ..._genre };
  });

  it('gets created genre', async () => {
    const foundGenre = await genresSvc.get(genre._id);

    // Verify genre found as expect
    expect(foundGenre.name).toEqual(genre.name);
  });

  it('finds created genre', async () => {
    const foundGenre = await genresSvc.find({ query : { name: genre.name } });

    // Verify genre found as expect
    expect(foundGenre.total).toEqual(1);
    expect(foundGenre.data[0].name).toEqual(genre.name);
  });

  it('updates created genre', async () => {
    const updatedGenre = await genresSvc.patch(genre._id, {
      name: 'Genre Renamed'
    });

    // Verify genre updated as expect
    expect(updatedGenre.name).toBe('Genre Renamed');
  });

  it('deletes created genre', async () => {
    const deletedGenre = await genresSvc.remove(genre._id);

    // Make sure created genre deleted
    expect(genre._id).toEqual(deletedGenre._id);
  });

  let genres = [{
    name: 'Genre 1'
  }, {
    name: 'Genre 2'
  }, {
    name: 'Genre 3'
  }, {
    name: 'Genre 4'
  }, {
    name: 'Genre 5'
  }];

  it('creates multiple genres', async () => {
    const _genres = await genresSvc.create(genres);

    // Verify multiple genres created as expect
    expect(Array.isArray(_genres)).toBeTruthy();
    expect(_genres).toHaveLength(genres.length);

    // Assigns the result to reusable variable
    genres = [..._genres];
  });

  it('finds created genres', async () => {
    const foundGenres = await genresSvc.find({ query: { name: { $regex: /genre/i } } });

    // Verify total of genre found as expect
    expect(foundGenres.total).toEqual(genres.length);
  });

  it('deletes created genres', async () => {
    let deletedGenres = [];

    for (let genre of genres) {
      const deletedGenre = await genresSvc.remove(genre._id);
      deletedGenres.push(deletedGenre);
    }

    // Make sure all created genres deleted
    expect(deletedGenres).toHaveLength(genres.length);
  });
});
