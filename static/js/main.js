export async function send_req(url, options) {
    const res = await fetch(url, options);
    return await res.json();
}