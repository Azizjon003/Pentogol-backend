const matches = (sequelize, dataTypes) => {
  return sequelize.define(
    "matches",
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      homeTeam: {
        type: dataTypes.UUID,
        allowNull: false,
      },
      awayTeam: {
        type: dataTypes.UUID,
        allowNull: false,
      },
      startTime: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      awayGoal: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      homeGoal: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "matches",
      indexes: [
        {
          unique: true,
          fields: ["homeTeam", "awayTeam", "startTime"],
        },
      ],
    }
  );
};
module.exports = matches;
