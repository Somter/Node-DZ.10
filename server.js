var express = require('express');
var path = require('path');
var port = 8080;
var catalog = 'data';
var fs = require('fs');
var bodyParser = require('body-parser');    

var app = express();
var regist = express();
var enter = express();

app.use('/', express.static(path.join(__dirname, catalog)));
app.use(bodyParser.urlencoded({ extended: true }));

function writeFile(username, login, email, password, address, country, gender, filePath) {
    var data = {
        username: username,
        login: login,
        email: email,
        password: password,
        address: address,
        country: country,
        gender: gender
    };

    var dataJson = JSON.stringify(data, null, 2);

    fs.writeFile(filePath, dataJson, (err) => {
        if (err) {
            console.log('Ошибка при записи данных в файл!');
        } else {
            console.log('Данные успешно записаны в файл');
        }
    });
}


function writeFileAuth(login, password, filePath) {
    var data = {
        login: login,
        password: password
    };

    var dataJson = JSON.stringify(data, null, 2);

    fs.writeFile(filePath, dataJson, (err) => {
        if (err) {
            console.log('Ошибка при записи данных в файл!');
        } else {
            console.log('Данные успешно записаны в файл');
        }
    });
}

regist.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, catalog, 'register.html'));
});

regist.post('/', function(req, res){
    var { username, login, email, password, address, country, gender } = req.body; 

    writeFile(username, login, email, password, address, country, gender, 'file.txt');
    res.send('<h1>Вы успешно зарегистрировались!</h1>');
});

enter.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, catalog, 'auth.html'));
});

enter.post('/', function(req, res){
    var { login, password } = req.body; 

    writeFileAuth(login,password, 'file2.txt');
    res.send('<h1>Вы успешно вошли!</h1>');
});

app.use('/registr', regist);
app.use('/authr', enter);

app.get('*', function(req, res){
    res.status(404).send('<h1>404 ошибка: Страница не найдена</h1>');
});

app.listen(port, function () {
    console.log('app running on port ' + port);
});
