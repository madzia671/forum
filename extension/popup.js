document.addEventListener('DOMContentLoaded', async () => {
    const resultDiv = document.getElementById('result');
    const checkForumButton = document.getElementById('check-forum');

    // Pobieramy aktywną zakładkę
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentUrl = new URL(tab.url).hostname;

    // Przykładowa baza zaufanych stron
    const safeSites = ['example.com', 'trustedsite.com'];

    if (safeSites.includes(currentUrl)) {
        resultDiv.innerHTML = `<p style="color: green;">Strona <strong>${currentUrl}</strong> jest bezpieczna.</p>`;
    } else {
        resultDiv.innerHTML = `<p style="color: red;">Strona <strong>${currentUrl}</strong> może być niebezpieczna.</p>`;
    }

    checkForumButton.addEventListener('click', () => {
        const forumUrl = 'https://twoja-strona-z-forum.com';
        window.open(`${forumUrl}?search=${currentUrl}`, '_blank');
    });
});
