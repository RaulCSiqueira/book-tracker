import BookItemCard from '../BookItemCard/BookItemCard';
import React, { useState, useEffect } from 'react'
import { BookType } from '../../types/types';
import axios from 'axios'

const BookList = () => {
    const [bookData, setBookData] = useState<BookType[]>([]);

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
        <div className="p-5 md:px-20 md:py-10">
            <h1 className='text-xxl mb-4'>Book Shelf</h1>
            <div className="flex flex-wrap -mx-2">
                {bookData.map((book: BookType, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <BookItemCard book={book} index={index} />
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    );
};

export default BookList