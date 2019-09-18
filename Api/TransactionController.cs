using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyClip.EntityFramework;
using MoneyClip.Models;
using Microsoft.AspNet.OData;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyClip.Api
{
    [Route("api/transactions")]
    public class TransactionController : Controller
    {
        readonly IDataContext _context;
        public TransactionController(IDataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IQueryable<Transaction> GetTransactions()
        {
            return _context.Query<Transaction>().OrderByDescending(o => o.Date);
        }

        [HttpGet("total")]
        [EnableQuery]
        public decimal TransactionTotal()
        {
            return _context.Query<Transaction>().Where(t => t.Cleared == false).Sum(item => item.Amount);
        }

        [HttpPost]
        public async Task Create([FromBody]Transaction transaction)
        {
            var existingTransaction = _context.Query<Transaction>().FirstOrDefault(i => i.Id == transaction.Id);
            if (existingTransaction is null)
                existingTransaction = _context.Add(transaction);

            await _context.Save();
        }

        [HttpDelete("delete/{id}")]
        public async Task Delete(int id)
        {
            var transaction = _context.Query<Transaction>().FirstOrDefault(i => i.Id == id);

            if (transaction != null)
            {
                _context.Remove(transaction);
                await _context.Save();
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }

            _context.Entry(transaction).State = EntityState.Modified;
            await _context.Save();

            return NoContent();
        }

        [HttpPut("toggleStatus/{id}")]
        public async Task<IActionResult> ToggleStatus(int id)
        {
            var transaction = _context.Query<Transaction>().FirstOrDefault(i => i.Id == id);

            if (transaction == null)
            {
                return BadRequest();
            }
            transaction.Cleared = !transaction.Cleared;
            await _context.Save();

            return NoContent();
        }

        [HttpGet("payees")]
        public IQueryable<string> Payees()
        {
            var payees = _context.Query<Transaction>().Select(d => d.Description).Distinct();

            return payees;
        }

    }
}
