// The most simple test
// describe('my test', () => {
//   it('returns true', () => {
//     expect(true).toEqual(true);
//   });
// });

// class FriendList {
//   friends = [];

//   addFriend(name) {
//     this.friends.push(name);
//     this.announceFriend(name);
//   }

//   announceFriend(name) {
//     global.console.log(`Hello, ${name} is my friend`);
//   }

//   deleteFriend(name) {
//     const index = this.friends.indexOf(name);

//     if (index === -1) {
//       throw new Error('Friend does not exists');
//     }

//     this.friends.splice(index, 1);
//   }
// }

// describe('Friendlst', () => {
//   let friendList;

//   beforeEach(() => {
//     friendList = new FriendList();
//   });

//   it('initialize friends Class', () => {
//     expect(friendList.friends.length).toEqual(0);
//   });

//   it('Add a friend to list', () => {
//     friendList.addFriend('Cesar');
//     expect(friendList.friends.length).toEqual(1);
//   });

//   it('Announces Friendship', () => {
//     friendList.announceFriend = jest.fn();
//     expect(friendList.announceFriend).not.toHaveBeenCalled();
//     friendList.addFriend('Cesar');
//     expect(friendList.announceFriend).toHaveBeenCalledWith('Cesar');
//   });

//   describe('Remove a Friend', () => {
//     it('Removes a friend', () => {
//       friendList.addFriend('Cesar');
//       expect(friendList.friends[0]).toEqual('Cesar');
//       friendList.deleteFriend('Cesar');
//       expect(friendList.friends[0]).toBeUndefined();
//     });
//     it('Throw Exception', () => {
//       expect(() => friendList.deleteFriend('Cesar')).toThrow(
//         Error('Friend does not exists'),
//       );
//     });
//   });
// });
