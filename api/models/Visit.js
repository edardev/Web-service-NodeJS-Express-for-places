const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');



let visitSchema = new mongoose.Schema({
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	_place: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Place',
		required: true
	},
	feedback: String

})


visitSchema.plugin(mongoosePaginate);


const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;