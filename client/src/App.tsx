import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
import Halloween from "./pages/Halloween";
import HardRockWeekend from "./pages/HardRockWeekend";

// Halloween stays in the main bundle (ad landing page, must open fast);
// the other pages load on demand so they don't slow it down.
const Home = lazy(() => import("./pages/Home"));
const TodosNoRock = lazy(() => import("./pages/TodosNoRock"));
const Acessibilidade = lazy(() => import("./pages/Acessibilidade"));
const RockRising = lazy(() => import("./pages/RockRising"));
const HardRock = lazy(() => import("./pages/HardRock"));
const Projeto = lazy(() => import("./pages/Projeto"));

const FESTIVAL_HOSTS = ["todosnorock.com.br", "www.todosnorock.com.br"];

function Router() {
  // When accessed via todosnorock.com.br, serve the festival page for every
  // path on that domain while keeping todosnorock.com.br in the address bar.
  if (typeof window !== "undefined" && FESTIVAL_HOSTS.includes(window.location.hostname)) {
    return (
      <Switch>
        <Route path={"/acessibilidade"} component={Acessibilidade} />
        <Route component={TodosNoRock} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/todos-no-rock"} component={TodosNoRock} />
      <Route path={"/halloween"} component={Halloween} />
      <Route path={"/hardrockweekend"} component={HardRockWeekend} />
      <Route path={"/rockrising"} component={RockRising} />
      <Route path={"/hardrock"} component={HardRock} />
      <Route path={"/projetos/:slug"} component={Projeto} />
      <Route path={"/acessibilidade"} component={Acessibilidade} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<div style={{ minHeight: "100vh", background: "#06020e" }} />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
