using GameUtils.Extensions;
using GameUtils.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GameUtils.Concrete
{
    public class FakingItState
    {
        private readonly ConcurrentDictionary<string, FakingItRoom> State = new ConcurrentDictionary<string, FakingItRoom>();

        public void AddOrUpdateToRoom(string roomId, string userName)
        {
            State.AddOrUpdate(roomId,
                new FakingItRoom {
                    RoomId = roomId,
                    Members = new List<FakingItPlayer>
                    {
                        new FakingItPlayer { Name = userName, Color = "red" }
                    }
                },
                (key, room) =>
                {
                    var color = room.ColorsAvailable.Dequeue();
                    return room with
                    {
                        Members = room.Members.Append(new FakingItPlayer { Name = userName, Color = color }).ToList()
                    };
                }
            );
        }

        public void RemoveFromRoom(string roomId, string userName)
        {
            State.AddOrUpdate(roomId, 
                new FakingItRoom { RoomId = roomId, Members = new List<FakingItPlayer>() }, 
                (key, room) => {
                    var user = room.Members.Find(o => o.Name == userName);
                    if (user != null)
                    {
                        room.ColorsAvailable.Enqueue(user.Color);
                        return room with { Members = room.Members.RemoveReturn<FakingItPlayer>(user) };
                    }
                    else
                    {
                        return room;
                    }
                }
            );

            if (State[roomId].Members.Count == 0)
                State.TryRemove(roomId, out _);
        }

        public FakingItRoom GetRoom(string roomId)
        {
            return State.TryGetValue(roomId, out var result) ? result : new FakingItRoom();
        }

        public void UpdateSelection(string roomId, string selectingUser, string targetUser)
        {
            State.AddOrUpdate(roomId,
                new FakingItRoom { RoomId = roomId, },
                (key, room) => room with { CurrentSelection = room.CurrentSelection.SetReturn(selectingUser, targetUser) }
            ); ;
        }

        public void SetRoomMode(string roomId, string newMode)
        {
            State.AddOrUpdate(roomId,
                new FakingItRoom { RoomId = roomId, },
                (key, room) => room with { RoomMode = newMode, CurrentSelection = new Dictionary<string, string>() }
            ); ;
        }
    }
}
