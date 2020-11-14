using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameUtils.Models
{
    public record FakingItPlayer
    {
        public string Name { get; init; } = "";

        public string Color { get; init; } = "red";
    }
}
