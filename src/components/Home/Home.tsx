import { useState, useEffect } from 'react'
import { bookData } from '../../assets/bookData'
import BookList from '../../components/BookList/BookList'

const Home = () => {
    return (
        <div>
            <BookList bookData={bookData} />
        </div>
    )
}

export default Home