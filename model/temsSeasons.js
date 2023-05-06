const teamSessons = (sequelize, dataTypes) => {
  return sequelize.define(
    "jamolar",
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      points: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
      },
      goalRatio: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
      },
      currentTur: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
      },
      sessionId: {
        type: dataTypes.UUID,
        allowNull: false,
      },
      teamId: {
        type: dataTypes.UUID,
        allowNull: false,
      },
      ligaId: {
        type: dataTypes.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "jamolar",
      indexes: [
        {
          unique: true,
          fields: ["sessionId", "teamId", "ligaId"],
        },
      ],
    }
  );
};
module.exports = teamSessons;
