import { useEffect, useState } from "react";
import getQuery from "./getQuery";

export default function useDemo() {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
    demo: Boolean(import.meta.env.VITE_APP_VERSION === "demo"),
  });

  useEffect(() => {
    const decode = async (token) => {
      setState((prevState) => ({ ...prevState, loading: true }));
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API
          }/demo-token/decrypt?encrypted=${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data?.decrypted) {
          const date = "2024-05-20 01:07:45";
          const now = new Date();
          const expired = new Date(date);
          if (now > expired) {
            setState((prevState) => ({
              ...prevState,
              data: false,
              loading: false,
              error: "Token expired",
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              data: true,
              loading: false,
            }));
          }
        } else {
          setState((prevState) => ({
            ...prevState,
            data: false,
            loading: false,
            error: "Invalid token",
          }));
        }
      } catch (e) {
        setState((prevState) => ({
          ...prevState,
          data: false,
          loading: false,
          error: e.message,
        }));
      }
    };

    if (import.meta.env.VITE_APP_VERSION === "demo") {
      const query = getQuery();
      const token = query.get("token");
      if (token || localStorage.getItem("demo-token")) {
        token && localStorage.setItem("demo-token", token);
        decode(token || localStorage.getItem("demo-token"));
      }
    }
  }, []);

  return state;
}
