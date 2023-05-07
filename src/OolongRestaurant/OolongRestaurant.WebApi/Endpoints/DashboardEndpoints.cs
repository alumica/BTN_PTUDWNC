using FluentValidation;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using OolongRestaurant.Core.Collections;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Data.Seeders;
using OolongRestaurant.Services.Contacts;
using OolongRestaurant.Services.Foods;
using OolongRestaurant.Services.Media;
using OolongRestaurant.Services.Menus;
using OolongRestaurant.Services.Users;
using OolongRestaurant.WebApi.Filters;
using OolongRestaurant.WebApi.Models;
using OolongRestaurant.WebApi.Models.Contact;
using System.Net;

namespace OolongRestaurant.WebApi.Endpoints
{
    public static class DashboardEndpoints
    {
        public static WebApplication MapDashboardEndpoints(
            this WebApplication app)
        {
            var routeGroupBuilder = app.MapGroup("/api/dashboard");

            routeGroupBuilder.MapGet("/totalfood", GetTotalFood)
                .WithName("GetTotalFood")
                .Produces<ApiResponse<int>>();

            routeGroupBuilder.MapGet("/totalmenu", GetTotalMenu)
                .WithName("GetTotalMenu")
                .Produces<ApiResponse<int>>();

            routeGroupBuilder.MapGet("/totalcontact", GetTotalContact)
                .WithName("GetTotalContact")
                .Produces<ApiResponse<int>>();

            routeGroupBuilder.MapGet("/totaluser", GetTotalUser)
                .WithName("GetTotalUser")
                .Produces<ApiResponse<int>>();

            return app;
        }

        private static async Task<IResult> GetTotalFood(
            IFoodRepository foodRepository)
        {
            int total = await foodRepository.GetTotalFoodAsync();

            return Results.Ok(ApiResponse.Success(total));
        }

        private static async Task<IResult> GetTotalMenu(
            IMenuRepository menuRepository)
        {
            int total = await menuRepository.GetTotalMenuAsync();

            return Results.Ok(ApiResponse.Success(total));
        }

        private static async Task<IResult> GetTotalContact(
            IContactRepository contactRepository)
        {
            int total = await contactRepository.GetTotalContactAsync();

            return Results.Ok(ApiResponse.Success(total));
        }

        private static async Task<IResult> GetTotalUser(
             IUserRepository userRepository)
        {
            int total = await userRepository.GetTotalUserAsync();

            return Results.Ok(ApiResponse.Success(total));
        }
    }
}

