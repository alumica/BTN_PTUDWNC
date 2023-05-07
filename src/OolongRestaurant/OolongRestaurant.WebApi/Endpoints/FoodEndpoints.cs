using FluentValidation;
using MapsterMapper;
using Microsoft.Extensions.Hosting;
using OolongRestaurant.Core.Collections;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Services.Contacts;
using OolongRestaurant.Services.Foods;
using OolongRestaurant.Services.Media;
using OolongRestaurant.WebApi.Filters;
using OolongRestaurant.WebApi.Models;
using OolongRestaurant.WebApi.Models.Contact;
using OolongRestaurant.WebApi.Models.Food;
using System.Net;

namespace OolongRestaurant.WebApi.Endpoints
{
    public static class FoodEndpoints
    {
        public static WebApplication MapFoodEndpoints(
            this WebApplication app)
        {
            var routeGroupBuilder = app.MapGroup("/api/foods");

            routeGroupBuilder.MapGet("/", GetFoods)
                .WithName("GetFoods")
                .Produces<ApiResponse<PaginationResult<Food>>>();

            routeGroupBuilder.MapGet("/{id:int}", GetFoodDetails)
                .WithName("GetFoodById")
                .Produces<ApiResponse<Food>>();

            routeGroupBuilder.MapGet("/menu/{id:int}", GetFoodsByMenuId)
                .WithName("GetFoodsByMenuId")
                .Produces<ApiResponse<PaginationResult<Food>>>();

            //routeGroupBuilder.MapGet("/menu/byslug/{slug:regex(^[a-z0-9_-]*$)}", GetFoodsByMenuSlug)
            //    .WithName("GetFoodsByMenuSlug")
            //    .Produces<ApiResponse<PaginationResult<Food>>>();

            routeGroupBuilder.MapPost("/", AddFood)
                .WithName("AddNewFood")
                .Accepts<FoodEditModel>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<Food>>();

            routeGroupBuilder.MapPost("/{id:int}/image", SetFoodPicture)
                .WithName("SetFoodPicture")
                .Accepts<IFormFile>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapPut("/{id:int}", UpdateFood)
              .WithName("UpdateAnFood")
              .Produces(401)
              .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteFood)
                .WithName("DeleteAnFood")
                .Produces(401)
                .Produces<ApiResponse<string>>();

            return app;
        }

        private static async Task<IResult> GetFoods(
            [AsParameters] FoodFilterModel model,
            IFoodRepository foodRepository)
        {
            var foodList = await foodRepository.GetPagedFoodAsync();
            var paginationResult = new PaginationResult<Food>(foodList);

            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> GetFoodDetails(
            int id,
            IFoodRepository foodRepository,
            IMapper mapper)
        {
            var food = await foodRepository.GetCachedFoodByIdAsync(id);

            return food == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy người món ăn có mã số {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<Food>(food)));
        }

        private static async Task<IResult> GetFoodsByMenuId(
            int id,
            [AsParameters] FoodFilterModel model,
            IFoodRepository foodRepository)
        {
            var foodList = await foodRepository.GetPagedFoodAsync(id, 1, 3);
            var paginationResult = new PaginationResult<Food>(foodList);

            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> GetFoodsByMenuSlug(
            string slug,
            [AsParameters] FoodFilterModel model,
            IFoodRepository foodRepository)
        {
            var foodList = await foodRepository.GetPagedFoodAsync(slug, 1, 3);
            var paginationResult = new PaginationResult<Food>(foodList);

            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> AddFood(
            HttpContext context,
            IFoodRepository foodRepository,
            IMapper mapper,
            IMediaManager mediaManager)
        {
            var model = await FoodEditModel.BindAsync(context);
            var food = model.Id > 0 ? await foodRepository.GetFoodByIdAsync(model.Id) : null;

            if (food == null)
            {
                food = new Food();
            }

            food.Name = model.Name;
            food.Description = model.Description;
            food.Price = model.Price;
            food.MenuId = model.MenuId;

            if (model.ImageFile?.Length > 0)
            {
                string hostname =
               $"{context.Request.Scheme}://{context.Request.Host}{context.Request.PathBase}/",
                uploadedPath = await
               mediaManager.SaveFileAsync(model.ImageFile.OpenReadStream(), model.ImageFile.FileName,
                model.ImageFile.ContentType);
                if (!string.IsNullOrWhiteSpace(uploadedPath))
                {
                    food.ImageUrl = hostname + uploadedPath;
                }
            }

            await foodRepository.AddOrUpdateFoodAsync(food);

            return Results.Ok(ApiResponse.Success(
                mapper.Map<Food>(food), HttpStatusCode.Created));
        }

        private static async Task<IResult> SetFoodPicture(
            int id,
            IFormFile imageFile,
            IFoodRepository foodRepository,
            IMediaManager mediaManager)
        {
            var imageUrl = await mediaManager.SaveFileAsync(
                imageFile.OpenReadStream(),
                imageFile.FileName, imageFile.ContentType);

            if (string.IsNullOrWhiteSpace(imageUrl))
            {
                return Results.Ok(ApiResponse.Fail(
                    HttpStatusCode.BadRequest, "Không lưu được tập tin"));

            }

            await foodRepository.SetImageUrlAsync(id, imageUrl);
            return Results.Ok(ApiResponse.Success(imageUrl));
        }

        private static async Task<IResult> UpdateFood(
            int id,
            FoodEditModel model,
            IValidator<FoodEditModel> validator,
            IFoodRepository foodRepository,
            IMapper mapper)
        {
            var validationResult = await validator.ValidateAsync(model);
            if (!validationResult.IsValid)
            {
                return Results.Ok(ApiResponse.Fail(
                HttpStatusCode.BadRequest, validationResult));
            }

            
            var food = mapper.Map<Food>(model);
            food.Id = id;

            return await foodRepository.AddOrUpdateFoodAsync(food)
                ? Results.Ok(ApiResponse.Success("Món ăn đã được cập nhật", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không thể tìm thấy món ăn"));
        }

        private static async Task<IResult> DeleteFood(
            int id,
            IFoodRepository foodRepository)
        {
            return await foodRepository.DeleteFoodByIdAsync(id)
                ? Results.Ok(ApiResponse.Success("Món ăn đã được xóa", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không thể tìm thấy món ăn"));
        }
    }
}

