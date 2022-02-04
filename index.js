const { WAConnection } = require("@adiwajshing/baileys");
const fs = require('fs')
const print = console.log;
const colors = require('colors')
const { success, fail, start } = require('./utils/spin')
var { qrcd } = require('qrcode-terminal')
//const premium = require('../utils/database/premium.json')
require('./message/server.js')

async function kali(hazn = new WAConnection()){
hazn.ReconnectMode = 2
hazn.logger.level = 'fatal'
hazn.on('qr', qr => {
//qrcd.generate(qr, { small: true })
print('scan qr above sir!'.bold.purple)
})

fs.existsSync('./hazn.json') && hazn.loadAuthInfo('./hazn.json')

hazn.on('connecting', () => {
start('2','Connecting....')
})

hazn.on('open', (keys) => {
success('2','Connect')
})

await hazn.connect();
fs.writeFileSync('./hazn.json', JSON.stringify(hazn.base64EncodedAuthInfo(), null, '\t'))

require('./message/server.js')(hazn)
}

kali()

