const sqliteRepository = require('./sqlite.repository');

let authService = null;

function setAuthService(service) {
    authService = service;
}

// The adapter layer for session operations
const sessionRepositoryAdapter = {
    getById: (id) => sqliteRepository.getById(id),
    
    create: (type = 'ask') => {
        return sqliteRepository.create('default_user', type);
    },
    
    getAllByUserId: () => {
        return sqliteRepository.getAllByUserId('default_user');
    },

    updateTitle: (id, title) => sqliteRepository.updateTitle(id, title),
    
    deleteWithRelatedData: (id) => sqliteRepository.deleteWithRelatedData(id),

    end: (id) => sqliteRepository.end(id),

    updateType: (id, type) => sqliteRepository.updateType(id, type),

    touch: (id) => sqliteRepository.touch(id),

    getOrCreateActive: (requestedType = 'ask') => {
        return sqliteRepository.getOrCreateActive('default_user', requestedType);
    },

    endAllActiveSessions: () => {
        return sqliteRepository.endAllActiveSessions('default_user');
    },
};

module.exports = sessionRepositoryAdapter; 