using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoneyClip.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyClip.Web
{
    public partial class Startup
    {

        readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private void EnitityFramework(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDataContext>(options => options
                            .UseSqlServer(ConnectionString()));
        }

        private static void Spa(IServiceCollection services)
        {
            services.AddSpaStaticFiles(_configuration =>
            {
                _configuration.RootPath = "wwwroot/build";
            });
        }
        private static void Register(IServiceCollection services)
        {
            new WebContainer().Register(services);
        }

        string ConnectionString()
        {
            return _configuration.GetConnectionString("DefaultConnection");
        }
    }
}
