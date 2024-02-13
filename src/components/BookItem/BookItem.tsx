import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const BookItem = ({ bookData }: any) => {
    const { book_id } = useParams();
    const book = bookData.find((book: any) => book.slug === book_id);

    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageProgress, setPageProgress] = useState<number>(0);

    const handleReviewSubmit = () => {
        if (review.length > 1) {
            setReviews([...reviews, review]);
            setReview('');
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter a review with more than 1 character');
        }
    };

    const calculatePageProgress = () => {
        if (!isNaN(currentPage) && !isNaN(book.pageCount as number)) {
            const progress = (currentPage / book.pageCount) * 100;
            setPageProgress(Math.ceil(progress));
        } else {
            setPageProgress(0);
        }
    };

    const removeLeadingZeros = (input: string) => {
        return input.replace(/^0+/, '');
    };

    const setCurrentPageWithLimit = (value: number) => {
        const limitedValue = Math.min(value, book.pageCount);
        setCurrentPage(limitedValue);
    };

    const addToLibrary = () => {
        // Get existing library from local storage or initialize an empty array
        const library = JSON.parse(localStorage.getItem('library') || '[]');
        console.log('library', library);

        // Check if the book is not already in the library
        if (!library.find((libraryBook: any) => libraryBook.book === book.slug)) {
            // Add the book to the library
            library.push({book: book.slug});

            // Save the updated library to local storage
            localStorage.setItem('library', JSON.stringify(library));
            alert('Book added to library!');
        } else {
            alert('Book is already in the library!');
        }
    };

    React.useEffect(() => {
        calculatePageProgress();
    }, [currentPage]);

    return (
        <div className='p-6'>
            <div className="max-w-lg bg-white rounded-md overflow-hidden shadow-md p-4 flex">
                <img src={book?.coverImage} className="h-50 w-40 object-contain mr-4" alt={book?.title} />
                <div className='w-60'>
                    <h2 className="text-xl font-semibold mb-2">{book?.title}</h2>
                    <p className="text-gray-600 mb-2">Author: {book?.authors}</p>
                    <p className="text-gray-600 mb-2">Genre: {book?.genre}</p>
                    <p className="text-gray-600 mb-2">Page Count: {book?.pageCount}</p>
                    <p className="text-gray-600 mb-2">currentPage: {currentPage}</p>
                    <div className='flex items-center'>
                        <span className='text-xs mr-2'>{pageProgress}%</span>
                        <div className="flex-start flex h-1 w-20 overflow-hidden rounded-full bg-gray-200 font-sans text-xs font-medium">
                            <div className="flex h-full items-center justify-center overflow-hidden break-all rounded-full bg-green-300 text-white" style={{ width: `${pageProgress}%` }}/>
                        </div>
                    </div>
                    {/* Add more book information as needed */}
                </div>
            </div>

            {/* Review input, page progress, and box */}
            <div className="mt-8 max-w-lg">
                <div className="flex items-end mb-2">
                    <span className="mr-2">Current Page:</span>
                    <input
                        type="text"
                        placeholder="Page Progress"
                        aria-label="Page Progress Input"
                        value={currentPage}
                        onChange={(e) => {
                            // Remove leading zeros and update the current page
                            setCurrentPageWithLimit(parseInt(removeLeadingZeros(e.target.value), 10) || 0);
                        }}
                        onBlur={calculatePageProgress}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                calculatePageProgress();
                            }
                        }}
                        className="border border-gray-300 px-1 w-20"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Write a review"
                    aria-label="Review Input"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="border p-2 w-full mb-2"
                />

                <button onClick={handleReviewSubmit} className="bg-light-blue-100 text-white px-4 py-2">Submit Review</button>
                <button onClick={addToLibrary} className="bg-green-500 text-white px-4 py-2 ml-2">Add to Library</button>
                {errorMessage && (<p className="mt-2 text-xs text-red-500">{errorMessage}</p>)}

                {/* Display reviews */}
                {reviews.length > 0 && (
                    <div className="mt-2">
                        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                        {reviews.map((r, index) => (
                            <div key={index} className="border border-gray-300 p-2 mb-2 rounded-md">
                                <p className="text-gray-600">{r}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookItem;
