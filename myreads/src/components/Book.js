import React from 'react';
/*Defines Book for use acrross the application*/
const Book = ({ book, changeBookShelf }) => {

    return (
        <div className="book">
            <div className="book-top">
                {/*Defines where the image of the of the book will come from and how it should look*/}
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                {/*Creates the charger on each book*/}
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(e) => changeBookShelf(book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            {/* Defines both the book title and the author*/}
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.publisher}</div>
        </div>
    )
}
/*Exports Book for use across the application*/
export default Book;