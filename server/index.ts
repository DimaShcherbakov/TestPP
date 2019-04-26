const app =  require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const indexRouter = require('./src/router/router.ts');
const database = require('./src/DB/config/config.ts').mongoURI;
const port = require('./constants/constants.ts').PORT;

app.listen( port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, DELETE, OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());
app.use('/', indexRouter);
app.set('port', process.env.port || port);

mongoose.connect(database, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => { console.log(err) });
