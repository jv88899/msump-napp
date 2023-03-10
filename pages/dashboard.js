import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <Link href="/vote">Vote</Link>
      </div>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
