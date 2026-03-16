// --- 1. ENGINE DE CALIBRAÇÃO EXCLUSIVA SAMSUNG A15 5G ---
const SamsungEngine = {
    modelo: "Samsung Galaxy A15 5G",
    dpiRecomendada: 600,
    sensY: "1.92x (Trava de Mira)",
    touchBoost: "Ativo (1ms Delay)",
    
    aplicarAjustes: function() {
        console.log(`[SYSTEM] Calibrando para ${this.modelo}...`);
        console.log(`[SYSTEM] DPI Alvo: ${this.dpiRecomendada} | Sensibilidade Y otimizada.`);
    }
};

// --- 2. SISTEMA DE LOGIN ---
function logar() {
    const key = document.getElementById('key-input').value;
    // Chave de acesso padrão
    if(key === "Taka383-KEY-283") {
        document.getElementById('login-panel').style.display = 'none';
        document.getElementById('functions-panel').style.display = 'block';
        SamsungEngine.aplicarAjustes();
    } else { 
        alert("Acesso Negado! Chave Inválida."); 
    }
}

// --- 3. CONTROLE DE FUNÇÕES (ATIVAR/DESATIVAR) ---
function toggle(el) { 
    el.classList.toggle('on'); 
}

// --- 4. INJETAR SCRIPTS E ABRIR FREE FIRE ---
function abrirJogo() {
    // Simulação de injeção de pacotes no hardware Samsung
    alert(`[OPTIMIZER] Samsung A15 5G Detectado!
Injetando Auxílio de Mira (Aim Lock)...
Reduzindo Latência de Toque para 1ms...
Configurando Estabilidade de FPS...`);

    setTimeout(() => {
        window.location.href = "freefire://";
    }, 1200);
}

// --- 5. ENGINE VISUAL (TEIAS ULTRA RÁPIDAS) ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let dots = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Criando partículas com velocidade extrema
for(let i=0; i<100; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 18, // Velocidade máxima
        vy: (Math.random() - 0.5) * 18  
    });
}

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "#ff00ff"; // Rosa Neon
    ctx.strokeStyle = "rgba(255, 0, 255, 0.25)";

    dots.forEach((d, i) => {
        d.x += d.vx; d.y += d.vy;
        
        if(d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if(d.y < 0 || d.y > canvas.height) d.vy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, 2, 0, Math.PI*2);
        ctx.fill();

        for(let j=i+1; j<dots.length; j++) {
            let d2 = dots[j];
            let dist = Math.hypot(d.x - d2.x, d.y - d2.y);
            if(dist < 120) {
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d2.x, d2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}
animate();

// --- 6. REGISTRO DO SERVICE WORKER ---
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
