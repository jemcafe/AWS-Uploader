INSERT INTO Images
(file_name, image_url)
VALUES
($1, $2)
RETURNING *;