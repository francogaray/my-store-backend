const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('App listening on port ' + 3000);
});
