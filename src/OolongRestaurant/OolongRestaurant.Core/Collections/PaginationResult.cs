using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OolongRestaurant.Core.Contracts;
using TatBlog.Core.Collections;

namespace OolongRestaurant.Core.Collections
{
    public class PaginationResult<T>
    {
        public IEnumerable<T> Items { get; set; }

        public PagingMetadata Metadata { get; set; }

        public PaginationResult(IPagedList<T> pagedList)
        {
            Items = pagedList;
            Metadata = new PagingMetadata(pagedList);
        }
    }
}
