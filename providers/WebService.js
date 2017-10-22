/**
 * Developer: Zeeshan Lalani
 * Email: zzlalani@gmail.com
 */
/**
 * This module is responsible for handling WebServices api requests
 */
// Reference to the module to be exported
WebServiceProvider = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 *
 */
WebServiceProvider.setup = function(app) {

	// Our logger for logging to file and console
	var logger = require(__dirname + '/../logger');

	// config
	var config = require(__dirname + '/../config');

	var Student = require(__dirname + '/../models/Student');

	/*
	 *  Developer: Zeeshan Lalani
	 *
	 *  api to add WebServices
	 *
	 *  url: /api/student
	 *
	 *  method: POST
	 *
	 *  @params:
	 *
	 *  1- firstName: String
	 *  2- lastName: String
   *  3- email: String
	 *  4- dob: String
	 */
	app.post('/api/student', function(req, res) {

		logger.info('Inside /api/student POST');

		var responseJSON = {};
		var data = req.body;

			if (data.firstName && data.lastName) {

				var student = new Student();

				student.firstName = data.firstName;
        student.lastName = data.lastName;
        student.email = data.email;
        student.dob = data.dob;
				student.save(function(err, value) {

					if (err) {
						// set on logger
						logger.error(JSON.stringify(err));

						responseJSON.status = 'FAIL';
						responseJSON.message = JSON.stringify(err);
						// Response to client.
						res.status(config.statusCode.Fail).jsonp(responseJSON);
					}

					var message = "Student saved successfully";
					logger.info(message);

					responseJSON.status = 'OK';
					responseJSON.message = message;
					responseJSON.data = student;
					res.status(config.statusCode.OK).jsonp(responseJSON);

				}); // save end

			} else {

				var message = "Invalid request";
				logger.info(message);

				responseJSON.status = 'FAIL';
				responseJSON.message = message;
				// Response to client.
				res.status(config.statusCode.Fail).jsonp(responseJSON);
			}

	});

	/*
	 *  Developer: Zeeshan Lalani
	 *
	 *  api to update student
	 *
	 *  url: /api/student/:id
	 *
	 *  method: PUT
	 *
	 *  @params:
	 *
   *  1- firstName: String
	 *  2- lastName: String
   *  3- email: String
	 *  4- dob: String
	 */
	app.put('/api/student/:id', function(req, res) {

		logger.info('Inside /api/student/:id PUT');
		logger.info('id', req.params.id);

		var responseJSON = {};
		var data = req.body;

		if (data.firstName && data.lastName) {

			Student.findOne({
				_id:req.params.id
			}, function(err, student) {

				if (err) {
					logger.error(JSON.stringify(err));
					responseJSON.status = 'FAIL';
					responseJSON.message = JSON.stringify(err);
					// Response to client.
					res.status(config.statusCode.Fail).jsonp(responseJSON);
					return;
				}

				// student found
				if ( null !== student ) {

          student.firstName = data.firstName;
          student.lastName = data.lastName;
          student.email = data.email;
          student.dob = data.dob;

					student.save(function(err, value) {

						if (err) {
							// set on logger
							logger.error(JSON.stringify(err));

							responseJSON.status = 'FAIL';
							responseJSON.message = JSON.stringify(err);
							// Response to client.
							res.status(config.statusCode.Fail).jsonp(responseJSON);
						}

						var message = "student updated successfully";
						logger.info(message);

						responseJSON.status = 'OK';
						responseJSON.message = message;
						responseJSON.data = value;
						res.status(config.statusCode.OK).jsonp(responseJSON);

					}); // save scout end

				} else {

					logger.info('student not found.');

					responseJSON.status = 'FAIL';
					responseJSON.data = [];
					// Response to client.
					res.status(config.statusCode.Fail).jsonp(responseJSON);
				}
			});

		} else {

			var message = "Invalid request";
			logger.info(message);

			responseJSON.status = 'FAIL';
			responseJSON.message = message;
			// Response to client.
			res.status(config.statusCode.Fail).jsonp(responseJSON);
		}

	});

	/*
	 *  Developer: Zeeshan Lalani
	 *
	 *  api to get Students
	 *
	 *  url: /api/student
	 *
	 *  method: GET
	 *
	 *  @params:
	 */
	app.get('/api/student', function(req, res) {

		logger.info('Inside /api/student GET');

		// Construct response JSON
		var responseJSON = {};

		// get list of students
		Student.find({}, function(err, students) {

			if (err) {
				logger.error(JSON.stringify(err));
				responseJSON.status = 'FAIL';
				responseJSON.message = JSON.stringify(err);
				// Response to client.
				res.status(config.statusCode.Fail).jsonp(responseJSON);
				return;
			}

			// students found
			if (students.length) {

				logger.info('students found.');

				responseJSON.status = 'OK';
				responseJSON.data = students;
				// Response to client.
				res.status(config.statusCode.OK).jsonp(responseJSON);

			} else {

				logger.info('no students found.');

				responseJSON.status = 'OK';
				responseJSON.data = [];
				// Response to client.
				res.status(config.statusCode.OK).jsonp(responseJSON);
			}
		});

	});

	/*
	 *  Developer: Zeeshan Lalani
	 *
	 *  api to get student by id
	 *
	 *  url: /api/student/:id
	 *
	 *  method: GET
	 *
	 *  @params:
	 *
	 *  1- id: Int
	 */
	app.get('/api/student/:id', function(req, res) {

		logger.info('Inside /api/student/:id GET');
		logger.info('id', req.params.id);

		// Construct response JSON
		var responseJSON = {};

		// get student
		Student.findOne({
			_id:req.params.id
		}, function(err, student) {

			if (err) {
				logger.error(JSON.stringify(err));
				responseJSON.status = 'FAIL';
				responseJSON.message = JSON.stringify(err);
				// Response to client.
				res.status(config.statusCode.Fail).jsonp(responseJSON);
				return;
			}

			// student found
			if ( null !== student ) {

				logger.info('student found.');

				responseJSON.status = 'OK';
				responseJSON.data = student;
				// Response to client.
				res.status(config.statusCode.OK).jsonp(responseJSON);

			} else {

				logger.info('student not found.');

				responseJSON.status = 'FAIL';
				responseJSON.data = [];
				// Response to client.
				res.status(config.statusCode.Fail).jsonp(responseJSON);
			}
		});

	});

	/*
	 *  Developer: Zeeshan Lalani
	 *
	 *  api to delete student
	 *
	 *  url: /api/student
	 *
	 *  method: Delete
	 *
	 *  @params:
	 *
	 *  1- id: Int
	 */
	app.delete('/api/student/:id', function(req, res) {

		logger.info('Inside /api/student/:id DELETE');
		logger.info('id', req.params.id);

		// Construct response JSON
		var responseJSON = {};

		// remove corevalue
		Student.find({
			_id:req.params.id,
		}).remove(function(err, status) {

			if (err) {
				logger.error(JSON.stringify(err));
				responseJSON.status = 'FAIL';
				responseJSON.message = JSON.stringify(err);
				// Response to client.
				res.status(config.statusCode.Fail).jsonp(responseJSON);
				return;
			}

			// student removed
			if ( status.result.ok == 1 ) {

				logger.info('student deleted.');

				responseJSON.status = 'OK';
				// Response to client.
				res.status(config.statusCode.OK).jsonp(responseJSON);

			} else {

				logger.info('Unable to delete student.');

				responseJSON.status = 'Fail';
				responseJSON.data = [];
				// Response to client.
				res.status(config.statusCode.Fail).jsonp(responseJSON);
			}
		});
	});

}
