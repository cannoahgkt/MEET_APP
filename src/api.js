import mockData from './mock-data';

/**
 * Fetches token information from Google API.
 * @param {string} accessToken The access token to check.
 * @returns {Object} The token information.
 */
const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    if (!response.ok) {
      throw new Error('Token validation failed');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    // Handle or throw the error as needed
  }
};

/**
 * Exchanges code for access token.
 * @param {string} code The authorization code.
 * @returns {string} The access token.
 */
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    `https://us34ex2k8k.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

/**
 * Checks if access token is valid, if not, redirects to authentication endpoint.
 * @returns {string} The access token.
 */
const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://us34ex2k8k.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

/**
 * Extracts unique locations from events array.
 * @param {Array} events The array of events.
 * @returns {Array} The array of unique locations.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Fetches events from AWS Lambda function.
 * @returns {Array} The array of events.
 */
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost:3000")) {
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =  `https://us34ex2k8k.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null; 
  }
};

/**
 * Removes query parameters from URL.
 */
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};
