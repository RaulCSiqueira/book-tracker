import Home from './components/Home/Home';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Library from './components/Library/Library';
import { bookData } from './assets/bookData';
import BookItem from './components/BookItem/BookItem';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <div className='min-h-screen'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/library" element={<Library bookData={bookData} />} />
                        <Route path="/books/:book_id" element={<BookItem bookData={bookData} />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </>
    )

}

export default App;
