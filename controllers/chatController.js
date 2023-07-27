const ChatRepository = require('../repositories/chatRepository');
const ObjectId = require('mongoose').Types.ObjectId;
const Dates = require('../utils/dates');

class ChatController {
    async getChatByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const myId = req._id;

            const lowerId = userId < myId ? userId : myId;
            const higherId = userId > myId ? userId : myId;

            let chat = await ChatRepository.getChatByUserId({
                lowerId,
                higherId
            });

            if (!chat) {
                chat = await ChatRepository.create({
                    lowerId, higherId

                });
            }

            return req.json({
                chat
            });

        } catch (error) {
            return res.json({
                error: true,
                errorMessage: "Error occured: ", error
            });
        }
    }

    async getChats(req, res) {
        try {

        } catch (error) {
            return res.json({
                error: true,
                errorMessage: error
            });

        }
    }


    async sendMessage(req, res) {
        try {

            const chatId = req.params.chatId;
            const myId = req._id;
            const { text } = req.body;

            if (!text || !text.trim()) {
                return res.json({
                    error: true,
                    errorMessage: "Message sending failed"
                });
            }

            const chat = await ChatRepository.getChatById(chatId);
            const datetime = Date.getDateTime();
            const messageId = ObjectId();
            chat.messages.push({
                _id: messageId,
                userId: ObjectId(myId),
                text,
                createdAt: datetime
            });
            console.log('chat now: ', chat);
            chat.save();
            return res.json({
                chat
            });

        } catch (error) {
            console.error(error);
            return res.json({
                error: true,
                errorMessage: error
            });

        }
    }
}

const chatController = new ChatController();

module.exports = chatController;