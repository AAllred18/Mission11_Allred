import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BooksList() {

    const [books, setBooks] =  useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State for sorting order
 
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                `https://localhost:5000/Book?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`, 
                {
                    credentials: 'include',
                }
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchBooks();
    }, [pageSize, pageNum, totalItems, sortOrder]);

    return (
        <>
            <h1>Book List</h1>
            <button onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                setPageNum(1);
            }}>
                Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <br></br>
            {/* Map out each book into a bookcard */}
            {books.map((b) =>
                <div id="bookCard" className="card">
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Number of Pages:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> ${b.price}</li>
                        </ul>
                    </div>
                    
                </div>
            )}

            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

           {
            [...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === (i + 1)}>
                    {i + 1}
                </button>
            ))}

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br/>
            <label>
                Results per page:
                <select 
                    value={pageSize} 
                    onChange = {(p) => {
                        setPageSize(Number(p.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </label>
        </>
    );
}

export default BooksList;