// books-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const books = new Schema({
    title: {
      type: String,
      required: true
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: 'genres',
      required: true
    },
    isbn: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    published: {
      type: Date,
      required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('books', books);
};
