-- Adiciona a coluna cover
ALTER TABLE communities 
ADD COLUMN cover TEXT;

-- Adiciona política RLS para permitir leitura do cover
CREATE POLICY "Anyone can view community cover"
ON communities
FOR SELECT
USING (true);

-- Adiciona política RLS para permitir update do cover
CREATE POLICY "Users can update community cover"
ON communities
FOR UPDATE
USING (true)
WITH CHECK (true); 