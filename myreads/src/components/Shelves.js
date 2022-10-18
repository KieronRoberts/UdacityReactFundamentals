import React from 'react';
/*Imports Shelf to be used in this component*/
import Shelf from './Shelf';

/*Defines Shelves for use acrross the application*/
const Shelves = ({books, updateBookShelf}) => {
    {/*Defines how each shelf will be filtered to show the correct set of books*/}
    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const whatToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    return (
        <div>
            {/*Uses shelf component and above defined filters to buid each shelf*/}
            <Shelf title="Currently Reading" books={currentlyReading} updateBookShelf={updateBookShelf}/>
            <Shelf title="Want To Read" books={whatToRead} updateBookShelf={updateBookShelf}/>
            <Shelf title="Read" books={read} updateBookShelf={updateBookShelf}/>
        </div>
    )

}
/*Exports Shelves for use across the application*/
export default Shelves;