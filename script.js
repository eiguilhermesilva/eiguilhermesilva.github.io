function showCategory(id) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}
