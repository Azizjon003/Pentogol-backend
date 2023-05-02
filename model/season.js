const season = (sequelize,DataTypes)=>{
  const Season = sequelize.define('season', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    startTime:{
      type:DataTypes.INTEGER,
      allowNull:false

    },
    endTime:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    ligaId:{
      type:DataTypes.UUID,
      allowNull:false,
    }
  },{
    tableName:'season',
    freezeTableName:true,
    timestamps:false
  })

  return Season
}

module.exports = season