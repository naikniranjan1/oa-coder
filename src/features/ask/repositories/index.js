const sqliteRepository = require('./sqlite.repository');

// The adapter layer for ask operations
const askRepositoryAdapter = {
    addAiMessage: ({ sessionId, role, content, model }) => {
        return sqliteRepository.addAiMessage({ uid: 'default_user', sessionId, role, content, model });
    },
    getAllAiMessagesBySessionId: (sessionId) => {
        return sqliteRepository.getAllAiMessagesBySessionId(sessionId);
    }
};

module.exports = askRepositoryAdapter; 