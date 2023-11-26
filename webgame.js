const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvas_width = 2000;
const canvas_height = 1200;
let direction = 4;
let bgX = -canvas.width / 2;
let bgY = -canvas.height / 2;

let gameRunning = true;
let score = 0;
let gameover = false;

// 오디오 객체 생성
const gameMusic = new Audio('music/gameMusic.mp3');
const hurt = new Audio('music/hurt.mp3');
const mummyattack = new Audio('music/mummyattack.mp3');
const scorpiondie = new Audio('music/scorpiondie.mp3');

gameMusic.loop = true; // 음악을 반복 재생 설정
gameMusic.volume = 0.1;

const backgroundimg = new Image();
backgroundimg.src = 'images/background.png';
const gameoverimg = new Image();
gameoverimg.src = 'images/gameover.png';
const Chrisimg = new Image();
Chrisimg.src = 'images/ChrisRight.png';
const Jakeimg = new Image();
Jakeimg.src = 'images/JakeRight.png';

//보는 방향에 따른 플레이어 이미지
function LoadplayerImage() {
  if (direction == 1 && !whatWeapon) Chrisimg.src = 'images/JakeUp.png';
  else if (direction == 2 && !whatWeapon) Chrisimg.src = 'images/JakeDown.png';
  else if (direction == 3 && !whatWeapon) Chrisimg.src = 'images/JakeLeft.png';
  else if (direction == 4 && !whatWeapon) Chrisimg.src = 'images/JakeRight.png';

  if (direction == 1 && whatWeapon) Jakeimg.src = 'images/ChrisUp.png';
  else if (direction == 2 && whatWeapon) Jakeimg.src = 'images/ChrisDown.png';
  else if (direction == 3 && whatWeapon) Jakeimg.src = 'images/ChrisLeft.png';
  else if (direction == 4 && whatWeapon) Jakeimg.src = 'images/ChrisRight.png';
}
const swordimg = new Image();
const gunimg = new Image();

//보는 방향에 따른 검 이미지
function LoadswordImage() {
  if (score < 20) {
    if (direction == 1) swordimg.src = 'images/axeUp.png';
    else if (direction == 2) swordimg.src = 'images/axeDown.png';
    else if (direction == 3) swordimg.src = 'images/axeLeft.png';
    else if (direction == 4) swordimg.src = 'images/axeRight.png';
  }
  if (score >= 20 && score < 30) {
    if (direction == 1) swordimg.src = 'images/swordUp.png';
    else if (direction == 2) swordimg.src = 'images/swordDown.png';
    else if (direction == 3) swordimg.src = 'images/swordLeft.png';
    else if (direction == 4) swordimg.src = 'images/swordRight.png';
  }
  if (score >= 30) {
    if (direction == 1) swordimg.src = 'images/lightsaberUp.png';
    else if (direction == 2) swordimg.src = 'images/lightsaberDown.png';
    else if (direction == 3) swordimg.src = 'images/lightsaberLeft.png';
    else if (direction == 4) swordimg.src = 'images/lightsaberRight.png';
  }
}

function LoadgunImage() {
  if (score < 20) {
    gunimg.src = 'images/stone.png';
  }
  if (score >= 20 && score < 30) {
    if (direction == 1) gunimg.src = 'images/spearUp.png';
    else if (direction == 2) gunimg.src = 'images/spearDown.png';
    else if (direction == 3) gunimg.src = 'images/spearLeft.png';
    else if (direction == 4) gunimg.src = 'images/spearRight.png';
  }
  if (score >= 30) {
    if (direction == 1) gunimg.src = 'images/gunUp.png';
    else if (direction == 2) gunimg.src = 'images/gunDown.png';
    else if (direction == 3) gunimg.src = 'images/gunLeft.png';
    else if (direction == 4) gunimg.src = 'images/gunRight.png';
  }
}

const bullet1img = new Image();
const bullet2img = new Image();
const bullet3img = new Image();
const bullet4img = new Image();
function LoadbulletImage() {
  if (score < 20) {
    bullet1img.src = 'images/stone.png';
    bullet2img.src = 'images/stone.png';
    bullet3img.src = 'images/stone.png';
    bullet4img.src = 'images/stone.png';
  }
  if (score >= 20 && score < 30) {
    bullet1img.src = 'images/spearUp.png';
    bullet2img.src = 'images/spearDown.png';
    bullet3img.src = 'images/spearLeft.png';
    bullet4img.src = 'images/spearRight.png';
  }
  if (score >= 30) {
    bullet1img.src = 'images/bulletUp.png';
    bullet2img.src = 'images/bulletDown.png';
    bullet3img.src = 'images/bulletLeft.png';
    bullet4img.src = 'images/bulletRight.png';
  }
}
const enemyimg = new Image();
const enemy_Rimg = new Image();
enemyimg.src = 'images/enemy.png';
enemy_Rimg.src = 'images/enemy-R.png';
const enemy2img = new Image();
const enemy2_Rimg = new Image();
enemy2img.src = 'images/enemy2.png';
enemy2_Rimg.src = 'images/enemy2-R.png';
const enemy3img = new Image();
const enemy3_Rimg = new Image();
enemy3img.src = 'images/enemy3.png';
enemy3_Rimg.src = 'images/enemy3-R.png';
const enemy4img = new Image();
const enemy4_Rimg = new Image();
enemy4img.src = 'images/enemy4.png';
enemy4_Rimg.src = 'images/enemy-R.png';
const boss1img = new Image();
const boss1_Rimg = new Image();
boss1img.src = 'images/boss1.png';
boss1_Rimg.src = 'images/boss1-R.png';
const boss2img = new Image();
const boss2_Rimg = new Image();
boss2img.src = 'images/boss2.png';
boss2_Rimg.src = 'images/boss2-R.png';

const enemyAttackimg = new Image();
enemyAttackimg.src = 'images/enemyAttack.png';
const enemy2Attackimg = new Image();
enemy2Attackimg.src = 'images/enemy2Attack.png';
const enemy3Boomimg = new Image();
enemy3Boomimg.src = 'images/enemy3Boom.png';
const boss1Atttack1img = new Image();
boss1Atttack1img.src = 'images/boss1Attack1.png';
const boss2Atttack1img = new Image();
boss2Atttack1img.src = 'images/boss2Attack1.png';

const swordSkillupimg = new Image();
swordSkillupimg.src = 'images/swordskillup.png';
const swordSkilldownimg = new Image();
swordSkilldownimg.src = 'images/swordskilldown.png';
const swordSkillleftimg = new Image();
swordSkillleftimg.src = 'images/swordskillleft.png';
const swordSkillrightimg = new Image();
swordSkillrightimg.src = 'images/swordskillright.png';

const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height / 2 - 25,
  width: 42,
  height: 54,
  hp: 1000,
};

const sword = {
  x: player.x + 40,
  y: player.y + 13,
  width: 70,
  height: 20,
  damage: 1,
};

const playerSpeed = 4;

