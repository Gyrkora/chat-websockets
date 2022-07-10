//cliente

const socket = io.connect()

// socket.on('messages', (data) => {
// 	const div = document.getElementById('messages')
// 	const mensajesChat = data
// 		.map((mensaje) => `socketId: ${mensaje.author}`)
// 		.join('<br>')

// 	div.innerHTML = mensajesChat
// })

function addMessage(e) {
	const mensaje = {
		author: document.getElementById('username').value,
		text: document.getElementById('texto').value,
	}
	socket.emit('new-message', mensaje)
	return false //e.prevent.default
}

function render(data) {
	const html = data
		.map((elem) => {
			return `<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`
		})
		.join(' ')
	document.getElementById('messages').innerHTML = html
}

socket.on('messages', function (data) {
	render(data)
})
