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

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = "1";
            section.style.transform = "translateX(0)";
        }, index * 300);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const paragraphs = document.querySelectorAll("header p");

    paragraphs.forEach((p, index) => {
        setTimeout(() => {
            p.style.opacity = "1";
            p.style.transform = "translateY(0)";
            p.style.transition = "opacity 1.5s, transform 1.5s";
        }, index * 300);
    });
});

const themeToggleButton = document.getElementById('theme-toggle');

// Sprawdzamy zapisany motyw w localStorage i ustawiamy go przy załadowaniu strony
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
} else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
}

// Po kliknięciu przycisku zmieniamy motyw i zapisujemy w localStorage
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');

    // Zapisujemy preferencję w localStorage
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
