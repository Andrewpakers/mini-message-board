var express = require('express');
var router = express.Router();
const { DateTime } = require("luxon");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  const formattedMessages = messages.map(message => {
    return {
      text: message.text,
      user: message.user,
      added: DateTime.fromJSDate(message.added).toLocaleString(DateTime.DATETIME_MED),
    }
  }); 
  res.render('index', {
    title: 'The Mini Messageboard',
    messages: formattedMessages,
  });
});

/* GET new message. */
router.get('/new', function(req, res, next) {
  res.render('form', {
    title: 'The Mini Messageboard',
  });
});

/* POST new message. */
router.post('/new', function(req, res, next){
  const newMessage = {
    text: req.body.text,
    user: req.body.user,
    added: new Date(),
  }
  messages.unshift(newMessage);
  res.redirect('/');
}); 

module.exports = router;
