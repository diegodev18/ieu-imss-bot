-- Companies primero (para evitar errores de FK)
CREATE TABLE
    companies (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        rfc TEXT UNIQUE NOT NULL,
        status companies_status NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Admins
CREATE TABLE
    admins (
        id SERIAL PRIMARY KEY,
        username BIGINT UNIQUE NOT NULL DEFAULT (
            CAST(
                floor(random () * 9000000000 + 1000000000) AS BIGINT
            )
        ),
        password TEXT NOT NULL DEFAULT (encode (gen_random_bytes (16), 'base64')),
        status admins_status NOT NULL DEFAULT 'active',
        company_id INTEGER REFERENCES companies (id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Sessions (aquí quité UNIQUE de admin_id, si quieres múltiples sesiones)
CREATE TABLE
    sessions (
        id SERIAL PRIMARY KEY,
        chat_id BIGINT UNIQUE NOT NULL,
        user_metadata JSONB,
        admin_id INTEGER REFERENCES admins (id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Employees
CREATE TABLE
    employees (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        curp TEXT UNIQUE NOT NULL,
        rfc TEXT UNIQUE NOT NULL,
        position TEXT NOT NULL,
        salary NUMERIC(10, 2) NOT NULL,
        status employees_status NOT NULL DEFAULT 'active',
        created_by INTEGER REFERENCES admins (id) ON DELETE SET NULL,
        company_id INTEGER REFERENCES companies (id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );