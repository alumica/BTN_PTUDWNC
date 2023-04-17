using FluentValidation;
using System.Reflection;

namespace OolongRestaurant.WebApi.Validations
{
    public static class FluentValidationDependencyInjection
    {
        public static WebApplicationBuilder ConfigureFluentValition(
            this WebApplicationBuilder builder)
        {
            // Scan and register all validators in given assembly
            builder.Services.AddValidatorsFromAssembly(
                Assembly.GetExecutingAssembly());

            return builder;
        }
    }
}
