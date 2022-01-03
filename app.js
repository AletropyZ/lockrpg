//Packages imports
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//My Imports & Configs
const PORT = 3000 || process.env.PORT;
const db = require('./database/connect');
const mainRoutes = require('./routes/main');

//App & Server Settings
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const fUser = require('./util/user');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'buggy woggy cat',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(mainRoutes);

//Socket IO & Discord Environment
io.on('connect', socket => {
    socket.emit('consoleMessage', "Conectado ao servidor!");

    //Main Page Requests
    socket.on("getAllUserInfo", () => {
        fUser.giveAllUserInfo(socket);
    });

    socket.on("saveAllUserInfo", info => {
        fUser.saveAllUserInfo(socket, info);
    });

    socket.on("getUserInventory", () => {
        fUser.getUserInventory(socket);
    });

    socket.on("saveUserInventory", inventory => {
        fUser.saveUserInventory(socket, inventory);
    })
})


server.listen(PORT, () => console.log(`Servidor aberto em http://localhost:${PORT}`));