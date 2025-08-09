import { Outlet } from "react-router";
import { LightMode } from "@/components/ui/color-mode";

export default function App() {
  return (
    <main className="bg-white min-h-screen">
        <LightMode>
          <Outlet />
        </LightMode>
    </main>
  );
}
