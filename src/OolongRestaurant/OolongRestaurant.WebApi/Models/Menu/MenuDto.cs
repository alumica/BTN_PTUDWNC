using OolongRestaurant.Core.Entities;
using OolongRestaurant.WebApi.Models.Food;

namespace OolongRestaurant.WebApi.Models.Menu
{
    public class MenuDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string UrlSlug { get; set; }

        public int FoodCount { get; set; }
    }
}
