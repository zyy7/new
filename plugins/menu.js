let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let { performance } = require('perf_hooks')
let neww = Math.round(performance.now())
let old = Math.round(performance.now())
const chats = conn.chats.all()
const groups = chats.filter(v => v.jid.endsWith('g.us'))
const defaultMenu = {
  before: `
┌──❀「 Info Pengguna 」❀─●
├──────────────────❀
┴
⬡│▸ *Name:* %name
⬡│▸ *Premium:* %prems
⬡│▸ *Age:* %age
⬡│▸ *Limit:* %limit
⬡│▸ *Money:* %money
⬡│▸ *Role:* %role
⬡│▸ *Level:* %level [%xp4levelup]
⬡│▸ *Xp:* %exp / %maxexp
⬡│▸ *Total Xp:* %totalexp
┬
├──────────────────❀
├──❀「 Today View 」❀─●
├──────────────────❀
┴
 ⬡ *${ucapan()} %name!*. ⬡
⬡│▸ *Tanggal:* %week %weton, %date
⬡│▸ *Tanggal Islam:* %dateIslamic
⬡│▸ *Waktu:* %time
┬
├──────────────────❀
├──❀「 EX BOTZ 」❀─●
├──────────────────❀
┴
⬡│▸ *Nama Bot:* %me
⬡│▸ *Mode:* ${global.opts['self'] ? 'Private' : 'Publik'}
⬡│▸ *Prefix:* [ ! ]
⬡│▸ *Speed:* 2225.8723070025 ms
⬡│▸ *Battery:* ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
⬡│▸ *Platform:* Unbuntu linux
⬡│▸ *Uptime:* %uptime (%muptime)
⬡│▸ *Database:* %rtotalreg dari %totalreg
┬ │
│ ╰────────────❀
╰────────────────────❀
%readmore`.trimStart(),
  header: '╭═[ *%category* ]═────···\n┴',
  body: '│⬡▸ %cmd %islimit %isPremium',
  footer: '┬\n╰───────────···',
  after: `⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕.
     %me
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
	let bzz = './audio/robot.m4a'
	let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw } = global.db.data.settings[conn.user.jid]
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['allmenu', 'game', 'edukasi', 'news', 'nsfw', 'xp', 'stiker', 'image', 'anime', 'kerangajaib', 'quotes', 'admin', 'rpg', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'vote', 'tanpakategori', 'owner', 'gift', 'thnks']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'allmenu') tags = {
    'main': 'Utama',
    'game': 'Game',
    'rpg': 'Epic Rpg',
    'xp': 'Exp & Limit',
    'fun': 'Fun',
    'jodoh': 'Jodoh',
    'gift': 'Gift',
    'anime': 'Anime',
    'hentai': `NSFW`,
    'premium': 'Premium',
    'anonymous': 'Anonymous Chat',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'absen': 'Absen',
    'voting': 'vote',
    'admin': `Admin`,
    'group': 'Grup',
    'news': 'News',
    'internet': 'Internet',
    'edukasi': 'Edukasi',
    'quran': 'Islam',
    'image': 'Random Image',
    'sticker': 'Stiker',
    'nulis': 'MagerNulis & Logo',
    'audio': 'Pengubah Suara',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'database': 'Database',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
    'thnks': 'THANKS TO',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'nsfw') tags = {
    'hentai': 'NSFW',
    'nsfw': 'HENTAI',
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Epic Rpg'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Random Image'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun',
    'jodoh': 'Jodoh'
  }
  if (teks == 'jodoh') tags = {
    'jodoh': 'Jodoh'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
    if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'quran') tags = {
    'quran': 'Islam'
  }
  if (teks == 'gift') tags = {
    'gift': 'Gift'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'thnks') tags = {
    'thnks': 'THANKS TO'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { money, age, exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let premium = global.db.data.users[m.sender].premium
    let prems = `${premium ? 'Yes': 'No'}`
    let wm = global.botwm
    let logo = global.logo
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": ``.trim(),
          "description": `${ucapan()}, ${name} !`.trim(),
          "footerText": `Jika Menemukan Button Eror/Tak Terlihat Langsung Ketik\n  _*. Allmenu*_ ,Pilih Menu Dibawah
     ▌│█║▌║▌║║▌║▌║█│▌
     
           ${week}, ${date}
Info CMD = 
Ⓛ = Limit
Ⓟ = Premium
*©Ex Botz*`,
          "buttonText": "ɪɴᴘᴜᴛ ᴍᴇɴᴜ!",
          "listType": "SINGLE_SELECT",
          "sections": [
                            {
                                "rows": [{
                                         "title": "[📊] Status",
                                         "description": "Status Lord Bot",
                                         "rowId": ".botstat"
                                    }, {
                                         "title": "[⚡] Speed",
                                         "description": "Menampilkann Kecepatan Respon Bot",
                                         "rowId": ".ping"
                                    }, {
                                         "title": "[🗒️] Info",
                                         "description": "Menampilkan Info Bot",
                                         "rowId": ".info"
                                    }, {
                                         "title": "[🎐] Creator",
                                         "description": "Kontak Creator Bot >_<",
                                         "rowId": ".owner"
                       }],
                    "title": "✧──────────[ Stats ]──────────✧"
                }, {
                  "rows": [{
                  "title": "All Menu 「 01 」 |🧾|",
                  "description": "Menampilkan Seluruh Menu Bot",
                  "rowId": ".? allmenu"
                }, {
                  "title": "Menu Game 「 02 」 |🎮|",
                  "description": "Manampilkan Seluruh Game Pada Bot",
                  "rowId": ".? game"
                }, {
                  "title": "Menu RPG 「 03 」 |📉|",
                  "description": "Menampilkan Menu RPG Pada Bot",
                  "rowId": ".? rpg"
                }, {
                  "title": "Menu Exp & Limit 「 04 」 |✨|",
                  "description": "Menampilkan Menu Exp & limit Pada Bot",
                  "rowId": ".? xp"
                }, {
                  "title": "Menu Fun 「 05 」 |🧩|",
                  "description": "Mau Bersenang-senang Dengan Bot?",
                  "rowId": ".? fun"
                }, {
                  "title": "Menu Gift 「 06 」 |🎁|",
                  "description": "Ayo Gift Teman Mu/Berbagi",
                  "rowId": ".? gift"
                }, {
                  "title": "Menu NSFW 「 07 」 |🔞|",
                  "description": "🔞Hanya Untuk Umur 18+",
                  "rowId": ".? nsfw"
                }, {
                  "title": "Menu Anime 「 08 」 |⛩️|",
                  "description": "Ngewibu Yuk ",
                  "rowId": ".? anime"
                }, {
                  "title": "Menu News 「 09 」 |📰|",
                  "description": "Cari Sesuatu Yang Baru",
                  "rowId": ".? News"
                },  {
                  "title": "Menu Islami 「 10 」 |🕋|",
                  "description": "Menampilkan Menu Islami+Tobat Bareng",
                  "rowId": ".? quran"
                }, {
                  "title": "Menu Edukasi 「 11 」 |🏫|",
                  "description": "Menampilkan Menu Edukasi",
                  "rowId": ".? edukasi"
                }, {
                  "title": "Menu Random Image 「 12 」 |🖼️|",
                  "description": "Cari Image Random Dari Bot",
                  "rowId": ".? image"
                },  {
                  "title": "Menu Sticker 「 13 」 |🎫|",
                  "description": "Create Sticker Pake Bot",
                  "rowId": ".? stiker"
                }, {
                  "title": "Keranv Ajaib 「 14 」 |🐚|",
                  "description": "Yuk Tanya Ke Kerang ajaib",
                  "rowId": ".? kerangajaib"
                }, {
                  "title": "Menu Quotes 「 15 」 |📑|",
                  "description": "Cari Motivasi Yuk",
                  "rowId": ".? quotes"
                }, {
                  "title": "Menu Admin 「 16 」 |👑|",
                  "description": "Admin Group",
                  "rowId": ".? admin"
                }, {
                  "title": "Menu Untuk Group 「 17 」 |👥|",
                  "description": "Group Chat",
                  "rowId": ".? grup"
                }, {
                  "title": "Menu Premium User 「 18 」 |🌟|",
                  "description": "Menu Khusus Premium",
                  "rowId": ".? premium"
                }, {
                  "title": "Menu Interner 「 19 」 |💻|",
                  "description": "Cari Apa² Di Internet",
                  "rowId": ".? internet"
                }, {
                  "title": "Menu Anonymous 「 20 」 |🎭|",
                  "description": "Anonymous Chat",
                  "rowId": ".? anonymous"
                }, {
                  "title": "Menu create logo & menulis 「 21 」 |✍️|",
                  "description": "Menulis & Membuat Logo",
                  "rowId": ".? nulis"
                }, {
                  "title": "Menu Downloader 「 22 」 |📥|",
                  "description": "Mau Download Sesuatu?",
                  "rowId": ".? downloader"
                }, {
                  "title": "Menu Tools 「 23 」 |🧰|",
                  "description": "Tools",
                  "rowId": ".? tools"
                }, {
                  "title": "Menu Database 「 24 」 |📂|",
                  "description": "Database",
                  "rowId": ".? database"
                }, {
                  "title": "Menu 「 25 」 |🗳️|",
                  "description": "Vote & Absen",
                  "rowId": ".? vote"
                }, {
                  "title": "Menu 「 26 」 |🎙️|",
                  "description": "Voice Changer",
                  "rowId": ".? audio"
                }, {
                  "title": "Menu Jadibot 「 27 」 |🤖|",
                  "description": "Mau Jadibot?",
                  "rowId": ".? jadibot"
                }, {
                  "title": "Info Bot 「 28 」 |ℹ️|",
                  "description": "Menampilkan Info Bot",
                  "rowId": ".? info"
                }, {
                  "title": "No Category 「 29 」 |❓|",
                  "description": "No Category",
                  "rowId": ".? tanpakategori"
                }, {
                  "title": "Menu Owner 「 30 」 | 🧑‍💻|",
                  "description": "Menampilkan Menu Yang Berlaku Pada Owner & User Premium 💳",
                  "rowId": ".? owner"
                }],
                                "title": "✧───────────────[ Menu ]───────────────✧"
                                }, {
                                "rows": [{
                                "title": "[🗳️] Donasi",
                                "description": "Donasi kak, Untuk Update Bot Seterusnya",
                                "rowId": ".donasi"
                                }, {
                                "title": "[🔖] Sewa",
                                "description": "Menampilkan List harga sewabot",
                                "rowId": ".sewa"
                                }, {
                                "title": "[🎗️] Premium",
                                "description": "Menampilkan List Harga premium",
                                "rowId": ".premium"
                                }, {
                                "title": "[🔬] Script",
                                "description": "Script Bot",
                                "rowId": ".sc"
                                }, {
                                "title": "[🎖️] Thanks To",
                                "description": "Terima kasih banyak untuk user yang telah berpartisipasi dalam bot",
                                "rowId": ".? thnks"
                                }],
                                "title": "✧────────────────[ Info ]────────────────✧"
                            }
                        ], "contextInfo": 
                         { "stanzaId": m.key.id,
                        "participant": m.sender,
                        "quotedMessage": m.message
                        }
                    }
                 }, {}), {waitForAck: true})
  
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '*🅛*' : '')
                .replace(/%isPremium/g, menu.premium ? '*🅟*' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      money, age, prems, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    // await conn.send3ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), '🎮 Ex вσт', 'Owner', '.owner', 'Donasi', '.donasi', 'Rules', '.infobot', m)
    await conn.send2ButtonLoc(m.chat, logo, '─────[ *ALL MENU* ]─────\nInfo Cmd=\n*Ⓟ*= Premium\n*Ⓛ*= Limit', text.trim(), 'Owner', '.owner', 'Rules', '.rules', m)
    let nama = await conn.getName(m.sender)
    let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}


  logo2 = global.logo
  kanna = fs.readFileSync('./src/logo3.jpg')
  kannaImg = (await conn.prepareMessage('0@s.whatsapp.net', kanna, MessageType.image, { thumbnail: Buffer.alloc(0) })).message.imageMessage
  sumberImg = await (await fetch(fla + teks + ' menu')).buffer()
  image = (await conn.prepareMessage('0@s.whatsapp.net', logo2, MessageType.image, { thumbnail: Buffer.alloc(0) })).message.imageMessage
  /*res = await conn.prepareMessageFromContent(m.chat, {
    "productMessage": {
      "product": {
        "productImage": image,
        "productId": "4938174216214248",
        "title": '✧───────···[ Menu ]···────────✧',
        "description": `\n${wm}\n` + text,
        "retailerId": `${week}, ${date}  |  ʙʏ ᴢʏʏxᴅ ‷♪`,
        "url": '\n',
        "descriptionCount": "999999999",
        "productImageCount": "1",
      },
      "businessOwnerJid": "0@s.whatsapp.net",
      "contextInfo": {
        "forwardingScore": 9999,
        "isForwarded": true
      }
    }
  },
    { quoted: fkon })
  conn.relayWAMessage(res)*/
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', '?', 'help']
handler.tags = ['main']
handler.command = /^(menu|\?|help)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi 🌄"
  }
  if (time > 10) {
    res = "Selamat siang ☀️"
  }
  if (time >= 15) {
    res = "Selamat sore 🌇"
  }
  if (time >= 18) {
    res = "Selamat malam 🌙"
  }
  return res
}
