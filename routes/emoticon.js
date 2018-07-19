var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

/* GET home page. */
router.get('/', (req, res) => res.send('hi!'))
  .post('/message', (req, res) =>{

      const _obj = {
          user_key: req.body.user_key,
          type: req.body.type,
          content: req.body.content
      };
    var emotion = cool();
    // if (typeof type === "String" && content === "사용방법") {
    //   emotion = "안녕하세요, 말 걸때마다 표정지어 드립니다." + cool();
    // }
    res.json(
      { "message" : {
            "text" : emotion}
      }
    )
  })
  .get('/keyboard', (req, res) => {
  const menu = {
      type: 'buttons',
      buttons: ["사용방법"]
  };
  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));})

module.exports = router;
