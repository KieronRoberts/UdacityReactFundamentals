import React, { useState, useEffect } from 'react'
/*Imports react-router-dom to allow the application to have multiple pages with different URLs*/
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
/*Imports Header to be used in this App.js*/
import Header from './components/Header'
/*Imports BooksAPI to be used in this App.js*/
import * as BooksAPI from './BooksAPI'
/*Imports App.css to minipulate*/
import './App.css'
/*Imports Shelves to be used in this App.js*/
import Shelves from './components/Shelves'
/*Imports Book to be used in this App.js*/
import Book from './components/Book'
import { useDebounce } from 'use-debounce';
/*Imports useQuery to be used in this App.js*/
import useQuery from './hooks/useQuery'

/*Defines BooksApp*/
const BooksApp = () => {
  const [books, setBooks] = useState([])
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useQuery(query);
  const [mergedBooks, setMergedBooks] = useState([]);


  useEffect(() => {

    BooksAPI.getAll()
      .then(data => {
        setBooks(data)
        setMapOfIdToBooks(createMapOfBooks(data))
      }
      );
  }, [])


  useEffect(() => {

    const combined = searchBooks.map(book => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    })
    setMergedBooks(combined);
  }, [searchBooks])

  {/*Defines createMapOfBooks*/}
  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }
  {/*Defines updateBookShelf*/}
  const updateBookShelf = (book, whereTo) => {
    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        book.shelf = whereTo;
        return book;
      }
      return b;
    })
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = whereTo;
      updatedBooks.push(book)
    }
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo);
  }

  return (
    <div className="app">
      {/*Wraps router around the application allowing the change of pages on URLs*/}
      <Router>
        <Switch>
          {/* SEARCH PAGE */}
          {/*Defines what should be found on the URL path /search*/}
          <Route path="/search">
            <div className="search-books">
              <div className="search-books-bar">
                {/*Creates the link back to the Main Page*/}
                <Link to="/">
                  {/*Produces the "Close" button on the search page*/}
                  <button className="close-search">Close</button>
                </Link>
                {/*Creates the search box*/}
                <div className="search-books-input-wrapper">
                  {/*Produces a the search box with the placeholder "Search by title or author" and utilises setQuery when a input has been recieved*/}
                  <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
              </div>
              {/*Produces the view of books that have been recieved from the search*/}
              <div className="search-books-results">
                {/*Creates the list of the books from the search*/}
                <ol className="books-grid">
                  {mergedBooks.map(b => (
                    <li key={b.id}>
                      <Book book={b} changeBookShelf={updateBookShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Route>

          {/* MAIN PAGE */}
          {/*Defines what should be found on the URL path / */}
          <Route path="/">
            <div className="list-books">
              {/*Calls the Header component*/}
              <Header />
              <div className="list-books-content">
                {/*Calls the Header component and updates once a change has been recieved*/}
                <Shelves books={books} updateBookShelf={updateBookShelf} />
              </div>
              <div className="open-search">
                {/*Creates the link back to the Search Page*/}
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
/*Exports BooksApp to be luanched*/
export default BooksApp
