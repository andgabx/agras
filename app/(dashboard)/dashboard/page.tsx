import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
