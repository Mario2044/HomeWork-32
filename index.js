const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
  const postId = document.getElementById('postId').value;

  if(postId >= 1 && postId <= 100) {
    getPost(postId)
    .then(post => {
      const postBlock = document.getElementById('postBlock');
      postBlock.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <button id="commentsBtn">Коменты</button>
      `;
      
      const commentsBtn = document.getElementById('commentsBtn');
      commentsBtn.addEventListener('click', () => {
        getComments(postId)
          .then(comments => {
            const commentsBlock = document.createElement('div');
            commentsBlock.innerHTML = `
            <h3>Коментарии:</3>
            <ul>
              ${comments.map(comment => `<li>${comment.name}: ${comment.body}</li>`).join('')}
            </ul>
            `;
            postBlock.appendChild(commentsBlock);
        })
        .catch(error => {
          console.error(error);
        });
      });
    })
    .catch(error => {
      console.error(error);
    });
  } else {
    alert ('Пожалуйста, введите ID в диапазоне от 1 до 100.');
  }
});

function getPost(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then(response => {
    if(!response.ok) {
      throw new Error('Случилась ошибка. Попробуйте еще раз.');
    }
    return response.json();
  });
}

function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Случилась ошибка. Попробуйте еще раз.');
      }
      return response.json();
    });
}