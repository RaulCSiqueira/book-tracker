export const addToLibrary = (bookSlug: string | undefined) => {
    const library = JSON.parse(localStorage.getItem('library') || '[]');
    const existingBookIndex = library.findIndex((libraryBook: any) => libraryBook.book === bookSlug);

    if (existingBookIndex === -1) {
        library.push({ book: bookSlug });
    } else {
        library.splice(existingBookIndex, 1);
    }

    localStorage.setItem('library', JSON.stringify(library));
};