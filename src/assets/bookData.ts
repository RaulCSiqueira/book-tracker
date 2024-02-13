const data = [
    {
        "title": "Tess of the D'Urbervilles",
        "authors": "Thomas Hardy",
        "genre": "Children of clergy",
        "pageCount": 388,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "Taras Bulba",
        "authors": "Nikolái V. Gogol",
        "genre": "Literary Criticism",
        "pageCount": 154,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "The Odyssey of Homer",
        "authors": "Homer",
        "genre": "Fiction",
        "pageCount": 559,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "The Plague",
        "authors": "Albert Camus",
        "genre": "Fiction",
        "pageCount": 312,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "The Decameron: 3 Different Translations",
        "authors": "Giovanni Boccaccio",
        "genre": "Philosophy",
        "pageCount": 2410,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "There There",
        "authors": "Tommy Orange",
        "genre": "Fiction",
        "pageCount": 249,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "Wuthering Heights",
        "authors": "Emily Brontë",
        "genre": "Country life",
        "pageCount": 452,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "Robinson Crusoe",
        "authors": "Daniel Defoe, D. K. Swan",
        "genre": "Adventure stories",
        "pageCount": 44,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "The Road to Oz",
        "authors": "L. Frank Baum",
        "genre": "Juvenile Fiction",
        "pageCount": 192,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "The Black Book",
        "authors": "Orhan Pamuk",
        "genre": "Fiction",
        "pageCount": 484,
        "coverImage": '/book-cover.jpg'
    },
    {
        "title": "Supernatural Horror in Literature",
        "authors": "Howard Phillips Lovecraft",
        "genre": "Fiction",
        "pageCount": 132,
        "coverImage": '/book-cover.jpg'
    }
]

const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };
  
  // Add slugs to each book
  export const bookData = data.map((book) => {
    const slug = createSlug(book.title);
    return { ...book, slug };
  });