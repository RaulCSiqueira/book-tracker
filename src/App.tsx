import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { getCookie } from './utils/cookies';

const Home = lazy(() => import('./components/Home/Home'));
const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'));
const RegistrationForm = lazy(() => import('./components/RegistrationForm/RegistrationForm'));
const Header = lazy(() => import('./components/Header/Header'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Library = lazy(() => import('./components/Library/Library'));
const BookItem = lazy(() => import('./components/BookItem/BookItem'));

function PrivateRoute({ element }: any) {
    const isUserLoggedIn = getCookie('user');
    return isUserLoggedIn ? element : <Navigate to="/" replace />;
}

function App() {
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/books');
                setBookData(response.data);
            } catch (error: any) {
                console.error(`Error fetching data: ${error.message}`);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Header />
                    <div className='min-h-screen'>
                        <Routes>
                            <Route path="/" element={<Home bookData={bookData} />} />
                            <Route path="/library/*" element={<PrivateRoute element={<Library bookData={bookData} />} />} />
                            <Route path="/books/:book_id" element={<BookItem bookData={bookData} />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<RegistrationForm />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                    <Footer />
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
