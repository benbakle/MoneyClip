using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MoneyClip.EntityFramework;
using System.IO;
using System.Linq;

namespace MoneyClip.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDataContext _db = new DesignTimeDbContextFactory().CreateDbContext(null);
        public IActionResult Index()
        {
            return View();
        }
    }
}