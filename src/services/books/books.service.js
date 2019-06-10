// Initializes the `books` service on path `/books`
const createService = require('feathers-mongoose');
const createModel = require('../../models/books.model');
const hooks = require('./books.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/books', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('books');

  service.hooks(hooks);
};
