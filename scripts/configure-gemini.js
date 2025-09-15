// Quick script to configure Gemini as the active provider
const path = require('path');
const Database = require('better-sqlite3');

// Update these values
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // Get from https://makersuite.google.com/app/apikey
const GEMINI_MODEL = 'gemini-1.5-flash-latest';

const dbPath = path.join(__dirname, 'oacoder.db');
const db = new Database(dbPath);

console.log('Configuring Gemini provider...');

try {
    // Insert/update Gemini provider settings
    const insertStmt = db.prepare(`
        INSERT INTO provider_settings (provider, api_key, selected_llm_model, selected_stt_model, is_active_llm, is_active_stt, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(provider) DO UPDATE SET
            api_key = excluded.api_key,
            selected_llm_model = excluded.selected_llm_model,
            updated_at = excluded.updated_at
    `);
    
    const now = Date.now();
    insertStmt.run('gemini', GEMINI_API_KEY, GEMINI_MODEL, null, 0, 0, now, now);
    
    // Set Gemini as active LLM provider (deactivate others first)
    const deactivateStmt = db.prepare('UPDATE provider_settings SET is_active_llm = 0');
    deactivateStmt.run();
    
    const activateStmt = db.prepare('UPDATE provider_settings SET is_active_llm = 1 WHERE provider = ?');
    activateStmt.run('gemini');
    
    console.log('✅ Gemini configured successfully!');
    console.log(`   Provider: gemini`);
    console.log(`   Model: ${GEMINI_MODEL}`);
    console.log(`   Status: Active LLM provider`);
    
    // Verify the configuration
    const verifyStmt = db.prepare('SELECT * FROM provider_settings WHERE provider = ?');
    const result = verifyStmt.get('gemini');
    console.log('\n📋 Current configuration:', {
        provider: result.provider,
        model: result.selected_llm_model,
        active: result.is_active_llm === 1,
        hasApiKey: !!result.api_key
    });
    
} catch (error) {
    console.error('❌ Error configuring Gemini:', error.message);
} finally {
    db.close();
}