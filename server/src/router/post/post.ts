const Article = require('../../DB/models/article.ts')

const postHandler = (req, res) => {
  const { title, body } = req.body;
  console.log(req.body);
  if (title !== '' || body !== '') {
    new Article({
      title,
      body,
    }).save(function (err) {
      if (err) {
        res.status(400);
      } else {
        res.status(200).send({ message: 'element was added' });
      }
    })
  } else {
    res.status(422).send({
      errors: [{
        field: 'title',
        error: 'title is required'
      }]
    });
  }
}

module.exports = postHandler;
