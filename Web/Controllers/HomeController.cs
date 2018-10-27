using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MoneyClip.Web;
using System.IO;
using System.Linq;

namespace MoneyClip.Web.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDataContext _db = new DesignTimeDbContextFactory().CreateDbContext(null);
        public IActionResult Index()
        {
            ViewBag.totalIncome = _db.Incomes.Sum(m => m.Amount);
            return View();
        }
    }
}