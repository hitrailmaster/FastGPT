import type { UserModelSchema } from '@fastgpt/global/support/user/type';
// import OpenAI from '@fastgpt/global/core/ai';
import axios from 'axios';

export const openaiBaseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
export const baseUrl = process.env.ONEAPI_URL || openaiBaseUrl;

export const systemAIChatKey = process.env.CHAT_API_KEY || '';

export const ALIYUN_API_KEY = process.env.ALIYUN_API_KEY;
export const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export const getAIApi = (props?: UserModelSchema['openaiAccount'], timeout = 60000) => {
  // return new OpenAI({
  //   apiKey: 'sk-' || props?.key || systemAIChatKey,
  //   baseURL: 'https://api.deepseek.com' || props?.baseUrl || baseUrl,
  //   httpAgent: global.httpsAgent,
  //   timeout,
  //   maxRetries: 2
  // });
  return {
    chat: {
      completions: {
        create: async (body: any) => {
          const { messages, model } = body;
          let data = JSON.stringify({
            messages,
            model: 'deepseek-chat',
            frequency_penalty: 0,
            max_tokens: 2048,
            presence_penalty: 0,
            stop: null,
            stream: false,
            temperature: 1,
            top_p: 1,
            logprobs: false,
            top_logprobs: null
          });
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.deepseek.com/chat/completions',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${DEEPSEEK_API_KEY}`
            },
            data: data
            // responseType: 'stream' as ResponseType
          };

          // axios(config)
          //   .then((response) => {
          //     console.log(JSON.stringify(response.data));
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
          const res = await axios(config);
          // // console.log(JSON.stringify(res.data));
          // // console.log('-----');
          return res.data;
          // return {
          //   id: 'c42025d6e50fd180fc8277043a20c87e',
          //   choices: [
          //     {
          //       index: 0,
          //       message: {
          //         content:
          //           '中国的总面积约为960万平方公里。这个数字可能会根据不同的测量和统计方法有所变化，但通常被认为是大约960万平方公里。中国是世界上面积第三大的国家，仅次于俄罗斯和加拿大。',
          //         role: 'assistant'
          //       },
          //       finish_reason: 'stop',
          //       logprobs: null
          //     }
          //   ],
          //   created: 1718294475,
          //   model: 'deepseek-chat',
          //   system_fingerprint: 'fp_a49d71b8a1',
          //   object: 'chat.completion',
          //   usage: { prompt_tokens: 43, completion_tokens: 45, total_tokens: 88 }
          // };
        }
      }
    },
    embeddings: {
      create: async (body: any) => {
        const { input, model } = body;

        console.log('test-input', input);
        let data = JSON.stringify({
          model: 'text-embedding-v2',
          input: { texts: input }
        });
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${ALIYUN_API_KEY}`
          },
          data: data
          // responseType: 'stream' as ResponseType
        };
        const res = await axios(config);
        // console.log(JSON.stringify(res.data));
        res.data.data = res.data.output.embeddings;
        return res.data as {
          data: Array<{ text_index: number; embedding: number[] }>;
          usage: {
            total_tokens: number;
          };
        };
      }
    }
  };
};
