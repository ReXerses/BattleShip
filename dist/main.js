(()=>{"use strict";const e=e=>({length:e,receivedHit:0,isSunked:!1,hit(){return this.receivedHit+=1},isSunk(){return this.length===this.receivedHit?this.isSunked=!0:this.isSunked=!1}});function n(e=[],n=10){for(let t=0;t<n;t++){e[t]=[];for(let i=0;i<n;i++)e[t][i]={status:"empty",hipPart:null}}return e}const t=()=>({dimensioneGriglia:10,griglia:n(),pezziDiNavi:0,posizionamentoGrigliaValido:(e,n,t,i)=>"orizzontale"===i?!(t+e.length-1>9):!(n+e.length-1>9),sovrapposizioneNaviValido(e,n,t,i){if("orizzontale"===i){for(let i=t;i<t+e.length;i++)if("empty"!=this.griglia[n][i].status)return!1;return!0}for(let i=n;i<n+e.length;i++)if("empty"!=this.griglia[i][t].status)return!1;return!0},placeShip(e,n,t,i){if(this.posizionamentoGrigliaValido(e,n,t,i)&&this.sovrapposizioneNaviValido(e,n,t,i)){for(let a=0;a<e.length;a++)"orizzontale"===i?(this.griglia[n][t+a].status="ship",this.griglia[n][t+a].shipPart=e,this.pezziDiNavi++):(this.griglia[n+a][t].status="ship",this.griglia[n+a][t].shipPart=e,this.pezziDiNavi++);return!0}return!1},areAllShipsSunk(){return 0===this.pezziDiNavi},receiveAttack(e,n){const t=this.griglia[e][n];"ship"===t.status?(t.status="hit",t.shipPart.hit(),this.pezziDiNavi--):"empty"===t.status&&(t.status="miss")}}),i=n=>({id:n,tabella:t(),naviDisponibili:[e(1),e(2),e(3),e(3),e(4),e(5)],autoPosizionamentoNavi(){if(0!==this.naviDisponibili.length){let e=this.naviDisponibili.pop(),n=!0;for(;n;){let t=Math.floor(10*Math.random()),i=Math.floor(10*Math.random()),a=["orizzontale","verticale"],l=a[Math.floor(Math.random()*a.length)];this.tabella.placeShip(e,t,i,l)&&(n=!1)}this.autoPosizionamentoNavi(this.naviDisponibili)}}});document.body.innerHTML="<style>\n    \n    @font-face {\n    font-family: 'arcadeFont'; \n    src: url('./arcade.TTF') format('truetype');\n    font-weight: normale; \n    font-style: normale; \n    }\n\n    body {\n        margin: 0px;\n        display: flex;\n        flex-direction: column;\n        min-height: 100vh;\n        max-height: 100%;\n        justify-content: space-between;\n        font-size: 2rem;\n        font-family: 'arcadeFont', sans-serif;\n    }\n    \n    .footer {\n        font-size: 2rem;\n        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n        display: flex;\n        gap: 5px;\n        background-color: #1461a1;\n        justify-content: center;\n        z-index: 3;\n    }\n    \n    a{\n        text-decoration: none;\n    }\n    \n    a img {\n        height: 2.1rem;\n        width: 2rem;\n        filter:brightness(0) invert(1);\n    }\n    \n    .nome-github {\n        color: rgb(255, 255, 255);\n    }\n    \n    .titolo {\n        background-color: #1461a1;\n        color: white;\n        text-align: center;\n        font-size: 4rem;\n    }\n\n    .mainContainer {\n        display : flex;\n        flex: 1;\n        flex-wrap: wrap;\n        background: #f6f6f794;\n    }\n\n    .parteSinistra {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        padding: 1rem;\n        flex: 1;\n        flex-wrap: wrap;\n        gap: 2rem;\n    }\n\n    .parteDestra {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        padding: 1rem;\n        flex: 1;\n    }\n\n    .tabella {\n        height : clamp(275px,25vw,30rem);\n        width : clamp(275px,25vw,30rem);\n        background-color : white;\n        display: flex;\n        flex-direction: column;\n        border: black 4px outset;\n    }\n\n    .col {\n        border-style: groove;\n        flex: 1;\n        border-style: outset;\n        border-color: azure;\n    }\n\n    .row {\n        display: flex;\n        flex: 1;\n    }\n\n    .ship {\n        background-image: url(./battleShip.png);\n        background-size: 100% 100%;\n    }\n\n    .hit {\n        background-image: url(./hit.png);\n        background-size: 100% 100%;\n        border-style: inset;\n        background-color: beige;\n    }\n\n    .miss {\n        background-image: url(./miss.png);\n        background-size: 100% 100%;\n        border-style: inset;\n        background-color: #0000ff17;\n    }\n    .valid {\n        background-color : green;\n    }\n    .invalid {\n        background-color : red;\n    }\n    .info {\n        display: flex;\n        flex-direction: column;\n        gap: 1rem;\n        align-items: center;\n        background-color: #8080804d;\n        padding: 1rem;\n        border-radius: 32px;\n    }\n    .modale {\n        position: fixed;\n        top: 50%;\n        left: 50%;\n        transform : translate(-50%, -50%);\n        height: 200px;\n        width: 200px;\n        padding: 2rem;\n        z-index: 1001;\n        display: flex;\n        flex-direction: column;\n        text-align: center;\n        justify-content: space-around;\n        align-items: center;\n        background-color: #414344b8;\n        color: white;\n        border-radius: 32px;\n    }\n\n    .modal-overlay {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: rgba(0, 0, 0, 0.5);\n        z-index: 1000;\n    }\n\n    button {\n        padding: 1rem;\n        border-radius: 16px;\n        border: 1px solid black;\n        font-family: 'arcadeFont';\n        font-size: 20px;\n        background-color : white;\n        color: black;\n        transition: background-color 0.5s ease-in 0.15s;\n        \n    }\n\n    button:hover {\n        background-color : black;\n        color: white;\n    }\n\n    </style>\n\n    <div class='titolo'>Battle Ship</div>\n    <div id=\"modalOverlay\"></div>\n    <div class=\"mainContainer\">\n        <div class='parteSinistra'>\n            <div class='tabella' id='human'></div>\n            <div class='info'>\n                <span id='dimensioniNave'></span>\n                <button id='rotate'>Ruota</button>\n            </div>        \n        </div>\n        <div class='parteDestra'>\n            <div class='tabella' id='bot'></div>    \n        </div>\n    </div>\n\n    <div class=\"footer\">\n\n        <a href=\"https://github.com/ReXerses\" target=\"_blank\">\n            <img src=\"./github.svg\" alt=\"Personal Github link\">\n        </a>\n        <a class='nome-github' href=\"https://github.com/ReXerses\" target=\"_blank\">ReXerses</a>\n\n    </div>\n    ";const a=document.getElementById("human"),l=document.getElementById("bot"),o="valid",r="invalid",s=10,d=document.querySelector(".info"),c=document.getElementById("rotate");let u=!0,p="orizzontale",m=i(1),g=i(2),h=document.getElementById("dimensioniNave");v(),g.autoPosizionamentoNavi(),z(g),z(m),l.style.pointerEvents="none";let f=document.querySelectorAll(".casellaGiocatore"),b=document.querySelectorAll(".casellaBot");function v(){m.naviDisponibili[0]&&(h.textContent=`Nave   di   dimensione:   ${m.naviDisponibili[m.naviDisponibili.length-1].length}`)}function y(e,n,t,i){"hit"===i.tabella.griglia[n][t].status?(e.classList.remove("ship"),e.classList.add("hit")):"miss"===i.tabella.griglia[n][t].status&&e.classList.add("miss")}function z(e){if(1===e.id)for(let n=0;n<e.tabella.dimensioneGriglia;n++){const t=document.createElement("div");t.className="row",t.dataset.row=n,a.appendChild(t);for(let i=0;i<m.tabella.dimensioneGriglia;i++){const a=document.createElement("div");a.className="col",a.dataset.row=n,a.dataset.col=i,a.classList.add("casellaGiocatore"),"ship"===e.tabella.griglia[n][i].status?a.classList.add("ship"):a.classList.add("empty"),t.appendChild(a)}}else for(let n=0;n<e.tabella.dimensioneGriglia;n++){const t=document.createElement("div");t.className="row",t.dataset.row=n,l.appendChild(t);for(let i=0;i<e.tabella.dimensioneGriglia;i++){const e=document.createElement("div");e.className="col",e.dataset.row=n,e.dataset.col=i,e.classList.add("casellaBot"),t.appendChild(e)}}}function x(e){e.forEach((e=>{e.addEventListener("click",(n=>k(0,e)))}))}function k(e,n){if(0!=m.naviDisponibili.length){let e=parseInt(n.getAttribute("data-row")),i=parseInt(n.getAttribute("data-col")),a=m.naviDisponibili[m.naviDisponibili.length-1];if(m.tabella.posizionamentoGrigliaValido(a,e,i,p)&&m.tabella.sovrapposizioneNaviValido(a,e,i,p)){let n=m.naviDisponibili.pop();m.tabella.placeShip(n,e,i,p),t=m,document.querySelectorAll(".casellaGiocatore").forEach((e=>{let n=e.getAttribute("data-row"),i=e.getAttribute("data-col");"ship"===t.tabella.griglia[n][i].status&&e.classList.add("ship")})),v()}}var t;0===m.naviDisponibili.length&&(f.forEach((e=>{e.removeEventListener("click",k)})),a.innerHTML="",z(m),d.style.display="none",l.addEventListener("click",E),a.addEventListener("click",E))}function S(e){e.forEach((e=>{e.addEventListener("mouseover",(()=>{document.querySelectorAll(".casellaGiocatore").forEach((e=>{e.classList.remove(o,r)}));let n=m.naviDisponibili[m.naviDisponibili.length-1],t=parseInt(e.getAttribute("data-row")),i=parseInt(e.getAttribute("data-col")),a=!0;for(let e=0;e<n.length;e++){let n="orizzontale"===p?i+e:i,l="verticale"===p?t+e:t,o=document.querySelector(`[data-row="${l}"][data-col="${n}"]`);(!o||o.classList.contains("ship")||"verticale"===p&&l>=s||"orizzontale"===p&&n>=s)&&(a=!1)}let l=a?o:r;for(let e=0;e<n.length;e++){let n="orizzontale"===p?i+e:i,a="verticale"===p?t+e:t,o=document.querySelector(`[data-row="${a}"][data-col="${n}"]`);o&&o.classList.add(l)}}))}))}function w(e){e.forEach((e=>{e.addEventListener("click",(()=>{let n=parseInt(e.getAttribute("data-row")),t=parseInt(e.getAttribute("data-col"));"miss"!=g.tabella.griglia[n][t].status&&"hit"!=g.tabella.griglia[n][t].status&&(g.tabella.receiveAttack(n,t),y(e,n,t,g),g.tabella.areAllShipsSunk()?L("HUMAN"):(u=!1,E()))}))}))}function E(){if(u)l.style.pointerEvents="auto";else{l.style.pointerEvents="none";let e=!0;for(;e;){let n=Math.floor(10*Math.random()),t=Math.floor(10*Math.random());if("ship"===m.tabella.griglia[n][t].status||"empty"===m.tabella.griglia[n][t].status){let i=document.querySelector(`[data-row="${n}"][data-col="${t}"]`);m.tabella.receiveAttack(n,t),y(i,n,t,m),e=!1}}m.tabella.areAllShipsSunk()?(L("BOT"),u=!0):(u=!0,E())}}function L(e){const n=document.getElementById("modalOverlay"),t=document.querySelector(".mainContainer"),o=document.createElement("div");o.classList.add("modale");const r=document.createElement("span");r.textContent=`${e}   WINS!`,o.appendChild(r);const s=document.createElement("button");s.textContent="Restart",o.appendChild(s),t.appendChild(o),n.classList.add("modal-overlay"),s.addEventListener("click",(()=>{a.style.pointerEvents="auto",n.classList.remove("modal-overlay"),o.style.display="none",m=i(1),g=i(2),g.autoPosizionamentoNavi(),l.innerHTML="",a.innerHTML="",z(g),l.style.pointerEvents="none",d.style.display="flex",z(m);let e=document.querySelectorAll(".casellaGiocatore"),t=document.querySelectorAll(".casellaBot");v(),x(e),S(e),w(t)}))}x(f),S(f),w(b),c.addEventListener("click",(()=>{p="orizzontale"===p?"verticale":"orizzontale"}))})();