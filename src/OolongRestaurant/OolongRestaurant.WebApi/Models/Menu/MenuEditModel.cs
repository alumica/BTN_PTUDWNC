using OolongRestaurant.WebApi.Models.Food;

namespace OolongRestaurant.WebApi.Models.Menu
{
    public class MenuEditModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string UrlSlug { get; set; }

        public static async ValueTask<MenuEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new MenuEditModel()
            {
                Id = int.Parse(form["Id"]),
                Name = form["Name"],
                Description = form["Description"],
                UrlSlug = form["UrlSlug"],
            };
        }
    }
}
