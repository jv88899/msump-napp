import Header from "@/components/Header";

export default function Layout({ children }) {
  return (
    <div className={{}}>
      <Header />
      <main style={{ paddingTop: "80px" }}>{children}</main>
    </div>
  );
}
