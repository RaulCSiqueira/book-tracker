import React, { useState, useEffect } from 'react';
import BookItemCard from '../BookItemCard/BookItemCard';

const Library = ({ bookData = [] }: any) => {
    const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library') || '[]'));
    const [topRatedBooks, setTopRatedBooks] = useState([]);

    useEffect(() => {
        // Calculate progress for each book and sort by progress
        const sortedBooks = bookData
            .map((book: any) => {
                const progress = (book.currentPage / book.pageCount) * 100;
                return { ...book, progress };
            })
            .sort((a: any, b: any) => b.progress - a.progress);

        // Select the top 5 books
        const top5Books = sortedBooks.slice(0, 5);

        setTopRatedBooks(top5Books);
    }, [bookData]);

    const removeFromLibrary = (bookSlug: string) => {
        const updatedLibrary = library.filter((libraryBook: any) => libraryBook.book !== bookSlug);
        setLibrary(updatedLibrary);
        localStorage.setItem('library', JSON.stringify(updatedLibrary));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Library</h2>
            {library.length === 0 ? (
                <p className="text-gray-500 text-md mt-2">Library is empty.</p>
            ) : (
                <div className="flex flex-wrap -mx-2">
                    {library?.map((libraryBook: any, index: number) => {
                        const matchingBook = bookData?.find((book: any) => book?.slug === libraryBook?.book);
                        return matchingBook ? (
                            <BookItemCard
                                key={index}
                                book={matchingBook}
                                index={index}
                                removeFromLibrary={removeFromLibrary}
                            />
                        ) : null;
                    })}
                </div>
            )}
            <div className='mt-4'>
                <h3 className="text-xl font-semibold mb-2">Top 5 Most Progressed Books Information</h3>
                <ul className="text-sm list-disc pl-4">
                    {topRatedBooks.map((book: any, index: number) => (
                        <li key={index} className="mb-1">
                            {book.title} - {Math.round(book.progress)}% progress
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Library;
