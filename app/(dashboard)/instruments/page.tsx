import { createClient } from "@/utils/supabase/server";
import InstrumentForm from "./_components/instrument-form";
import { redirect } from "next/navigation";

export default async function Instruments() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const { data: instruments } = await supabase.from("instruments").select();

  return (
    <div className="m-auto space-y-4">
      {instruments?.map((instrument) => (
        <p className="text-center" key={instrument.id}>
          {JSON.stringify(instrument, null, 2)}
        </p>
      ))}
      <InstrumentForm />
    </div>
  );
}
