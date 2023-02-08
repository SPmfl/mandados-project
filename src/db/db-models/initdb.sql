DROP DATABASE IF EXISTS mandados;
CREATE DATABASE mandados;

CREATE USER mandadmin WITH PASSWORD 'mandadmin';
GRANT ALL PRIVILEGES ON DATABASE mandados TO mandadmin;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    userid INTEGER,
    name VARCHAR(20) NOT NULL,
    rol VARCHAR(10) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userid)
);


INSERT INTO users VALUES( 123, 'matheo', 'admin', DEFAULT,DEFAULT);
INSERT INTO users VALUES( 456, 'operador1', 'operator',DEFAULT,DEFAULT);
INSERT INTO users VALUES( 789, 'operador2', 'operator',DEFAULT,DEFAULT);
INSERT INTO users VALUES( 110, 'operador3', 'operator',DEFAULT,DEFAULT);