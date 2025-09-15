// Simple AI provider factory to restore chat functionality
const openaiProvider = require('./providers/openai');
const anthropicProvider = require('./providers/anthropic');
const geminiProvider = require('./providers/gemini');
const ollamaProvider = require('./providers/ollama');

const PROVIDER_MAP = {
    'openai': openaiProvider,
    'anthropic': anthropicProvider, 
    'gemini': geminiProvider,
    'ollama': ollamaProvider
};

function createStreamingLLM(provider, options) {
    const providerModule = PROVIDER_MAP[provider];
    if (!providerModule || !providerModule.createStreamingLLM) {
        throw new Error(`Provider ${provider} not found or does not support streaming LLM`);
    }
    return providerModule.createStreamingLLM(options);
}

function getProviderClass(provider) {
    return PROVIDER_MAP[provider];
}

module.exports = {
    createStreamingLLM,
    getProviderClass
};