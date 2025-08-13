// SUA CHAVE DE API
const API_KEY = "AIzaSyAnO6lMGiJ5UyT6zo7qW2NSGPiBGtMPl88";

// IDs das pastas de cada disciplina
const folders = {
    portugues: "1oCNLcON1a7WAtNcxPgQCpYz1G5YwghZZ",
    ingles: "1ksd-52gkZx94eXx9UAG_RudDrPZHORk0",
    espanhol: "1pCHeDYyW3DpXQ4-3cAkhR5s3A_A7vTMW",
    libras: "1W_fMGLSquBinpH3vsKwG5kHmO1mF4OOD",
    artes: "1NZXxMTdRTn6YusM5Ky-LJqS0qglLMO-K",
    edfisica: "11-umz15mtLA_lqERIBkJ81PzXgbJG04v"
};

// Mostra a categoria selecionada
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

// Busca arquivos no Google Drive
async function loadFiles(folderId, elementId) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,webViewLink)`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        let list = document.getElementById(elementId);
        list.innerHTML = "";

        if (data.files.length === 0) {
            list.innerHTML = "<li>Nenhum arquivo disponível.</li>";
            return;
        }

        data.files.forEach(file => {
            let icon = "📄";
            if (file.mimeType.includes("spreadsheet")) icon = "📊";
            if (file.mimeType.includes("presentation")) icon = "📑";
            if (file.mimeType.includes("pdf")) icon = "📕";

            let li = document.createElement("li");
            li.innerHTML = `<a href="${file.webViewLink}" target="_blank">${icon} ${file.name}</a>`;
            list.appendChild(li);
        });

    } catch (error) {
        console.error("Erro ao carregar arquivos:", error);
    }
}

// Carregar todas as listas ao iniciar
document.addEventListener("DOMContentLoaded", () => {
    loadFiles(folders.portugues, "list-portugues");
    loadFiles(folders.ingles, "list-ingles");
    loadFiles(folders.espanhol, "list-espanhol");
    loadFiles(folders.libras, "list-libras");
    loadFiles(folders.artes, "list-artes");
    loadFiles(folders.edfisica, "list-edfisica");
});


