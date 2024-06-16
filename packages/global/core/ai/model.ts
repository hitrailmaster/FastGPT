import type {
  LLMModelItemType,
  ChatModelItemType,
  FunctionModelItemType,
  VectorModelItemType,
  AudioSpeechModelType,
  WhisperModelType,
  ReRankModelItemType
} from './model.d';

export const defaultChatModels: ChatModelItemType[] = [
  {
    model: 'deepseek-chat',
    name: 'deepseek-chat',
    price: 0,
    maxContext: 16000,
    maxResponse: 4000,
    quoteMaxToken: 2000,
    maxTemperature: 1.2,
    censor: false,
    vision: false,
    defaultSystemChatPrompt: ''
  }
];
export const defaultQAModels: LLMModelItemType[] = [
  {
    model: 'deepseek-chat',
    name: 'deepseek-chat',
    maxContext: 16000,
    maxResponse: 16000,
    price: 0
  }
];
export const defaultCQModels: FunctionModelItemType[] = [
  {
    model: 'deepseek-chat',
    name: 'deepseek-chat',
    maxContext: 16000,
    maxResponse: 4000,
    price: 0,
    functionCall: true,
    functionPrompt: ''
  }
];
export const defaultExtractModels: FunctionModelItemType[] = [
  {
    model: 'deepseek-chat',
    name: 'deepseek-chat',
    maxContext: 16000,
    maxResponse: 4000,
    price: 0,
    functionCall: true,
    functionPrompt: ''
  }
];
export const defaultQGModels: LLMModelItemType[] = [
  {
    model: 'deepseek-chat',
    name: 'deepseek-chat',
    maxContext: 1600,
    maxResponse: 4000,
    price: 0
  }
];

export const defaultVectorModels: VectorModelItemType[] = [
  {
    model: 'text-embedding-ada-002',
    name: 'Embedding-2',
    price: 0,
    defaultToken: 500,
    maxToken: 3000
  }
];

export const defaultReRankModels: ReRankModelItemType[] = [];

export const defaultAudioSpeechModels: AudioSpeechModelType[] = [
  {
    model: 'tts-1',
    name: 'OpenAI TTS1',
    price: 0,
    voices: [
      { label: 'Alloy', value: 'Alloy', bufferId: 'openai-Alloy' },
      { label: 'Echo', value: 'Echo', bufferId: 'openai-Echo' },
      { label: 'Fable', value: 'Fable', bufferId: 'openai-Fable' },
      { label: 'Onyx', value: 'Onyx', bufferId: 'openai-Onyx' },
      { label: 'Nova', value: 'Nova', bufferId: 'openai-Nova' },
      { label: 'Shimmer', value: 'Shimmer', bufferId: 'openai-Shimmer' }
    ]
  }
];

export const defaultWhisperModel: WhisperModelType = {
  model: 'whisper-1',
  name: 'Whisper1',
  price: 0
};
