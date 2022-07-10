import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

//variables
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const messages = [
	{ author: 'Juan', text: '¡Hola! ¿Que tal?' },
	{ author: 'Pedro', text: '¡Muy bien! ¿Y vos?' },
	{ author: 'Ana', text: '¡Genial!' },
]

//rutas
app.use(express.static('./public'))

//conectando socket.io
io.on('connection', (socket) => {
	console.log('Un cliente se ha conectado')
	socket.emit('messages', messages)

	socket.on('new-message', (data) => {
		messages.push(data)
		io.sockets.emit('messages', messages)
	})
})

const PORT = process.env.PORT || 8080

//levantando
httpServer.listen(PORT, function () {
	console.log(`Servidor corriendo en puerto: ${PORT}`)
})
