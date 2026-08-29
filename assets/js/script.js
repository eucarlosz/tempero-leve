/* =========================================================
   TEMPERO LEVE
   JavaScript principal
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const botaoMenu = document.getElementById("menu-mobile");
const menuPrincipal = document.getElementById("menu-principal");

if (botaoMenu && menuPrincipal) {

    botaoMenu.addEventListener("click", () => {

        const menuAberto = menuPrincipal.classList.toggle("ativo");

        botaoMenu.classList.toggle("ativo", menuAberto);

        botaoMenu.setAttribute(
            "aria-expanded",
            String(menuAberto)
        );

        botaoMenu.setAttribute(
            "aria-label",
            menuAberto
                ? "Fechar menu"
                : "Abrir menu"
        );
    });


    /* fecha ao clicar em um item */

    const linksMenu = menuPrincipal.querySelectorAll("a");

    linksMenu.forEach((link) => {

        link.addEventListener("click", () => {
            fecharMenuMobile();
        });

    });


    /* fecha ao clicar fora */

    document.addEventListener("click", (evento) => {

        const clicouNoMenu =
            menuPrincipal.contains(evento.target);

        const clicouNoBotao =
            botaoMenu.contains(evento.target);

        if (
            !clicouNoMenu &&
            !clicouNoBotao &&
            menuPrincipal.classList.contains("ativo")
        ) {
            fecharMenuMobile();
        }

    });


    /* fecha com tecla ESC */

    document.addEventListener("keydown", (evento) => {

        if (
            evento.key === "Escape" &&
            menuPrincipal.classList.contains("ativo")
        ) {
            fecharMenuMobile();
            botaoMenu.focus();
        }

    });

}


/* =========================================================
   FUNÇÃO PARA FECHAR MENU MOBILE
========================================================= */

function fecharMenuMobile() {

    if (!botaoMenu || !menuPrincipal) {
        return;
    }

    menuPrincipal.classList.remove("ativo");
    botaoMenu.classList.remove("ativo");

    botaoMenu.setAttribute(
        "aria-expanded",
        "false"
    );

    botaoMenu.setAttribute(
        "aria-label",
        "Abrir menu"
    );
}


/* =========================================================
   FECHAR MENU AO AUMENTAR A TELA
========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 700) {
        fecharMenuMobile();
    }

});


/* =========================================================
   HEADER AO ROLAR
========================================================= */

const header = document.querySelector(".header");

function atualizarHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 20) {
        header.classList.add("header-rolagem");
    } else {
        header.classList.remove("header-rolagem");
    }

}

window.addEventListener(
    "scroll",
    atualizarHeader,
    {
        passive: true
    }
);

atualizarHeader();


/* =========================================================
   LINK ATIVO NO MENU
========================================================= */

const secoes = document.querySelectorAll(
    "main section[id]"
);

const linksNavegacao = document.querySelectorAll(
    '.menu a[href^="#"]'
);

function atualizarLinkAtivo() {

    let secaoAtual = "";

    secoes.forEach((secao) => {

        const topoSecao =
            secao.offsetTop - 180;

        const alturaSecao =
            secao.offsetHeight;

        if (
            window.scrollY >= topoSecao &&
            window.scrollY <
            topoSecao + alturaSecao
        ) {
            secaoAtual = secao.id;
        }

    });


    linksNavegacao.forEach((link) => {

        link.classList.remove("ativo");

        if (
            link.getAttribute("href") ===
            `#${secaoAtual}`
        ) {
            link.classList.add("ativo");
        }

    });

}

window.addEventListener(
    "scroll",
    atualizarLinkAtivo,
    {
        passive: true
    }
);

atualizarLinkAtivo();


/* =========================================================
   ANO AUTOMÁTICO NO FOOTER
========================================================= */

const copyright = document.querySelector(
    ".footer-copy p"
);

if (copyright) {

    const anoAtual =
        new Date().getFullYear();

    copyright.textContent =
        `© ${anoAtual} Tempero Leve. Todos os direitos reservados.`;

}


/* =========================================================
   LINKS EXTERNOS
   Segurança adicional
========================================================= */

const linksExternos = document.querySelectorAll(
    'a[target="_blank"]'
);

linksExternos.forEach((link) => {

    const relAtual =
        link.getAttribute("rel") || "";

    const valoresRel =
        relAtual.split(/\s+/).filter(Boolean);

    if (!valoresRel.includes("noopener")) {
        valoresRel.push("noopener");
    }

    if (!valoresRel.includes("noreferrer")) {
        valoresRel.push("noreferrer");
    }

    link.setAttribute(
        "rel",
        valoresRel.join(" ")
    );

});