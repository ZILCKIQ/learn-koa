
const btn_submit = document.getElementById('submit');
const btn_reset = document.getElementById('reset');

let username = document.getElementById('user');
let passwd = document.getElementById('passwd');

//重置
btn_reset.addEventListener('click', () => {
    username.value = null;
    passwd.value = null;
});



//提交
btn_submit.addEventListener('click', async () => {
    const opt = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": username.value,
            "password": passwd.value
        })
    }
    console.log(opt)
    console.log(await send_data('/users/register', opt));
});

async function send_data(url, options = {}) {
    let res = await fetch(url, options);
    return await res.json();
}

