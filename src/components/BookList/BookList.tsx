import BookItemCard from '../BookItemCard/BookItemCard';
import React from 'react'

type BookTypes = {
    title: string
    genre: string
    pageCount: string | number
    coverImage?: string
    slug: string
}

const BookList = ({ bookData }: { bookData: BookTypes[] }) => {
    return (
        <div className="p-5 md:px-20 md:py-10">
            <h1 className='text-xxl mb-4'>Book Shelf</h1>
            <div className="flex flex-wrap -mx-2">
                {bookData.map((book: BookTypes, index: number) => {
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