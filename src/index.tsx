import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ModalContextProvider } from './store/modal-context';
import App from './App';
import './index.scss';

ReactDOM.render(
    <ModalContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ModalContextProvider>,
    document.getElementById('root'),
);