let mvplayerX = canvas_width / 2 - player.width / 2; //2000x1200인 실제 맵크기에서 플레이어 위치
let mvplayerY = canvas_height / 2 - player.height / 2; //2000x1200인 실제 맵크기에서 플레이어 위치
let lr = false,
  ud = false;

function movePlayer() {
  if (keysPressed['ArrowUp']) {
    mvplayerY -= playerSpeed;
    if (
      mvplayerX >= -4 &&
      mvplayerX + player.width <= canvas_width + 4 &&
      mvplayerY >= canvas.height / 2 &&
      mvplayerY + player.height <= canvas_height - canvas.height / 2
    ) {
      bgY += playerSpeed;
      spawnY += playerSpeed;
      for (let enemy of enemies[0]) enemy.y += playerSpeed;
      for (let enemy of enemies[1]) enemy.y += playerSpeed;
      for (let enemy of enemies[2]) enemy.y += playerSpeed;
      for (let enemy of enemies[3]) enemy.y += playerSpeed;
      for (let enemy of enemies[4]) enemy.y += playerSpeed;
      for (let enemy of enemies[5]) enemy.y += playerSpeed;
      for (let enemy2atk of enemy2AttackArray) enemy2atk.y += playerSpeed;
      for (let swordskill of swordSkillArray) swordskill.y += playerSpeed;
      for (let bullet of bullets) bullet.y += playerSpeed;
      for (let fireball of boss2Attack1Array) fireball.y += playerSpeed;
    } else {
      player.y -= playerSpeed;
    }
    if (
      !whatWeapon &&
      (!keysPressed['x'] || (keysPressed['z'] && keysPressed['x']))
    )
      direction = 1;
    else if (whatWeapon) direction = 1;
  }
  if (keysPressed['ArrowDown']) {
    mvplayerY += playerSpeed;
    if (
      mvplayerX >= -4 &&
      mvplayerX + player.width <= canvas_width + 4 &&
      mvplayerY >= canvas.height / 2 &&
      mvplayerY + player.height <= canvas_height - canvas.height / 2
    ) {
      bgY -= playerSpeed;
      spawnY -= playerSpeed;
      for (let enemy of enemies[0]) enemy.y -= playerSpeed;
      for (let enemy of enemies[1]) enemy.y -= playerSpeed;
      for (let enemy of enemies[2]) enemy.y -= playerSpeed;
      for (let enemy of enemies[3]) enemy.y -= playerSpeed;
      for (let enemy of enemies[4]) enemy.y -= playerSpeed;
      for (let enemy of enemies[5]) enemy.y -= playerSpeed;
      for (let enemy2atk of enemy2AttackArray) enemy2atk.y -= playerSpeed;
      for (let swordskill of swordSkillArray) swordskill.y -= playerSpeed;
      for (let bullet of bullets) bullet.y -= playerSpeed;
      for (let fireball of boss2Attack1Array) fireball.y -= playerSpeed;
    } else {
      player.y += playerSpeed;
    }
    if (
      !whatWeapon &&
      (!keysPressed['x'] || (keysPressed['z'] && keysPressed['x']))
    )
      direction = 2;
    else if (whatWeapon) direction = 2;
  }
  if (keysPressed['ArrowLeft']) {
    mvplayerX -= playerSpeed;
    if (
      mvplayerX >= canvas.width / 2 &&
      mvplayerX + player.width <= canvas_width - canvas.width / 2 &&
      mvplayerY >= -4 &&
      mvplayerY + player.height <= canvas_height + 4
    ) {
      bgX += playerSpeed;
      spawnX += playerSpeed;
      for (let enemy of enemies[0]) enemy.x += playerSpeed;
      for (let enemy of enemies[1]) enemy.x += playerSpeed;
      for (let enemy of enemies[2]) enemy.x += playerSpeed;
      for (let enemy of enemies[3]) enemy.x += playerSpeed;
      for (let enemy of enemies[4]) enemy.x += playerSpeed;
      for (let enemy of enemies[5]) enemy.x += playerSpeed;
      for (let enemy2atk of enemy2AttackArray) enemy2atk.x += playerSpeed;
      for (let swordskill of swordSkillArray) swordskill.x += playerSpeed;
      for (let bullet of bullets) bullet.x += playerSpeed;
      for (let fireball of boss2Attack1Array) fireball.x += playerSpeed;
    } else {
      player.x -= playerSpeed;
    }
    if (
      !whatWeapon &&
      (!keysPressed['x'] || (keysPressed['z'] && keysPressed['x']))
    )
      direction = 3;
    else if (whatWeapon) direction = 3;
  }
  if (keysPressed['ArrowRight']) {
    mvplayerX += playerSpeed;
    if (
      mvplayerX >= canvas.width / 2 &&
      mvplayerX + player.width <= canvas_width - canvas.width / 2 &&
      mvplayerY >= -4 &&
      mvplayerY + player.height <= canvas_height + 4
    ) {
      bgX -= playerSpeed;
      spawnX -= playerSpeed;
      for (let enemy of enemies[0]) enemy.x -= playerSpeed;
      for (let enemy of enemies[1]) enemy.x -= playerSpeed;
      for (let enemy of enemies[2]) enemy.x -= playerSpeed;
      for (let enemy of enemies[3]) enemy.x -= playerSpeed;
      for (let enemy of enemies[4]) enemy.x -= playerSpeed;
      for (let enemy of enemies[5]) enemy.x -= playerSpeed;
      for (let enemy2atk of enemy2AttackArray) enemy2atk.x -= playerSpeed;
      for (let swordskill of swordSkillArray) swordskill.x -= playerSpeed;
      for (let bullet of bullets) bullet.x -= playerSpeed;
      for (let fireball of boss2Attack1Array) fireball.x -= playerSpeed;
    } else {
      player.x += playerSpeed;
    }
    direction = 4;
  }

  //player가 움직이는 구간에서 background가 움직이는 구간으로 넘어갈 때 좌표가 +-4가 되는 문제가 있어서 만듦
  if (
    mvplayerX >= -4 &&
    mvplayerX + player.width <= canvas_width + 4 &&
    mvplayerY >= canvas.height / 2 &&
    mvplayerY + player.height <= canvas_height - canvas.height / 2
  ) {
    if (ud && mvplayerY < canvas_height / 2) player.y += 4;
    else if (ud && mvplayerY > canvas_height / 2) player.y -= 4;
    ud = false;
  } else {
    ud = true;
  }
  if (
    mvplayerX >= canvas.width / 2 &&
    mvplayerX + player.width <= canvas_width - canvas.width / 2 &&
    mvplayerY >= -4 &&
    mvplayerY + player.height <= canvas_height + 4
  ) {
    if (lr && mvplayerX < canvas_width / 2) player.x += 4;
    else if (lr && mvplayerX > canvas_width / 2) player.x -= 4;
    lr = false;
  } else {
    lr = true;
  }

  LoadswordImage();
  LoadgunImage();
  LoadbulletImage();
  LoadplayerImage();

  // 캐릭터 밖으로 안나가게 설정
  mvplayerX = Math.max(
    25,
    Math.min(canvas_width - player.width - 25, mvplayerX)
  );
  mvplayerY = Math.max(
    25,
    Math.min(canvas_height - player.height - 25, mvplayerY)
  );
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

let enemies = [[], [], [], [], [], []];
const enemySpeed = 1;
const enemy2Speed = 1;
const enemy3Speed = 2.5;
const enemy4Speed = 1;
const boss1Speed = 1;
const boss2Speed = 1;

let spawnX = 0;
let spawnY = 0;

function spawnEnemy() {
  const size = Math.random() * (50 - 20) + 20; // 적의 크기를 무작위로 설정
  let x, y;

  // 적이 어느 방향에서 나타날지 결정
  const side = Math.floor(Math.random() * 4); // 0: 위쪽, 1: 오른쪽, 2: 아래쪽, 3: 왼쪽

  switch (side) {
    case 0: // 위쪽
      x = Math.random() * (canvas.width + canvas_width / 4 - size) + spawnX;
      y = -canvas_height / 4 - size + spawnY;
      break;
    case 1: // 오른쪽
      x = -canvas_width / 4 + canvas_width + spawnX;
      y = Math.random() * (canvas.height + canvas_height / 4 - size) + spawnY;
      break;
    case 2: // 아래쪽
      x = Math.random() * (canvas.width + canvas_width / 4 - size) + spawnX;
      y = -canvas_height / 4 + canvas_height + spawnY;
      break;
    case 3: // 왼쪽
      x = -canvas_width / 4 - size + spawnX;
      y = Math.random() * (canvas.height + canvas_height / 4 - size) + spawnY;
      break;
  }
  if (score < 10) enemies[0].push({ x, y, width: 56, height: 52, hp: 10 });
  if (score >= 10 && score < 20) {
    enemies[0] = [];
    enemies[1].push({ x, y, width: 75, height: 60, hp: 20 });
  }
  if (boss2spawn_status && killBoss1 && !gameover) {
    enemies[1].push({
      x: enemies[5][0].x + enemies[5][0].width / 2 - 200,
      y: enemies[5][0].y + enemies[5][0].height / 2 - 150,
      width: 75,
      height: 60,
      hp: 20,
    });
    enemies[1].push({
      x: enemies[5][0].x + enemies[5][0].width / 2 + 200,
      y: enemies[5][0].y + enemies[5][0].height / 2 - 150,
      width: 75,
      height: 60,
      hp: 20,
    });
    enemies[1].push({
      x: enemies[5][0].x + enemies[5][0].width / 2 - 200,
      y: enemies[5][0].y + enemies[5][0].height / 2 + 150,
      width: 75,
      height: 60,
      hp: 20,
    });
    enemies[1].push({
      x: enemies[5][0].x + enemies[5][0].width / 2 + 200,
      y: enemies[5][0].y + enemies[5][0].height / 2 + 150,
      width: 75,
      height: 60,
      hp: 20,
    });
  }
  if (score >= 20 && score < 31 && !killBoss1) {
    enemies[1] = [];
    enemy2AttackArray = [];
    attackInformation = [];
    enemies[2].push({ x, y, width: 35, height: 70, hp: 5 });
  }
}

let boss1spawn_status = false;
let boss2spawn_status = false;
let killBoss1 = false;

function spawnBoss() {
  const width = 100;
  const height = 80;
  let x = 1000;
  let y = 260;
  if (score >= 30 && !boss1spawn_status) {
    if (!whatWeapon)
      enemies[4].push({ x, y, width: 200, height: 200, hp: 5000 });
    if (whatWeapon) enemies[4].push({ x, y, width: 200, height: 200, hp: 500 });
    boss1spawn_status = true;
  } else if (killBoss1 && !boss2spawn_status) {
    enemies[2] = [];
    enemies[4] = [];
    if (!whatWeapon)
      enemies[5].push({ x, y, width: 400, height: 300, hp: 7000 });
    if (whatWeapon) enemies[5].push({ x, y, width: 400, height: 300, hp: 700 });
    boss2spawn_status = true;
  }
}
let enemyHpInformation = [];
function drawEnemy() {
  if (score < 10) {
    for (const enemy of enemies[0]) {
      if (player.x - 1 >= enemy.x)
        ctx.drawImage(enemy_Rimg, enemy.x, enemy.y, enemy.width, enemy.height);
      else if (player.x - 1 < enemy.x)
        ctx.drawImage(enemyimg, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }
  if (score >= 10 && score < 20) {
    for (const enemy of enemies[1]) {
      if (player.x - 1 >= enemy.x)
        ctx.drawImage(enemy2_Rimg, enemy.x, enemy.y, enemy.width, enemy.height);
      else if (player.x - 1 < enemy.x)
        ctx.drawImage(enemy2img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }
  if (score >= 20 && score < 30) {
    for (const enemy of enemies[2]) {
      if (player.x - 1 >= enemy.x)
        ctx.drawImage(enemy3_Rimg, enemy.x, enemy.y, enemy.width, enemy.height);
      else if (player.x - 1 < enemy.x)
        ctx.drawImage(enemy3img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }
  if (boss1spawn_status) {
    for (const enemy of enemies[4]) {
      if (player.x - 1 >= enemy.x)
        ctx.drawImage(boss1_Rimg, enemy.x, enemy.y, enemy.width, enemy.height);
      if (player.x - 1 < enemy.x)
        ctx.drawImage(boss1img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
    for (const enemy of enemies[2]) {
      if (player.x - 1 >= enemy.x)
        ctx.drawImage(enemy3_Rimg, enemy.x, enemy.y, enemy.width, enemy.height);
      else if (player.x - 1 < enemy.x)
        ctx.drawImage(enemy3img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }
  if (boss2spawn_status) {
    for (const enemy of enemies[5]) {
      if (player.x - 1 >= enemy.x)
        ctx.drawImage(boss2_Rimg, enemy.x, enemy.y, enemy.width, enemy.height);
      if (player.x - 1 < enemy.x)
        ctx.drawImage(boss2img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
    for (const enemy of enemies[0]) {
      if (player.x - 1 >= enemy.x)
        ctx.drawImage(enemy_Rimg, enemy.x, enemy.y, enemy.width, enemy.height);
      else if (player.x - 1 < enemy.x)
        ctx.drawImage(enemyimg, enemy.x, enemy.y, enemy.width, enemy.height);
    }
    for (const enemy of enemies[1]) {
      if (player.x - 1 >= enemy.x)
        ctx.drawImage(enemy2_Rimg, enemy.x, enemy.y, enemy.width, enemy.height);
      else if (player.x - 1 < enemy.x)
        ctx.drawImage(enemy2img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }
}

function moveEnemies() {
  if (score < 10) {
    for (const enemy of enemies[0]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemySpeed;
        const vy = (dy / distance) * enemySpeed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
  if (score >= 10 && score < 20) {
    for (const enemy of enemies[1]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemy2Speed;
        const vy = (dy / distance) * enemy2Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
  if (score >= 20 && score < 30) {
    for (const enemy of enemies[2]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemy3Speed;
        const vy = (dy / distance) * enemy3Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
  if (boss1spawn_status) {
    if (!rushAttack) {
      for (const enemy of enemies[4]) {
        // 플레이어 위치와 적 위치 사이의 차이 계산
        const dx = player.x - enemy.x;
        const dy = player.y - (enemy.y + enemy.height / 2);

        // 차이를 이용하여 거리 계산
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
        if (distance > 0) {
          const vx = (dx / distance) * boss1Speed;
          const vy = (dy / distance) * boss1Speed;

          // 적 위치 업데이트
          enemy.x += vx;
          enemy.y += vy;
        }
      }
    }
    for (const enemy of enemies[2]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemy3Speed;
        const vy = (dy / distance) * enemy3Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
  if (boss2spawn_status) {
    for (const enemy of enemies[5]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * boss2Speed;
        const vy = (dy / distance) * boss2Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
    for (const enemy of enemies[0]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemySpeed;
        const vy = (dy / distance) * enemySpeed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
    for (const enemy of enemies[1]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemy2Speed;
        const vy = (dy / distance) * enemy2Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
}

let enemy2AttackArray = [];
let attackInformation = [];
let dx, dy, vx, vy, distance;

function enemy2Attack() {
  if (timer % 120 == 0) {
    for (const enemy of enemies[1]) {
      enemy2AttackArray.push({ x: enemy.x, y: enemy.y, width: 30, height: 30 });
      dx = player.x - enemy.x;
      dy = player.y - (enemy.y + 10);
      distance = Math.sqrt(dx * dx + dy * dy);
      attackInformation.push({ x: dx, y: dy, dt: distance });
    }
  }
  for (let i = 0; i <= attackInformation.length - 1; i++) {
    const enemy2atk = enemy2AttackArray[i];
    ctx.drawImage(
      enemy2Attackimg,
      enemy2atk.x,
      enemy2atk.y,
      enemy2atk.width,
      enemy2atk.height
    );
    vx = (attackInformation[i].x / attackInformation[i].dt) * 3;
    vy = (attackInformation[i].y / attackInformation[i].dt) * 3;
    enemy2atk.x += vx;
    enemy2atk.y += vy;

    if (
      !(
        0 < enemy2atk.x + enemy2atk.width &&
        canvas_width > enemy2atk.x &&
        0 < enemy2atk.y + enemy2atk.height &&
        canvas_height > enemy2atk.y
      )
    ) {
      enemy2AttackArray.splice(i, 1);
      attackInformation.splice(i, 1);
    }
  }
}

let boss1Attack2Information = [];
let rushAttack = false;
function boss1Attack2() {
  if (enemies[4].length > 0 && rushAttack) {
    let dx, dy, vx, vy, distance;
    dx = player.x - enemies[4][0].x;
    dy = player.y - (enemies[4][0].y + 10);
    distance = Math.sqrt(dx * dx + dy * dy);
    boss1Attack2Information.push({ x: dx, y: dy, dt: distance });
    vx = (boss1Attack2Information[0].x / boss1Attack2Information[0].dt) * 8;
    vy = (boss1Attack2Information[0].y / boss1Attack2Information[0].dt) * 8;
    if (distance <= boss1Attack2Information[0].dt) {
      enemies[4][0].x += vx;
      enemies[4][0].y += vy;
    } else {
      rushAttack = false;
      boss1Attack2Information = [];
    }
  }
}

let boss2Attack1Array = [];
let fireballAttack = true;
function boss2Attack1() {
  let x = Math.random() * 900 + 100;
  let y = -118;
  if (timer % 30 == 0) {
    boss2Attack1Array.push({ x: x, y: y, width: 70, height: 60 });
  }
  for (const fireball of boss2Attack1Array) {
    ctx.drawImage(
      boss2Atttack1img,
      fireball.x,
      fireball.y,
      fireball.width,
      fireball.height
    );
    fireball.x -= 7;
    fireball.y += 7;
  }
}

let swordAngle = (Math.PI / 180) * -70;
let swordAngle2 = 5;
const swordAngleSpeed = (Math.PI / 180) * 10;
const swordAngleSpeed2 = (Math.PI / 180) * 20;
let roundTrip = false;
let swordAngleInitialized = false;
let directionChanged = true;

function weaponisSword() {
  if (!keysPressed['x'] || (keysPressed['z'] && keysPressed['x'])) {
    ctx.drawImage(Chrisimg, player.x, player.y, player.width, player.height);
    ctx.drawImage(
      drawnPlayer,
      player.x - (canvas.width / 2 - 25),
      player.y - (canvas.height / 2 - 25)
    );
    if (direction == 1 && !keysPressed['z'])
      ctx.drawImage(
        swordimg,
        sword.x - 10,
        sword.y - 60,
        sword.height,
        sword.width
      );
    else if (direction == 2 && !keysPressed['z'])
      ctx.drawImage(
        swordimg,
        sword.x - 48,
        sword.y + 27,
        sword.height,
        sword.width
      );
    else if (direction == 3 && !keysPressed['z'])
      ctx.drawImage(
        swordimg,
        sword.x - 107,
        sword.y + 8,
        sword.width,
        sword.height
      );
    else if (direction == 4 && !keysPressed['z'])
      ctx.drawImage(swordimg, sword.x, sword.y + 8, sword.width, sword.height);
  }
  if (keysPressed['z'] && keysPressed['x']) doubleAttack = true;
  else doubleAttack = false;
}

function swordAttack() {
  if (direction == 1 && keysPressed['z']) {
    if (swordAngle < (Math.PI / 180) * 340 && !roundTrip)
      swordAngle += swordAngleSpeed;
    else if (swordAngle > (Math.PI / 180) * 200 && roundTrip)
      swordAngle -= swordAngleSpeed;
    if (swordAngle >= (Math.PI / 180) * 340) roundTrip = true;
    else if (swordAngle <= (Math.PI / 180) * 200) roundTrip = false;

    ctx.save();
    ctx.translate(sword.x, sword.y - 5 + sword.height / 2);
    ctx.rotate(swordAngle - (Math.PI / 180) * 270);
    ctx.drawImage(
      swordimg,
      -sword.height / 2,
      -sword.width,
      sword.height,
      sword.width
    );
    ctx.restore();
  }

  if (direction == 2 && keysPressed['z']) {
    if (swordAngle < (Math.PI / 180) * 160 && !roundTrip)
      swordAngle += swordAngleSpeed;
    else if (swordAngle > (Math.PI / 180) * 20 && roundTrip)
      swordAngle -= swordAngleSpeed;
    if (swordAngle >= (Math.PI / 180) * 160) roundTrip = true;
    else if (swordAngle <= (Math.PI / 180) * 20) roundTrip = false;

    ctx.save();
    ctx.translate(sword.x - 38, sword.y + 11 + sword.height / 2);
    ctx.rotate(swordAngle - (Math.PI / 180) * 90);
    ctx.drawImage(swordimg, -sword.height / 2, 0, sword.height, sword.width);
    ctx.restore();
  }

  if (direction == 3 && keysPressed['z']) {
    if (swordAngle < (Math.PI / 180) * 250 && !roundTrip)
      swordAngle += swordAngleSpeed;
    else if (swordAngle > (Math.PI / 180) * 110 && roundTrip)
      swordAngle -= swordAngleSpeed;
    if (swordAngle >= (Math.PI / 180) * 250) roundTrip = true;
    else if (swordAngle <= (Math.PI / 180) * 110) roundTrip = false;

    ctx.save();
    ctx.translate(sword.x - 35, sword.y + 3 + sword.height / 2);
    ctx.rotate(swordAngle - (Math.PI / 180) * 180);
    ctx.drawImage(
      swordimg,
      -sword.width,
      -sword.height / 2,
      sword.width,
      sword.height
    );
    ctx.restore();
  }

  if (direction == 4 && keysPressed['z']) {
    if (swordAngle < (Math.PI / 180) * 70 && !roundTrip) {
      swordAngle += swordAngleSpeed;
    } else if (swordAngle > (Math.PI / 180) * -70 && roundTrip) {
      swordAngle -= swordAngleSpeed;
    }
    if (swordAngle >= (Math.PI / 180) * 70) roundTrip = true;
    else if (swordAngle <= (Math.PI / 180) * -70) roundTrip = false;

    ctx.save();
    ctx.translate(sword.x, sword.y + 3 + sword.height / 2);
    ctx.rotate(swordAngle);
    ctx.drawImage(swordimg, 0, -sword.height / 2, sword.width, sword.height);
    ctx.restore();
  }
}

function swordAttack2() {
  if (keysPressed['x'] && !keysPressed['z']) {
    direction = 4;
    if (swordAngle2) swordAngle2 += swordAngleSpeed2;
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    ctx.rotate(swordAngle2);
    ctx.drawImage(
      swordimg,
      -player.width / 2 + 40,
      -player.height / 2 + 20,
      sword.width,
      sword.height
    );
    ctx.drawImage(
      Chrisimg,
      -player.width / 2,
      -player.height / 2,
      player.width,
      player.height
    );
    ctx.drawImage(
      drawnPlayer,
      -475 - player.width / 2,
      -275 - player.height / 2
    );
    ctx.restore();
  }
}

let swordSkillArray = [];

function swordSkill() {
  const swordSkillSpeed = 12;
  let swordDirection = { x: 0, y: 0 };

  switch (direction) {
    case 1: // 위쪽
      swordDirection.y = -swordSkillSpeed;
      break;
    case 2: // 아래쪽
      swordDirection.y = swordSkillSpeed;
      break;
    case 3: // 왼쪽
      swordDirection.x = -swordSkillSpeed;
      break;
    case 4: // 오른쪽
      swordDirection.x = swordSkillSpeed;
      break;
  }

  if (keysPressed['z'] && timer % 20 == 0) {
    swordSkillArray.push({
      x: player.x,
      y: player.y,
      width: 0,
      height: 0,
      dx: swordDirection.x,
      dy: swordDirection.y,
      direction: direction,
    });
  }
  if (keysPressed['x'] && timer % 10 == 0 && !doubleAttack) {
    swordSkillArray.push({
      x: player.x - 12,
      y: player.y,
      width: 0,
      height: 0,
      dx: 0,
      dy: -12,
      direction: 1,
    });
    swordSkillArray.push({
      x: player.x + 12,
      y: player.y,
      width: 0,
      height: 0,
      dx: 0,
      dy: 12,
      direction: 2,
    });
    swordSkillArray.push({
      x: player.x,
      y: player.y,
      width: 0,
      height: 0,
      dx: -12,
      dy: 0,
      direction: 3,
    });
    swordSkillArray.push({
      x: player.x,
      y: player.y,
      width: 0,
      height: 0,
      dx: 12,
      dy: 0,
      direction: 4,
    });
  }
}

function moveswordSkill() {
  for (let i = 0; i < swordSkillArray.length; i++) {
    const swordskill = swordSkillArray[i];
    swordskill.x += swordskill.dx;
    swordskill.y += swordskill.dy;

    // 총알의 방향에 맞는 이미지를 선택하여 그립니다.
    switch (swordskill.direction) {
      case 1: // 위
        swordskill.width = 80;
        swordskill.height = 50;
        ctx.drawImage(
          swordSkillupimg,
          swordskill.x,
          swordskill.y - 50,
          swordskill.width,
          swordskill.height
        );
        if (Math.abs(swordskill.y - player.y) >= 160) {
          swordSkillArray.splice(i, 1);
        }
        break;
      case 2: // 아래
        swordskill.width = 80;
        swordskill.height = 50;
        ctx.drawImage(
          swordSkilldownimg,
          swordskill.x - 30,
          swordskill.y + 50,
          swordskill.width,
          swordskill.height
        );
        if (Math.abs(swordskill.y - player.y) >= 160) {
          swordSkillArray.splice(i, 1);
        }
        break;
      case 3: // 왼쪽
        swordskill.width = 50;
        swordskill.height = 80;
        ctx.drawImage(
          swordSkillleftimg,
          swordskill.x - 50,
          swordskill.y - 10,
          swordskill.width,
          swordskill.height
        );
        if (Math.abs(swordskill.x - player.x) >= 160) {
          swordSkillArray.splice(i, 1);
        }
        break;
      case 4: // 오른쪽
        swordskill.width = 50;
        swordskill.height = 80;
        ctx.drawImage(
          swordSkillrightimg,
          swordskill.x + 50,
          swordskill.y - 10,
          swordskill.width,
          swordskill.height
        );
        if (Math.abs(swordskill.x - player.x) >= 160) {
          swordSkillArray.splice(i, 1);
        }
        break;
    }
  }
}

function weaponisGun() {
  ctx.drawImage(Jakeimg, player.x, player.y, player.width, player.height);
  ctx.drawImage(
    drawnPlayer,
    player.x - (canvas.width / 2 - 25),
    player.y - (canvas.height / 2 - 25)
  );
  if (score < 20) {
    if (direction == 1) ctx.drawImage(gunimg, player.x + 32, player.y - 1);
    else if (direction == 2)
      ctx.drawImage(gunimg, player.x - 10, player.y + 40);
    else if (direction == 3) ctx.drawImage(gunimg, sword.x - 59, sword.y + 5);
    else if (direction == 4) ctx.drawImage(gunimg, sword.x - 2, sword.y + 5);
  } else if (score >= 20 && score < 30) {
    if (direction == 1) ctx.drawImage(gunimg, player.x + 33, player.y - 15);
    else if (direction == 2) ctx.drawImage(gunimg, player.x - 7, player.y - 30);
    else if (direction == 3) ctx.drawImage(gunimg, sword.x - 85, sword.y + 5);
    else if (direction == 4) ctx.drawImage(gunimg, sword.x - 60, sword.y + 5);
  } else if (score >= 30) {
    if (direction == 1) ctx.drawImage(gunimg, player.x + 28, player.y - 3);
    else if (direction == 2)
      ctx.drawImage(gunimg, player.x - 10, player.y + 25);
    else if (direction == 3) ctx.drawImage(gunimg, sword.x - 65, sword.y + 5);
    else if (direction == 4) ctx.drawImage(gunimg, sword.x - 15, sword.y + 5);
  }

  if (keysPressed['z'] && keysPressed['x']) doubleAttack = true;
  else doubleAttack = false;
}

let bullets = [];

function shootBullet() {
  let bulletSpeed;
  if (score < 20) bulletSpeed = 8;
  if (score >= 20 && score < 30) bulletSpeed = 15;
  if (score >= 30) bulletSpeed = 25;
  let bulletDirection = { x: 0, y: 0 };

  if (keysPressed['z']) {
    switch (direction) {
      case 1: // 위쪽
        bulletDirection.y = -bulletSpeed;
        break;
      case 2: // 아래쪽
        bulletDirection.y = bulletSpeed;
        break;
      case 3: // 왼쪽
        bulletDirection.x = -bulletSpeed;
        break;
      case 4: // 오른쪽
        bulletDirection.x = bulletSpeed;
        break;
    }

    if (score < 20) {
      if (timer % 40 == 0) {
        bullets.push({
          x: player.x + player.width / 2,
          y: player.y + player.height / 2,
          width: 22,
          height: 22,
          dx: bulletDirection.x,
          dy: bulletDirection.y,
          direction: direction,
        });
      }
    }
    if (score >= 20 && score < 30) {
      if (timer % 30 == 0) {
        bullets.push({
          x: player.x + player.width / 2,
          y: player.y + player.height / 2,
          width: 110,
          height: 15,
          dx: bulletDirection.x,
          dy: bulletDirection.y,
          direction: direction,
        });
      }
    }
    if (score >= 30) {
      if (timer % 8 == 0) {
        bullets.push({
          x: player.x + player.width / 2,
          y: player.y + player.height / 2,
          width: 21,
          height: 7,
          dx: bulletDirection.x,
          dy: bulletDirection.y,
          direction: direction,
        });
      }
    }
  }
}

function moveBullets() {
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;

    // 총알의 방향에 맞는 이미지를 선택하여 그립니다.
    if (score < 20) {
      switch (bullet.direction) {
        case 1: // 위
          ctx.drawImage(
            bullet1img,
            bullet.x + 11,
            bullet.y - 20,
            bullet.height,
            bullet.width
          );
          break;
        case 2: // 아래
          ctx.drawImage(
            bullet2img,
            bullet.x - 31,
            bullet.y + 5,
            bullet.height,
            bullet.width
          );
          break;
        case 3: // 왼쪽
          ctx.drawImage(
            bullet3img,
            bullet.x - 32,
            bullet.y - 9,
            bullet.width,
            bullet.height
          );
          break;
        case 4: // 오른쪽
          ctx.drawImage(
            bullet4img,
            bullet.x + 9,
            bullet.y - 9,
            bullet.width,
            bullet.height
          );
          break;
      }
    } else if (score >= 20 && score < 30) {
      switch (bullet.direction) {
        case 1: // 위
          ctx.drawImage(
            bullet1img,
            bullet.x + 12,
            bullet.y - 28,
            bullet.height,
            bullet.width
          );
          break;
        case 2: // 아래
          ctx.drawImage(
            bullet2img,
            bullet.x - 28,
            bullet.y - 73,
            bullet.height,
            bullet.width
          );
          break;
        case 3: // 왼쪽
          ctx.drawImage(
            bullet3img,
            bullet.x - 51,
            bullet.y - 9,
            bullet.width,
            bullet.height
          );
          break;
        case 4: // 오른쪽
          ctx.drawImage(
            bullet4img,
            bullet.x - 56,
            bullet.y - 9,
            bullet.width,
            bullet.height
          );
          break;
      }
    } else if (score >= 30) {
      switch (bullet.direction) {
        case 1: // 위
          ctx.drawImage(
            bullet1img,
            bullet.x + 9,
            bullet.y - 25,
            bullet.height,
            bullet.width
          );
          break;
        case 2: // 아래
          ctx.drawImage(
            bullet2img,
            bullet.x - 17,
            bullet.y + 15,
            bullet.height,
            bullet.width
          );
          break;
        case 3: // 왼쪽
          ctx.drawImage(
            bullet3img,
            bullet.x - 41,
            bullet.y - 7,
            bullet.width,
            bullet.height
          );
          break;
        case 4: // 오른쪽
          ctx.drawImage(
            bullet4img,
            bullet.x + 20,
            bullet.y - 7,
            bullet.width,
            bullet.height
          );
          break;
      }
    }

    // 총알이 화면 밖으로 나가면 배열에서 제거합니다.
    if (
      bullet.x < 0 ||
      bullet.x > canvas_width ||
      bullet.y < 0 ||
      bullet.y > canvas_height
    ) {
      bullets.splice(i, 1);
      i--; // 인덱스를 조정합니다.
    }
  }
}

function checkBulletCollisions() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    for (let a = 0; a <= 5; a++) {
      for (let j = enemies[a].length - 1; j >= 0; j--) {
        const enemy = enemies[a][j];
        if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y
        ) {
          // 적 제거
          enemy.hp -= 10;
          // 총알 제거
          bullets.splice(i, 1);
          break;
        }
      }
    }
  }
}

let laserAttack = false;

function checkCollisions() {
  //1단계 몹의 근접 공격
  for (const enemy of enemies[0]) {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      ctx.drawImage(enemyAttackimg, player.x, player.y - 50, 50, 100);
      player.hp -= 0.25;
      hurt.play();
    }
  }
  //2단계 몸의 원거리 공격
  for (let i = 0; i <= enemy2AttackArray.length - 1; i++) {
    const enemy2atk = enemy2AttackArray[i];
    if (
      player.x < enemy2atk.x + enemy2atk.width &&
      player.x + player.width > enemy2atk.x &&
      player.y < enemy2atk.y + enemy2atk.height &&
      player.y + player.height > enemy2atk.y
    ) {
      player.hp -= 10;
      hurt.play();
      enemy2AttackArray.splice(i, 1);
      attackInformation.splice(i, 1);
    }
  }

  //3단계 몹의 공격
  for (let i = enemies[2].length - 1; i >= 0; i--) {
    const enemy = enemies[2][i];
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      enemies[2].splice(i, 1);
      ctx.drawImage(enemy3Boomimg, enemy.x - 24, enemy.y - 10, 100, 100);
      player.hp -= 20;
      hurt.play();
      mummyattack.play();
    }
  }

  if (keysPressed['w']) laserAttack = true;
  //보스1 레이저 공격
  if (enemies[4].length > 0 && laserAttack) {
    if (player.x - 1 >= enemies[4][0].x)
      ctx.drawImage(
        boss1Atttack1img,
        enemies[4][0].x + 120,
        enemies[4][0].y + 15,
        1000,
        50
      );
    else if (player.x - 1 < enemies[4][0].x)
      ctx.drawImage(
        boss1Atttack1img,
        enemies[4][0].x - 920,
        enemies[4][0].y + 15,
        1000,
        50
      );
    if (player.y <= enemies[4][0].y + 65 && enemies[4][0].y >= 100) {
      enemies[4][0].y -= 3;
      if (enemies[4][0].y < 110) laserAttack = false;
    }
    if (player.y > enemies[4][0].y + 65 && enemies[4][0].y <= 450) {
      enemies[4][0].y += 4;
      if (enemies[4][0].y > 440) laserAttack = false;
    }
    if (
      player.x - 1 < enemies[4][0].x &&
      player.x < enemies[4][0].x + 80 &&
      player.x + player.width > enemies[4][0].x - 920 &&
      player.y < enemies[4][0].y + 65 &&
      player.y + player.height > enemies[4][0].y + 15
    ) {
      player.hp -= 5;
      hurt.play();
    } else if (
      player.x - 1 >= enemies[4][0].x &&
      player.x < enemies[4][0].x + 1120 &&
      player.x + player.width > enemies[4][0].x + 120 &&
      player.y < enemies[4][0].y + 65 &&
      player.y + player.height > enemies[4][0].y + 15
    ) {
      player.hp -= 5;
      hurt.play();
    }
  }
  //보스1 돌진 공격 히트박스
  if (rushAttack && !killBoss1 && boss1spawn_status) {
    if (
      player.x < enemies[4][0].x + enemies[4][0].width &&
      player.x + player.width > enemies[4][0].x &&
      player.y < enemies[4][0].y + enemies[4][0].height &&
      player.y + player.height > enemies[4][0].y
    )
      player.hp -= 10;
    hurt.play();
  }
  //보스2 불덩이 공격 히트박스
  if (boss2spawn_status) {
    for (let i = 0; i <= boss2Attack1Array.length - 1; i++) {
      const fireball = boss2Attack1Array[i];
      if (
        player.x < fireball.x + fireball.width &&
        player.x + player.width > fireball.x &&
        player.y < fireball.y + fireball.height &&
        player.y + player.height > fireball.y
      ) {
        player.hp -= 10;
        hurt.play();
        boss2Attack1Array.splice(i, 1);
      }
    }
  }

  for (let a = 0; a <= 5; a++) {
    // 칼과 적의 충돌 검사
    for (let i = enemies[a].length - 1; i >= 0; i--) {
      const enemy = enemies[a][i];

      // 칼의 위치 계산
      const swordX = player.x + player.width / 2 + 75 * Math.cos(swordAngle);
      const swordY = player.y + player.height / 2 + 75 * Math.sin(swordAngle);

      //칼 히트박스
      if (
        !whatWeapon &&
        ((keysPressed['x'] &&
          ((player.x + player.width / 2 + 80 * Math.cos(swordAngle2) >
            enemy.x &&
            player.x + player.width / 2 + 80 * Math.cos(swordAngle2) <
              enemy.x + enemy.width &&
            player.y + player.height / 2 + 80 * Math.sin(swordAngle2) >
              enemy.y &&
            player.y + player.height / 2 + 80 * Math.sin(swordAngle2) <
              enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 70 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 70 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 70 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 70 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 60 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 60 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 60 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 60 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 50 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 50 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 50 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 50 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 40 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 40 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 40 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 40 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 30 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 30 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 30 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 30 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 20 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 20 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 20 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 20 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 10 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 10 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 10 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 10 * Math.sin(swordAngle2) <
                enemy.y + enemy.height))) ||
          (keysPressed['z'] &&
            ((player.x + player.width / 2 + 80 * Math.cos(swordAngle) >
              enemy.x &&
              player.x + player.width / 2 + 80 * Math.cos(swordAngle) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 80 * Math.sin(swordAngle) >
                enemy.y &&
              player.y + player.height / 2 + 80 * Math.sin(swordAngle) <
                enemy.y + enemy.height) ||
              (player.x + player.width / 2 + 70 * Math.cos(swordAngle) >
                enemy.x &&
                player.x + player.width / 2 + 70 * Math.cos(swordAngle) <
                  enemy.x + enemy.width &&
                player.y + player.height / 2 + 70 * Math.sin(swordAngle) >
                  enemy.y &&
                player.y + player.height / 2 + 70 * Math.sin(swordAngle) <
                  enemy.y + enemy.height) ||
              (player.x + player.width / 2 + 60 * Math.cos(swordAngle) >
                enemy.x &&
                player.x + player.width / 2 + 60 * Math.cos(swordAngle) <
                  enemy.x + enemy.width &&
                player.y + player.height / 2 + 60 * Math.sin(swordAngle) >
                  enemy.y &&
                player.y + player.height / 2 + 60 * Math.sin(swordAngle) <
                  enemy.y + enemy.height) ||
              (player.x + player.width / 2 + 50 * Math.cos(swordAngle) >
                enemy.x &&
                player.x + player.width / 2 + 50 * Math.cos(swordAngle) <
                  enemy.x + enemy.width &&
                player.y + player.height / 2 + 50 * Math.sin(swordAngle) >
                  enemy.y &&
                player.y + player.height / 2 + 50 * Math.sin(swordAngle) <
                  enemy.y + enemy.height) ||
              (player.x + player.width / 2 + 40 * Math.cos(swordAngle) >
                enemy.x &&
                player.x + player.width / 2 + 40 * Math.cos(swordAngle) <
                  enemy.x + enemy.width &&
                player.y + player.height / 2 + 40 * Math.sin(swordAngle) >
                  enemy.y &&
                player.y + player.height / 2 + 40 * Math.sin(swordAngle) <
                  enemy.y + enemy.height) ||
              (player.x + player.width / 2 + 30 * Math.cos(swordAngle) >
                enemy.x &&
                player.x + player.width / 2 + 30 * Math.cos(swordAngle) <
                  enemy.x + enemy.width &&
                player.y + player.height / 2 + 30 * Math.sin(swordAngle) >
                  enemy.y &&
                player.y + player.height / 2 + 30 * Math.sin(swordAngle) <
                  enemy.y + enemy.height) ||
              (player.x + player.width / 2 + 20 * Math.cos(swordAngle) >
                enemy.x &&
                player.x + player.width / 2 + 20 * Math.cos(swordAngle) <
                  enemy.x + enemy.width &&
                player.y + player.height / 2 + 20 * Math.sin(swordAngle) >
                  enemy.y &&
                player.y + player.height / 2 + 20 * Math.sin(swordAngle) <
                  enemy.y + enemy.height) ||
              (player.x + player.width / 2 + 10 * Math.cos(swordAngle) >
                enemy.x &&
                player.x + player.width / 2 + 10 * Math.cos(swordAngle) <
                  enemy.x + enemy.width &&
                player.y + player.height / 2 + 10 * Math.sin(swordAngle) >
                  enemy.y &&
                player.y + player.height / 2 + 10 * Math.sin(swordAngle) <
                  enemy.y + enemy.height))))
      ) {
        enemy.hp -= sword.damage;
      }
      for (let i = swordSkillArray.length - 1; i >= 0; i--) {
        const swordskill = swordSkillArray[i];
        for (let a = 0; a <= 5; a++) {
          for (let j = enemies[a].length - 1; j >= 0; j--) {
            const enemy = enemies[a][j];
            if (
              swordskill.x < enemy.x + enemy.width &&
              swordskill.x + swordskill.width > enemy.x &&
              swordskill.y < enemy.y + enemy.height &&
              swordskill.y + swordskill.height > enemy.y
            ) {
              // 적 제거
              enemy.hp -= sword.damage;
              break;
            }
          }
        }
      }
      if (enemy.hp <= 0) {
        enemies[a].splice(i, 1); // 충돌 시 적 제거
        scorpiondie.play();
        if (score < 30) score++;
      }
      if (enemies[4].length < 1 && boss1spawn_status) killBoss1 = true;
      if (enemies[5].length < 1 && boss2spawn_status) {
        enemies = [[], [], [], [], [], []];
        gameMusic.pause();
        gameover = true;
      }
    }
  }
}

let timer = 0;
let drawnPlayer;

function gameLoop() {
  requestAnimationFrame(gameLoop);

  function createImageFromDrawingData(drawingData) {
    // Canvas 크기 설정
    canvas.width = 1000; // 원하는 가로 크기
    canvas.height = 600; // 원하는 세로 크기

    // 각 선에 대한 그리기
    drawingData.lines.forEach((line) => {
      const { points, color, thickness } = line;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.stroke();
    });

    // Canvas를 이미지로 변환
    const image = new Image();
    image.src = canvas.toDataURL('image/png');

    return image;
  }

  drawnPlayer = createImageFromDrawingData(drawingData);

  if (!gameRunning) {
    gameMusic.pause(); // 게임 오버 시 음악 중지
    gameMusic.currentTime = 0; // 음악을 처음부터 다시 시작
    ctx.drawImage(gameoverimg, 0, 0, 1000, 600);
    if (keysPressed['r'] && gameRunning == false) {
      restartGame();
    }
  }

  if (player.hp <= 0) {
    gameRunning = false;
    return;
  }

  if (gameRunning) {
    timer++;
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    ctx.drawImage(backgroundimg, bgX, bgY);
    if (boss2spawn_status && timer % 240 == 0) spawnEnemy();
    else if (!boss2spawn_status && timer % 60 == 0) spawnEnemy();
    enemy2Attack();
    boss1Attack2();
    if (killBoss1 && !gameover) boss2Attack1();
    spawnBoss();
    if (timer % 480 == 0) rushAttack = true;
    else if (timer % 480 == 240) laserAttack = true;
    drawEnemy();
    moveEnemies();
    ctx.fillStyle = 'red';
    ctx.fillRect(20, 20, player.hp * 2, 30);
    checkCollisions();
    if (!whatWeapon) {
      weaponisSword();
      swordAttack();
      swordAttack2();
      if (score >= 30) {
        swordSkill();
        moveswordSkill();
      }
    } else if (whatWeapon) {
      weaponisGun();
      shootBullet();
      moveBullets();
      checkBulletCollisions();
    }
    movePlayer();
    sword.x = player.x + 40;
    sword.y = player.y + 13;
  }
}

function restartGame() {
  score = 0;
  timer = 0;
  player.x = canvas.width / 2 - player.width / 2 - 4;
  player.y = canvas.height / 2 - player.height / 2;
  player.hp = 100;
  direction = 4;
  bgX = -canvas.width / 2;
  bgY = -canvas.height / 2;
  mvplayerX = canvas_width / 2 - player.width / 2;
  mvplayerY = canvas_height / 2 - player.height / 2;
  enemies = [[], [], [], [], [], []];
  enemy2AttackArray = [];
  attackInformation = [];
  swordSkillArray = [];
  bullets = [];
  killBoss1 = false;
  boss1spawn_status = false;
  boss2spawn_status = false;
  laserAttack = false;
  rushAttack = false;
  gameRunning = true;
  gameMusic.play();
}

let keysPressed = {};

function handleKeyDown(event) {
  keysPressed[event.key] = true;
}

function handleKeyUp(event) {
  keysPressed[event.key] = false;
}

// Add event listeners for keydown and keyup
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Event listeners
canvas.addEventListener('click', movePlayer);

const costomizingBackgroundimg = new Image();
const selectWeaponimg = new Image();
selectWeaponimg.src = 'images/selectWeapon.png';

let whatWeapon;
let onceEnter = false;
let selectWeaponId;
let select = false;

function selectWeapon() {
  selectWeaponId = requestAnimationFrame(selectWeapon);
  if (!whatWeapon)
    costomizingBackgroundimg.src = 'images/customizingBackground.png';
  else if (whatWeapon)
    costomizingBackgroundimg.src = 'images/customizingBackground2.png';
  ctx.drawImage(selectWeaponimg, 0, 0);
  if (keysPressed['ArrowLeft']) {
    selectWeaponimg.src = 'images/leftWeapon.png';
    select = true;
    whatWeapon = false;
  }
  if (keysPressed['ArrowRight']) {
    selectWeaponimg.src = 'images/rightWeapon.png';
    select = true;
    whatWeapon = true;
  }
  if (keysPressed['Enter'] && !onceEnter && select) {
    onceEnter = true;
    cancelAnimationFrame(selectWeaponId);
    ctx.drawImage(costomizingBackgroundimg, 0, 0);
  }
}
selectWeapon();

let drawingData = {
  lines: [],
};

let isDrawing = false;
let isGameLoopRunning = false; // 게임 루프 상태를 추적하는 플래그 추가

// 마우스 이벤트 처리
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

let once = false;

document.addEventListener('keydown', (event) => {
  if (event.key == 'q' && !once && onceEnter) {
    gameLoop();
    gameMusic.play();
    toggleGameLoop();
    once = true;
  }
});

function toggleGameLoop() {
  isGameLoopRunning = true;

  if (isGameLoopRunning || !onceEnter) {
    // 게임 루프가 시작되면 그리기를 중지합니다.
    isDrawing = false;
  }
}

function startDrawing(e) {
  if (isGameLoopRunning || !onceEnter) return; // 게임 루프가 실행 중이면 그리기를 허용하지 않습니다.
  isDrawing = true;
  const { offsetX, offsetY } = e;
  drawingData.lines.push({
    points: [{ x: offsetX, y: offsetY }],
    color: 'black',
    thickness: 2,
  });
}

function draw(e) {
  if (!isDrawing || isGameLoopRunning || !onceEnter) return; // 게임 루프가 실행 중이면 그리기를 허용하지 않습니다.
  const { offsetX, offsetY } = e;
  const currentLine = drawingData.lines[drawingData.lines.length - 1];
  currentLine.points.push({ x: offsetX, y: offsetY });

  // 그림을 실시간으로 표시
  drawLine(currentLine);
}

function stopDrawing() {
  isDrawing = false;
}

function drawLine(line) {
  const { points, color, thickness } = line;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.stroke();
}
