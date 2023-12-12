module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comment", {
      name: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
    });
  
    return Comments;
  };