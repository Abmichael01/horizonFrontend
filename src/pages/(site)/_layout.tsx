import Navbar from "@/components/Site/Navbar/Navbar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <section>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </section>
  );
}
