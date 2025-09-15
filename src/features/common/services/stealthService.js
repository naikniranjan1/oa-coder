// Enhanced stealth service for AI proctoring evasion
const { screen } = require('electron');

class StealthService {
    constructor() {
        this.robot = null;
        this.isAdvancedStealthEnabled = false;
        this.opacityRandomizer = null;
        this.lastOpacityChange = Date.now();
        this.windowPool = null;
        this.multiMonitorWarningShown = false;
        this.customHotkeys = {};
        this.processNameRandomized = false;
        
        // Initialize robotjs if available
        this.initializeRobotJS();
    }

    initializeRobotJS() {
        try {
            this.robot = require('robotjs');
            console.log('[StealthService] RobotJS initialized successfully');
        } catch (error) {
            console.warn('[StealthService] RobotJS not available:', error.message);
            this.robot = null;
        }
    }

    initialize(windowPool) {
        this.windowPool = windowPool;
        console.log('[StealthService] Initialized with window pool');
    }

    // Task 1: Advanced AI Proctoring Evasion
    enableAdvancedStealth(enabled = true) {
        this.isAdvancedStealthEnabled = enabled;
        
        if (enabled) {
            this.startOpacityRandomization();
            console.log('[StealthService] Advanced stealth mode enabled');
        } else {
            this.stopOpacityRandomization();
            console.log('[StealthService] Advanced stealth mode disabled');
        }
    }

    startOpacityRandomization() {
        if (this.opacityRandomizer) {
            clearInterval(this.opacityRandomizer);
        }

        this.opacityRandomizer = setInterval(() => {
            if (!this.windowPool || !this.isAdvancedStealthEnabled) return;

            // Randomize opacity slightly every 3-7 seconds to mimic natural screen behavior
            const now = Date.now();
            if (now - this.lastOpacityChange < 3000) return;

            this.windowPool.forEach((win, name) => {
                if (win && !win.isDestroyed() && win.isVisible()) {
                    // Subtle opacity changes (0.95-1.0) to avoid visual glitches
                    const randomOpacity = 0.95 + Math.random() * 0.05;
                    try {
                        win.setOpacity(randomOpacity);
                        // Reset to full opacity after a brief moment
                        setTimeout(() => {
                            if (win && !win.isDestroyed()) {
                                win.setOpacity(1.0);
                            }
                        }, 100 + Math.random() * 200);
                    } catch (error) {
                        // Ignore errors for destroyed windows
                    }
                }
            });

            this.lastOpacityChange = now;
        }, 3000 + Math.random() * 4000); // Random interval between 3-7 seconds
    }

    stopOpacityRandomization() {
        if (this.opacityRandomizer) {
            clearInterval(this.opacityRandomizer);
            this.opacityRandomizer = null;
        }

        // Reset all windows to full opacity
        if (this.windowPool) {
            this.windowPool.forEach((win, name) => {
                if (win && !win.isDestroyed()) {
                    try {
                        win.setOpacity(1.0);
                    } catch (error) {
                        // Ignore errors for destroyed windows
                    }
                }
            });
        }
    }

    // Simulate natural keypresses for hotkeys to disguise as normal typing
    simulateNaturalKeypress(accelerator, callback) {
        if (!this.robot || !this.isAdvancedStealthEnabled) {
            // Fallback to normal callback execution
            if (callback) callback();
            return;
        }

        try {
            // Add random delay before keypress (50-200ms)
            const delay = 50 + Math.random() * 150;
            
            setTimeout(() => {
                // Parse accelerator (e.g., "Cmd+H" or "Ctrl+Enter")
                const keys = accelerator.toLowerCase().split('+');
                const modifiers = [];
                let mainKey = '';

                keys.forEach(key => {
                    switch (key.trim()) {
                        case 'cmd':
                        case 'command':
                            modifiers.push('command');
                            break;
                        case 'ctrl':
                        case 'control':
                            modifiers.push('control');
                            break;
                        case 'alt':
                            modifiers.push('alt');
                            break;
                        case 'shift':
                            modifiers.push('shift');
                            break;
                        case 'enter':
                            mainKey = 'enter';
                            break;
                        default:
                            mainKey = key.trim();
                    }
                });

                // Simulate the keypress with natural timing
                if (mainKey) {
                    this.robot.keyTap(mainKey, modifiers);
                }

                // Execute the actual callback after a brief delay
                setTimeout(() => {
                    if (callback) callback();
                }, 10 + Math.random() * 20);

            }, delay);

        } catch (error) {
            console.warn('[StealthService] Error simulating keypress:', error);
            // Fallback to normal callback execution
            if (callback) callback();
        }
    }

    // Task 2: Multi-Monitor and VM Detection
    checkMultiMonitorSetup() {
        const displays = screen.getAllDisplays();
        
        if (displays.length > 1 && !this.multiMonitorWarningShown) {
            this.multiMonitorWarningShown = true;
            return {
                hasMultipleMonitors: true,
                displayCount: displays.length,
                warning: 'Multiple monitors detected. Use only the primary screen to avoid proctoring flags.'
            };
        }

        return {
            hasMultipleMonitors: false,
            displayCount: displays.length
        };
    }

    // Task 6: Dynamic Process Name
    randomizeProcessName() {
        if (this.processNameRandomized) return;

        try {
            // Generate a random system-like process name
            const prefixes = ['system', 'service', 'helper', 'daemon', 'worker'];
            const suffixes = ['process', 'service', 'helper', 'manager', 'handler'];
            const randomId = Math.random().toString(36).slice(2, 8);
            
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            
            const newProcessName = `${prefix}-${suffix}-${randomId}`;
            
            // Set the process title
            process.title = newProcessName;
            this.processNameRandomized = true;
            
            console.log(`[StealthService] Process name randomized to: ${newProcessName}`);
            return newProcessName;
        } catch (error) {
            console.warn('[StealthService] Failed to randomize process name:', error);
            return null;
        }
    }

    // Task 3: Custom Hotkeys Management
    setCustomHotkeys(hotkeys) {
        this.customHotkeys = { ...hotkeys };
        console.log('[StealthService] Custom hotkeys updated:', this.customHotkeys);
    }

    getCustomHotkeys() {
        return { ...this.customHotkeys };
    }

    // Task 4: Browser-specific proctoring countermeasures
    getWebPreferencesForStealth() {
        return {
            webSecurity: false,
            experimentalFeatures: false,
            // Additional privacy settings
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false,
            backgroundThrottling: false
        };
    }

    // Cleanup method
    cleanup() {
        this.stopOpacityRandomization();
        console.log('[StealthService] Cleanup completed');
    }
}

const stealthService = new StealthService();
module.exports = stealthService;