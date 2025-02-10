import { createClient } from '@/utils/supabase/server';
import InstrumentForm from './_components/instrument-form';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

  return (
    <div>
      {instruments?.map((instrument) => (
        <p key={instrument.id}>{JSON.stringify(instrument, null, 2)}</p>
      ))}
      <InstrumentForm />
    </div>

  );
}
