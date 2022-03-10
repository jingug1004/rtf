let backendHost;
let hostname = "";
if (typeof window !== "undefined") {
  hostname = window && window.location && window.location.hostname;
}

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}

export const API_BASE_URL = `${backendHost}`;
