module.exports = {
	MakeServer: function(name, main) {
		return new Server(name, main);
	}
}

class Server {
	constructor(name, main) {
		this.name = name;
		this.main = main;
	}
}
