const btn_submit = document.getElementById('submit');

btn_submit.addEventListener('click', () => {
    const input_user = document.querySelector('.loginBox input[type = "text"]');
    const input_passwd = document.querySelector('.loginBox input[type = "password"]');

    if (input_user.validity.valid && input_passwd.validity.valid) {
        const username = input_user.value;
        const password = input_passwd.value;
        alert(`用户名:${username} 密码:${password}`);
    } else {
        alert("填写不规范，请检查后重新输入！");
    }
});
