DROP TABLE IF EXISTS Images;

CREATE TABLE Images (
    id SERIAL PRIMARY KEY,
    file_name TEXT NOT NULL,
    image_url TEXT NOT NULL
);