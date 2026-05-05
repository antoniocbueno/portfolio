// --- Alternância de Tema (Dark/Light Mode) ---
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

// --- Validação do Formulário de Contato ---
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

    // Validação de Nome
    if (nome === '') {
        errorNome.textContent = 'Por favor, insira seu nome.';
        isValid = false;
    }

    // Validação de E-mail (Regex simples)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        errorEmail.textContent = 'Por favor, insira seu e-mail.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        errorEmail.textContent = 'Insira um e-mail válido.';
        isValid = false;
    }

    // Validação de Mensagem
    if (mensagem === '') {
        errorMensagem.textContent = 'Por favor, escreva uma mensagem.';
        isValid = false;
    }

    // Simulação de Envio
    if (isValid) {
        // Aqui seria feita a chamada Fetch/Axios para uma API real
        
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