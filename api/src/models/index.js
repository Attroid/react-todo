const User = require('./user');
const Customization = require('./customization');
const Project = require('./project');
const Task = require('./task');

User.hasOne(Customization, { onDelete: 'CASCADE' });
Customization.belongsTo(User);

User.hasMany(Project, { onDelete: 'CASCADE' });
Project.belongsTo(User);

Project.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(Project);

module.exports = { User, Customization, Project, Task };
