import { Result } from "./result";
import { useState, useEffect } from "react";

export type FetchState<T> = Result<T, string> | undefined;

export function useFetch<T>(url: string): FetchState<T> {
  const [fetchState, setFetchState] = useState<FetchState<T>>(undefined);

  useEffect(() => {
    async function doFetch() {
      try {
        const res = await fetch(url, {
          headers: {
            "Client-Identifier": "evestera-sykler-web"
          },
        });

        if (res.status > 399) {
          setFetchState(Result.err("Request failed with HTTP status " + res.status));
          return;
        }

        const json = await res.json();

        // TODO: Add schema validation

        setFetchState(Result.ok(json));
      } catch(error) {
        setFetchState(Result.err("Request failed due to error: " + error.toString()))
      }
    }

    doFetch();
  }, [url]);

  return fetchState;
}
