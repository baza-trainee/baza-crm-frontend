import './index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import { store } from './store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
);
