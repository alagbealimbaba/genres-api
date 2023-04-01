const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// action, adventure, comedy, drama, fantasy
const genres = [
  {id: 1, name: 'action'},
  {id: 2, name: 'adventure'},
  {id: 3, name: 'comedy'},
  {id: 4, name: 'drama'},
  {id: 5, name: 'fantasy'}
];

  app.get('/api/genres', (req, res) =>{
    res.send(genres);
  });

 
  app.post('/api/genres', (req, res) =>{
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre); 
  res.send(genre);
});


  app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) {
      res.status(404).send('The genre with the given ID was not found.')
      return;
    };
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

  
  genre.name = req.body.name
  res.send(genre);

});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('The genre with the given ID was not found.')

  const index = courses.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});






function validateGenre(genre){
  const schema = {
    name: Joi.string().min(2).required()
  };
return Joi.validate(genre, schema);
}

  app.get('/api/genres/:id', (req, res) =>{
   const genre = genres.find(g => g.id === parseInt(req.params.id));
   if(!genre) return res.status(404).send('The genre with the given ID was not found.')
   res.send(genre);
  });
  
  
   const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(` listening on port ${port}...`);
  });
  