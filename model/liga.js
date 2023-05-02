const liga = (sequelize,DataTypes)=>{
  const liga = sequelize.define("liga",{
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
    }
  },{
    tableName:"liga",
    freezeTableName:true,
    indexes:[
      {
        unique:true,
        fields:["id"]
      }
    ]
  })
  return liga
}
module.exports = liga