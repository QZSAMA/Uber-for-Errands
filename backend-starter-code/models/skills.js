module.exports = (sequelize, DataTypes) => {
	Skills = sequelize.define('Skills',{
		title: DataTypes.STRING,
		description: DataTypes.TEXT
	})

    Skills.associate = (models) => {
    Skills.belongsToMany(models.Users, {through: 'UsersSkills'}); } //many to many relationship with users table

  return Skills;
}