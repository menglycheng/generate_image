import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// export default async function handler(req, res) {

//   console.log(response);
//   res.status(200).json({ response: "hello" });
// }
export default async function handler(req, res) {
  const response = await openai.createImage({
    prompt: req.body.text,
    n: 3,
    size: "1024x1024",
  });
  res.status(200).json({ result: response.data });
}
