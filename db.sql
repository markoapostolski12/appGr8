CREATE TABLE IF NOT EXISTS users_revenue (
    user_id VARCHAR(255) NOT NULL,
    revenue INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id)
);