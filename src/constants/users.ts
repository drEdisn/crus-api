import { v4 } from 'uuid';

export interface User {
  id: string,
  username: string,
  age: number,
  hobbys: string[],
}

function createUsers(startUsers: User[]) {
  let users: User[] = startUsers || [];

  return {
    getAll(): User[] {
      return users;
    },
    setAll(values: User[]): void {
      users = values;
    },
    getUser(id: string): User | undefined {
      return users.find((user) => user.id === id);
    },
    createUser(body: User): User {
      const user: User = {
        id: v4(),
        username: body.username,
        age: body.age,
        hobbys: body.hobbys,
      };
      users.push(user);

      return user;
    },
    updateUser(id: string, body: User): User | undefined {
      let newUser: User | undefined;

      users = users.map((user) => {
        if (user.id === id) {
          newUser = Object.assign({ id: user.id }, body);
          return newUser;
        }
        return user;
      });

      return newUser;
    },
    deleteUser(id: string): boolean {
      const len = users.length;
      users = users.filter((user) => user.id !== id);
      return users.length < len;
    },
  };
}

const users = createUsers([{
  id: 'asdf',
  username: 'Denis',
  age: 222,
  hobbys: ['programming'],
}]);

export { users };
