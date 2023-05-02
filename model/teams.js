const teams = (sequelize,DataTypes)=>{
  return sequelize.define('teams',{
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    image:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    ligaId:{
      type:DataTypes.UUID,
      allowNull:false
    }
  },{
    timestamps:false,
    freezeTableName:true,
    tableName:"teams"
  })
}

module.exports = teams