import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {store} from './store'
import { Provider } from 'react-redux';

import { GetAccessToken } from './services/api-user-service';
import { AuthUser } from './store/action-creators/UserActions';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const token = GetAccessToken();

if(token){
  AuthUser(token,"Loaded from default",store.dispatch);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer autoClose={5000} />
      <App />
    </BrowserRouter>
  </Provider>
);