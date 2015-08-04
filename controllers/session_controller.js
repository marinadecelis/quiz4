//Get/login --formulario de login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	
	res.render('sessions/new', {errors: errors});
	
};

//Post /login --crear sesion
exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;
	
	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if (error){ //Si hay un error retornamos mensajes de error de sesi�n
			req.session.errors = [{"message": 'Se ha producido un error: ' +error}];
			res.redirect("/login");
			return;	
		}
		//Crea req.session.user y guardar campos id y userame
		//la sesi�n se define por la existencia de : req.session.user
		req.session.user = {id:user.id, username:user.username};
		
		res.redirect(req.session.redir.toString()); //redireccion a path anterior a login
		
	});
	
};

//Delete /logout --destruir sesion
exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString()); //redirect a path anterior a login
};