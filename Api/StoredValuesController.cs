
using Microsoft.AspNetCore.Mvc;
using MoneyClip.EntityFramework;
using MoneyClip.Models;
using Microsoft.AspNet.OData;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MoneyClip.Api
{
    [Route("api/values")]
    public class StoredValuesController : Controller
    {
        readonly IDataContext _context;
        public StoredValuesController(IDataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public StoredValues GetValues()
        {
            return _context.Query<StoredValues>().FirstOrDefault();
        }


        //[HttpPost]
        //public async Task Create([FromBody]Income income)
        //{
        //    var existingIncome = _context.Query<Income>().FirstOrDefault(i => i.IncomeID == income.IncomeID);
        //    if (existingIncome is null)
        //        existingIncome = _context.Add(income);

        //    await _context.Save();
        //}

        //[HttpDelete("delete/{id}")]
        //public async Task Delete(int id)
        //{
        //    var income = _context.Query<Income>().FirstOrDefault(i => i.IncomeID == id);

        //    if (income != null)
        //    {
        //        _context.Remove(income);
        //        await _context.Save();
        //    }
        //}

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]StoredValues storedValues)
        {
            if (id != storedValues.StoredValuesId)
            {
                return BadRequest();
            }

            _context.Entry(storedValues).State = EntityState.Modified;
            await _context.Save();

            return NoContent();
        }

    }
}
