const router = require('express').Router();
const CharactersService = require('../service/');

const charactersApiHandler = new CharactersService();

router.get('/list', (req, res, next) => {
  charactersApiHandler
    .getAllCharacters()
    .then((characters) => {
      res.render('pages/characters-list', { characters: characters.data });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/create', (req, res) => res.render('pages/new-character-form'));

router.post('/create', (req, res) => {
  const characterInfo = req.body;
  charactersApiHandler
    .createCharacter(characterInfo)
    .then((response) => {
      res.redirect('/characters/list');
    })
    .catch((error) => console.log(error));
});

router.get('/edit/:id', (req, res) => {
  const charId = req.params.id;
  const character = charactersApiHandler
    .getOneCharacter(charId)
    .then((character) => {
      console.log(character);
      res.render(`pages/edit-character-form`, { character: character.data });
    });
});

router.post('/edit/:id', (req, res, next) => {
  const characterId = req.params.id;
  const characterInfo = req.body;
  charactersApiHandler
    .editCharacter(characterId, characterInfo)
    .then((response) => {
      // res.status(response.status).send(response.data);
      res.status(response.status).redirect('/characters/list');
    })
    .catch((error) => console.log(error));
});

router.get('/delete/:id', (req, res) => {
  const characterId = req.params.id;
  charactersApiHandler
    .deleteCharacter(characterId)
    .then(() => res.redirect(`/characters/list`))
    .catch((error) => console.log(error));
});

module.exports = router;
