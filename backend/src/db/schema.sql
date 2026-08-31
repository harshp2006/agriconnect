-- AgriConnect Backend — DB Schema
-- Owner: Amrit (jointly designed with Anchal)
-- NOTE: Field names are best-guess from the endpoint list in docs/api-contracts.md.
-- Cross-check against the actual contract's JSON shapes before merging —
-- rename columns to match exactly since the contract is locked, not this file.

CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- for gen_random_uuid()

-- ============================================================
-- USERS
-- ============================================================
CREATE TYPE user_role AS ENUM ('farmer', 'fpo', 'consumer', 'bulk_buyer');

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          user_role NOT NULL,
  phone         VARCHAR(20),
  location      VARCHAR(255),        -- free-text address / village-district for now
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role  ON users(role);

-- ============================================================
-- LISTINGS
-- ============================================================
CREATE TYPE listing_status AS ENUM ('active', 'sold_out', 'inactive');

CREATE TABLE listings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  crop            VARCHAR(100) NOT NULL,
  variety         VARCHAR(100),
  quantity        NUMERIC(12,2) NOT NULL CHECK (quantity >= 0),
  unit            VARCHAR(20) NOT NULL,       -- kg, quintal, dozen, etc.
  price_per_unit  NUMERIC(12,2) NOT NULL CHECK (price_per_unit >= 0),
  status          listing_status NOT NULL DEFAULT 'active',
  location        VARCHAR(255),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listings_crop      ON listings(crop);
CREATE INDEX idx_listings_farmer_id ON listings(farmer_id);
CREATE INDEX idx_listings_status    ON listings(status);

-- ============================================================
-- PRICE HISTORY  (backs GET /api/listings/{crop}/price-history)
-- ============================================================
CREATE TABLE price_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop        VARCHAR(100) NOT NULL,
  listing_id  UUID REFERENCES listings(id) ON DELETE SET NULL,
  price       NUMERIC(12,2) NOT NULL,
  unit        VARCHAR(20) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_price_history_crop_time ON price_history(crop, recorded_at);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');

CREATE TABLE orders (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id      UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  listing_id    UUID NOT NULL REFERENCES listings(id) ON DELETE RESTRICT,
  quantity      NUMERIC(12,2) NOT NULL CHECK (quantity > 0),
  total_price   NUMERIC(12,2) NOT NULL CHECK (total_price >= 0),
  status        order_status NOT NULL DEFAULT 'pending',
  route         JSONB,              -- raw response from {AI_SERVICE_URL}/optimize-route
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_buyer_id   ON orders(buyer_id);
CREATE INDEX idx_orders_listing_id ON orders(listing_id);
CREATE INDEX idx_orders_status     ON orders(status);

-- ============================================================
-- updated_at auto-touch trigger (saves you from forgetting it in every PATCH)
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at    BEFORE UPDATE ON users    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_listings_updated_at BEFORE UPDATE ON listings FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_orders_updated_at   BEFORE UPDATE ON orders   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
