const character = document.getElementById('character');
const game = document.getElementById('game');
let interval;
let both = 0;
let counter = 0;
const currentBlocks = [];

const moveLeft = () => {
  // ボールの位置取得、
  let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
  if(left > 0) {
    character.style.left = left - 2 + 'px';
  }
}
const moveRight = () => {
  let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  // 画面幅超えないように調整
  if (left < 375) {
    character.style.left = left + 2 + "px";
  }
}

// キーボード検知処理,処理間隔の時間
document.addEventListener('keydown', event => {
  if(both == 0) {
    both++;
    if(event.key == 'ArrowLeft') {
      interval = setInterval(moveLeft, 1);
    }
    if(event.key == 'ArrowRight') {
      interval = setInterval(moveRight, 1);
    }
  }
});

// 処理の停止
document.addEventListener('keyup', () => {
  clearInterval(interval);
  both=0;
});


const blocks = setInterval(() => {
  const blockLast = document.getElementById('block' + (counter-1));
  const holeLast = document.getElementById('hole' + (counter-1));
  if(counter > 0) {
    // 関数内スコープvar宣言
    var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue('top'));
    var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue('top'));
  }
  if(blockLastTop < 400 || counter == 0) {
    const block = document.createElement('div');
    const hole = document.createElement('div');
    block.setAttribute('class', 'block');
    hole.setAttribute('class', 'hole');
    // ブッロク毎にユニークなid生成
    block.setAttribute('id', 'block' + counter);
    hole.setAttribute('id', 'hole' + counter);
    block.style.top = blockLastTop + 60 + 'px';
    hole.style.top = holeLastTop + 60 + 'px';
    // (ゲーム画面幅400px)-(hole幅40px-)
    const random = Math.floor(Math.random() * 360);
    hole.style.left = random + 'px';
    game.appendChild(block);
    game.appendChild(hole);

    currentBlocks.push(counter);
    counter++;
  }
  const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
  const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
  let drop = 0;
  if(characterTop <= 0 ) {
    alert('ゲームオーバー. スコア: ' + (counter - 14));
    clearInterval(blocks);
    location.reload();
  }

// ブロック数分、位置の調整
  for(var i = 0; i < currentBlocks.length; i++) {
    let current = currentBlocks[i];
    let iblock = document.getElementById('block' + current);
    let ihole = document.getElementById('hole' + current);
    let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'));
    let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue('left'));
    iblock.style.top = iblockTop - 0.5 + 'px';
    ihole.style.top = iblockTop - 0.5 + 'px';
    
    //ブロックの削除 
    if (iblockTop < -20) {
      currentBlocks.shift();
      iblock.remove();
      ihole.remove();
    }

    if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
      drop++;
      // ボールがホール上に位置してる場合
      if (iholeLeft < characterLeft && iholeLeft + 20 > characterLeft) {
        drop = 0;
      }
    }
  }
  if (drop == 0) {
    if(characterTop < 480) {
      character.style.top = characterTop + 2 + 'px';
    }
  } else {
    character.style.top = characterTop - 0.5 + 'px';
  }
})