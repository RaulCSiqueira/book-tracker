import React, { useState, useEffect } from 'react';
import BookItemCard from '../BookItemCard/BookItemCard';
import { useLibraryContext } from '../../context-api/BaseContextApi';
import { BookType } from '../../types/types';

const Library = ({ bookData = [] }) => {
    const { library } = useLibraryContext();
    const [topRatedBooks, setTopRatedBooks] = useState([]);

    useEffect(() => {
        const sortedBooks = bookData
            .map((book: BookType) => {
                const progress = (book.currentPage / book.pageCount) * 100;
                return { ...book, progress };
            })
            .sort((a, b) => b.progress - a.progress);
        const top5Books:any = sortedBooks.slice(0, 5);

        setTopRatedBooks(top5Books);
    }, [bookData]);

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
                            {book.title} - {Math.round(book?.progress)}% progress
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Library;
