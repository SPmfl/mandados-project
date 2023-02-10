DROP DATABASE IF EXISTS mandados;
CREATE DATABASE mandados;

CREATE USER mandadmin WITH PASSWORD 'mandadmin';
GRANT ALL PRIVILEGES ON DATABASE mandados TO mandadmin;

DROP TYPE IF EXISTS enum_users_roluser;
CREATE TYPE enum_users_roluser AS ENUM ('admin', 'operator');
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    userid INTEGER,
    name VARCHAR(20) NOT NULL,
    roluser enum_users_roluser NOT NULL ,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userid)
);

-- DROP TABLE IF EXISTS roles;
-- CREATE TABLE roles(
--     rol VARCHAR(10) NOT NULL CHECK (rol IN ('admin','operator'))
-- );

--INSERT INTO users VALUES( 123, 'matheo', 'admin', 'mat@gmail.com',, DEFAULT,DEFAULT);
--INSERT INTO users VALUES( 456, 'operador1', 'operator',DEFAULT,DEFAULT);
