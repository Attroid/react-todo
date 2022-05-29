const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('database');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function (unsafeVal) {
        const val = String(unsafeVal);

        // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('password', val);

        // Sequelize tries to save entity before promise is resolved so we need to hash in sync
        this.setDataValue('passwordHash', bcrypt.hashSync(val, 10));
      },
      validate: {
        isLongEnough: (val) => {
          if (val.length < 7) {
            throw new Error('Please choose a longer password');
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user',
  }
);

User.prototype.toJSON = function () {
  const { id, passwordHash, password, ...rest } = this.get();

  return { ...rest };
};

User.prototype.checkPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = User;
