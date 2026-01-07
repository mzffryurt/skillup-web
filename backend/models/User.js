// In-memory user storage (replace with database in production)
const users = [];

class User {
  constructor(email, password, firstName, lastName) {
    this.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    this.email = email;
    this.password = password; // Will be hashed
    this.firstName = firstName;
    this.lastName = lastName;
    this.enrolledCourses = [];
    this.createdAt = new Date();
  }
}

const userModel = {
  create: (userData) => {
    const user = new User(
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName
    );
    users.push(user);
    return user;
  },

  findByEmail: (email) => {
    return users.find(user => user.email === email);
  },

  findById: (id) => {
    return users.find(user => user.id === id);
  },

  update: (id, updates) => {
    const user = users.find(user => user.id === id);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  },

  getAll: () => users
};

module.exports = userModel;
