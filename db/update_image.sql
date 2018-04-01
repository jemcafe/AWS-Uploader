UPDATE Images
SET image_url = $1
WHERE id = $2
RETURNING *;