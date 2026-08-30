import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { AboutPage, CustomersPage, HomePage, TrackPage } from '@/pages/primary-pages';
import {
  CouriersPage,
  DriversPage,
  PitstopsPage,
  RetailersPage,
} from '@/pages/audience-pages';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';

const queryClient = new QueryClient();

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/business" component={RetailersPage} />
        <Route path="/retailers" component={RetailersPage} />
        <Route path="/couriers" component={CouriersPage} />
        <Route path="/drivers" component={DriversPage} />
        <Route path="/pitstops" component={PitstopsPage} />
        <Route path="/customers" component={CustomersPage} />
        <Route path="/track" component={TrackPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;