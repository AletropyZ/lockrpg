const User = require('../database/models/User');
const cookie = require('cookie');

function giveAllUserInfo(socket) 
{
    const { userId } = cookie.parse(socket.handshake.headers.cookie);
    let ID = userId.split('"')[1];

    User.findOne({_id: ID}, 'login playerInfo', (err,user) => {
        if(user == null) return console.log("Usuário não encontrado: " + ID);

        return socket.emit("listenAllUserInfo", user.playerInfo);
    });
}

function saveAllUserInfo(socket, info)
{
    const { userId } = cookie.parse(socket.handshake.headers.cookie);
    let ID = userId.split('"')[1];

    User.findOneAndUpdate({_id: ID}, {playerInfo: info}, (err,user) => {
        if(err) return console.log(err);
    });
}

function getUserInventory(socket)
{
    const { userId } = cookie.parse(socket.handshake.headers.cookie);
    let ID = userId.split('"')[1];

    User.findOne({_id: ID}, 'login playerInventory', (err,user) => {
        if(err) return console.log(err);

        socket.emit("listenUserInventory", user.playerInventory);
    });
}

function saveUserInventory(socket, inventory)
{
    const { userId } = cookie.parse(socket.handshake.headers.cookie);
    let ID = userId.split('"')[1];

    User.findOneAndUpdate({_id: ID}, {playerInventory: inventory}, (err,user) => {
        if(err) console.log(err);
    });

}

module.exports = {
    giveAllUserInfo,
    saveAllUserInfo,
    getUserInventory,
    saveUserInventory
}