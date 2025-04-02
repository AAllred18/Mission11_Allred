import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalnumBooks: number;
}

const API_URL = 'https://localhost:5000/Book';

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    sortOrder: string,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join('&');

        const response = await fetch(
        `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : `` }`, 
            {
                credentials: 'include',
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }

        return await response.json();

    } catch (error) {
        console.error('Error fetching books: ', error);
        throw error;
    }   
};

export const addBook = async(newBook: Book):Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error('Failed to add new Book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding Book', error);
        throw error;
    }
};