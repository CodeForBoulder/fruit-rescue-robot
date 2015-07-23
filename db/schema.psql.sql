CREATE TABLE humans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  address TEXT,
  address_lat NUMERIC,
  address_lng NUMERIC,
  phone VARCHAR(12),
  email VARCHAR(128),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIME
);

CREATE TABLE harvesters (
  id SERIAL PRIMARY KEY,
  human_id INTEGER NOT NULL REFERENCES humans(id)
);

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  human_id INTEGER NOT NULL REFERENCES humans(id)
);

CREATE TABLE coordinators (
  id SERIAL PRIMARY KEY,
  human_id INTEGER NOT NULL REFERENCES humans(id)
);

-- Todo: keep track of treatments (e.g., pesticides, traps)
CREATE TABLE trees (
  id SERIAL PRIMARY KEY,
  property_id INTEGER REFERENCES properties(id),
  type_id INTEGER, -- FallingFruit.org canonical ID
  notes TEXT,
  lat NUMERIC,
  lng NUMERIC,
  last_pruned_on DATE,
  maybe_ripe_on DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIME
);

-- multiple humans can own a property
-- a human can own multiple properties
CREATE TABLE humans_properties (
  human_id INTEGER NOT NULL REFERENCES humans(id),
  properties_id INTEGER NOT NULL REFERENCES properties(id)
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  access TEXT,
  address TEXT,
  address_lat NUMERIC,
  address_lng NUMERIC,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIME
);

CREATE TABLE harvests_humans (
  human_id INTEGER NOT NULL REFERENCES humans(id),
  is_host BOOLEAN,
  harvest_id INTEGER NOT NULL REFERENCES harvest(id)
);

CREATE TABLE harvests (
  id SERIAL PRIMARY KEY,
  harvested_on DATE,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  min_volunteers INTEGER NOT NULL DEFAULT 0,
  max_volunteers INTEGER,
);

CREATE TABLE tree_harvests (
  harvest_id INTEGER NOT NULL REFERENCES harvests(id),
  tree_id INTEGER NOT NULL REFERENCES trees(id),
  weight_lbs NUMERIC NOT NULL DEFAULT 0,
  donation_percent NUMERIC
);