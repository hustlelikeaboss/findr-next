CREATE TABLE IF NOT EXISTS customers (
    id SERIAL,
    email VARCHAR(255),
    /* stripe */
    customer_id VARCHAR(255),
    /* stripe */
    subscription_id VARCHAR(255),
    /* stripe */
    product_id VARCHAR(255),
    /* stripe */
    price_id VARCHAR(255),
    /* stripe */
    status VARCHAR(255),
    search_times INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
/*
 * apply triggers
 */
-- customers
DROP TRIGGER IF EXISTS customer_updated ON customers;
CREATE TRIGGER customer_updated BEFORE
UPDATE ON customers FOR EACH ROW EXECUTE PROCEDURE update_timestamp();