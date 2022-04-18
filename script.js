const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let isGameOver
let position = 0;

function handleKeyup(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }  
}

function jump() {
  isJumping = true;
  
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval)

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.botton = position + 'px'; 
        }
      }, 20); 
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomtime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);

    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {

      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim do jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);
  setTimeout(createCactus, randomtime);
}

createCactus();
document.addEventListener('keyup', handleKeyup);
    