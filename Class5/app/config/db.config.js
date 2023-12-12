module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "t2209m_sqlnodejs",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };