import React, { useState, useEffect } from 'react';
import BookItemCard from '../BookItemCard/BookItemCard';

const Library = ({ bookData = [] }: any) => {
    const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library') || '[]'));

    const removeFromLibrary = (bookSlug: string) => {
        const updatedLibrary = library.filter((libraryBook: any) => libraryBook.book !== bookSlug);
        setLibrary(updatedLibrary);
        localStorage.setItem('library', JSON.stringify(updatedLibrary));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">My Library</h2>
            {library.length === 0 ? (
                <p>Your library is empty.</p>
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
        </div>
    );
};

export default Library;
