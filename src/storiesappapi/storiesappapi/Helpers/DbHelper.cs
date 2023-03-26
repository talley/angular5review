using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace storiesappapi.Helpers
{
    public static class DbHelper
    {
        internal static readonly string CS = @"Data Source=.;Initial Catalog=StoriesDB;Integrated Security=True;Trust Server Certificate=true;";
    }
}
