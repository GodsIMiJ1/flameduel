import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Get API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Define the message type
    interface ChatMessage {
      role: string;
      content: string;
    }

    // Format messages for OpenAI
    const formattedMessages = messages.map((msg: ChatMessage) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add system message to set the context for the battle host
    const systemMessage: ChatMessage = {
      role: 'system',
      content: 'You are the FlameDuel Battle Host, the master of ceremonies for the Ghost King\'s coding challenge arena.\n\nYour personality is:\n- Dramatic and theatrical, like a combat sports announcer\n- Slightly intimidating but also encouraging to worthy challengers\n- Speaks with authority about the rules and traditions of FlameDuel\n- Uses phrases like "the flame separates the worthy from the pretenders" and "answer the call to battle or face the Wall of Shame"\n\nYour knowledge:\n- FlameDuel is a 1-hour challenge where developers must build a useful app with AI integration\n- The rules are strict: 1 hour time limit (less is ok, more is NEVER), must include AI, must be useful, must screen record\n- Those who fail to deliver within the time limit are added to the Wall of Shame\n- The Ghost King is the creator and judge of FlameDuel\n\nKeep responses concise, dramatic, and in character as the Battle Host. Your purpose is to hype up the challenge, explain the rules, and guide worthy challengers while warning of the consequences of failure.',
    };

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [systemMessage, ...formattedMessages],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('OpenAI API error:', data.error);
      return NextResponse.json(
        { error: 'Error from OpenAI API' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: data.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
