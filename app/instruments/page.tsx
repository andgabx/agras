import { createClient } from '@/utils/supabase/server';
import InstrumentForm from './instrument-form';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

  return (
    <div>
      <pre>{JSON.stringify(instruments, null, 2)}</pre>
      <InstrumentForm />
    </div>
  );
}
