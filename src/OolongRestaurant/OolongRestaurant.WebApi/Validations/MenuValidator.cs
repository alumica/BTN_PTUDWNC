using FluentValidation;
using OolongRestaurant.WebApi.Models.Menu;

namespace OolongRestaurant.WebApi.Validations
{
    public class MenuValidator : AbstractValidator<MenuEditModel>
    {
        public MenuValidator()
        {
            RuleFor(a => a.Name)
                .NotEmpty()
                .WithMessage("Tên tác giả không được để trống")
                .MaximumLength(100)
                .WithMessage("Tên tác giả tối đa 100 ký tự");

            RuleFor(a => a.Description)
                .MaximumLength(1000)
                .WithMessage("Nội dung tối đa 500 ký tự");

            RuleFor(a => a.UrlSlug)
                .MaximumLength(100)
                .WithMessage("Ghi chú tối đa 500 ký tự");
        }
    }
}
