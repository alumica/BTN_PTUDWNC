using FluentValidation;
using OolongRestaurant.WebApi.Models.Contact;
using OolongRestaurant.WebApi.Models.Food;

namespace OolongRestaurant.WebApi.Validations
{
    public class FoodValidator : AbstractValidator<FoodEditModel>
    {
        public FoodValidator()
        {
            RuleFor(a => a.Name)
                .NotEmpty()
                .WithMessage("Tên món ăn không được để trống")
                .MaximumLength(100)
                .WithMessage("Tên món ăn tối đa 100 ký tự");

            RuleFor(a => a.Description)
                .MaximumLength(500)
                .WithMessage("Nội dung tối đa 500 ký tự");

            RuleFor(a => a.ImageUrl)
                .NotEmpty()
                .WithMessage("Hình ảnh món ăn không được để trống");
        }
    }
}
