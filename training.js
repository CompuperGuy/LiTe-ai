// Integrating with ChatGPT for training
async function askChatGPT(query) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      prompt: query,
      max_tokens: 100,
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}
