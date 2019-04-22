const Article1 = require("../../DB/models/article.ts");
const LIMIT = 10;

const getHandler = (req, res) => {
  const { page, limit } = req.query;
  let lim = limit;
  if (limit === undefined || limit >= LIMIT) {
    lim = LIMIT;
    Article1.find()
      .sort({ createdAt: -1 })
      .then(articles =>
        res.status(200).send({
          count: articles.length,
          page,
          limit: lim,
          articles: articles.slice(page - 1, lim)
        })
      )
      .catch(err => res.status(404).json({ error: "No notes found" }));
  } else {
    Article1.find()
      .sort({ createdAt: -1 })
      .then(articles =>
        res.status(200).send({
          count: articles.length,
          page,
          limit,
          articles: articles.slice(page - 1, limit)
        })
      )
      .catch(err => res.status(404).json({ error: "No notes found" }));
  }
};

const getHandlerID = (req, res) => {
  const { id } = req.params;
  Article1.findOne({ _id: id })
    .then(article => {
      res.status(200).send(article);
    })
    .catch(err =>
      res.status(404).send({
        errors: [
          {
            field: "id",
            error: "Not Found"
          }
        ]
      })
    );
};

module.exports = {
  getHandler,
  getHandlerID
};
