const Article2 = require('../../DB/models/article.ts');

const putHandler = (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  if ( title === ''){
    res.status(422).send({
      errors: [{
        field: 'title',
        error: 'title is required'
      }]
    });
  };
  Article2.findOne({ _id: id })
    .then(article => {
      article.title = title;
      article.body = body;
      article
        .save()
        .then(article => res.status(200).send(article));
    })
    .catch(err => res.status(422).send({
      errors: [{
        field: 'title',
        error: 'title is required'
      }]
    })
  );
};

module.exports = putHandler;
