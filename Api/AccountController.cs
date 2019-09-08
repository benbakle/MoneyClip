using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyClip.EntityFramework;
using MoneyClip.Models;
using Microsoft.AspNet.OData;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyClip.Api
{
    [Route("api/accounts")]
    public class AccountController : Controller
    {
        readonly IDataContext _context;
        public AccountController(IDataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IQueryable<Account> GetAccounts()
        {
            return _context.Query<Account>();
        }

        [HttpGet("total/{type}")]
        [EnableQuery]
        public decimal AccountTotal(AccountType type)
        {
            return _context.Query<Account>()
                .Where(account => account.Type == type)
                .Sum(account => account.Balance);
        }

        [HttpPost]
        public async Task Create([FromBody]Account account)
        {
            var existingAccount = _context.Query<Account>().FirstOrDefault(i => i.Id == account.Id);
            if (existingAccount is null)
                existingAccount = _context.Add(account);

            await _context.Save();
        }

        [HttpDelete("delete/{id}")]
        public async Task Delete(int id)
        {
            var account = _context.Query<Account>().FirstOrDefault(i => i.Id == id);

            if (account != null)
            {
                _context.Remove(account);
                await _context.Save();
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;
            await _context.Save();

            return NoContent();
        }

    }
}
