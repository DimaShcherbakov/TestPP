const Article = require('../../DB/models/article.ts');

const postHandler = (req, res) => {
  const { title, body } = req.body;
  console.log(title, body)
  if (title !== '' && body !== '' && body !== undefined && title !== undefined ) {
    new Article({ title, body })
    .save()
    .then(article => res.status(200).send(article));
  } else {
    res.status(422).send({
      errors: [{
        field: 'title',
        error: 'title is required'
      }]
    });
  };
};

module.exports = postHandler;
