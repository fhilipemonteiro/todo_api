CREATE DATABASE todo;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL
);
