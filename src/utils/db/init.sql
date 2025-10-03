SET client_min_messages TO WARNING;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY,         
    username TEXT NOT NULL,        
    joined_at TIMESTAMP DEFAULT NOW(),
    is_bot BOOLEAN DEFAULT FALSE,
    osu_id BIGINT
);

-- Tabla de servidores (guilds)
CREATE TABLE IF NOT EXISTS guilds (
    id BIGINT PRIMARY KEY,         
    name TEXT NOT NULL,
    owner_id BIGINT REFERENCES users(id),
    log_channel_id BIGINT,   
    prefix TEXT DEFAULT '!',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de membresías
CREATE TABLE IF NOT EXISTS guild_members (
    guild_id BIGINT REFERENCES guilds(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (guild_id, user_id)
);

-- Tabla de roles del bot
CREATE TABLE IF NOT EXISTS bot_roles (
    id SERIAL PRIMARY KEY,
    guild_id BIGINT REFERENCES guilds(id) ON DELETE CASCADE,
    role_name TEXT NOT NULL,
    permissions TEXT[] DEFAULT '{}'
);

-- Tabla de comandos
CREATE TABLE IF NOT EXISTS commands (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    is_enabled BOOLEAN DEFAULT TRUE
);

-- Configuración de comandos por servidor
CREATE TABLE IF NOT EXISTS guild_commands (
    guild_id BIGINT REFERENCES guilds(id) ON DELETE CASCADE,
    command_id INT REFERENCES commands(id) ON DELETE CASCADE,
    is_enabled BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (guild_id, command_id)
);

-- Tabla de logs
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    guild_id BIGINT REFERENCES guilds(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id),
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS osu_token (
    id INT PRIMARY KEY DEFAULT 1,          -- solo una fila
    access_token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
