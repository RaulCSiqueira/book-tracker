import BookList from '../../components/BookList/BookList'

const Home = ({ bookData }: any) => {
    return (
        <div>
            <BookList bookData={bookData} />
        </div>
    )
}

export default Home