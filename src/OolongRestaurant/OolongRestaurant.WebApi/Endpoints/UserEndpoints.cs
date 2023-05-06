using OolongRestaurant.Core.Collections;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.WebApi.Models.Food;
using OolongRestaurant.WebApi.Models.Menu;
using OolongRestaurant.WebApi.Models;
using FluentValidation;
using MapsterMapper;
using OolongRestaurant.Services.Extensions;
using OolongRestaurant.Services.Foods;
using OolongRestaurant.Services.Menus;
using System.Net;
using OolongRestaurant.Services.Users;
using Mapster;
using OolongRestaurant.WebApi.Models.User;
using Microsoft.EntityFrameworkCore;
using OolongRestaurant.Services.Media;

namespace OolongRestaurant.WebApi.Endpoints
{
    public static class UserEndpoints
    {
        public static WebApplication MapUserEndpoints(
            this WebApplication app)
        {
            var routeGroupBuilder = app.MapGroup("/api/users");

            routeGroupBuilder.MapGet("/", GetUsers)
                .WithName("GetUsers")
                .Produces<ApiResponse<PaginationResult<UserDto>>>();

            routeGroupBuilder.MapGet("/{id:int}", GetUserDetails)
                .WithName("GetUserById")
                .Produces<ApiResponse<UserDto>>();

            //routeGroupBuilder.MapGet(
            //       "/{slug:regex(^[a-z0-9_-]*$)}/foods",
            //       GetFoodsByMenuSlug)
            //   .WithName("GetFoodsByMenuSlug")
            //   .Produces<ApiResponse<PaginationResult<FoodDto>>>();

            routeGroupBuilder.MapPost("/", AddUser)
                .WithName("AddNewUser")
                .Accepts<UserEditModel>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<User>>();

            //routeGroupBuilder.MapPut("/{id:int}", UpdateMenu)
            //  .WithName("UpdateAnMenu")
            //  .Produces(401)
            //  .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteUser)
                .WithName("DeleteAnUser")
                .Produces(401)
                .Produces<ApiResponse<string>>();

            return app;
        }
        private static async Task<IResult> GetUsers(
            [AsParameters] MenuFilterModel model,
            IUserRepository userRepository)
        {
            var userList = await userRepository
                .GetPagedUserAsync(
                    model, user => user.ProjectToType<UserDto>());
            var paginationResult = new PaginationResult<UserDto>(userList);

            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> GetUserDetails(
            int id,
            IUserRepository userRepository,
            IMapper mapper)
        {
            var user = await userRepository.GetCachedUserByIdAsync(id);

            return user == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy người dùng có mã số {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<UserDto>(user)));
        }

        private static async Task<IResult> AddUser(
            HttpContext context,
            IUserRepository userRepository,
            IMediaManager mediaManager,
            IMapper mapper)
        {
            var model = await UserEditModel.BindAsync(context);

            var user = model.Id > 0 ? await userRepository.GetUserByIdAsync(model.Id) : null;

            if (user == null)
            {
                user = new User();
            }

            user.FullName = model.FullName;
            user.Email = model.Email;
            user.UserName = model.UserName;
            user.Password = model.Password;
            user.TypeUser = model.TypeUser;

            if (model.ImageFile?.Length > 0)
            {
                string hostname =
               $"{context.Request.Scheme}://{context.Request.Host}{context.Request.PathBase}/",
                uploadedPath = await
               mediaManager.SaveFileAsync(model.ImageFile.OpenReadStream(), model.ImageFile.FileName,
                model.ImageFile.ContentType);
                if (!string.IsNullOrWhiteSpace(uploadedPath))
                {
                    user.ImageUrl = hostname + uploadedPath;
                }
            }

            await userRepository.AddOrUpdateUserAsync(user);

            return Results.Ok(ApiResponse.Success(
                mapper.Map<User>(user), HttpStatusCode.Created));
        }

        //private static async Task<IResult> UpdateMenu(
        //    int id,
        //    MenuEditModel model,
        //    IValidator<MenuEditModel> validator,
        //    IMenuRepository menuRepository,
        //    IMapper mapper)
        //{
        //    var validationResult = await validator.ValidateAsync(model);
        //    if (!validationResult.IsValid)
        //    {
        //        return Results.Ok(ApiResponse.Fail(
        //        HttpStatusCode.BadRequest, validationResult));
        //    }

        //    if (await menuRepository.IsMenuSlugExistedAsync(id, model.UrlSlug))
        //    {
        //        return Results.Ok(ApiResponse.Fail(
        //            HttpStatusCode.Conflict,
        //            $"Slug '{model.UrlSlug}' đã được sử dụng"));
        //    }

        //    var menu = mapper.Map<Menu>(model);
        //    menu.Id = id;

        //    return await menuRepository.AddOrUpdateMenuAsync(menu)
        //        ? Results.Ok(ApiResponse.Success("Thực đơn đã được cập nhật", HttpStatusCode.NoContent))
        //        : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không thể tìm thấy thực đơn"));
        //}

        private static async Task<IResult> DeleteUser(
            int id,
            IUserRepository userRepository)
        {
            return await userRepository.DeleteUserByIdAsync(id)
                ? Results.Ok(ApiResponse.Success("Người dùng đã được xóa", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không thể tìm thấy người dùng"));
        }
    }
}