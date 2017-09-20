-- okay, we need an id, a description, and completed status.

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  completed BOOLEAN
)
