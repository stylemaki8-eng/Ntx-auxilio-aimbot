// --- CONFIGURAÇÕES DO MOTOR TAKASSI ---
const keyCorreta = "Taka383-KEY-283";
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

// --- SISTEMA DE PARTÍCULAS (TEIAS RÁPIDAS) ---
function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    // 120 partículas para o A15 5G não engasgar e manter o brilho
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 10, // Velocidade X aumentada
            vy: (Math.random() - 0.5) * 10, // Velocidade Y aumentada
            radius: Math.random() * 2
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff007f";
    ctx.strokeStyle = "rgba(255, 0, 127, 0.2)";

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Rebate nas bordas
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Desenha as teias entre pontos próximos
        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 130) {
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(drawParticles);
}

// --- FUNÇÕES DO PAINEL ---

// Login com a Key
function login() {
    const input = document.getElementById('keyInput').value;
    if(input === keyCorreta) {
        document.getElementById('loginScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('mainPanel').style.display = 'block';
        }, 300);
    } else {
        alert("❌ KEY INVÁLIDA!");
    }
}

// Troca de Abas
function tab(btn, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(id).classList.add('active');
}

// Ativar/Desativar Opções (Checkboxes)
function toggle(el) {
    el.querySelector('.check').classList.toggle('active');
}

// Simulação de Injeção no Free Fire
function inject() {
    const btn = document.querySelector('.inject-btn');
    btn.innerText = "CALIBRANDO A15...";
    btn.style.background = "#555";
    
    setTimeout(() => {
        alert("✅ TAKASSI FF ATIVADO!\nMapeamento e Sensibilidade aplicados.");
        btn.innerText = "INJETADO ✅";
        btn.style.background = "linear-gradient(45deg, #00ff88, #008855)";
        window.location.href = "freefire://";
    }, 2000);
}

// --- INICIALIZAÇÃO ---
window.addEventListener('resize', initParticles);

// Registrar o Service Worker para o modo PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Motor de Fundo Ativo!'))
            .catch(err => console.log('Erro no Worker:', err));
    });
}

initParticles();
drawParticles();
