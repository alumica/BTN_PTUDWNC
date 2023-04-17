﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using NLog.Web;
using OolongRestaurant.Data.Contexts;
using OolongRestaurant.Services.Contacts;
using OolongRestaurant.Services.Media;
using OolongRestaurant.Services.Menus;
using OolongRestaurant.Services.Timing;

namespace OolongRestaurant.WebApi.Extensions
{
    public static class WebApplicationExtensions
    {
        public static WebApplicationBuilder ConfigureServices(
            this WebApplicationBuilder builder)
        {
            builder.Services.AddMemoryCache();

            builder.Services.AddDbContext<RestaurantDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration
                        .GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<IContactRepository, ContactRepository>();
            builder.Services.AddScoped<IMenuRespository, MenuRepository>();
            builder.Services.AddScoped<ITimeProvider, LocalTimeProvider>();
            builder.Services.AddScoped<IMediaManager, LocalFileSystemMediaManager>();

            return builder;
        }

        public static WebApplicationBuilder ConfigureCors(
            this WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("OolongRestaurantApp", policyBuilder =>
                    policyBuilder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
            });

            return builder;
        }

        // Cấu hình việc sử dụng NLog
        public static WebApplicationBuilder ConfigureNLog(
            this WebApplicationBuilder builder)
        {
            builder.Logging.ClearProviders();
            builder.Host.UseNLog();

            return builder;
        }

        public static WebApplicationBuilder ConfigureSwaggerOpenApi(
            this WebApplicationBuilder builder)
        {
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            return builder;
        }

        public static WebApplication SetupRequestPipeline(
            this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles();
            app.UseHttpsRedirection();

            app.UseCors("OolongRestaurantApp");

            return app;
        }
    }
}
