
module.exports = function routes(app){
  app.get('/', (req, res)=>{
    res.send('okay');
  });
}