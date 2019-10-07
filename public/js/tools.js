export async function send_data(url, options = {}) {
    let res = await fetch(url, options);
    return await res.json();
}