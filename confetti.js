const canvas = document.getElementById('confetti'); // ID는 그대로 사용
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bokehParticles = [];
// 빛망울에 어울리는 부드러운 색상 팔레트
const bokehColors = [
    "rgba(255, 107, 107, 0.4)", // Primary Color (투명도 조절)
    "rgba(255, 217, 61, 0.4)",  // Secondary Color (투명도 조절)
    "rgba(255, 179, 179, 0.3)", // Light Red
    "rgba(255, 230, 153, 0.3)", // Light Yellow
    "rgba(200, 200, 255, 0.2)", // Hint of Blue/Purple for depth
    "rgba(255, 255, 255, 0.3)"  // Soft White
];

function createBokehParticles() {
    const particleCount = 60; // 파티클 개수 조절 (너무 많으면 산만해짐)
    for (let i = 0; i < particleCount; i++) {
        bokehParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 40 + 20, // 빛망울 크기 (20px ~ 60px)
            speedX: (Math.random() - 0.5) * 0.5, // 좌우로도 움직이게
            speedY: Math.random() * 0.3 + 0.1, // 아주 천천히 위로 움직이게
            color: bokehColors[Math.floor(Math.random() * bokehColors.length)],
            opacity: Math.random() * 0.4 + 0.2, // 투명도 (0.2 ~ 0.6)
            floatOffset: Math.random() * Math.PI * 2 // 부유 효과를 위한 초기 오프셋
        });
    }
}

function animateBokeh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bokehParticles.forEach(p => {
        // Y축은 위로 천천히 움직이고, X축은 좌우로 부유하며 움직이게
        p.y -= p.speedY;
        p.x += Math.sin(p.floatOffset + Date.now() * 0.0005) * p.speedX; // 시간 기반 부유 효과

        if (p.y < -p.size) { // 화면 위로 벗어나면 아래에서 다시 나타남
            p.y = canvas.height + p.size;
            p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); // 원형 빛망울
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity; // 투명도 적용
        ctx.fill();
    });

    requestAnimationFrame(animateBokeh);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bokehParticles = [];
    createBokehParticles();
});

createBokehParticles();
animateBokeh();