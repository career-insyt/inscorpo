const apiKey = process.env.AGENTROUTER_API_KEY || "";

async function testAgentRouter() {
  const models = ['deepseek-v4-flash', 'deepseek-chat', 'deepseek/deepseek-chat'];
  for (const model of models) {
    try {
      console.log('Testing model:', model);
      const res = await fetch('https://agentrouter.org/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'codex_cli_rs/0.149.1 (x86_64-pc-windows-msvc)',
          'Originator': 'codex_cli_rs',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'user', content: 'Extract details for software engineer in Dhaka. Reply with JSON { title, company }' }
          ]
        })
      });
      const data = await res.json();
      console.log('Result for', model, ':', JSON.stringify(data).slice(0, 300));
    } catch (e) {
      console.error('Error for', model, ':', e.message);
    }
  }
}

testAgentRouter();
