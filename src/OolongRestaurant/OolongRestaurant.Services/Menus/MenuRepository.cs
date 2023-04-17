using Microsoft.EntityFrameworkCore;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Data.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Services.Menus
{
    public class MenuRepository : IMenuRespository
    {
        private readonly RestaurantDbContext _context;

        public MenuRepository(RestaurantDbContext context)
        { 
            _context = context;
        }

        public async Task<Menu> GetMenusAsync(
            string slug,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Menu>()
                .Where(m => m.UrlSlug == slug)
                .FirstOrDefaultAsync(cancellationToken);
        }


    }
}
