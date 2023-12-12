module.exports = (sequelize, Sequelize) => {
    const Publishers = sequelize.define("publisher", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Publishers;
  };