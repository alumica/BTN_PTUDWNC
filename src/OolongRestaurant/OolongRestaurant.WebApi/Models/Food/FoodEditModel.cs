using System.ComponentModel;

namespace OolongRestaurant.WebApi.Models.Food
{
    public class FoodEditModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        [DisplayName("Hình hiện tại")]
        public string ImageUrl { get; set; }

        [DisplayName("Chọn hình ảnh")]
        public IFormFile ImageFile { get; set; }

        public int MenuId { get; set; }


        public static async ValueTask<FoodEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new FoodEditModel()
            {
                ImageFile = form.Files["ImageFile"],
                Id = int.Parse(form["Id"]),
                Name = form["Name"],
                Description = form["Description"],
                Price = double.Parse(form["Price"]),
                MenuId = int.Parse(form["MenuId"]),
            };
        }
    }
}
