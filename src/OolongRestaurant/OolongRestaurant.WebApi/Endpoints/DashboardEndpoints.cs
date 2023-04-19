﻿using FluentValidation;
using MapsterMapper;
using OolongRestaurant.Core.Collections;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Services.Contacts;
using OolongRestaurant.Services.Foods;
using OolongRestaurant.Services.Media;
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

            routeGroupBuilder.MapGet("/totalcontact", GetTotalContact)
                .WithName("GetTotalContact")
                .Produces<ApiResponse<int>>();

            //routeGroupBuilder.MapGet("/{id:int}", GetContactDetails)
            //    .WithName("GetContactById")
            //    .Produces<ApiResponse<Contact>>();

            //routeGroupBuilder.MapPost("/", AddContact)
            //    .WithName("AddNewContact")
            //    .AddEndpointFilter<ValidatorFilter<ContactEditModel>>()
            //    .Produces(401)
            //    .Produces<ApiResponse<Contact>>();

            //routeGroupBuilder.MapPut("/{id:int}", UpdateContact)
            //  .WithName("UpdateAnContact")
            //  .Produces(401)
            //  .Produces<ApiResponse<string>>();

            //routeGroupBuilder.MapDelete("/{id:int}", DeleteContact)
            //    .WithName("DeleteAnContact")
            //    .Produces(401)
            //    .Produces<ApiResponse<string>>();

            return app;
        }

        private static async Task<IResult> GetTotalFood(
            IFoodRepository foodRepository)
        {
            int total = await foodRepository.GetTotalFoodAsync();

            return Results.Ok(total);
        }

        private static async Task<IResult> GetTotalContact(
            IContactRepository contactRepository)
        {
            int total = await contactRepository.GetTotalContactAsync();

            return Results.Ok(total);
        }

        private static async Task<IResult> GetContactDetails(
            int id,
            IContactRepository contactRepository,
            IMapper mapper)
        {
            var contact = await contactRepository.GetCachedContactByIdAsync(id);

            return contact == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy người liên hệ có mã số {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<Contact>(contact)));
        }


        private static async Task<IResult> AddContact(
            ContactEditModel model,
            IContactRepository contactRepository,
            IMapper mapper)
        {

            var contact = mapper.Map<Contact>(model);
            await contactRepository.AddOrUpdateContactAsync(contact);

            return Results.Ok(ApiResponse.Success(
                mapper.Map<Contact>(contact), HttpStatusCode.Created));
        }

        private static async Task<IResult> UpdateContact(
            int id,
            ContactEditModel model,
            IValidator<ContactEditModel> validator,
            IContactRepository contactRepository,
            IMapper mapper)
        {
            var validationResult = await validator.ValidateAsync(model);
            if (!validationResult.IsValid)
            {
                return Results.Ok(ApiResponse.Fail(
                HttpStatusCode.BadRequest, validationResult));
            }

            
            var contact = mapper.Map<Contact>(model);
            contact.Id = id;

            return await contactRepository.AddOrUpdateContactAsync(contact)
                ? Results.Ok(ApiResponse.Success("Người liên hệ được cập nhật", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không thể tìm thấy người liên hệ"));
        }

        private static async Task<IResult> DeleteContact(
            int id,
            IContactRepository contactRepository)
        {
            return await contactRepository.DeleteContactByIdAsync(id)
                ? Results.Ok(ApiResponse.Success("Người liên hệ đã được xóa", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không thể tìm thấy người liên hệ"));
        }
    }
}

