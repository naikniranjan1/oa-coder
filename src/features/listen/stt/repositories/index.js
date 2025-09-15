const sqliteRepository = require('./sqlite.repository');

const sttRepositoryAdapter = {
    addTranscript: ({ sessionId, speaker, text }) => {
        return sqliteRepository.addTranscript({ uid: 'default_user', sessionId, speaker, text });
    },
    getAllTranscriptsBySessionId: (sessionId) => {
        return sqliteRepository.getAllTranscriptsBySessionId(sessionId);
    }
};

module.exports = sttRepositoryAdapter; 