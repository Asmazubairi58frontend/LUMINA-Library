export async function askAssistant(messages, book) {
  const response = await fetch("/api/assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, book }),
  });
  if (response.ok) {
    const data = await response.json();
    return data.answer;
  }
  if (response.status !== 404 && response.status !== 503)
    throw new Error("The assistant could not complete that request.");
  return `I’m currently in reading-demo mode, so I can help you frame a thoughtful question but cannot claim to have generated a live AI answer.\n\nFor ${book?.title || "your selected book"}, try exploring its central themes, the choices made by its characters, and how its historical context shapes the story. To enable genuine AI answers, configure an AI provider key on the server using the instructions in README.md.`;
}
