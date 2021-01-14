import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
})

const Message = mongoose.model('messagecontent', messageSchema)

export default Message
