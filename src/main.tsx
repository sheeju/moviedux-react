import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from 'react-redux';
import App from "./App.tsx";
import "./index.css";
import store from './store';

const container = document.getElementById('root');
const root = createRoot(container as Element);

const renderApp = () => {
  root.render(
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>,
  );
}

renderApp();
