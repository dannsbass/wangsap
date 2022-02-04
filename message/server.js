const { MessageType, Mimetype, MessageOptions } = require("@adiwajshing/baileys");
const axios = require('axios')
const ff = require('fluent-ffmpeg')
const print = console.log;
const colors = require('colors')
const fs = require('fs')
const { exec } = require('child_process')
const moment = require('moment-timezone')
const fetch = require('node-fetch')
const { exp } = require('../utils/language/')
const { uptele } = require('../utils/upimg')
const { jadibot, stopjadibot, listjadibot } = require('../plugins/jadibot')
const { nocache } = require('../plugins/cache')
const request = require('request')
const search = require('yt-search')
const { WikipediaAllLaguage } = require('../plugins/wiki')
const { yta, ytv } = require('../plugins/ytdl')
const premium = require('../utils/database/premium.json')
const { getGroupAdmins, getBuffer, fetchJson } = require('../utils/func');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')
const Exif = require('../plugins/exif.js')
const exif = new Exif()
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI()
prefix = ''
let pack = '@Hazn-Self'
let auth = '🫂'

const getRandom = (mk) => {
return `${Math.floor(Math.random() * 10000)}${mk}`
}

const toUni = function (str) {
if (str.length < 4)
return str.codePointAt(0).toString(16);
return str.codePointAt(0).toString(16) + '-' + str.codePointAt(2).toString(16);
};


nocache('../message/server.js', modules => print(`Module Was Changes ${modules}`))

//Premium
//const jsonn = JSON.parse(fs.readFileSync('../data/user/jsonn.json'));

const bbv = (seconds) =>{
function pad(s) {
return (s < 10 ? '0' : '') + s;
}
var hours = Math.floor(seconds / (60 * 60));
var minutes = Math.floor(seconds % (60 * 60) / 60);
var seconds = Math.floor(seconds % 60);
    
return `${pad(hours)}Jam - ${pad(minutes)}Menit -  ${pad(seconds)}Detik`
}

module.exports = (hazn) => {
hazn.on('chat-update', async (mek) => {
try {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return
if (mek.key.fromMe) return
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const type = Object.keys(mek.message)[0]
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product, buttonsMessage } = MessageType
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const cmd = body.slice(0).trim().split(/ +/).shift().toLowerCase()
const stickcmd = Object.keys(mek.message)[0] == "stickerMessage" ? mek.message.stickerMessage.fileSha256.toString('base64') : ""
const args = body.trim().split(/ +/).slice(1)
const codestick = ``
const a = args[0]
const cmdl = body.startsWith(prefix)

const botNumber = hazn.user.jid
const ownerNumber = ['6281539336834@s.whatsapp.net']
const isGroup = from.endsWith('@g.us')
const sender = isGroup ? mek.participant : mek.key.remoteJid
pushname = hazn.contacts[sender] != undefined ? hazn.contacts[sender].vname || hazn.contacts[sender].notify : undefined 
const groupMetadata = isGroup ? await hazn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isOwner = ownerNumber.includes(sender)
const isPremium = premium.includes(sender)||false||isOwner
const isGroupAdmins = groupAdmins.includes(sender) || false
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
const reply = (string,textt) => {
hazn.sendMessage(string,textt,MessageType.text,{quoted:mek})
}
const mention = (string,fake,textt) => {
hazn.sendMessage(string,textt,MessageType.extendedText,{contextInfo:{mentionedJid:[fake], quoted:mek}})
}
const sendFile = async(to, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(from, text, mids)
} 
const fn = Date.now() / 10000;
const filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
print('Sucesss Download Media!'.green);
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
}
hazn.sendMessage(from, media, type, { quoted: mek, mimetype: mime, ptt: true, caption: text,contextInfo: {"mentionedJid": mids}})
fs.unlinkSync(filename)
});
}
const sendStikel = async(to, url) => {
var names = Date.now() / 10000;
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, './temp' + names + '.png', async function () {
print('sucess converter!'.green)
let webpk = './temp' + names + '.png'
let imgs = './temp' + names + '.webp'
exec(`ffmpeg -i ${webpk} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${imgs}`, (err) => {
let media = fs.readFileSync(webpk)
hazn.sendMessage(to, media, MessageType.sticker,{quoted:mek})
fs.unlinkSync(webpk)
fs.unlinkSync(imgs)
});
});
}

const getPremiumExpired = (sender) => {
let position = null
Object.keys(premium).forEach((i) => {
if (premium[i].id === sender) {
position = i
}
})
if (position !== null) {
return premium[position].expired
}
} 
		
