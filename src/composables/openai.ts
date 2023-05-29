import axios from 'axios'

// import { encode } from 'gpt-3-encoder'

const model = 'gpt-4'
const system_prompt = 'You are a translation API, you receive a text payload {"lang_from": "Lang of payload", "lang_to": "Lang your translation" "payload: "Sentense to translate", "tone": "TONE to use"} and return a translated text with the tone of voice. what you return is on the form {"result": "YOUR result"}'

export interface OpenAiRequest {
  lang_from: string
  lang_to: string
  payload: string
  tone: string
}
export interface OpenAiResponse {
  result: string
}
// const {encode, decode} = require('gpt-3-encoder')

// const str = 'This is an example sentence to try encoding out on!'
// const encoded = encode(str)
// console.log('Encoded this string looks like: ', encoded)

// export const getTokenLength = async function (token: string) {
//   return encode(system_prompt + token).length
// }

export async function sendTranslateRequest(token: string, payload: OpenAiRequest) {
  const url = 'https://api.openai.com/v1/chat/completions'
  const body = JSON.stringify({
    model,
    messages: [
      { role: 'system', content: `${system_prompt}. You talk with ${name}` },
      { role: 'user', content: JSON.stringify(payload) },
    ],
  })
  const options = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.post(url, body, options)
    // console.log(res.status, ': ', JSON.stringify(res.data))
    const resParsed = JSON.parse(res.data.choices[0].message.content) as OpenAiResponse
    // console.log('resParsed', resParsed)
    return resParsed
  }
  catch (e) {
    console.error(e)
  }
}
