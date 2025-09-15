// Enhanced preload script for OA-Coder with stealth features
const { contextBridge, ipcRenderer } = require('electron');

// Enhanced for AI proctoring evasion: Expose stealth APIs to renderer
contextBridge.exposeInMainWorld('api', {
    // Settings View APIs
    settingsView: {
        // Existing APIs
        getCurrentUser: () => ipcRenderer.invoke('get-current-user'),
        getPresets: () => ipcRenderer.invoke('settings:getPresets'),
        getAutoUpdate: () => ipcRenderer.invoke('settings:get-auto-update'),
        setAutoUpdate: (isEnabled) => ipcRenderer.invoke('settings:set-auto-update', isEnabled),
        getModelSettings: () => ipcRenderer.invoke('settings:get-model-settings'),
        clearApiKey: (provider) => ipcRenderer.invoke('settings:clear-api-key', { provider }),
        setSelectedModel: (type, modelId) => ipcRenderer.invoke('settings:set-selected-model', { type, modelId }),
        
        // Enhanced for AI proctoring evasion: Advanced stealth APIs
        getAdvancedStealth: () => ipcRenderer.invoke('settings:get-advanced-stealth'),
        setAdvancedStealth: (isEnabled) => ipcRenderer.invoke('settings:set-advanced-stealth', isEnabled),
        setCustomHotkeys: (customHotkeys) => ipcRenderer.invoke('settings:set-custom-hotkeys', customHotkeys),
        getCustomHotkeys: () => ipcRenderer.invoke('settings:get-custom-hotkeys'),
        
        // Ollama APIs
        getOllamaStatus: () => ipcRenderer.invoke('settings:get-ollama-status'),
        ensureOllamaReady: () => ipcRenderer.invoke('settings:ensure-ollama-ready'),
        shutdownOllama: () => ipcRenderer.invoke('settings:shutdown-ollama'),
        
        // Model APIs
        validateKey: (data) => ipcRenderer.invoke('model:validate-key', data),
        getAllKeys: () => ipcRenderer.invoke('model:get-all-keys'),
        removeApiKey: (provider) => ipcRenderer.invoke('model:remove-api-key', provider),
        getSelectedModels: () => ipcRenderer.invoke('model:get-selected-models'),
        getAvailableModels: (data) => ipcRenderer.invoke('model:get-available-models', data),
        
        // Whisper APIs
        downloadWhisperModel: (modelId) => ipcRenderer.invoke('whisper:download-model', modelId),
        getWhisperInstalledModels: () => ipcRenderer.invoke('whisper:get-installed-models'),
        
        // Ollama specific APIs
        pullOllamaModel: (modelName) => ipcRenderer.invoke('ollama:pull-model', modelName),
        
        // Window management
        toggleContentProtection: () => ipcRenderer.invoke('shortcut:toggleAllWindowsVisibility'),
        getContentProtectionStatus: () => ipcRenderer.invoke('get-content-protection-status'),
        moveWindowStep: (direction) => ipcRenderer.invoke('move-window-step', direction),
        openPersonalizePage: () => ipcRenderer.invoke('open-personalize-page'),
        quitApplication: () => ipcRenderer.invoke('quit-application'),
        
        // Shortcuts APIs
        getCurrentShortcuts: () => ipcRenderer.invoke('settings:getCurrentShortcuts'),
        openShortcutSettingsWindow: () => ipcRenderer.invoke('shortcut:openShortcutSettingsWindow'),
        
        // Event listeners
        onUserStateChanged: (callback) => {
            ipcRenderer.on('user-state-changed', callback);
        },
        removeOnUserStateChanged: (callback) => {
            ipcRenderer.removeListener('user-state-changed', callback);
        },
        onSettingsUpdated: (callback) => {
            ipcRenderer.on('settings-updated', callback);
        },
        removeOnSettingsUpdated: (callback) => {
            ipcRenderer.removeListener('settings-updated', callback);
        },
        onPresetsUpdated: (callback) => {
            ipcRenderer.on('presets-updated', callback);
        },
        removeOnPresetsUpdated: (callback) => {
            ipcRenderer.removeListener('presets-updated', callback);
        },
        onShortcutsUpdated: (callback) => {
            ipcRenderer.on('shortcuts-updated', callback);
        },
        removeOnShortcutsUpdated: (callback) => {
            ipcRenderer.removeListener('shortcuts-updated', callback);
        },
        
        // Enhanced for AI proctoring evasion: LocalAI progress tracking
        onLocalAIInstallProgress: (callback) => {
            ipcRenderer.on('localai:install-progress', callback);
        },
        removeOnLocalAIInstallProgress: (callback) => {
            ipcRenderer.removeListener('localai:install-progress', callback);
        },
        
        // Window control APIs
        showSettingsWindow: () => ipcRenderer.invoke('show-settings-window'),
        hideSettingsWindow: () => ipcRenderer.invoke('hide-settings-window'),
        cancelHideSettingsWindow: () => ipcRenderer.invoke('cancel-hide-settings-window'),
    },
    
    // Ask service APIs
    ask: {
        sendQuestion: (userPrompt) => ipcRenderer.invoke('ask:sendQuestionFromAsk', userPrompt),
        toggleAskButton: () => ipcRenderer.invoke('ask:toggleAskButton'),
        closeAskWindow: () => ipcRenderer.invoke('ask:closeAskWindow'),
    },
    
    // Listen service APIs
    listen: {
        sendMicAudio: (data) => ipcRenderer.invoke('listen:sendMicAudio', data),
        sendSystemAudio: (data) => ipcRenderer.invoke('listen:sendSystemAudio', data),
        startMacosSystemAudio: () => ipcRenderer.invoke('listen:startMacosSystemAudio'),
        stopMacosSystemAudio: () => ipcRenderer.invoke('listen:stopMacosSystemAudio'),
        isSessionActive: () => ipcRenderer.invoke('listen:isSessionActive'),
        changeSession: (listenButtonText) => ipcRenderer.invoke('listen:changeSession', listenButtonText),
    },
    
    // Shortcuts APIs
    shortcuts: {
        getDefaultShortcuts: () => ipcRenderer.invoke('shortcut:getDefaultShortcuts'),
        saveShortcuts: (newKeybinds) => ipcRenderer.invoke('shortcut:saveShortcuts', newKeybinds),
        closeShortcutSettingsWindow: () => ipcRenderer.invoke('shortcut:closeShortcutSettingsWindow'),
        
        // Event listeners
        onShortcutsLoaded: (callback) => {
            ipcRenderer.on('shortcut:loadShortcuts', callback);
        },
        removeOnShortcutsLoaded: (callback) => {
            ipcRenderer.removeListener('shortcut:loadShortcuts', callback);
        },
    },
    
    // Permission APIs
    permissions: {
        checkSystemPermissions: () => ipcRenderer.invoke('check-system-permissions'),
        requestMicrophonePermission: () => ipcRenderer.invoke('request-microphone-permission'),
        openSystemPreferences: (section) => ipcRenderer.invoke('open-system-preferences', section),
        markKeychainCompleted: () => ipcRenderer.invoke('mark-keychain-completed'),
        checkKeychainCompleted: () => ipcRenderer.invoke('check-keychain-completed'),
        initializeEncryptionKey: () => ipcRenderer.invoke('initialize-encryption-key'),
    },
    
    // General utility APIs
    getWebUrl: () => ipcRenderer.invoke('get-web-url'),
    getPresetTemplates: () => ipcRenderer.invoke('get-preset-templates'),
});

// Enhanced for AI proctoring evasion: Add stealth-specific event listeners
window.addEventListener('DOMContentLoaded', () => {
    // Listen for stealth mode changes
    ipcRenderer.on('stealth-mode-changed', (event, data) => {
        console.log('[Preload] Stealth mode changed:', data);
        // Dispatch custom event for renderer to handle
        window.dispatchEvent(new CustomEvent('stealth-mode-changed', { detail: data }));
    });
    
    // Listen for custom hotkey updates
    ipcRenderer.on('custom-hotkeys-updated', (event, data) => {
        console.log('[Preload] Custom hotkeys updated:', data);
        window.dispatchEvent(new CustomEvent('custom-hotkeys-updated', { detail: data }));
    });
    
    // Listen for multi-monitor warnings
    ipcRenderer.on('multi-monitor-warning', (event, data) => {
        console.log('[Preload] Multi-monitor warning:', data);
        window.dispatchEvent(new CustomEvent('multi-monitor-warning', { detail: data }));
    });
});

console.log('[Preload] Enhanced preload script loaded with stealth features');