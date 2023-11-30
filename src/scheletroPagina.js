const scheletroPagina = (() => {
    const body = document.body;

    body.innerHTML = `<style>
    
    @font-face {
    font-family: 'arcadeFont'; 
    src: url('../src/media/arcade.TTF') format('truetype');
    font-weight: normale; 
    font-style: normale; 
    }

    body {
        margin: 0px;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        max-height: 100%;
        justify-content: space-between;
        font-size: 2rem;
        font-family: 'arcadeFont', sans-serif;
    }
    
    .footer {
        font-size: 2rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: flex;
        gap: 5px;
        background-color: #1461a1;
        justify-content: center;
        z-index: 3;
    }
    
    a{
        text-decoration: none;
    }
    
    a img {
        height: 2.1rem;
        width: 2rem;
        filter:brightness(0) invert(1);
    }
    
    .nome-github {
        color: rgb(255, 255, 255);
    }
    
    .titolo {
        background-color: #1461a1;
        color: white;
        text-align: center;
        font-size: 4rem;
    }

    .mainContainer {
        display : flex;
        flex: 1;
        flex-wrap: wrap;
        background: #f6f6f794;
    }

    .parteSinistra {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        flex: 1;
        flex-wrap: wrap;
        gap: 2rem;
    }

    .parteDestra {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        flex: 1;
    }

    .tabella {
        height : clamp(275px,25vw,30rem);
        width : clamp(275px,25vw,30rem);
        background-color : white;
        display: flex;
        flex-direction: column;
        border: black 4px outset;
    }

    .col {
        border-style: groove;
        flex: 1;
        border-style: outset;
        border-color: azure;
    }

    .row {
        display: flex;
        flex: 1;
    }

    .ship {
        background-image: url(../src/media/battleShip.png);
        background-size: 100% 100%;
    }

    .hit {
        background-image: url(../src/media/hit.png);
        background-size: 100% 100%;
        border-style: inset;
        background-color: beige;
    }

    .miss {
        background-image: url(../src/media/miss.png);
        background-size: 100% 100%;
        border-style: inset;
        background-color: #0000ff17;
    }
    .valid {
        background-color : green;
    }
    .invalid {
        background-color : red;
    }
    .info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        background-color: #8080804d;
        padding: 1rem;
        border-radius: 32px;
    }
    .modale {
        position: fixed;
        top: 50%;
        left: 50%;
        transform : translate(-50%, -50%);
        height: 200px;
        width: 200px;
        padding: 2rem;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: space-around;
        align-items: center;
        background-color: #414344b8;
        color: white;
        border-radius: 32px;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    button {
        padding: 1rem;
        border-radius: 16px;
        border: 1px solid black;
        font-family: 'arcadeFont';
        font-size: 20px;
        background-color : white;
        color: black;
        transition: background-color 0.5s ease-in 0.15s;
        
    }

    button:hover {
        background-color : black;
        color: white;
    }

    </style>

    <div class='titolo'>Battle Ship</div>
    <div id="modalOverlay"></div>
    <div class="mainContainer">
        <div class='parteSinistra'>
            <div class='tabella' id='human'></div>
            <div class='info'>
                <span id='dimensioniNave'></span>
                <button id='rotate'>Ruota</button>
            </div>        
        </div>
        <div class='parteDestra'>
            <div class='tabella' id='bot'></div>    
        </div>
    </div>

    <div class="footer">

        <a href="https://github.com/ReXerses" target="_blank">
            <img src="../src/media/github.svg" alt="Personal Github link">
        </a>
        <a class='nome-github' href="https://github.com/ReXerses" target="_blank">ReXerses</a>

    </div>
    `;

});

export default scheletroPagina;