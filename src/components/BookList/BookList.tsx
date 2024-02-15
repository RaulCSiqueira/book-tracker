import BookItemCard from '../BookItemCard/BookItemCard';
import React from 'react'
import { BookType } from '../../types/types';

const BookList = ({ bookData }: { bookData: BookType[] }) => {
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