using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace MoneyClip.Web
{
    public partial class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            EnitityFramework(services);
            services.AddOData();
            Mvc(services);
            Spa(services);
            Register(services);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            Mvc(app);
            Spa(app, env);
        }
    }
}
