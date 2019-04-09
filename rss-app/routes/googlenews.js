var express = require('express');
var router = express.Router();

var http = require('https');
var parseString = require('xml2js').parseString;

/* GET home page. */
router.get('/', function (req, res, next) {
    // RSS取得のアドレス
    var opt = {
        host: 'news.google.com',
        port: 443,
        path: '/rss?ie=UTF-8&hl=ja&gl=JP&ceid=JP:ja'
    };

    // RSSを取得する
    http.get(opt, (res2) => {
        // 以下に文字コードを指定しないと一部文字化けする
        res2.setEncoding('utf8');
        var body = '';
        // 読み込み最中に呼ばれる
        res2.on('data', (data) => {
            body += data;
        });
        // 読み込み完了時に呼ばれる
        res2.on('end', () => {
            // console.log("body:" + body.trim());
            parseString(body.trim(), (err, result) => {
                var data = {
                    title: "Google News",
                    content: result.rss.channel[0].item
                };
                // ビューを指定する
                res.render('googlenews', data);
            });
        });
    });

});

module.exports = router;
