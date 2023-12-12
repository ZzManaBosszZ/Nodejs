module.exports = (sequelize, Sequelize) => {
    const Publishers = sequelize.define("publishers", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      }
    });
  
    return Publishers;
  };