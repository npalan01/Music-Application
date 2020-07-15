module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "mumbai11",
    DB: "final-project-music-albums",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };