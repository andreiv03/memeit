export const getClientInfo = async () => {
  const userAgent = navigator.userAgent;

  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  const ip = data.ip;

  return { userAgent, ip };
};
