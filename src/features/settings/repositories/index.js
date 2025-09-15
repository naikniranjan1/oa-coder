const sqliteRepository = require('./sqlite.repository');

const settingsRepositoryAdapter = {
    getPresets: () => {
        return sqliteRepository.getPresets('default_user');
    },

    getPresetTemplates: () => {
        return sqliteRepository.getPresetTemplates();
    },

    createPreset: (options) => {
        return sqliteRepository.createPreset({ uid: 'default_user', ...options });
    },

    updatePreset: (id, options) => {
        return sqliteRepository.updatePreset(id, options, 'default_user');
    },

    deletePreset: (id) => {
        return sqliteRepository.deletePreset(id, 'default_user');
    },

    getAutoUpdate: () => {
        return sqliteRepository.getAutoUpdate('default_user');
    },

    setAutoUpdate: (isEnabled) => {
        return sqliteRepository.setAutoUpdate('default_user', isEnabled);
    },
};

module.exports = settingsRepositoryAdapter;
