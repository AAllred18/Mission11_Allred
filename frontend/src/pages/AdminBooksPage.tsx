import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { fetchBooks } from "../api/ProjectsAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";

const AdminBooksPage = () => {
    const [books, setBooks] =  useState<Book[]>([]);   
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, 'asc', []);
                setBooks(data.books)
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNum]);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>
    
    return (
      <div>
        <h1>Admin - Books</h1>
        
        {!showForm && (
            <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>Add Book</button>
        )}

        {showForm && (
            <NewBookForm 
                onSuccess={() => {
                    setShowForm(false); 
                    fetchBooks(pageSize, pageNum, 'asc', []).then((data) => 
                        setBooks(data.books)
                    );
                }}
                onCancel={() => setShowForm(false)}
            />
        )}

        <table className="table table-bordered table-striped">
            <thead className="table-dark">
                <tr>
                    <th>BookID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>ISBN</th>
                    <th>Classification</th>
                    <th>Category</th>
                    <th>Number of Pages</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map((b) => (
                        <tr key={b.bookID}>
                            <td>{b.bookID}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td>{b.isbn}</td>
                            <td>{b.classification}</td>
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>${b.price}</td>
                            <td>
                                <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => console.log(`Edit project ${b.bookID}`)}>Edit</button>
                                <button className="btn btn-danger btn-sm w-100" onClick={() => console.log(`Delete project ${b.bookID}`)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

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
      </div>  

    );
};

export default AdminBooksPage;