import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './Contexts/UserContext';
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App/App';
import Home from './components/Home/Home';
import Memos from './components/Memos/Memos';

//import reportWebVitals from './reportWebVitals';
import LstTerms from './components/LstTerms/LstTerms';




const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />}>
                <Route path="" element={<Home />} />
                {<Route path="Memos" element={<Memos />}/*loader={articlesLoader}*/ />}
                {<Route path="Terms" element={<LstTerms />} />}
            </Route>
            {/*<Route path="/add/article" action={addArticle} />*/}
        </>
    )
)

root.render(
    <React.StrictMode>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
