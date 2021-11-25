const app = require('./configs/server.config');

app.listen(process.env.PORT || 8000, () => {
  console.log('Servidor Rodando');
});