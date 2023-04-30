using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using OolongRestaurant.Core.Contracts;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Data.Contexts;
using OolongRestaurant.Services.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace OolongRestaurant.Services.Contacts
{
    public class ContactRepository : IContactRepository
    {
        private readonly RestaurantDbContext _context;
        private readonly IMemoryCache _memoryCache;

        public ContactRepository(
            RestaurantDbContext context,
            IMemoryCache memoryCache) 
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IList<Contact>> GetContactsAsync(
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Contact>().ToListAsync(cancellationToken);
        }
        public async Task<IPagedList<Contact>> GetContactsPagedListAsync(
            IPagingParams pagingParams,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Contact>()
                .ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<IPagedList<Contact>> GetContactsPagedListAsync(
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Contact>()
                .ToPagedListAsync(
                    pageNumber,
                    pageSize,
                    nameof(Contact.FullName),
                    "DESC", cancellationToken);
        }

        public async Task<Contact> GetContactByIdAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Contact>()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Contact> GetCachedContactByIdAsync(
            int contactId,
            CancellationToken cancellationToken = default)
        {
            return await _memoryCache.GetOrCreateAsync(
                $"contact.by-id.{contactId}",
                async (entry) =>
                {
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30);
                    return await GetContactByIdAsync(contactId, cancellationToken);
                });
        }

        public async Task<bool> AddOrUpdateContactAsync(
            Contact contact,
            CancellationToken cancellationToken = default)
        {
            if (contact.Id > 0)
            {
                _context.Contacts.Update(contact);
                _memoryCache.Remove($"contact.by-id.{contact.Id}");
            }
            else
            {
                _context.Contacts.Add(contact);
            }

            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteContactByIdAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            var contact = await _context.Set<Contact>().FindAsync(id);

            if (contact is null) return false;

            _context.Set<Contact>().Remove(contact);
            var rowsCount = await _context.SaveChangesAsync(cancellationToken);

            return rowsCount > 0;
        }

        public async Task<int> GetTotalContactAsync(
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Contact>().CountAsync(cancellationToken);
        }
    }
}
