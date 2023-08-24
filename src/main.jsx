import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import RegistryPage from './pages/RegistryPage/Registry';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequestPage from './pages/RequestPage/RequestPage';
import RegistryPage from './pages/RegistryPage/Registry';
import HomePage from './pages/HomePage/HomePage';
import DispatchPage from './pages/DispatchPage/DispatchPage';
import AnalyzePage from './pages/AnalyzePage/AnalyzePage';
import RejectPage from './pages/RejectPage/RejectPage';
import OverViwePage from './pages/OverViewPage/OverViwePage';
import LoginPage from './pages/LoginPage/LoginPage';
import AccountPage from './pages/AccountPage/AccountPage';
import StatusPage from './pages/StatusPage/StatusPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Routes>
        <Route element={<RequestPage/>} path={"/request"}/>
        <Route element={<RegistryPage/>} path={"/register"}/>
        <Route element={<LoginPage/>} path={"/"}/>
        <Route element={<HomePage/>} path={"/home"}/>
        <Route element={<DispatchPage/>} path={"/dispatch"}/>
        <Route element={<AnalyzePage/>} path={"/analyze"}/>
        <Route element={<RejectPage/>} path={"/reject"}/>
        <Route element={<OverViwePage/>} path={"/overview"}/>
        <Route element={<AccountPage/>} path={"/account"}/>
        <Route element={<StatusPage/>} path={"/status"}/>
        <Route path='*' element={<div>404 Not found</div>}></Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
