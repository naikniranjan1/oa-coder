const sqliteRepository = require('./sqlite.repository');

let authService = null;

function getAuthService() {
    if (!authService) {
        authService = require('../../services/authService');
    }
    return authService;
}

const userRepositoryAdapter = {
    findOrCreate: (user) => {
        return sqliteRepository.findOrCreate(user);
    },
    
    getById: () => {
        return sqliteRepository.getById('default_user');
    },

    update: (updateData) => {
        return sqliteRepository.update({ uid: 'default_user', ...updateData });
    },

    deleteById: () => {
        return sqliteRepository.deleteById('default_user');
    }
};

module.exports = {
    ...userRepositoryAdapter
}; 