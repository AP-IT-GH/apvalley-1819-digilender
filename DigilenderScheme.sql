PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS calTypes (
  id integer PRIMARY KEY,
  name text
);

CREATE TABLE IF NOT EXISTS users (
  name text PRIMARY KEY,
  calType integer,
  login text,
  pass text,
  FOREIGN KEY (calType) REFERENCES calTypes(id) 
);

CREATE TABLE IF NOT EXISTS events (
  id integer PRIMARY KEY,
  userName text,
  startDate text,
  startDateActual text,
  stopDate text,
  description text,
  FOREIGN KEY (userName) REFERENCES users(name)
);

