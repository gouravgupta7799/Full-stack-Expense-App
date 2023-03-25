const Sequelize = require('sequelize');

const sequelize = require('../utils/DataBase');

const Expense = sequelize.define('ExpenseApp', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  ExpensePrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ExpenseCetogary: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ExpenseDescription: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Expense;