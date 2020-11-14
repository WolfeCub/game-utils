using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameUtils.Extensions
{
    public static class DictionaryExtensions
    {
        public static Dictionary<K, V> SetReturn<K, V>(this Dictionary<K, V> dict, K key, V elem) where K : notnull
        {
            dict[key] = elem;
            return dict;
        }
    }
}
