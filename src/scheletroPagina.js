const scheletroPagina = (() => {
    const body = document.body;

    body.innerHTML = `<style>
    

    body {
        margin: 0px;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        max-height: 100%;
        justify-content: space-between;
        font-size: 2rem;
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
        background-color: yellow;
    }

    .mainContainer {
        display : flex;
        flex: 1;
        flex-wrap: wrap;
    }

    .parteSinistra {
        background-color: blue;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        flex: 1;
        flex-wrap: wrap;
        gap: 2rem;
    }

    .parteDestra {
        background-color: pink;
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
    }

    .col {
        border-style: groove;
        flex: 1;
    }

    .row {
        display: flex;
        flex: 1;
    }

    .ship {
        background-color: red;
    }

    .hit {
        background-color : grey;
    }

    .miss {
        background-color : purple;
    }
    .valid {
        background-color : green;
    }
    .invalid {
        background-color : yellow;
    }

    </style>

    <div class='titolo'>Battle Ship</div>

    <div class="mainContainer">
        <div class='parteSinistra'>
            <div class='tabella' id='human'></div>
            <button id='rotate'>Ruota la nave</button>        
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