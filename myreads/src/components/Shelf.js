import React from 'react';
/*Imports Book to be used in this component*/
import Book from './Book';

/*Defines Shelf for use acrross the application*/
const Shelf = ({ books, title, updateBookShelf }) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(b => (
                        <li key={b.id}>
                            <Book book={b} changeBookShelf={updateBookShelf}/>
                        </li>
                    ))}

                </ol>
            </div>
        </div>
    )
}
/*Exports Shelf for use across the application*/
export default Shelf;