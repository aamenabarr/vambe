import OpenAI from 'openai'

export interface MessageResponse {
  content: string
  threadId: string
  runId: string
}

export class OpenAIClient {
  private client: OpenAI
  private assistantId: string

  constructor() {
    this.client = new OpenAI({
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      apiKey: process.env.OPENAI_API_KEY,
    })
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    this.assistantId = process.env.OPENAI_ASSISTANT_ID as string
  }

  async sendMessage(message: string): Promise<MessageResponse> {
    const thread = await this.client.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    })

    const run = await this.client.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: this.assistantId,
    })

    if (run.status === 'completed') {
      const messages = await this.client.beta.threads.messages.list(thread.id)

      const assistantMessage = messages.data.find((msg) => msg.role === 'assistant')

      if (assistantMessage) {
        const content = assistantMessage.content
          .filter((c) => c.type === 'text')
          .map((c) => (c.type === 'text' ? c.text.value : ''))
          .join('\n')

        return {
          content,
          threadId: thread.id,
          runId: run.id,
        }
      }
    }

    throw new Error(`Run failed with status: ${run.status}`)
  }

  getClient(): OpenAI {
    return this.client
  }
}

export default OpenAIClient
