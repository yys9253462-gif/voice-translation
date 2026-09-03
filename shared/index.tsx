import ReactDOM from 'react-dom/client';
import App from '../src/App';
import { AppProviders } from '../src/components/AppProviders';
import { installCustomizableSelectWarningMuffler } from '../src/utils/muffleCustomizableSelectWarnings';

installCustomizableSelectWarningMuffler();

// Compatibility export for existing event call sites. Analytics is intentionally
// disabled in this fork, so useAnalytics receives a permanently empty client.
export const usePostHog = () => null;

async function loadStyles() {
  try {
    await import('../src/styles/scrollbar.scss' as any);
    await import('../src/index.scss' as any);
  } catch {
    await import('../src/App.scss' as any);
  }
}

async function start() {
  await loadStyles();
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Application root element was not found');

  ReactDOM.createRoot(rootElement).render(
    <AppProviders>
      <App />
    </AppProviders>,
  );
}

void start();
