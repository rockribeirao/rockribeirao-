import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TodosNoRock from "./pages/TodosNoRock";
import Acessibilidade from "./pages/Acessibilidade";

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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
