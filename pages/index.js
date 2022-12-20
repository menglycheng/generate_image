import Head from "next/head";
import { useState } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(null);

  const generateImage = async () => {
    setImage([]);
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    });
    const data = await response.json();
    setImage(data.result.data);
    setLoading(false);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-[#0a0d14]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full text-white flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="h-72 mt-20">
          <h1 className="font-bold text-xl">Genarate Image by Word</h1>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="write something here ...."
            className="mt-20 border-blue-500 rounded-md border bg-transparent tex-white py-2 px-3"
          />
          <button
            onClick={generateImage}
            className="border border-blue-500 p-2 ml-4 rounded-md "
          >
            Generate
          </button>
        </div>
        <div>
          <h1 className="font-bold text-xl pb-10">Result</h1>
          {loading ? (
            <>
              <p class="py-2.5 px-5 mr-2 text-sm font-medium text-white   inline-flex items-center">
                <svg
                  role="status"
                  class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-row ">
                {image.map((item) => (
                  <div className="px-3  w-1/2 ">
                    <img
                      src={item.url}
                      className="rounded-md"
                      alt="image not found"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
