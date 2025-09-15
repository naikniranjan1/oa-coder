const { BrowserWindow } = require('electron');
const sessionRepository = require('../repositories/session');
const providerSettingsRepository = require('../repositories/providerSettings');
const permissionService = require('./permissionService');

class AuthService {
    constructor() {
        this.currentUserId = 'default_user';
        this.currentUserMode = 'local'; // 'local' or 'firebase'
        this.currentUser = null;
        this.isInitialized = false;

        // This ensures the key is ready before any login/logout state change.
        this.initializationPromise = null;
    }

    initialize() {
        if (this.isInitialized) return this.initializationPromise;

        this.initializationPromise = new Promise((resolve) => {
            // Local mode only - no Firebase authentication
            console.log('[AuthService] Initialized in local mode');
            this.isInitialized = true;
            this.broadcastUserState();
            resolve();
        });

        return this.initializationPromise;
    }

    async startFirebaseAuthFlow() {
        throw new Error('Firebase authentication is not supported in local mode');
    }

    async signInWithCustomToken(token) {
        throw new Error('Firebase authentication is not supported in local mode');
    }

    async signOut() {
        // Local mode - no actual sign out needed
        console.log('[AuthService] Sign out called in local mode (no-op)');
    }

    broadcastUserState() {
        const userState = this.getCurrentUser();
        console.log('[AuthService] Broadcasting user state change:', userState);
        BrowserWindow.getAllWindows().forEach(win => {
            if (win && !win.isDestroyed() && win.webContents && !win.webContents.isDestroyed()) {
                win.webContents.send('user-state-changed', userState);
            }
        });
    }

    async startFirebaseAuthFlow() {
        try {
            // Removed web URL usage
            console.log(`[AuthService] Firebase auth - web removed`);
            return { success: false, message: 'Web auth removed' };
        } catch (error) {
            console.error('[AuthService] Failed to open Firebase auth URL:', error);
            return { success: false, error: error.message };
        }
    }

    async signInWithCustomToken(token) {
        throw new Error('Firebase authentication is not supported in local mode');
    }

    async signOut() {
        // Local mode - no actual sign out needed
        console.log('[AuthService] Sign out called in local mode (no-op)');
    }
    
    broadcastUserState() {
        const userState = this.getCurrentUser();
        console.log('[AuthService] Broadcasting user state change:', userState);
        BrowserWindow.getAllWindows().forEach(win => {
            if (win && !win.isDestroyed() && win.webContents && !win.webContents.isDestroyed()) {
                win.webContents.send('user-state-changed', userState);
            }
        });
    }

    getCurrentUserId() {
        return this.currentUserId;
    }

    getCurrentUser() {
        const isLoggedIn = !!(this.currentUserMode === 'firebase' && this.currentUser);

        if (isLoggedIn) {
            return {
                uid: this.currentUser.uid,
                email: this.currentUser.email,
                displayName: this.currentUser.displayName,
                mode: 'firebase',
                isLoggedIn: true,
                //////// before_modelStateService ////////
                // hasApiKey: this.hasApiKey // Always true for firebase users, but good practice
                //////// before_modelStateService ////////
            };
        }
        return {
            uid: this.currentUserId, // returns 'default_user'
            email: 'contact@oacoder.dev',
            displayName: 'Default User',
            mode: 'local',
            isLoggedIn: false,
            //////// before_modelStateService ////////
            // hasApiKey: this.hasApiKey
            //////// before_modelStateService ////////
        };
    }
}

const authService = new AuthService();
module.exports = authService; 