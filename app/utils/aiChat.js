export async function askAI(question) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "AIzaSyBcVkigGvNMFALswJ7GnNq3poscfXKfvEE"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error("AI Error:", err);
    return "Error fetching AI response.";
  }
}
