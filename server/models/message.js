import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  time: Number,
  text: {
    type: String,
    required: true,
  },
}, { collection: 'messages' });

if (!MessageSchema.options.toObject) {
  MessageSchema.options.toObject = {};
}

MessageSchema.options.toObject.transform = (doc, ret) => ({
  id: ret._id,
  time: ret.time,
  text: ret.text,
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
