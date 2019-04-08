var express = require('express');
var router = express.Router();

// add データ(JSONの配列)
var data = [
  {name: 'Taro', age: '35', mail: 'taro@yamada'},
  {name: 'Hanako', age: '29', mail: 'kanako@flower'},
  {name: 'Sachiko', age: '41', mail: 'sachiko@happy'},
];

// add 初期画面表示
router.get('/', function(req, res, next) {
  var msg = "0〜2の数字を入力して送信してください。";
  var data = {
    title: 'Ajax!',
    content: msg
  };
  res.render('ajax', data);
});

// add ボタン押下時に、data配列のid番目のJSONを送る。
router.get('/get', function(req, res, next) {
  var n = req.query.id;
  res.json(data[n]);
});

module.exports = router;
