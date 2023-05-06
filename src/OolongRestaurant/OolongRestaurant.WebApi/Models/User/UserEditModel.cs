using OolongRestaurant.WebApi.Models.Food;

namespace OolongRestaurant.WebApi.Models.User
{
    public class UserEditModel
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string ImageUrl { get; set; }

        public IFormFile ImageFile { get; set; }

        public bool TypeUser { get; set; }

        public static async ValueTask<UserEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new UserEditModel()
            {
                Id = int.Parse(form["Id"]),
                FullName = form["FullName"],
                UserName = form["UserName"],
                Password = form["Password"],
                Email = form["Email"],
                ImageFile = form.Files["ImageFile"],
                TypeUser = bool.Parse(form["TypeUser"]),
            };
        }
    }
}
