module.exports = (sequelize, Datatypes) => {
	Ratings = sequelize.define('Ratings', {

		title: {},
		contents: {},
		stars: {},
		datePosted: {},
	})
}