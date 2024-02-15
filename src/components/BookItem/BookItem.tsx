import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addToLibrary } from '../../utils/functions';

type Book = {
    title: string;
    authors: string;
    genre: string;
    pageCount: number;
    coverImage: string;
    slug: string;
    currentPage: number;
    reviews: string[] | undefined;
}

const BookItem: React.FC<{ bookData: Book[] }> = ({ bookData }) => {
    const { book_id } = useParams();
    const [book, setBook] = useState<Book | null>({
        title: '',
        authors: '',
        genre: '',
        pageCount: 0,
        coverImage: '',
        slug: '',
        currentPage: 1,
        reviews: [],
    });
    const [tempCurrentPage, setTempCurrentPage] = useState<number | null>(null);
    const [review, setReview] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [pageProgress, setPageProgress] = useState<number>(0);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get<Book>(`http://localhost:4000/books/${book_id}`);
                setBook(response.data);
            } catch (error: any) {
                console.error('Error fetching book data:', error.message);
            }
        };

        fetchBookData();
    }, []);

    useEffect(() => {
        calculatePageProgress();
    }, [book?.currentPage, book?.pageCount]);

    const handleReviewSubmit = async () => {
        try {
            if (review.length > 1) {
                setReview('');
                setErrorMessage('');

                setBook((prevBook) => ({
                    ...prevBook!,
                    reviews: [...(prevBook?.reviews || []), review],
                }));

                await axios.post(`http://localhost:4000/books/${book?.slug}`, {
                    reviews: [...(book?.reviews || []), review],
                });
            } else {
                setErrorMessage('Please enter a review with more than 1 character');
            }
        } catch (error: any) {
            console.error('Error updating book:', error.message);
            setErrorMessage('Error updating book');
        }
    };

    const calculatePageProgress = () => {
        if (book && !isNaN(book?.currentPage) && !isNaN(book.pageCount as number)) {
            const progress = (book?.currentPage / book.pageCount) * 100;
            setPageProgress(Math.ceil(progress));
        } else {
            setPageProgress(0);
        }
    };

    const removeLeadingZeros = (input: string) => {
        return input.replace(/^0+/, '');
    };

    const handleInputChange = (value: string) => {
        const parsedValue = parseInt(removeLeadingZeros(value), 10) || 0;
        const limitedValue = Math.min(parsedValue, book?.pageCount || 0);
        setTempCurrentPage(limitedValue);
    };

    const handleEnterKeyPress = () => {
        if (tempCurrentPage !== null) {
            setCurrentPageWithLimit(tempCurrentPage);
            calculatePageProgress();
        }
    };

    const setCurrentPageWithLimit = async (value: number) => {
        try {
            const limitedValue = Math.min(value, book?.pageCount as number);

            setErrorMessage('');

            await axios.post(`http://localhost:4000/books/${book?.slug}`, {
                currentPage: limitedValue,
            });

            setBook((prevBook) => ({
                ...prevBook!,
                currentPage: limitedValue,
            }));
        } catch (error: any) {
            console.error('Error updating book:', error.message);
            setErrorMessage('Error updating book');
        }
    };

    return (
        <div className='p-6'>
            <div className="max-w-lg bg-white rounded-md overflow-hidden shadow-md p-4 flex">
                <img src={book?.coverImage} className="h-50 w-40 object-contain mr-4" alt={book?.title} />
                <div className='w-60'>
                    <h2 className="text-xl font-semibold mb-2">{book?.title}</h2>
                    <p className="text-gray-600 mb-2">Author: {book?.authors}</p>
                    <p className="text-gray-600 mb-2">Genre: {book?.genre}</p>
                    <p className="text-gray-600 mb-2">Page Count: {book?.pageCount}</p>
                    <p className="text-gray-600 mb-2">Current Page: {book?.currentPage}</p>
                    <div className='flex items-center'>
                        <span className='text-xs mr-2'>{pageProgress}%</span>
                        <div className="flex-start flex h-1 w-20 overflow-hidden rounded-full bg-gray-200 font-sans text-xs font-medium">
                            <div className="flex h-full items-center justify-center overflow-hidden break-all rounded-full bg-green-300 text-white" style={{ width: `${pageProgress}%` }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 max-w-lg">
                <div className="flex items-end mb-8 ">
                    <span className="mr-2">Current Page:</span>
                    <input
                        type="text"
                        placeholder="Page Progress"
                        aria-label="Page Progress Input"
                        value={tempCurrentPage === null ? book?.currentPage : tempCurrentPage}
                        onChange={(e) => {
                            handleInputChange(e.target.value)
                        }}
                        onBlur={() => {
                            if (tempCurrentPage !== null) {
                                setCurrentPageWithLimit(tempCurrentPage);
                                calculatePageProgress();
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleEnterKeyPress();
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
                <button onClick={() => addToLibrary(book?.slug)} className="bg-green-500 text-white px-4 py-2 ml-2">Add to Library</button>
                {errorMessage && (<p className="mt-2 text-xs text-red-500">{errorMessage}</p>)}

                {book && book?.reviews && book?.reviews?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                        {book?.reviews?.map((r: any, index: number) => (
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
