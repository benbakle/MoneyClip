using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OData.Edm;
using MoneyClip.Models;
using System.Linq;

namespace MoneyClip.Web
{
    public partial class Startup
    {

        private static void Spa(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "wwwroot";

                if (env.IsDevelopment())
                    spa.UseReactDevelopmentServer(npmScript: "start");
            });
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
        }

        private static void Mvc(IApplicationBuilder app)
        {
            app.UseMvc(config =>
            {
                config.Select().Expand().Filter().OrderBy().MaxTop(null).Count();
                config.MapODataServiceRoute("odata", "odata", ODataModel());
                config.EnableDependencyInjection();
            });
        }
        static IEdmModel ODataModel()
        {
            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<Income>("Income");
            return builder.GetEdmModel();
        }
    }
}
