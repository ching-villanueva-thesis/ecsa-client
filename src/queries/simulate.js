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

export async function postSimulateSop1(payload) {
  try {
    const res = await fetch(`${BASE_URL}/simulate/sop1`, {
      method: "POST",
      body: payload,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const images = await res.json();

    return images;
  } catch (e) {
    console.error(e);
  }
}

export async function postSimulateSop2(payload) {
  try {
    const res = await fetch(`${BASE_URL}/simulate/sop2`, {
      method: "POST",
      body: payload,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const images = await res.json();

    return images;
  } catch (e) {
    console.error(e);
  }
}

export async function postSimulateSop3(payload) {
  try {
    const res = await fetch(`${BASE_URL}/simulate/sop3`, {
      method: "POST",
      body: payload,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const images = await res.json();

    return images;
  } catch (e) {
    console.error(e);
  }
}
