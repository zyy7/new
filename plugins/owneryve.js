let handler = function (m) {
	this.sendContact(m.chat, '6285924761802', 'Owner Ex-Botz :)', m)
}

handler.customPrefix = ['🍭Owner Ex-bot'] 
handler.command = new RegExp

module.exports = handler