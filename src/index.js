import dbRouter, { MATCH_PATH as DB_OP_PATH } from './RouterDbOpt.js';


export default {
	async fetch(request, env, ctx, event) {
		const url = new URL(request.url);
		console.log('url.pathname', url.pathname);

		console.log("url path is " + DB_OP_PATH )
		if (url.pathname.startsWith(DB_OP_PATH)) {
			console.log("user in ")
			return dbRouter.handle(request, env)
		}
		return new Response("21231")
	}
}
