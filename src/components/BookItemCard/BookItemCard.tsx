import { Link } from 'react-router-dom';

const BookItemCard = ({ book, index }: any) => {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.slice(0, maxLength) + '...';
        }
    };
    return (
        <div key={index} className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-3 mb-4 h-250">
            <Link to={`/books/${book?.slug}`} className="block">
                <div className="min-h-80 h-80 max-w-xs bg-white rounded-md overflow-hidden shadow-md">
                    <img src={book.coverImage} className="h-40 w-30 mx-auto" alt={book.title} />
                    <div className="p-3 flex-1 flex flex-col justify-between">
                        <strong className="block text-sm font-semibold mb-1 h-16 overflow-hidden">{truncateText(book.title, 50)}</strong>
                        <div>
                            <p className="text-gray-600 text-xs mb-1">Genre: {book.genre}</p>
                            <p className="text-gray-600 text-xs">Page Count: {book.pageCount}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BookItemCard