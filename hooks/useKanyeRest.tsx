import { useMutation } from "react-query";

const getKanyeQuote = async () => {
  const res = await fetch("https://api.kanye.rest/");
  const data = await res.json() as {quote:string}
  if (!data.quote) throw new Error("ERRORORORO");
  return data.quote
};

const useKanyeRest = () => {
  return useMutation("getKanyeQuote", () => getKanyeQuote());
};

export default useKanyeRest;
