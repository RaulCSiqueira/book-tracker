import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../utils/cookies';
import { addToLibrary } from '../../utils/functions';

const BookItemCard = ({ book, index, removeFromLibrary }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('user'));
    const [isInLibrary, setIsInLibrary] = useState(false);

    useEffect(() => {
        const library = localStorage.getItem('library');
        const libraryArray = library ? JSON.parse(library) : [];
        setIsInLibrary(libraryArray.some((item: any) => item.book === book?.slug));
    }, [book?.slug]);

    const progress = Math.ceil((book?.currentPage / book?.pageCount) * 100);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.slice(0, maxLength) + '...';
        }
    };

    const handleRemoveFromLibrary = (event: any) => {
        event.preventDefault();
        removeFromLibrary(book?.slug);
    };

    const handleAddToLibrary = (event: any) => {
        event.preventDefault();
        addToLibrary(book?.slug);
        setIsInLibrary(!isInLibrary);
    };

    const bookCardElement = () => (
        <div data-testid="book-item-card" className="min-h-80 h-80 max-w-xs bg-white rounded-md overflow-hidden shadow-md relative">
            <img src={book.coverImage} className="h-40 w-30 mx-auto" alt={book.title} loading="lazy"/>
            <div className="p-3 flex-1 flex flex-col justify-between">
                <strong className="block text-sm font-semibold mb-1 h-16 overflow-hidden">{truncateText(book.title, 50)}</strong>
                <div>
                    <p className="text-gray-600 text-xs mb-1">Genre: {book.genre}</p>
                    <p className="text-gray-600 text-xs">Page Count: {book.pageCount}</p>
                </div>
            </div>
            {isLoggedIn && (
                <div className='absolute top-0 right-0' onClick={isInLibrary ? handleRemoveFromLibrary : handleAddToLibrary} style={{ cursor: 'pointer' }}>
                    <span className='text-yellow-500' style={{ fontSize: '26px' }}>{isInLibrary ? '★' : '☆'}</span>
                </div>
            )}
            {isLoggedIn && (
                <div className='flex items-center px-3'>
                    <span className='text-xs mr-2'>{progress}%</span>
                    <div className="flex-start flex h-1 w-12 overflow-hidden rounded-full bg-gray-200 font-sans text-xs font-medium">
                        <div className="flex h-full items-center justify-center overflow-hidden break-all rounded-full bg-green-300 text-white" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div key={index} className="w-full xs:w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 px-3 mb-8 h-250">
            {isLoggedIn ? (
                <Link to={`/books/${book?.slug}`} className="block">
                    {bookCardElement()}
                </Link>
            ) : (
                <>
                    {bookCardElement()}
                </>
            )}
        </div>
    );
};

export default BookItemCard;
