import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
