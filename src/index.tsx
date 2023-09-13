import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from '../src/store';
import './sass/main.scss';
import { WebSocketProvider, socket } from 'context/WebSocketContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <WebSocketProvider value={socket} >
      <App />
    </WebSocketProvider>
  </Provider>
);


