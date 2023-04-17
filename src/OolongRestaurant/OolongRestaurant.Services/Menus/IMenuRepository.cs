using OolongRestaurant.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Services.Menus
{
    public interface IMenuRespository
    {
        Task<Menu> GetMenusAsync(
            string slug,
            CancellationToken cancellationToken = default);
    }
}
