// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.


let url = new URL(location.href);
console.log(url);
let id = url.searchParams.get('id');
console.log(id);



fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => res.json())
    .then(users => {
        let userDiv = document.createElement('div')
        userDiv.className = 'usersInfo'

        const isObject = function (val) {
            if (val === null) {
                return false
            }
            return (typeof val === 'object')
        };

        function recur(obj) {
            for (let val in obj) {
                if (isObject(obj [val])) {
                    recur(obj [val])
                } else {
                    let div = document.createElement('div')
                    div.className = `user ${id} Info`

                    let p = document.createElement('p')
                    p.innerText = `${val}: ${obj[val]}`
                    p.className = 'userVal'

                    div.appendChild(p)

                    userDiv.appendChild(div)
                }
            }

        }

        recur(users);



        document.body.appendChild(userDiv)


        let btnDiv = document.createElement('div')
        btnDiv.className = 'user_post'
        btn = document.createElement('button')
        btn.className = 'user_post_btn'
        btn.innerText = 'post of current user'

        btnDiv.appendChild(btn)
        document.body.appendChild(btnDiv)

        btn.onclick = function () {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                .then((res) => res.json())
                .then(posts => {
                    let divUserPost = document.createElement('div')
                    divUserPost.className = `userPosts`
                    for (const post of posts) {
                        let div = document.createElement('div')
                        div.className = `userPost`
                        let p = document.createElement('p')
                        p.className = 'postTitle'
                        p.innerText = `title: ${post.title}`;
                        divUserPost.appendChild(div)

                        let a = document.createElement('a')
                        a.className = 'postInfo'
                        a.innerText = 'Some more info'
                        a.href = `/mini-project/Post-details/post-details.html?id=${post.id}`


                        div.appendChild(p)
                        div.appendChild(a)
                        divUserPost.appendChild(div)
                    }
                    document.body.appendChild(divUserPost)
                })
        }
    })




