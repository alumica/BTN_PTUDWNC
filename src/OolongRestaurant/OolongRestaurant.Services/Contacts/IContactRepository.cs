using OolongRestaurant.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Services.Contacts
{
    public interface IContactRepository
    {
        Task<IList<Contact>> GetContactsAsync(
            CancellationToken cancellationToken = default);

        Task<Contact> GetContactByIdAsync(
            int id,
            CancellationToken cancellationToken = default);

        Task<Contact> GetCachedContactByIdAsync(
            int contactId,
            CancellationToken cancellationToken = default);

        Task<bool> AddOrUpdateContactAsync(
            Contact contact,
            CancellationToken cancellationToken = default);

        Task<bool> DeleteContactByIdAsync(
            int id,
            CancellationToken cancellationToken = default);
    }
}
