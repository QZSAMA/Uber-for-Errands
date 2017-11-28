module.exports = (sequelize, Datatypes) => {
	Ratings = sequelize.define('Ratings', {
		
		title: { 
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'compositeIndex',
			validate: {
				notEmpty: true,
			},
		},

		body: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},

		stars: {
			type: Sequelize.INTEGER,
			validate: {
				notEmpty: true,
				min: 0,
				max: 5,
			},
		},
		//By default, Sequelize will add the attributes createdAt and updatedAt to your model so you will be able to know when the database entry went into the db and when it was updated last.
	})
}