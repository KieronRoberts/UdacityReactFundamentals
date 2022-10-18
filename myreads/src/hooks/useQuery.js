import React, { useState, useEffect } from 'react'
/*Imports all of BookAPI to be used in this hook*/
import * as BooksAPI from '..//BooksAPI'
import { useDebounce } from 'use-debounce';

/*Defines and exports useQuery for use across the application*/
export default function useQuery(query) {
    const [searchBooks, setSearchBooks] = useState([]);
    const [SearchTerm] = useDebounce(query, 500);
    useEffect(() => {
        let inUse = true;
        if (SearchTerm) {
            BooksAPI.search(SearchTerm).then(data => {
                if (data.error) {
                    setSearchBooks([])
                } else {
                    if (inUse) {
                        setSearchBooks(data);
                    }
                }
            })
        }
        return () => {
            inUse = false;
            setSearchBooks([])
        }
    }, [SearchTerm])
    return [searchBooks, setSearchBooks];
}