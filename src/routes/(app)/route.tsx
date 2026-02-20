import { Outlet, createFileRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Subheader } from "@/components/subheader";
import { SwipingBlocked } from "@/components/swiping-blocked";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
});

const queryClient = new QueryClient();

function RouteComponent() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div className="flex h-svh flex-col gap-3">
          <Header />
          <Subheader />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <SwipingBlocked />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
