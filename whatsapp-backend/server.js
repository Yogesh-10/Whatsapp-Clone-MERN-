import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Pusher from 'pusher'
import cors from 'cors'
import connectDB from './config/db.js'
import Message from './models/messageModel.js'

dotenv.config()

// connect DB
connectDB()

const app = express()

// pusher
const pusher = new Pusher({
  appId: '1136791',
  key: '7027176c6e97d7bdbb74',
  secret: '7b5c2c0809996599c233',
  cluster: 'ap2',
  useTLS: true,
})

// middleware
app.use(express.json())
app.use(cors())

// ** The below middleware fnction can be used instead of cors package **

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Headers', '*')
//   next()
// })

app.get('/', (req, res) => {
  res.send('hello')
})

const db = mongoose.connection

db.once('open', () => {
  console.log('Db connected')

  const msgCollection = db.collection('messagecontents')
  const changeStream = msgCollection.watch()

  changeStream.on('change', (change) => {
    console.log(change)

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      })
    }
  })
})

app.get('/api/messages/sync', (req, res) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/api/messages/new', (req, res) => {
  const dbMessage = req.body

  Message.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running on port ${PORT}`))
