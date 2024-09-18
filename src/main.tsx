import 'react-toastify/dist/ReactToastify.css';

import './index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './App.tsx';
import { store } from './store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastContainer position="top-left" autoClose={5000} />
    <App />
  </Provider>,
);
