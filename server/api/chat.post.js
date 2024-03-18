export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	let messages = [];
	const previosMessages = await readBody(event);
	messages = messages.concat(previosMessages);
	let prompt =
		messages;
	let url='https://api.chatanywhere.tech/v1/chat/completions';
	const req = await fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.OPENAI_API_KEY}`
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: prompt
		})
	});
	
	const res = await req.json();
	const result = res.choices[0].message;
	return {
		message: result.content
	};
});
