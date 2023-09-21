DROP DATABASE IF EXISTS subnautica_helper;
CREATE DATABASE subnautica_helper;

CREATE TABLE parts (
  id SERIAL8,
  name VARCHAR(255) NOT NULL,
  ingredients JSON NOT NULL
);