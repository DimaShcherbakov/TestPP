const Article1 = require('../../DB/models/article.ts');
const LIMIT = require('../../../constants/constants.ts').LIMIT;
const PAGE = require('../../../constants/constants.ts').PAGE;

const getHandler = (req, res) => {
  const { page, limit } = req.query;
  let lim = String(limit);
  let pag = String(page);
  let currentPage = 0;
  let currentLimit = 0;
  if (pag === 'undefined' && lim === 'undefined') {
    currentPage = parseInt(PAGE, 10);
    currentLimit = parseInt(LIMIT, 10);
  } else if (parseInt(pag, 10) !== 0 && parseInt(lim, 10) !== 0){
    currentLimit = parseInt(lim, 10);
    currentPage = parseInt(pag, 10);
  }
  if (pag === 'undefined' && lim !== 'undefined') {
    currentPage = parseInt(PAGE, 10);
    currentLimit = parseInt(lim, 10);
  }
  if (pag !== 'undefined' && lim === 'undefined') {
    currentPage = parseInt(pag, 10);
    currentLimit = parseInt(LIMIT, 10);
  }
  Article1
    .find()
    .sort({ createdAt: -1 })
    .then(articles =>
      res.status(200).send({
        count: articles.length,
        page: currentPage,
        limit: currentLimit,
        articles: articles.slice(currentPage - 1, currentLimit + currentPage - 1)
      }),
    )
    .catch(err => res.status(404).json({
      errors: [{  
        field: 'title',
        error: 'title is required',
      }]
  }));
};

const getHandlerID = (req, res) => {
  const { id } = req.params;
  Article1
    .findOne({ _id: id })
    .then(article => {
      res.status(200).send(article);
    })
    .catch(err =>
      res.status(404).send({
        errors: [{
          field: "id",
          error: "Not Found"
        }]
      })
    );
};

module.exports = {
  getHandler,
  getHandlerID
};
