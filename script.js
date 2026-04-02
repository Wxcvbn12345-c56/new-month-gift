const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const submitBtn = document.getElementById('submitBtn');
const userNameInput = document.getElementById('userName');
const userPhoneInput = document.getElementById('userPhone');
const displayNameSpan = document.getElementById('displayName');
const displayPhoneSpan = document.getElementById('displayPhone');
const bgMusic = document.getElementById('bgMusic');
const replayBtn = document.getElementById('replayMusicBtn');

let floatingInterval = null;
let sparkleInterval = null;

function startFloatingGifts() {
    const container = document.getElementById('floatingGifts');
    container.classList.add('active');
    const giftEmojis = ['🤣', '😂', '😜', '🤪', '👻', '🤡', '🤣'];
    if (floatingInterval) clearInterval(floatingInterval);
    floatingInterval = setInterval(() => {
        const emoji = giftEmojis[Math.floor(Math.random() * giftEmojis.length)];
        const div = document.createElement('div');
        div.className = 'gift-emoji';
        div.textContent = emoji;
        div.style.left = Math.random() * 100 + '%';
        div.style.fontSize = (Math.random() * 30 + 20) + 'px';
        div.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(div);
        setTimeout(() => div.remove(), 8000);
    }, 400);
}

function startSparkles() {
    if (sparkleInterval) clearInterval(sparkleInterval);
    sparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }, 300);
}

function startConfetti() {
    for (let i = 0; i < 100; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * window.innerWidth + 'px';
        conf.style.top = '-20px';
        conf.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        conf.style.width = Math.random() * 8 + 4 + 'px';
        conf.style.height = Math.random() * 8 + 4 + 'px';
        conf.style.animationDuration = Math.random() * 2 + 2 + 's';
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 3000);
    }
}

function boostVolume() {
    if (bgMusic.volume >= 1.0) return;
    let target = 1.0;
    let step = 0.05;
    let interval = setInterval(() => {
        if (bgMusic.volume + step >= target) {
            bgMusic.volume = target;
            clearInterval(interval);
        } else {
            bgMusic.volume = Math.min(bgMusic.volume + step, target);
        }
    }, 80);
}

function showGiftPage(userName, userPhone) {
    displayNameSpan.textContent = userName;
    displayPhoneSpan.textContent = userPhone ? `📞 ${userPhone}` : "";
    page1.style.display = 'none';
    page2.style.display = 'block';
    startFloatingGifts();
    startSparkles();
    startConfetti();
    bgMusic.volume = 1.0;
    bgMusic.play().catch(e => console.log("Autoplay bloqué"));
}

submitBtn.addEventListener('click', () => {
    let name = userNameInput.value.trim();
    let phone = userPhoneInput.value.trim();
    if (name === "") name = "???";
    if (phone && !phone.startsWith('+')) phone = '+' + phone.replace(/\D/g, '');
    showGiftPage(name, phone);
});

replayBtn.addEventListener('click', () => {
    boostVolume();
});

page2.style.display = 'none';