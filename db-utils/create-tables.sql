CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE
    admin_users (
        id SERIAL PRIMARY KEY,
        -- user numérico aleatorio de 10 dígitos
        "user" BIGINT UNIQUE NOT NULL DEFAULT (
            CAST(
                floor(random () * 9000000000 + 1000000000) AS BIGINT
            )
        ),
        -- password aleatoria de 16 bytes en base64 (~22 caracteres)
        password TEXT NOT NULL DEFAULT (encode (gen_random_bytes (16), 'base64')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );