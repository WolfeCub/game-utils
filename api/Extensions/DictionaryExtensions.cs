using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameUtils.Extensions
{
    public static class ListExtensions
    {
        public static List<T> RemoveReturn<T>(this List<T> lst, T elem)
        {
            lst.Remove(elem);
            return lst;
        }
    }
}
