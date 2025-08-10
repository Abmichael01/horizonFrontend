import { Outlet } from "react-router";
import { LightMode } from "@/components/ui/color-mode";

export default function App() {
  return (
    <main className="bg-white min-h-screen overflow-hidden overflow-y-auto">
        <LightMode>
          <Outlet />
        </LightMode>
    </main>
  );
}
