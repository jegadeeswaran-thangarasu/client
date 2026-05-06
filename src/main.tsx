import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/queryClient';
import { SidebarProvider } from '@/context/SidebarContext';
import GlobalErrorBoundary from '@/components/error/GlobalErrorBoundary';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          {/* TODO: wrap with <Security> from @okta/okta-react when Okta is configured */}
          {/* See src/config/okta.config.ts for setup */}
          <App />
        </SidebarProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  </StrictMode>
);
