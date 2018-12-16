
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpDelete("delete/{id}")]
        public async Task Delete(int id)
        {
            var income = _context.Query<Income>().FirstOrDefault(i => i.IncomeID == id);

            if (income != null)
            {
                _context.Remove(income);
                await _context.Save();
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]Income income)
        {
            if (id != income.IncomeID)
            {
                return BadRequest();
            }

            _context.Entry(income).State = EntityState.Modified;
            await _context.Save();

            return NoContent();
        }

    }
}
