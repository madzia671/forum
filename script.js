async function searchComments() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const response = await fetch('/api/comments');
    const comments = await response.json();
    const commentsSection = document.getElementById('comments');
    commentsSection.innerHTML = '<h3>Komentarze</h3>';
    const filteredComments = comments.filter(comment => comment.pageName.toLowerCase() === searchValue);

    if (filteredComments.length > 0) {
        filteredComments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `<p><strong>${comment.pageName}:</strong> ${comment.message}</p>`;
            commentsSection.appendChild(commentDiv);
        });
    } else {
        commentsSection.innerHTML += '<p id="no-comments">Brak komentarzy dla tej strony.</p>';
    }
}

async function submitCommentWithCaptcha(e) {
    e.preventDefault();

    const pageName = document.getElementById('page-name').value;
    const message = document.getElementById('message').value;

    grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute('6LedrLsqAAAAALrmqr-se8iWDJ60gxFpTvk8Egbr', { action: 'submit' });

        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, pageName, message }),
        });

        if (response.ok) {
            alert('Komentarz został dodany!');
            document.getElementById('comment-form').reset();
        } else {
            alert('Błąd podczas dodawania komentarza.');
        }
    });
}
