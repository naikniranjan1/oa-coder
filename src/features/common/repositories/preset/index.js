const sqliteRepository = require('./sqlite.repository');

const presetRepositoryAdapter = {
    getPresets: () => {
        return sqliteRepository.getPresets('default_user');
    },

    getPresetTemplates: () => {
        return sqliteRepository.getPresetTemplates();
    },

    create: (options) => {
        return sqliteRepository.create({ uid: 'default_user', ...options });
    },

    update: (id, options) => {
        return sqliteRepository.update(id, options, 'default_user');
    },

    delete: (id) => {
        return sqliteRepository.delete(id, 'default_user');
    },
};

module.exports = presetRepositoryAdapter; 