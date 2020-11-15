using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GameUtils.Models
{
    public record FakingItRoom
    {
        public string RoomId { get; init; } = "";

        public string RoomMode { get; init; } = "Pointing";

        public List<FakingItPlayer> Members { get; init; } = new List<FakingItPlayer>();

        public Dictionary<string, string> CurrentSelection = new Dictionary<string, string>();

        [JsonIgnore]
        public Queue<string> ColorsAvailable = new Queue<string>(new[] { "blue", "green", "yellow", "purple", "green", "aqua", "maroon", "lime" });
    }
}
