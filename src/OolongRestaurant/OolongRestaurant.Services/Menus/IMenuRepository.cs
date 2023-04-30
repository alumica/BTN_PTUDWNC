using Microsoft.EntityFrameworkCore;
using OolongRestaurant.Core.Contracts;
using OolongRestaurant.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Services.Menus
{
    public interface IMenuRepository
    {
        Task<bool> IsMenuSlugExistedAsync(
            int id,
            string slug,
            CancellationToken cancellationToken = default);

        Task<IList<Menu>> GetMenusAsync(
            CancellationToken cancellationToken = default);

        Task<Menu> GetMenuByIdAsync(
            int id,
            CancellationToken cancellationToken = default);

        Task<Menu> GetMenuBySlugAsync(
            string slug,
            CancellationToken cancellationToken = default);

        Task<Menu> GetCachedMenuByIdAsync(
           int id,
           CancellationToken cancellationToken = default);

        Task<IPagedList<Menu>> GetPagedMenuAsync(
            IPagingParams pagingParams,
            CancellationToken cancellationToken = default);

        Task<IPagedList<Menu>> GetPagedMenuAsync(
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default);

        Task<bool> AddOrUpdateMenuAsync(
            Menu menu,
            CancellationToken cancellationToken = default);

        Task<bool> DeleteMenuByIdAsync(
            int id,
            CancellationToken cancellationToken = default);

        Task<IPagedList<Food>> GetPagedFoodAsync(
            IPagingParams pagingParams,
            CancellationToken cancellationToken = default);

        Task<IPagedList<Food>> GetPagedFoodAsync(
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default);
    }
}
