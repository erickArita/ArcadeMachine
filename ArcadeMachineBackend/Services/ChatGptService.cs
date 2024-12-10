using NuGet.Protocol;
using OpenAI.Chat;

namespace ArcadeMachine.Services;

public interface IChatGptService
{
    Task<ChatMessageContentPart?> GetResponseAsync(string prompt, string? prePrompt = null);
}

public class ChatGptService : IChatGptService
{
    private readonly ChatClient _api;

    public ChatGptService(string apiKey)
    {
        ChatClient client = new(model: "gpt-4o-mini", apiKey: apiKey);
        _api = client;
    }

    public async Task<ChatMessageContentPart?> GetResponseAsync(string prompt, string? prePrompt = null)

    {
        var message = new List<ChatMessage>()
        {
            new SystemChatMessage(prePrompt ?? ""),
            new UserChatMessage(prompt)
        };

        ChatCompletion completion = await _api.CompleteChatAsync(message, new ChatCompletionOptions
        {
            Temperature = 0.7f,
            TopP = 1,
            FrequencyPenalty = 0,
            PresencePenalty = 0,
        });

        var response = completion.Content[0];

        return response;
    }
}