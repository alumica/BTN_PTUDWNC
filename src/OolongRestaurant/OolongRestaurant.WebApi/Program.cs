using OolongRestaurant.WebApi.Endpoints;
using OolongRestaurant.WebApi.Extensions;
using OolongRestaurant.WebApi.Mapsters;
using OolongRestaurant.WebApi.Validations;

var builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    builder
        .ConfigureCors()
        .ConfigureNLog()
        .ConfigureServices()
        .ConfigureSwaggerOpenApi()
        .ConfigureMapster()
        .ConfigureFluentValition();
}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    app.SetupRequestPipeline();

    // Configure API endpoints
    app.MapContactEndpoints();
    app.MapMenuEndpoints();
    app.MapDashboardEndpoints();


    app.Run();
}