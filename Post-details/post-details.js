// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

let url = new URL(location.href);
let id = url.searchParams.get('id');


fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
    .then(posts => {
        let userPost = document.createElement('div')
        userPost.className = 'userPost'

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
                    let p = document.createElement('p')
                    p.className = 'postInfo'
                    p.innerText = `${val}: ${obj[val]}`

                    userPost.appendChild(p)
                }
            }
        }

        recur(posts)

        document.body.appendChild(userPost)



        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(res => res.json())
            .then(comments => {
                let postComment = document.createElement('div')
                postComment.className = 'postComment'

                for (let comment of comments) {
                    let commVal = document.createElement('div')
                    commVal.className = 'comment'
                    for (const key in comment) {
                        let p = document.createElement('p')
                        p.className = 'commentInfo'
                        p.innerText = `${key}: ${comment[key]}`;

                        commVal.appendChild(p)
                    }
                    postComment.appendChild(commVal)
                }

                document.body.appendChild(postComment)
            })

    })