using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OData.Edm;
using MoneyClip.Models;
using MoneyClip.Web;
using Newtonsoft.Json;
using MoneyClip.EntityFramework;

namespace MoneyClip
{
    public class Startup
    {

        readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDataContext>(options => options
                .UseSqlServer(ConnectionString()));
            services.AddOData();
            services.AddMvc();

            services.AddSpaStaticFiles(_configuration =>
            {
                _configuration.RootPath = "wwwroot/build";
            });

            new WebContainer().Register(services);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseMvc(config =>
            {
                config.Select().Expand().Filter().OrderBy().MaxTop(null).Count();
                config.MapODataServiceRoute("odata", "odata", ODataModel());
                config.EnableDependencyInjection();
            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "wwwroot";

                if (env.IsDevelopment())
                    spa.UseReactDevelopmentServer(npmScript: "start");
            });
        }

        static IEdmModel ODataModel()
        {
            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<Income>("Income");
            return builder.GetEdmModel();
        }
        string ConnectionString()
        {
            return _configuration.GetConnectionString("DefaultConnection");
        }

    }
}
