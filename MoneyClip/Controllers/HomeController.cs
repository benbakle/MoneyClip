using Microsoft.AspNetCore.Mvc;

namespace MoneyClip.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}