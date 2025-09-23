import { Outlet } from "react-router";
import { LightMode } from "@/components/ui/color-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient();

export default function App() {
  return (
    <main className="bg-white min-h-screen overflow-hidden overflow-y-auto">
      <QueryClientProvider client={queryClient}>
        <LightMode>
          <Toaster />
          <Outlet />
        </LightMode>
      </QueryClientProvider>
    </main>
  );
}
