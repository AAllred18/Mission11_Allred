using Microsoft.AspNetCore.Http;
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

        //[HttpGet("AllBooks")]
        public IEnumerable<Book> GetBooks()
        {
            return _bookContext.Books.ToList();
        }

        //[HttpGet("FictionBooks")]
        //public IEnumerable<Book> GetFictionBooks()
        //{
        //    var fictionBooks = _bookContext.Books.Where(b => b.Classification == "Fiction").ToList();
        //    return fictionBooks;
        //}
    }
}
