'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true // title column cannot be empty
      }
    },
    author: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty: true // author column cannot be empty
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  
  return Books;
};