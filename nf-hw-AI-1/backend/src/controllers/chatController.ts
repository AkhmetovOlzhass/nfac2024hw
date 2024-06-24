const { sendMessageToGPT } = require('../services/chatService');

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


const MessageSchema = new mongoose.Schema({
    text: String,
    sender: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send_message', async (data) => {
      try {
        const responseText = await sendMessageToGPT(data.text);
        const savedMessage = new Message({ text: data.text, sender: 'user' });
        await savedMessage.save();

        let text = '';
        for await (const chunk of responseText.stream) {
          const chunkText = chunk.text(); 
          console.log(chunkText);
          text += chunkText;
          socket.emit('receive_message', { text: text , sender: 'bot' });
        }

        const savedResponse = new Message({ text: text, sender: 'bot' });
        await savedResponse.save();
        

      } catch (error) {
        console.error('Error processing message with AI:', error);
        socket.emit('receive_message', { text: "Error processing your message.", sender: 'bot' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

export { setupSocket , Message}