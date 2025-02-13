import { createClient } from "@/utils/supabase/server";

const Dashboard = async () => {
  const supabase = await createClient();

  return <div>Dashboard</div>;
};

export default Dashboard;
