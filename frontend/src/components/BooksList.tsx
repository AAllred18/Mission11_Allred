import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/ProjectsAPI";
import Pagination from "./Pagination";

function BooksList({selectedCategories}: {selectedCategories: string[]}) {
    const [books, setBooks] =  useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State for sorting order

    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, sortOrder, selectedCategories);
                
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalnumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            } 
        };

        loadBooks();
    }, [pageSize, pageNum, sortOrder, selectedCategories]);

    if (loading) return <p>Loading projects...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    return (
        <>
            {/* It is bright and unncessary, but I learned about the different button classes and used btn-outline-info here */}
            <button className="btn btn-outline-info"
                onClick={() => {
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

                    <button className="btn btn-success" onClick={() => navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)}>Purchase</button>
                    
                </div>

            )}
            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </>
    );
}

export default BooksList;