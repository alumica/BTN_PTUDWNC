
namespace OolongRestaurant.WebApi.Models.Contact
{
    public class ContactEditModel
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Subject { get; set; }

        public string Description { get; set; }

        public static async ValueTask<ContactEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new ContactEditModel()
            {
                Id = int.Parse(form["Id"]),
                FullName = form["FullName"],
                Email = form["Email"],
                Subject = form["Subject"],
                Description = form["Description"],
            };
        }
    }
}
