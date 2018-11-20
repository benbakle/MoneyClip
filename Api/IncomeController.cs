
using Microsoft.AspNetCore.Mvc;
using MoneyClip.EntityFramework;
using MoneyClip.Models;
using System.Linq;

namespace MoneyClip.Api
{
    [Route("api/income")]
    public class IncomeController : Controller
    {
        readonly IDataContext _context;
        public IncomeController(IDataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IQueryable<Income> GetIncomes()
        {
            return _context.Query<Income>();

        }
    }
}
