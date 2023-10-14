import Router from './Router';

const router = new Router();
export let MATCH_PATH = '/api';

router.get('/api/list', async ({ request, env }) => {
	console.log('receive request to query');
	const db = env.DATABASE;
	const stmt = db.prepare('SELECT * FROM user_token');
	const { results } = await stmt.all();
	console.log(JSON.stringify(results));
	return new Response(JSON.stringify(results));
});

router.put('/api/put', async ({ request, env }) => {
	console.log('receive request to put');
	const db = env.DATABASE;
	// const stmt = db.prepare('INSERT INTO user_token(email, token) VALUES (?, ?)');
	const json = await request.json();
	console.log('receive request to put ' + JSON.stringify(json));
	try {
		const results = (await db.prepare('INSERT INTO user_token (email, token) VALUES (?1, ?2)').bind(json.email, json.token ).run()).meta;
		// const { results } = await stmt.run(json.email, json.token);
		console.log(JSON.stringify(results));
		return new Response(JSON.stringify(results));
	} catch (e) {
		console.log('error ' + e.message);
		console.log(e.stack || e);
	}

	return new Response(JSON.stringify({
		'code': 200
	}));
});

router.post('/api/delete', async ({ request, env }) => {
	console.log('receive request to delete');
	const db = env.DATABASE;
	const stmt = db.prepare('DELETE FROM user_token WHERE email = ?');
	const json = await request.json();
	const { results } = await stmt.bind(json.email).run();
	console.log(JSON.stringify(results));
	return new Response(JSON.stringify(results));
});

router.post('/api/post', async ({ request, env }) => {
	console.log('receive request to post');
	const db = env.DATABASE;
	const stmt = db.prepare('UPDATE user_token SET token = ? WHERE email = ?');
	const json = await request.json();
	const { results } = await stmt.bind(json.token, json.email).run();
	console.log(JSON.stringify(results));
	return new Response(JSON.stringify(results));
});

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
