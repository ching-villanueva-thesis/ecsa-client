const BASE_URL = import.meta.env.VITE_PROD_API ?? import.meta.env.VITE_DEV_API;

export async function postSimulate(payload) {
  try {
    const res = await fetch(`${BASE_URL}/simulate`, {
      method: "POST",
      body: payload,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const simulation = await res.json();

    return simulation;
  } catch (e) {
    console.error(e);
  }
}
