// Alternância de tema (Dark/Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se há preferência salva
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Validação do Formulário de Contato
const contactForm = document.getElementById('contact-form');
const feedbackMsg = document.getElementById('form-feedback');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Captura os campos e áreas de erro
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    const errorNome = document.getElementById('error-nome');
    const errorEmail = document.getElementById('error-email');
    const errorMensagem = document.getElementById('error-mensagem');

    // Reseta erros e feedback
    errorNome.textContent = '';
    errorEmail.textContent = '';
    errorMensagem.textContent = '';
    feedbackMsg.textContent = '';
    feedbackMsg.className = 'feedback-msg';

    let isValid = true;

    // Validação de nome
    if (nome === '') {
        errorNome.textContent = 'Por favor, insira seu nome.';
        isValid = false;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        errorEmail.textContent = 'Por favor, insira seu e-mail.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        errorEmail.textContent = 'Insira um e-mail válido.';
        isValid = false;
    }

    // Validação de mensagem
    if (mensagem === '') {
        errorMensagem.textContent = 'Por favor, escreva uma mensagem.';
        isValid = false;
    }

    // Simulação de envio
    if (isValid) {       
        // Exibe mensagem de sucesso
        feedbackMsg.textContent = 'Mensagem enviada com sucesso! (Simulação)';
        feedbackMsg.classList.add('success');
        
        // Limpa o formulário
        contactForm.reset();
        
        // Remove a mensagem após 4 segundos
        setTimeout(() => {
            feedbackMsg.textContent = '';
            feedbackMsg.classList.remove('success');
        }, 4000);
    }
});

// Efeito máquina de escrever no portfólio
const projectRows = document.querySelectorAll('.project-row');

projectRows.forEach(row => {
    let typingInterval;
    const descElement = row.querySelector('.project-desc');
    const fullText = row.getAttribute('data-desc');

    // Quando o mouse entra na linha do projeto
    row.addEventListener('mouseenter', () => {
        descElement.textContent = '';
        let i = 0;
        clearInterval(typingInterval);
        
        // Inicia a digitação caractere por caractere
        typingInterval = setInterval(() => {
            if (i < fullText.length) {
                descElement.textContent += fullText.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 15); // Velocidade da digitação
    });

    // Quando o mouse sai da linha do projeto
    row.addEventListener('mouseleave', () => {
        clearInterval(typingInterval);
        descElement.textContent = '';
    });
});

document.getElementById("year").innerHTML = new Date().getFullYear();

// --- Animações de scroll ---
// Seleciona todos os elementos que terão animação
const revealElements = document.querySelectorAll('.reveal');

// Configurações do observador
const revealOptions = {
    threshold: 0.20,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // Se o elemento saiu da tela, remove a classe
            entry.target.classList.remove('active');
            return;
        }
        // Se entrou na tela, adiciona a classe para animar
        entry.target.classList.add('active');
    });
}, revealOptions);

// Inicia a observação em cada elemento
revealElements.forEach(el => {
    revealOnScroll.observe(el);
});