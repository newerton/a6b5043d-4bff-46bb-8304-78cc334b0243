function createServer() {
	const http = require("node:http");
	const router = require("./router");

	return http.createServer(router);
}

module.exports = {
	createServer,
};
