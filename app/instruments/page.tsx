import { createClient } from '@/utils/supabase/server';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

  return (
    <div>
      <h1>Instruments</h1>
      <pre>
        {instruments?.map((instrument) => (
          <div key={instrument.id}>
            <h2>{instrument.name}</h2>
            <p>{instrument.id}</p>
          </div>
        ))}
      </pre>
    </div>




  );


}