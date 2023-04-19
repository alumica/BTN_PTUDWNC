using OolongRestaurant.WebApi.Models.Menu;

namespace OolongRestaurant.WebApi.Models.Food
{
    public class FoodDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public string ImageUrl { get; set; }

        public int MenuId { get; set; }

        public MenuDto Menu { get; set; }
    }
}
