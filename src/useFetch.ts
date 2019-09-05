import { Result } from "./result";
import { useState, useEffect } from "react";
import Ajv from 'ajv';

const ajv = new Ajv();

export type FetchState<T> = Result<T, string> | undefined;

export function useFetch<T>(url: string, schema: object): FetchState<T> {
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
        const valid = ajv.validate(schema, json);

        if (valid) {
          setFetchState(Result.ok(json));
        } else {
          setFetchState(Result.err("Response failed schema validation: " + ajv.errorsText()));
        }
      } catch(error) {
        setFetchState(Result.err("Request failed due to error: " + error.toString()))
      }
    }

    doFetch();
  }, [url, schema]);

  return fetchState;
}
