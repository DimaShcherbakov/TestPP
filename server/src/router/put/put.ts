const Article2 = require('../../DB/models/article.ts');

const putHandler = (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  console.log(req.body)
  Article2.findOne({ _id: id })
    .then(article => {
      console.log(article)
      article.title = title;
      article.body = body;
      article.save()
        .then(article => res.status(200).send(article))
        .catch(err => res.status(404).json({ error: "element wasn't saved" }))
    })
    .catch(err => res.status(422).send({
      errors: [{
        field: 'title',
        error: 'title is required'
      }]
    })
  )
}

module.exports = putHandler;