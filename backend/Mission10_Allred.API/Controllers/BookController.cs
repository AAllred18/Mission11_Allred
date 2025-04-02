using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Mission10_Allred.API.Data;

namespace Mission10_Allred.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookstoreDbContext _bookContext;
        public BookController(BookstoreDbContext temp) 
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string> bookCategories = null)
        {

            string? favBookCategory = Request.Cookies["FavoriteCategory"];
            Console.WriteLine("~~~~~~~~COOKIE~~~~~~~\n" + favBookCategory);

            HttpContext.Response.Cookies.Append("FavoriteCategory", "Biography", new CookieOptions
            {
                //Cookie can only be seen by the server
                HttpOnly = true,
                // Only transferred over HTTPS
                Secure = true,
                // Allow cookies from other domain sites (Strict blocks others)
                SameSite = SameSiteMode.Strict,
                //Expriation date
                Expires = DateTime.Now.AddMinutes(1),
            });

            var query2 = _bookContext.Books.AsQueryable();
            if (bookCategories != null && bookCategories.Any())
            {
                query2 = query2.Where(c => bookCategories.Contains(c.Category));
            }
            ;

            IQueryable<Book> query = query2;

            // Apply sorting
            if (sortOrder.ToLower() == "desc")
            {
                query = query2.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query2.OrderBy(b => b.Title);
            }

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = query.Count();

            var newObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(newObject);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes ()
        {
            var bookTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook) 
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook) 
        {
            var existingBook = _bookContext.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }

        //[HttpGet("FictionBooks")]
        //public IEnumerable<Book> GetFictionBooks()
        //{
        //    var fictionBooks = _bookContext.Books.Where(b => b.Classification == "Fiction").ToList();
        //    return fictionBooks;
        //}
    }
}
