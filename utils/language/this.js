
exports.wait = () => {
return`*[⌛] Tunggu Sebentar +1*`
}

exports.txt = () => {
return`*Masukan Parameter Text!*`
}

exports.err = () => {
return`*Ada Kesalahan!\n*Report To Admin:*\n*wa.me/+6281539336834*`
}

exports.menu = (prefix,pushname,sender,bbv,premi,nodes,own,times) => {
return`*SELFBOT*

*</info>*
*Halo Kak ${pushname}👋*
*Premium*: ${premi}
*Uptime*: ${bbv(nodes)}
*Sender*: @${sender.split("@")[0]}
*Time*: ${times}
*Prefix*: No Prefix

*</owner>*
*Owner*: @${own.split("@")[0]}

*</menu>*
*${prefix}nulis* _text_
*${prefix}sticker* _send image/video_
*${prefix}eval* _javascript_
*${prefix}takestick* _pack|author_
*${prefix}toimg* _tag sticker_
*${prefix}listpremium*
*${prefix}play* _text_
*${prefix}joox* _lagu_
*${prefix}wiki* _[object]_

*</baileys>*
*${prefix}jadibot*
*${prefix}stopjadibot*
*${prefix}listjadibot*

*</owner>*
*${prefix}term* _code_

*</media>*
*github*: github.com/HaznRe

*</update>*
*Remove Emoji Features!*
*Add Joox*
*Add Wiki*
`
}

