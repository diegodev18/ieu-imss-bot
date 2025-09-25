CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE
    admin_user_tokens (
        id SERIAL PRIMARY KEY,
        -- user numérico aleatorio de 10 dígitos
        "user" BIGINT UNIQUE NOT NULL DEFAULT (
            CAST(
                floor(random () * 9000000000 + 1000000000) AS BIGINT
            )
        ),
        -- password aleatoria de 16 bytes en base64 (~22 caracteres)
        password TEXT NOT NULL DEFAULT (encode (gen_random_bytes (16), 'base64')),
        status admin_user_tokens_status NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    sessions (
        id SERIAL PRIMARY KEY,
        admin_user_tokens_id INTEGER UNIQUE REFERENCES admin_user_tokens (id) ON DELETE CASCADE,
        chat_id BIGINT UNIQUE NOT NULL,
        user_metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    employees (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_by INTEGER REFERENCES admin_user_tokens (id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );