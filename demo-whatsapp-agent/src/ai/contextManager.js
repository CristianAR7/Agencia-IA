// Sistema simple de gestión de contexto
// En producción, esto debería usar una base de datos real

const conversations = new Map();

async function getContext(userId) {
    if (!conversations.has(userId)) {
        conversations.set(userId, {
            history: [],
            userData: {},
            createdAt: new Date()
        });
    }
    return conversations.get(userId);
}

async function updateContext(userId, data) {
    const context = await getContext(userId);
    
    // Agregar al historial
    if (data.lastMessage) {
        context.history.push({
            role: 'user',
            content: data.lastMessage,
            timestamp: data.timestamp
        });
    }
    
    if (data.lastResponse) {
        context.history.push({
            role: 'assistant',
            content: data.lastResponse,
            timestamp: data.timestamp
        });
    }

    // Mantener solo últimos 20 mensajes
    if (context.history.length > 20) {
        context.history = context.history.slice(-20);
    }

    // Actualizar datos adicionales
    Object.assign(context.userData, data.userData || {});

    conversations.set(userId, context);
    return context;
}

async function clearContext(userId) {
    conversations.delete(userId);
}

module.exports = {
    getContext,
    updateContext,
    clearContext
};