const expiredCheck = () => {
setInterval(() => {
let position = null
Object.keys(premium).forEach((i) => {
if (Date.now() >= premium[i].expired) {
position = i
}
})
if (position !== null) {
console.log(`Premium expired: ${premium[position].id}`)
premium.splice(position, 1)
fs.writeFileSync('../utils/database/premium.json', JSON.stringify(premium))
}
}, 1000)
} 
		
const getAllPremiumUser = () => {
const array = []
Object.keys(premium).forEach((i) => {
array.push(premium[i].id)
})
return array
}
		

//IsMedia
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedGif = type === 'extendedTextMessage' && content.includes('gifMessage')
const isQuotedText = type === 'extendedTextMessage' && content.includes('Message')

if(cmdl && !isGroup) print(`[CMD] ${cmd} from ${pushname}`.green)
if(cmdl && isGroup) print(`[GROUP] ${cmd} from ${pushname} in ${groupName}`.green)

const downloadM = async(save) => {
encmediaa = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
encmediaa = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
encmediaa = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
encmediaa = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
encmediaa = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
if (save) return await hazn.downloadAndSaveMediaMessage(encmediaa)
return await hazn.downloadMediaMessage(encmediaa)
}

switch(cmd){
case's':
case'sticker':
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
//if(!isMedia) return reply(from,'kirim gambar/video dengan caption sticker!')
const dekode = isQuotedImage||isQuotedVideo||isQuotedSticker||isQuotedGif ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
const dexode  = await hazn.downloadMediaMessage(dekode, 'buffer') 
const getlink = await uptele(dexode, false)
const sticker = new Sticker(getlink, {
pack: pack,
author: auth,
type: StickerTypes.FULL, 
categories: ['❤️', '❤️'],
id: '029362827',
quality: 50,
background: '#000000' 
})
await sticker.toFile('./temp/sticker.webp')
hazn.sendMessage(from, fs.readFileSync('./temp/sticker.webp'), MessageType.sticker).catch((e) => reply(from,'error').print(`${e}`))
await hazn.sendMessage(from, `@${sender.split("@")[0]}`, MessageType.text, {contextInfo:{mentionedJid:[sender],quoted:mek}})
} else {
reply(from,'itu gambar?')
}
break
case'joox':
if(args.length < 1) return reply(from,'lagu nya kak')
jis = args.join(' ')
joks = await axios.get(`https://api.chipa.xyz/api/download/jooxdl?title=${jis}&apikey=NGS22ZWLMR2XRJY8Z8VTDP0L`)
size = `${joks.data.result.filesize}`
if (Number(size) >= 3.0) return reply(from,'size nya ke gedean kak')
bbs = `*[JOOX]*\n\n*ℹ️ Judul*: ${joks.data.result.judul}\n*ℹ️ Size*: ${joks.data.result.filesize}\n*ℹ️ Artist*: ${joks.data.result.artist}\n*ℹ️ Durasi*: ${joks.data.result.duration}\n\n_Wait A Minutes!_`
buff = await getBuffer(`${joks.data.result.mp3_url}`)
sendFile(from, `${joks.data.result.thumb}`, bbs).catch((e) => reply(from,exp.err()))
await sendFile(from, `${joks.data.result.mp3_url}`)
break;
case'wiki':
if(args === 0) return reply(from,'mau cari apeh')
reply(from,exp.wait())
joink = args.join(' ')
WikipediaAllLaguage('id',`${joink}`).then((res => {
const { result } = res
reply(from,`*Title*: ${result.title}\n\n${result.explanation}`)
}))
break;
case'menu':
case'help':
var times = `${moment.tz('Asia/Jakarta').format('HH:ss')}`
var own = '6281539336834@s.whatsapp.net'
var nodes = process.uptime()
var premi = isPremium ? 'YES':'NO'
const ids = [{buttonId: `${prefix}sc`, buttonText: {displayText: '</Script>'}, type: 1}]

