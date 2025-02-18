import { createClient } from "@/utils/supabase/server";
import { ProfileForm } from "./profile-form";

export default async function Form() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <ProfileForm user={user} />
    </div>
  );
}
