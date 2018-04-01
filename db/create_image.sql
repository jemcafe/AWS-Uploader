INSERT INTO Images
(image_url)
VALUES
($1)
RETURNING *;