using Microsoft.Extensions.DependencyInjection;
using MoneyClip.Api;
using MoneyClip.EntityFramework;

namespace MoneyClip.Web
{
    public class WebContainer
    {
        public void Register(IServiceCollection services)
        {
            services.AddScoped(typeof(IDataContext), typeof(ApplicationDataContext));
        }
    }
}
