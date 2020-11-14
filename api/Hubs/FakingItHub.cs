using GameUtils.Concrete;
using GameUtils.Models;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace GameUtils.Hubs
{
    public class FakingItHub : Hub
    {
        private readonly FakingItState ActiveRooms;
        
        public FakingItHub(FakingItState fakingItState)
        {
            ActiveRooms = fakingItState;
        }

        public async Task Join(string userName, string roomId)
        {
            if (ActiveRooms.GetRoom(roomId).Members.Find(o => o.Name == userName) != null)
            {
                await Clients.Caller.SendAsync("UsernameTaken");
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            Context.Items.Add("roomId", roomId);
            Context.Items.Add("userName", userName);

            ActiveRooms.AddOrUpdateToRoom(roomId, userName);

            await Clients.Group(roomId).SendAsync("UpdateState", ActiveRooms.GetRoom(roomId));
        }

        public async Task MakeSelection(string targetUser)
        {
            var roomId = Context.Items["roomId"] as string;
            var userName = Context.Items["userName"] as string;

            if (roomId == null || userName == null) return;

            ActiveRooms.UpdateSelection(roomId, userName, targetUser);

            var room = ActiveRooms.GetRoom(roomId);

            await Clients.Group(roomId).SendAsync("UpdateState", room);
        }

        public async Task SetMode(string newMode)
        {
            var roomId = Context.Items["roomId"] as string;
            var userName = Context.Items["userName"] as string;

            if (roomId == null || userName == null) return;

            ActiveRooms.SetRoomMode(roomId, newMode);

            var room = ActiveRooms.GetRoom(roomId);

            await Clients.Group(roomId).SendAsync("UpdateState", room);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var roomId = Context.Items["roomId"] as string;
            var userName = Context.Items["userName"] as string;

            if (roomId != null && userName != null)
            {
                ActiveRooms.RemoveFromRoom(roomId, userName);

                await Clients.Group(roomId).SendAsync("UpdateState", ActiveRooms.GetRoom(roomId));
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
