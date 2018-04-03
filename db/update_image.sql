UPDATE Images
SET file_name = $1, image_url = $2
WHERE id = $3
RETURNING *;