const liste = {
contentText: exp.menu(prefix,pushname,sender,bbv,premi,nodes,own,times),
footerText: 'Version: Beta',
buttons: ids,
headerType: 1
}
hazn.sendMessage(from, liste, MessageType.buttonsMessage, {contextInfo:{mentionedJid:[sender,own]}})
break
case 'listpremium':
let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
let nomorList = 0
const deret = getAllPremiumUser()
const arrayPremi = []
for (let i = 0; i < deret.length; i++) {
const checkExp = ms(getPremiumExpired(deret[i]) - Date.now())
arrayPremium.push(getAllPremiumUser()[i])
nomorList++
listPremi += `${nomorList}. wa.me/${getAllPremiumUser()[i].split("@")[0]}\n➸ *Expired*: ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
}
await reply(from, listPremi)
break
case 'jadibot':
if (mek.key.fromMe) return reply(from,'maaf kamu sudah menjadi bot!')
jadibot(reply, hazn, from)
break
case'sc':
await hazn.sendMessage(from, '*Script*: https://github.com/HaznRe/simple-bot', MessageType.text, { detectLinks: true })
break;
case 'd':
hazn.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
break 
break
case 'stopjadibot':
if (mek.key.fromMe) return reply(from,'maaf kamu bukan owner!')
stopjadibot(reply)
break
case 'listjadibot':
let iki = "*[ SESSION ]*"
for(let aku of listjadibot) {
iki += `*Nomor* : ${aku.jid.split('@')[0]}*Nama* : ${aku.name}\n*Device* : ${aku.phone.device_manufacturer}\n*Model* : ${aku.phone.device_model}\n\n`
}
reply(from,iki)
break
case'nulis':
if(args.length < 1) return  reply(from,exp.txt())
reply(from,exp.wait())
imges = await getBuffer(`https://api.zeks.me/api/nulis?apikey=apivinz&text=${body.slice(6)}`)
await hazn.sendMessage(from, imges, MessageType.image, {quoted:mek,caption:'noh'}).catch((err) => reply(from,'error'))
break
case 'toimg':
if (!isQuotedSticker) return reply(from,'tag sticker nya (:')
reply(from,exp.wait())
var pngs = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
var dt = await hazn.downloadAndSaveMediaMessage(pngs)
ran = getRandom('.png')
exec(`ffmpeg -i ${dt} ${ran}`, (err) => {
fs.unlinkSync(dt)
if(err) return reply(from,exp.err())
buffer = fs.readFileSync(ran)
hazn.sendMessage(from, buffer, image, {quoted:mek,caption:'nih'})
fs.unlinkSync(ran)
})
break
case 'term':
if(!isOwner) return
if (!args.join(' ')) return reply(from,exp.txt())
exec(args.join(' '), (err, stdout) => {
if (err) return reply(from,`SELF-BOT:~ ${err}`)
if (stdout) {
reply(from,stdout)
}
})
break
case 'play':
if (args.length === 0) return reply(from,`Kirim perintah *${prefix}play* _Judul lagu yang akan dicari_`)
var yteh = args.join('')
reply(from,exp.wait())
ytm = await search(yteh);
links = ytm.all 
var getdl = links[0].url							
try {
yta(getdl)
.then((res => {
const { dl_link, thumb, title } = res
axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
.then(async (a) => {
if (Number(filesize) >= 5000) return sendFile(from, thumb, `*[PLAY]*\n\n*ℹ️ Title* : ${title}\n*ℹ️ Ext* : MP3\n*ℹ️ Link* : ${a.data}\n\n_maaf durasi sudah melebihi batas silakan download dari link!_`)
var cap = `*[PLAY]*\n\n*ℹ️ Title* : ${title}\n*ℹ️ Ext* : MP3\n*ℹ️ Link* : ${a.data}\n\n_Tunggu Sebentar!_`
sendFile(from, thumb, cap)
await sendFile(from, dl_link).catch(() => reply(from,exp.err()))
})                
}))
} catch (err) {
reply(from,`${err}`)
}
break  
case'takestick':
if (!isQuotedSticker) return reply(from,`*Example*:\n*${prefix}takestick nama|author*`)
const aku = args.join(' ')
if (!aku.includes('|')) return reply(from,`*Example*:\n*${prefix}takestick nama|author*`)
const encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
const media = await hazn.downloadAndSaveMediaMessage(encmedia, `./temp/${sender}`)
const packnamenye = aku.split('|')[0]
const authornye = aku.split('|')[1]
exif.create(packnamenye, authornye, `aku2_${sender}`)
exec(`webpmux -set exif ./temp/aku2_${sender}.exif ./temp/${sender}.webp -o ./temp/${sender}.webp`, async (error) => {
if (error) return reply(from,'*error ): coba ulangin*')
hazn.sendMessage(from, fs.readFileSync(`./temp/${sender}.webp`), MessageType.sticker, {quoted:mek})
fs.unlinkSync(media)
fs.unlinkSync(`./temp/aku2_${sender}.exif`)
})
break
case'eval':
hazn.sendMessage(from, JSON.stringify(eval(args.join(' ')), null, '\t'), text, {quoted: mek }).catch((err) => reply(from,`${err}`))
break
default:
} 
} catch(e) {
print(`Error: ${e}`.red)
}
})
}

