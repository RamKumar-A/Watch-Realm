const API_URL = 'https://my-json-server.typicode.com/RamKumar-A/watch-data';

export async function getWatch() {
  const res = await fetch(`${API_URL}/watches`);
  if (!res) throw new Error('Failed to get Watches');
  const data = await res.json();
  return data;
}

export async function getFilters(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res) throw new Error('Failed to get Filters');
  const data = await res.json();
  // console.log(data);
  return data;
}

export async function getFiltersBrand(id) {
  const res = await fetch(`${API_URL}/watches?brand_id=${id}`);
  if (!res) throw new Error('Failed to get Filters');
  const data = await res.json();
  // console.log(data);
  return data;
}

export async function getCheckout(id) {
  const res = await fetch(`${API_URL}/order/:${id}`);
  if (!res.ok) {
    const parsedData = localStorage.getItem(id);
    // console.log(JSON.parse(parsedData));
    return JSON.parse(parsedData);
  }
}

export async function createNewCheckout(checkoutData) {
  // const jsonData = {};
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkoutData),
  };

  const res = await fetch(`${API_URL}/order`, options);
  if (!res.ok) throw new Error('Failed to get order details');

  const data = await res.json();
  console.log(data);
  return data;
}
