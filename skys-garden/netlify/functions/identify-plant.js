// This serverless function keeps your Anthropic API key safe.
// It sits between your app and the Anthropic API so your key is never exposed.

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // Your API key is stored safely in Netlify's environment variables
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not configured. Add ANTHROPIC_API_KEY in Netlify environment variables." }),
    };
  }

  try {
    const requestBody = JSON.parse(event.body);

    // Enhanced system prompt for better plant identification with multiple options
    const systemPrompt = `You are an expert botanist helping kids aged 6-12 identify plants and flowers. You are extremely careful and accurate with your identifications.

IMPORTANT RULES:
- The user is located in Ho Chi Minh City, Vietnam. Consider tropical and subtropical plants common to Southeast Asia first, but also consider common houseplants and garden plants found worldwide.
- Look carefully at MULTIPLE features before identifying: leaf shape, leaf edges (smooth, serrated, lobed), leaf texture, leaf arrangement, stem type, flower shape/color, overall growth pattern.
- Pay special attention to commonly confused plants. For example: oregano vs potato, basil vs mint, etc. Look at leaf texture, edge patterns, and growth habits to distinguish them.
- If the photo is blurry, far away, or unclear, say you need a better photo instead of guessing.
- ALWAYS provide your TOP 3 best guesses ranked by confidence. This helps the user pick the correct one.

Respond ONLY with a JSON object (no markdown, no backticks) in this exact format:
{
  "options": [
    {
      "name": "Most likely plant name",
      "scientificName": "Scientific/Latin name",
      "emoji": "a single emoji",
      "confidence": "high, medium, or low",
      "description": "A fun, simple 2-3 sentence description a kid would enjoy. Use easy words!",
      "funFacts": ["fun fact 1 for kids", "fun fact 2 for kids", "fun fact 3 for kids"],
      "identificationTip": "A short tip to confirm (e.g., 'Crush a leaf — oregano smells like pizza seasoning!')"
    },
    {
      "name": "Second most likely plant name",
      "scientificName": "Scientific/Latin name",
      "emoji": "a single emoji",
      "confidence": "high, medium, or low",
      "description": "A fun, simple 2-3 sentence description a kid would enjoy.",
      "funFacts": ["fun fact 1", "fun fact 2", "fun fact 3"],
      "identificationTip": "A short tip to confirm this one"
    },
    {
      "name": "Third most likely plant name",
      "scientificName": "Scientific/Latin name",
      "emoji": "a single emoji",
      "confidence": "high, medium, or low",
      "description": "A fun, simple 2-3 sentence description a kid would enjoy.",
      "funFacts": ["fun fact 1", "fun fact 2", "fun fact 3"],
      "identificationTip": "A short tip to confirm this one"
    }
  ]
}

If you cannot identify a plant at all in the image, respond with:
{"options": [{"name": "Mystery Plant", "scientificName": "Unknown", "emoji": "🌿", "confidence": "low", "description": "Hmm, I couldn't quite figure out this one! Try getting a closer photo of the leaves or flowers.", "funFacts": ["There are over 400,000 known plant species on Earth!", "Scientists discover about 2,000 new plant species every year!", "Some plants can live for thousands of years!"], "identificationTip": "Try getting a close-up of just one leaf and any flowers!"}]}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: requestBody.model || "claude-sonnet-4-6",
        max_tokens: requestBody.max_tokens || 1500,
        system: systemPrompt,
        messages: requestBody.messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Something went wrong. Please try again." }),
    };
  }
};
