const Chat = require('../models/chat');
const ObjectId = require('mongoose').Types.ObjectId;

class ChatRepository {

    async create({ lowerId, higherId }) {
        return await Chat.create({
            lowerId: ObjectId(lowerId),
            higherId: ObjectId(higherId),
            messages: [],
        });
    }

    async getChatByUsersId({ lowerId, higherId }) {
        return await Chat.findOne({
            lowerId: ObjectId(lowerId),
            higherId: ObjectId(higherId)
        });
    }

    async getChatById(chatId) {
        return await Chat.findOne({ _id: ObjectId(chatId) });
    }

    async getUserChats(userId) {
        return await Chat.find({
            $or: [
                { 'lowerId': ObjectId(userId) },
                { 'higherId': ObjectId(userId) }
            ]
        }).populate('lowerId').populate('higherId');
    }
}

const chatRepository = new ChatRepository();

module.exports = chatRepository;