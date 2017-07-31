const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'hoang',
            room: 'node course'
        }, {
            id: '2',
            name: 'ly',
            room: 'react course'
        }, {
            id: '3',
            name: 'huong',
            room: 'node course'
        }]
    })

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('node course');

        expect(userList).toEqual(['hoang', 'huong']);
    })

    it('should return names for react course', () => {
        var userList = users.getUserList('react course');

        expect(userList).toEqual(['ly']);
    });

    it('should remove a user', () => {
        var user = users.removeUser('1');

        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
         var user = users.removeUser('22');

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var user = users.getUser('1');
        
        expect(user.id).toBe('1');
    });

    it('should not find user', () => {
         var user = users.getUser('4');

         expect(user).toBe(undefined);
    });
});