/* Integração com Google Drive API */
const MIME_ICONS = [
  {match: "pdf", icon: "📕"},
  {match: "spreadsheet", icon: "📊"},
  {match: "presentation", icon: "📑"},
  {match: "image", icon: "🖼️"},
  {match: "video", icon: "🎬"},
  {match: "audio", icon: "🎵"},
];

function iconForMime(mime){
  for(const m of MIME_ICONS){
    if(mime.includes(m.match)) return m.icon;
  }
  return "📄";
}

function showSection(id){
  // Verifica se a seção existe (para evitar erros na página Sobre Nós)
  const section = document.getElementById(id);
  if(!section) return;
  
  document.querySelectorAll(".content-section").forEach(s=>s.classList.add("hidden"));
  section.classList.remove("hidden");
  
  // Atualiza botões ativos
  document.querySelectorAll(".nav-link").forEach(b=>{
    b.classList.remove("active");
    if(b.getAttribute('data-target') === id || 
       (id === 'inicio' && b.getAttribute('href') === 'index.html')) {
      b.classList.add("active");
    }
  });
}

// Menu Hamburguer
function setupMenuToggle() {
  const toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;
  
  toggle.addEventListener('click', () => {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('expanded');
    toggle.setAttribute('aria-expanded', nav.classList.contains('expanded'));
  });
}

// Função para configurar navegação
function setupNavigation() {
  document.addEventListener("click", (e)=>{
    // Navegação por botões com data-target
    const btn = e.target.closest(".nav-link[data-target]");
    if(btn) {
      e.preventDefault();
      showSection(btn.getAttribute('data-target'));
      return;
    }
    
    // Navegação para seções específicas
    const anchorBtn = e.target.closest(".nav-link[href^='index.html#']");
    if(anchorBtn) {
      e.preventDefault();
      const targetId = anchorBtn.getAttribute('href').split('#')[1];
      window.location.href = `index.html#${targetId}`;
      showSection(targetId);
    }
  });
}

async function loadFiles(folderId, {listId, loadingId, emptyId, errorId, searchId}){
  const listEl = document.getElementById(listId);
  const loadingEl = document.getElementById(loadingId);
  const emptyEl = document.getElementById(emptyId);
  const errorEl = document.getElementById(errorId);
  const searchEl = document.getElementById(searchId);

  if(!folderId){ listEl.innerHTML = "<li>Configurar ID da pasta no config.js</li>"; return; }

  // Mostra skeletons
  listEl.innerHTML = `
    <li class="skeleton-item"></li>
    <li class="skeleton-item"></li>
    <li class="skeleton-item"></li>
  `;
  loadingEl.hidden = false;
  emptyEl.hidden = true;
  errorEl.hidden = true;

  const fields = "files(id,name,mimeType,modifiedTime,webViewLink,webContentLink,iconLink)";
  const url = `https://www.googleapis.com/drive/v3/files?q='${encodeURIComponent(folderId)}'+in+parents+and+trashed=false&orderBy=modifiedTime%20desc&fields=${fields}&key=${encodeURIComponent(window.CONFIG.API_KEY)}`;

  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const files = data.files || [];

    if(files.length === 0){
      emptyEl.hidden = false;
      return;
    }

    const render = (items)=>{
      listEl.innerHTML = "";
      for(const file of items){
        const icon = iconForMime(file.mimeType);
        const when = new Date(file.modifiedTime).toLocaleDateString("pt-BR");
        const link = file.webViewLink || file.webContentLink || `https://drive.google.com/file/d/${file.id}/view`;
        const li = document.createElement("li");
        li.innerHTML = `<div class="title"><a href="${link}" target="_blank" rel="noopener">${icon} ${file.name}</a></div>
                        <div class="meta">Atualizado em ${when}</div>`;
        listEl.appendChild(li);
      }
    };

    render(files);

    if(searchEl){
      searchEl.addEventListener("input", ()=>{
        const q = searchEl.value.trim().toLowerCase();
        const filtered = files.filter(f => f.name.toLowerCase().includes(q));
        if(filtered.length === 0){
          listEl.innerHTML = "<li>Nenhum resultado para a busca.</li>";
        }else{
          render(filtered);
        }
      });
    }
  }catch(err){
    console.error(err);
    errorEl.hidden = false;
  }finally{
    loadingEl.hidden = true;
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", ()=>{
  setupMenuToggle();
  setupNavigation();
  
  // Verifica se está na página principal
  if(document.getElementById('list-portugues')){
    const F = window.CONFIG.FOLDER_IDS;
    loadFiles(F.portugues, {listId:"list-portugues", loadingId:"loading-portugues", emptyId:"empty-portugues", errorId:"error-portugues", searchId:"search-portugues"});
    loadFiles(F.ingles, {listId:"list-ingles", loadingId:"loading-ingles", emptyId:"empty-ingles", errorId:"error-ingles", searchId:"search-ingles"});
    loadFiles(F.espanhol, {listId:"list-espanhol", loadingId:"loading-espanhol", emptyId:"empty-espanhol", errorId:"error-espanhol", searchId:"search-espanhol"});
    loadFiles(F.libras, {listId:"list-libras", loadingId:"loading-libras", emptyId:"empty-libras", errorId:"error-libras", searchId:"search-libras"});
    loadFiles(F.artes, {listId:"list-artes", loadingId:"loading-artes", emptyId:"empty-artes", errorId:"error-artes", searchId:"search-artes"});
    loadFiles(F.edfisica, {listId:"list-edfisica", loadingId:"loading-edfisica", emptyId:"empty-edfisica", errorId:"error-edfisica", searchId:"search-edfisica"});

    // Mostra seção inicial ou a partir do hash da URL
    const hash = window.location.hash.substring(1);
    showSection(hash || 'inicio');
  }
  
  // Ativa link ativo na página Sobre Nós
  if(window.location.pathname.includes('sobre.html')){
    document.querySelector('.nav-link[href="sobre.html"]').classList.add('active');
  }
});
