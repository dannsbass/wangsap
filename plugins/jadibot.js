const {WAConnection,MessageType,Mimetypel} = require('@adiwajshing/baileys');
let qrcode = require('qrcode');
const fs = require("fs");

listjadibot = [];

const jadibot = async (reply, hazn, id) => {
  conn = new WAConnection();
  conn.logger.level = 'fatal';
  conn.version = [2, 2123, 8];
  conn.browserDescription = [ 'Baileys', 'Safari', '3.0' ];
  conn.on('qr', async qr =>{
    let bot = await qrcode.toDataURL(qr, { scale: 8 });
    let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64');
    bot = await hazn.sendMessage(id,buffer,MessageType.image,{caption:'Scan QR Above Sir!'});
    setTimeout(() => {
     	hazn.deleteMessage(id, bot.key);
    },10000);
  });
  conn.on('connecting', () => {
    hazn.sendMessage(id, 'try to connect', MessageType.text);
  });
  conn.on('open', () => {
    reply(from,"*Connect*");
    reply(from,"```ingat ini hanya numpang dan bila bot utama mati  maka sessions mu akan hilang secara otomatis```");
  });
  await conn.connect({timeoutMs: 30 * 1000});
  listjadibot.push(conn.user);
  require('../message/server.js')(conn);
};

const stopjadibot = (reply) => {
	conn = new WAConnection();
	conn.close();
	reply(from,'Sukses stop jadibot');
};

module.exports = {jadibot,stopjadibot,listjadibot};