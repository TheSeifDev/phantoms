CREATE TABLE IF NOT EXISTS project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email text NOT NULL CHECK (char_length(email) <= 254),
  service text NOT NULL CHECK (service IN ('web', 'apps', 'saas', 'other')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 20 AND 4000),
  source text NOT NULL DEFAULT 'landing_phantoms',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'closed'))
);

CREATE INDEX IF NOT EXISTS project_inquiries_created_at_idx
  ON project_inquiries (created_at DESC);
