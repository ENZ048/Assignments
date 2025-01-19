const comment = document.getElementById('comment');
const charCounter = document.getElementById('char-counter');
const addBtn = document.querySelector('.button');

comment.addEventListener('input', () => {
    charCounter.textContent = comment.value.length;
});

const commentsContainer = document.querySelector('.comments-container');

function createComment(content, isReply = false){
    const commentDiv = document.createElement('div');
    commentDiv.className = isReply ? 'comment reply' : 'comment';

    const commentContent = document.createElement('div');

    const commentText = document.createElement('textarea');
    commentText.className = 'textarea hidden';
    commentText.rows = 2;
    commentText.maxLength = 250;
    commentText.textContent = content;

    const commentTextDisplay = document.createElement('p');
    commentTextDisplay.textContent = content;

    const postEditBtn = document.createElement('button');
    postEditBtn.className = 'button hidden';
    postEditBtn.textContent = "Post";

    commentContent.appendChild(commentText);
    commentContent.appendChild(commentTextDisplay);
    commentContent.appendChild(postEditBtn);

    const replyBtn = document.createElement('button');
    replyBtn.classList.add('reply-btn');
    replyBtn.textContent = "Reply";

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = "Delete";

    const replySection = document.createElement('div');
    replySection.classList.add('hidden');

    const replyInput = document.createElement('textarea');
    replyInput.classList.add('textarea');
    replyInput.rows = 2;
    replyInput.maxLength = 250;
    replyInput.placeholder = 'Write a reply...'

    const replyCharCounter = document.createElement('div');
    replyCharCounter.classList.add('char-counter');
    replyCharCounter.textContent = '0/250';

    replyInput.addEventListener('input', ()=>{
        replyCharCounter.textContent = `${replyInput.value.length}/250`;
    });

    const postReplyBtn = document.createElement('button');
    postReplyBtn.textContent = "Post Reply";
    postReplyBtn.classList.add('button');

    postReplyBtn.addEventListener('click', ()=>{
        if(replyInput.value.trim() !== ''){
            const reply = createComment(replyInput.value, true);
            replySection.before(reply);
            replyInput.value = '';
            replyCharCounter.textContent = '0/250';
            replySection.classList.add('hidden');
        }
    });

    replySection.appendChild(replyInput);
    replySection.appendChild(replyCharCounter);
    replySection.appendChild(postReplyBtn);

    replyBtn.addEventListener('click', ()=> {
        replySection.classList.toggle('hidden');
    });
    
    editBtn.addEventListener('click', ()=> {
        commentText.classList.remove('hidden');
        commentTextDisplay.classList.add('hidden');
        postEditBtn.classList.remove('hidden');
    });

    postEditBtn.addEventListener('click', () => {
        const updatedComment = commentText.value.trim();
        if(updatedComment !== ''){
            commentTextDisplay.textContent = updatedComment;
            commentText.classList.add('hidden');
            commentTextDisplay.classList.remove('hidden');
            postEditBtn.classList.add('hidden');
        }
    });

    deleteBtn.addEventListener('click', ()=> {
        commentDiv.remove();
    });

   commentDiv.appendChild(commentContent);
    commentDiv.appendChild(replyBtn);
    commentDiv.appendChild(editBtn);
    commentDiv.appendChild(deleteBtn);
    commentDiv.appendChild(replySection);

    return commentDiv;
}

addBtn.addEventListener('click', () => {
    const content = comment.value.trim();

    if(content !== ''){
        const newComment = createComment(content);
        commentsContainer.appendChild(newComment);
        comment.value = '';
        charCounter.textContent = '0';
    }
});