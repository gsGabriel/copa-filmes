using CopaFilmes.Campeonato.CommandHandler;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace CopaFilmes.API.Extensions
{
    public static class ConfigureServicesExtension
    {
        public static IServiceCollection AddMediatR(this IServiceCollection services)
        {
            return services.AddMediatR(typeof(DisputarCampeonatoCommandHandler).Assembly);
        }
    }
}
