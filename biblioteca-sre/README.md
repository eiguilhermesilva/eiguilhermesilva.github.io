# Biblioteca Didática — SRE Araguaína

Site estático integrado à **Google Drive API** para listar arquivos automaticamente por disciplina.

## ✨ Recursos
- HTML/CSS/JS puro (funciona no GitHub Pages, Blogger ou servidor próprio)
- Integração com **Google Drive API (v3)** usando API Key
- Busca por nome do arquivo, ordenação por data de modificação
- Layout responsivo, limpo e acessível

## 🚀 Como publicar no GitHub Pages
1. **Crie um repositório** no GitHub (ex.: `biblioteca-sre`).
2. Faça upload de todos os arquivos deste projeto.
3. Renomeie `config.example.js` para **`config.js`** e edite os valores (veja abaixo).
4. No GitHub, acesse **Settings → Pages**:
   - *Build and deployment*: **Deploy from a branch**
   - *Branch*: **main** / **root**
5. Acesse a URL: `https://SEU_USUARIO.github.io/biblioteca-sre/`

> Opcional: use um domínio próprio (CNAME) em `Settings → Pages`.

## 🔑 Configuração (config.js)
Crie o arquivo `config.js` (ou renomeie de `config.example.js`) com:
```js
window.CONFIG = {
  API_KEY: "SUA_API_KEY_AQUI",
  FOLDER_IDS: {
    portugues: "ID_PASTA_PORTUGUES",
    ingles: "ID_PASTA_INGLES",
    espanhol: "ID_PASTA_ESPANHOL",
    libras: "ID_PASTA_LIBRAS",
    artes: "ID_PASTA_ARTES",
    edfisica: "ID_PASTA_EDFISICA"
  }
};
```
### Onde encontro o **ID da pasta**?
Abra a pasta no Google Drive e copie o trecho do link após `folders/`.

### Importante sobre **permissões**
- Deixe cada pasta como **“Qualquer pessoa com o link – leitor”** para acesso público.
- Restrinja a **API Key** no Google Cloud:
  - Em **APIs & Services → Credentials → API key**: *Application restrictions* → **HTTP referrers (web sites)** → adicione `https://SEU_USUARIO.github.io/*` (e seu domínio, se usar CNAME).
  - Em *API restrictions*, selecione apenas **Google Drive API**.

## 🧩 Como obter a API Key
1. Acesse [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um projeto (ex.: “Biblioteca SRE”).
3. Ative **Google Drive API**.
4. Crie **API Key** e restrinja conforme acima.

## 🧪 Teste local
Abra o arquivo `index.html` no navegador. Para evitar bloqueio de CORS/local,
use um servidor simples:
```bash
# Python 3
python -m http.server 8080
# ou
npx http-server -p 8080
```
Depois acesse: http://localhost:8080/

## 📁 Estrutura
```
.
├── index.html
├── style.css
├── script.js
├── config.example.js  # renomeie para config.js
└── img/
    ├── favicon.svg
    └── logo-sre.svg
```

## 📄 Licença
MIT © 2025 SRE Araguaína
