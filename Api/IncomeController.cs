
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyClip.EntityFramework;
using MoneyClip.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyClip.Api
{
    [Route("api/incomes")]
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
        [HttpPost]
        public async Task Create([FromBody]Income income)
        {
            var existingIncome = _context.Query<Income>().FirstOrDefault(i => i.IncomeID == income.IncomeID);
            if (existingIncome is null)
                existingIncome = _context.Add(income);

            await _context.Save();
        }

    }
}
