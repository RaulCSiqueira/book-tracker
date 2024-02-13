import BookItemCard from '../BookItemCard/BookItemCard';

const Library = ({ bookData = [] }: any) => {
    const library = JSON.parse(localStorage.getItem('library') || '[]');
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">My Library</h2>
            {library.length === 0 ? (
                <p>Your library is empty.</p>
            ) : (
                <div className="flex flex-wrap -mx-2">
                    {library?.map((libraryBook: any, index: number) => {
                        const matchingBook = bookData.find((book: any) => book.slug === libraryBook.book);

                        return (
                            <BookItemCard book={matchingBook} index={index} />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Library;
