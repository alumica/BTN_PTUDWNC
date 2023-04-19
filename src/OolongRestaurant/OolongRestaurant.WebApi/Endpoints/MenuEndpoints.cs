using FluentValidation;
using MapsterMapper;
using OolongRestaurant.Core.Collections;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Services.Menus;
using OolongRestaurant.Services.Media;
using OolongRestaurant.WebApi.Filters;
using OolongRestaurant.WebApi.Models;
using OolongRestaurant.WebApi.Models.Menu;
using System.Net;
using OolongRestaurant.WebApi.Models.Food;
using OolongRestaurant.Core.Contracts;

namespace OolongRestaurant.WebApi.Endpoints
{
    public static class MenuEndpoints
    {
        public static WebApplication MapMenuEndpoints(
            this WebApplication app)
        {
            var routeGroupBuilder = app.MapGroup("/api/menus");

            routeGroupBuilder.MapGet("/", GetMenus)
                .WithName("GetMenus")
                .Produces<ApiResponse<IList<Menu>>>();

            routeGroupBuilder.MapGet("/{id:int}", GetMenuDetails)
                .WithName("GetMenuById")
                .Produces<ApiResponse<MenuDto>>();

            routeGroupBuilder.MapGet(
                   "/{slug:regex(^[a-z0-9_-]*$)}/foods",
                   GetFoodsByMenuSlug)
               .WithName("GetFoodsByMenuSlug")
               .Produces<ApiResponse<PaginationResult<FoodDto>>>();

            routeGroupBuilder.MapPost("/", AddMenu)
                .WithName("AddNewMenu")
                .AddEndpointFilter<ValidatorFilter<MenuEditModel>>()
                .Produces(401)
                .Produces<ApiResponse<Menu>>();

            routeGroupBuilder.MapPut("/{id:int}", UpdateMenu)
              .WithName("UpdateAnMenu")
              .Produces(401)
              .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteMenu)
                .WithName("DeleteAnMenu")
                .Produces(401)
                .Produces<ApiResponse<string>>();

            return app;
        }

        private static async Task<IResult> GetMenus(
            [AsParameters] MenuFilterModel model,
            IMenuRepository menuRespository)
        {
            var menuList = await menuRespository.GetMenusAsync();

            return Results.Ok(ApiResponse.Success(menuList));
        }

        private static async Task<IResult> GetMenuDetails(
            int id,
            IMenuRepository menuRepository,
            IMapper mapper)
        {
            var menu = await menuRepository.GetCachedMenuByIdAsync(id);

            return menu == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy thực đơn có mã số {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<MenuDto>(menu)));
        }

        private static async Task<IResult> GetFoodsByMenuSlug(
            string slug,
            IMenuRepository menuRepository,
            IMapper mapper)
        {
            var foodsList = await menuRepository.GetPagedFoodAsync();
            var list = mapper.Map<IPagedList<FoodDto>>(foodsList);

            var paginationResult = new PaginationResult<FoodDto>(list);

            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> AddMenu(
            MenuEditModel model,
            IMenuRepository menuRepository,
            IMapper mapper)
        {

            if(await menuRepository
                .IsMenuSlugExistedAsync(0, model.UrlSlug))
            {
                return Results.Conflict(
                    $"Slug '{model.UrlSlug}' đã được sử dụng");
            }

            var menu = mapper.Map<Menu>(model);
            await menuRepository.AddOrUpdateMenuAsync(menu);

            return Results.Ok(ApiResponse.Success(
                mapper.Map<MenuDto>(menu), HttpStatusCode.Created));
        }

        private static async Task<IResult> UpdateMenu(
            int id,
            MenuEditModel model,
            IValidator<MenuEditModel> validator,
            IMenuRepository menuRepository,
            IMapper mapper)
        {
            var validationResult = await validator.ValidateAsync(model);
            if (!validationResult.IsValid)
            {
                return Results.Ok(ApiResponse.Fail(
                HttpStatusCode.BadRequest, validationResult));
            }

            if (await menuRepository.IsMenuSlugExistedAsync(id, model.UrlSlug))
            {
                return Results.Ok(ApiResponse.Fail(
                    HttpStatusCode.Conflict,
                    $"Slug '{model.UrlSlug}' đã được sử dụng"));
            }

            var menu = mapper.Map<Menu>(model);
            menu.Id = id;

            return await menuRepository.AddOrUpdateMenuAsync(menu)
                ? Results.Ok(ApiResponse.Success("Thực đơn đã được cập nhật", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không thể tìm thấy thực đơn"));
        }

        private static async Task<IResult> DeleteMenu(
            int id,
            IMenuRepository menuRepository)
        {
            return await menuRepository.DeleteMenuByIdAsync(id)
                ? Results.Ok(ApiResponse.Success("Thực đơn đã được xóa", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không thể tìm thấy thực đơn"));
        }
    }
}

