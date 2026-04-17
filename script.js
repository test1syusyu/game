document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     공통 유틸
  ========================= */
  const sections = document.querySelectorAll("section");
  const devNav = document.getElementById("dev-nav");
  const devNavButtons = document.querySelectorAll(".dev-nav-btn");
  const section14NextBtn = document.getElementById("section14-next-btn");

  function showSection(sectionId) {
    sections.forEach((section) => {
      section.classList.remove("active");
      section.style.display = "none";
    });

    const target = document.getElementById(sectionId);
    if (!target) return;

    target.style.display = "block";
    target.classList.add("active");

    if (devNav) target.appendChild(devNav);
  }

  function activateCut(cuts, index) {
    cuts.forEach((cut) => cut.classList.remove("active"));
    if (cuts[index]) cuts[index].classList.add("active");
  }

  function restartShowClass(el) {
    if (!el) return;
    el.classList.remove("show");
    void el.offsetWidth;
    el.classList.add("show");
  }

  function showBadgeThen(sectionId, callback, delay = 2000) {
    const section = document.getElementById(sectionId);
    if (!section) {
      if (typeof callback === "function") callback();
      return;
    }

    const badge = section.querySelector(".chapter-badge");
    if (!badge) {
      if (typeof callback === "function") callback();
      return;
    }

    badge.classList.remove("show");
    void badge.offsetWidth;
    badge.classList.add("show");

    setTimeout(() => {
      if (typeof callback === "function") callback();
    }, delay);
  }

  function hideEl(el) {
    if (!el) return;
    el.style.display = "none";
  }

  function showEl(el, display = "block") {
    if (!el) return;
    el.style.display = display;
  }

  /* =========================
     section01 ~ section02
  ========================= */
  const startBtn = document.getElementById("start-btn");
  const continueBtn = document.getElementById("continue-btn");
  const storyBubble = document.getElementById("storyBubble");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      showSection("section02");

      if (storyBubble) {
        storyBubble.classList.remove("show");
        setTimeout(() => {
          storyBubble.classList.add("show");
        }, 500);
      }
    });
  }

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      showSection("section03");
      resetSection03();
    });
  }

  /* =========================
     section03
  ========================= */
  const section03Cuts = document.querySelectorAll("#section03 .section03-cut");
  const section03Buttons = document.querySelectorAll("#section03 .continue-btn");

  function resetSection03() {
    activateCut(section03Cuts, 0);
  }

  section03Buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index < section03Cuts.length - 1) {
        activateCut(section03Cuts, index + 1);
      } else {
        showSection("section04");
        resetSection04();
      }
    });
  });

  /* =========================
     section04
  ========================= */
  const section04Bubble = document.getElementById("section04Bubble");
  const showChoiceBtn = document.getElementById("show-choice-btn");
  const choiceWrap = document.getElementById("choiceWrap");
  const goBtn = document.getElementById("go-btn");
  const noGoBtn = document.getElementById("no-go-btn");

  function resetSection04() {
    showEl(section04Bubble);
    showEl(showChoiceBtn, "block");
    if (choiceWrap) choiceWrap.classList.remove("show");

    if (noGoBtn) {
      noGoBtn.style.left = "0px";
      noGoBtn.style.top = "74px";
    }
  }

  if (showChoiceBtn) {
    showChoiceBtn.addEventListener("click", () => {
      hideEl(section04Bubble);
      if (choiceWrap) choiceWrap.classList.add("show");
    });
  }

  if (goBtn) {
    goBtn.addEventListener("click", () => {
      showSection("section05");
      resetSection05();
    });
  }

  if (noGoBtn && choiceWrap) {
    function moveNoBtn() {
      const wrapRect = choiceWrap.getBoundingClientRect();
      const btnWidth = noGoBtn.offsetWidth;
      const maxX = Math.max(0, wrapRect.width - btnWidth);
      const minY = 74;
      const maxY = 90;

      noGoBtn.style.left = `${Math.random() * maxX}px`;
      noGoBtn.style.top = `${minY + Math.random() * (maxY - minY)}px`;
    }

    noGoBtn.addEventListener("mouseenter", moveNoBtn);
    noGoBtn.addEventListener("mousemove", moveNoBtn);
    noGoBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      moveNoBtn();
    });
  }

  /* =========================
     section05
  ========================= */
  const section05 = document.getElementById("section05");
const warningBubble = document.getElementById("warningBubble");
const warningNextBtn = document.getElementById("warning-next-btn");
const paperWrap = document.getElementById("paperWrap");
const paperLines = document.querySelectorAll("#paperText .paper-line");
const paperNextBtn = document.getElementById("paper-next-btn");

function resetSection05() {
  if (section05) {
    section05.classList.remove("paper-mode");
  }

  showEl(warningBubble);

  if (paperWrap) {
    paperWrap.classList.remove("show");
    paperWrap.style.display = "none";
  }

  if (paperNextBtn) {
    paperNextBtn.classList.remove("show");
  }

  paperLines.forEach((line) => line.classList.remove("show"));
}

if (warningNextBtn) {
  warningNextBtn.addEventListener("click", () => {
    hideEl(warningBubble);

    if (section05) {
      section05.classList.add("paper-mode");
    }

    if (paperWrap) {
      paperWrap.style.display = "block";
      paperWrap.classList.add("show");
    }

    paperLines.forEach((line) => line.classList.remove("show"));

    paperLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("show");
      }, 250 + index * 230);
    });

    if (paperNextBtn) {
      setTimeout(() => {
        paperNextBtn.classList.add("show");
      }, 250 + paperLines.length * 230 + 250);
    }
  });
}

if (paperNextBtn) {
  paperNextBtn.addEventListener("click", () => {
    showSection("section06");
    resetSection06();
  });
}
  /* =========================
     section06
  ========================= */
  const chapterStart = document.getElementById("chapter-start");
  const chapterBubble = document.getElementById("chapterBubble");
  const chapterContinueBtn = document.getElementById("chapter-continue-btn");

  function resetSection06() {
    hideEl(chapterStart);
    if (chapterBubble) chapterBubble.classList.remove("show");

    showBadgeThen("section06", () => {
      if (chapterBubble) chapterBubble.classList.add("show");
    });
  }

  if (chapterContinueBtn) {
    chapterContinueBtn.addEventListener("click", () => {
      showSection("section07");
      resetSection07();
    });
  }

  /* =========================
     section07
  ========================= */
  const section07Cuts = document.querySelectorAll("#section07 .section07-cut");
  const section07NextBtn = document.getElementById("section07-next-btn");
  const helpBtn = document.getElementById("help-btn");

  function resetSection07() {
    activateCut(section07Cuts, 0);
  }

  if (section07NextBtn) {
    section07NextBtn.addEventListener("click", () => {
      activateCut(section07Cuts, 1);
    });
  }

  if (helpBtn) {
    helpBtn.addEventListener("click", () => {
      showSection("section08");
      resetSection08();
    });
  }

  /* =========================
     section08
  ========================= */
  const section08Cuts = document.querySelectorAll("#section08 .section08-cut");
  const section08NextBtn = document.getElementById("section08-next-btn");
  const hamsterChoiceBtns = document.querySelectorAll(".hamster-choice-btn");
  const section08ResultNextBtns = document.querySelectorAll(".section08-result-next");

  function resetSection08() {
    activateCut(section08Cuts, 0);
  }

  if (section08NextBtn) {
    section08NextBtn.addEventListener("click", () => {
      activateCut(section08Cuts, 1);
    });
  }

  hamsterChoiceBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const choice = btn.dataset.choice;

      if (choice === "cute") activateCut(section08Cuts, 2);
      if (choice === "pretty") activateCut(section08Cuts, 3);
      if (choice === "kind") activateCut(section08Cuts, 4);
    });
  });

  section08ResultNextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      showSection("section09");
    });
  });

  /* =========================
     section09 ~ section10
  ========================= */
  const section09NextBtn = document.getElementById("section09-next-btn");
  const section10NextBtn = document.getElementById("section10-next-btn");

  if (section09NextBtn) {
    section09NextBtn.addEventListener("click", () => {
      showSection("section10");
    });
  }

  if (section10NextBtn) {
    section10NextBtn.addEventListener("click", () => {
      showSection("section11");
      resetSection11();
    });
  }

  /* =========================
     section11
  ========================= */
  const chapter2Start = document.getElementById("chapter2-start");
  const section11Cuts = document.querySelectorAll("#section11 .section11-cut");
  const chapter2NextBtns = document.querySelectorAll("#section11 .chapter2-next-btn");

  function resetSection11() {
    hideEl(chapter2Start);
    section11Cuts.forEach((cut) => cut.classList.remove("active"));

    showBadgeThen("section11", () => {
      activateCut(section11Cuts, 0);
    });
  }

  chapter2NextBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (index < section11Cuts.length - 1) {
        activateCut(section11Cuts, index + 1);
      } else {
        showSection("section12");
        resetSection12();
      }
    });
  });

  /* =========================
     section12
  ========================= */
  const section12Cuts = document.querySelectorAll("#section12 .section12-cut");
  const section12NextBtns = document.querySelectorAll("#section12 .section12-next-btn");
  const section12FinalBtn = document.getElementById("section12-final-btn");

  function resetSection12() {
    activateCut(section12Cuts, 0);
  }

  section12NextBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      activateCut(section12Cuts, index + 1);
    });
  });

  if (section12FinalBtn) {
    section12FinalBtn.addEventListener("click", () => {
      showSection("section13");
      resetSection13();
    });
  }

  /* =========================
     section13 - 틱택토
  ========================= */
  const section13Inner = document.querySelector("#section13 .section13-inner");
  const section13IntroBubble = document.getElementById("section13IntroBubble");
  const fightStartBtn = document.getElementById("fight-start-btn");
  const battleGameWrap = document.getElementById("battleGameWrap");
  const section13ResultBubble = document.getElementById("section13ResultBubble");
  const section13ResultText = document.getElementById("section13ResultText");
  const section13NextBtn = document.getElementById("section13-next-btn");

  let section13Blackout = document.getElementById("section13Blackout");

  if (!section13Blackout && section13Inner) {
    section13Blackout = document.createElement("div");
    section13Blackout.id = "section13Blackout";
    section13Blackout.className = "section13-blackout";
    section13Inner.insertBefore(section13ResultBubble, section13ResultBubble);
  }

  const HUMAN = "X";
  const AI = "O";

  let board = Array(9).fill(null);
  let currentPlayer = HUMAN;
  let gameOver = false;

  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function buildBattleUI() {
    if (!battleGameWrap) return;

    battleGameWrap.innerHTML = `
      <div class="battle-title-box">
        <h3 class="battle-title">독수리를 이겨라<br>TIC TAC TOE</h3>
        <p class="battle-desc">YOU ARE X / THE EAGLE IS O</p>
      </div>

      <div class="battle-status" id="battleStatus">당신의 차례입니다</div>

      <div class="battle-board-wrap">
        <div class="battle-board" id="battleBoard">
          <button class="battle-cell" data-index="0" type="button"></button>
          <button class="battle-cell" data-index="1" type="button"></button>
          <button class="battle-cell" data-index="2" type="button"></button>
          <button class="battle-cell" data-index="3" type="button"></button>
          <button class="battle-cell" data-index="4" type="button"></button>
          <button class="battle-cell" data-index="5" type="button"></button>
          <button class="battle-cell" data-index="6" type="button"></button>
          <button class="battle-cell" data-index="7" type="button"></button>
          <button class="battle-cell" data-index="8" type="button"></button>
        </div>
      </div>

      <div class="battle-btns">
        <button id="battle-reset-btn" class="battle-control-btn" type="button">다시 시작</button>
        <button id="battle-ai-first-btn" class="battle-control-btn" type="button">독수리 선공</button>
      </div>

      <div class="battle-legend">
        <strong>게임 설명</strong><br>
        당신은 X입니다.<br>
        한 번 두면 독수리가 자동으로 둡니다.<br>
        무승부 또는 승리 시 성공입니다.
      </div>
    `;
  }

  function getBattleEls() {
    return {
      status: document.getElementById("battleStatus"),
      cells: document.querySelectorAll(".battle-cell"),
      resetBtn: document.getElementById("battle-reset-btn"),
      aiFirstBtn: document.getElementById("battle-ai-first-btn")
    };
  }

  function resetBattleGame() {
    board = Array(9).fill(null);
    currentPlayer = HUMAN;
    gameOver = false;

    const { status, cells } = getBattleEls();

    cells.forEach((cell) => {
      cell.textContent = "";
      cell.disabled = false;
      cell.classList.remove("x", "o");
    });

    if (status) {
      status.textContent = "당신의 차례입니다";
    }
  }

  function disableBoard(disabled) {
    const { cells } = getBattleEls();

    cells.forEach((cell, index) => {
      if (board[index] === null) {
        cell.disabled = disabled;
      }
    });
  }

  function placeMark(index, player) {
    const { cells } = getBattleEls();

    board[index] = player;
    if (cells[index]) {
      cells[index].textContent = player;
      cells[index].classList.add(player.toLowerCase());
      cells[index].disabled = true;
    }
  }

  function findWinningMove(player) {
    for (const combination of winCombinations) {
      const values = combination.map((i) => board[i]);
      const playerCount = values.filter((v) => v === player).length;
      const emptyCount = values.filter((v) => v === null).length;

      if (playerCount === 2 && emptyCount === 1) {
        return combination[values.indexOf(null)];
      }
    }

    return null;
  }

  function getBestMove() {
    const emptyIndexes = board
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null);

    if (emptyIndexes.length === 0) return null;

    const winningMove = findWinningMove(AI);
    if (winningMove !== null) return winningMove;

    const blockingMove = findWinningMove(HUMAN);
    if (blockingMove !== null) return blockingMove;

    if (board[4] === null) return 4;

    const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  }

  function checkWinner(player) {
    return winCombinations.some((combination) =>
      combination.every((index) => board[index] === player)
    );
  }

  function showSection13Success(message) {
    if (!battleGameWrap || !section13ResultBubble || !section13ResultText) return;

    battleGameWrap.classList.add("fade-out");

    setTimeout(() => {
      battleGameWrap.classList.remove("show");
      if (section13Blackout) {
        section13Blackout.classList.add("show");
      }
    }, 500);

    setTimeout(() => {
      section13ResultText.innerHTML = message;
      section13ResultBubble.classList.add("show");
    }, 1050);
  }

  function handleGameEnd(player) {
    const { status } = getBattleEls();

    if (checkWinner(player)) {
      gameOver = true;
      disableBoard(true);

      if (player === HUMAN) {
        if (status) status.textContent = "YOU WIN!";
        showSection13Success("축하드립니다. <br> 다음 장소로 가세요.");
      } else {
        if (status) status.textContent = "독수리 WIN!";
      }
      return true;
    }

    if (!board.includes(null)) {
      gameOver = true;
      disableBoard(true);

      if (status) status.textContent = "DRAW GAME";
      showSection13Success("축하드립니다. <br> 다음 장소로 가세요.");
      return true;
    }

    return false;
  }

  function aiMove() {
    if (gameOver) return;

    const move = getBestMove();

    if (move !== null) {
      placeMark(move, AI);
    }

    if (handleGameEnd(AI)) return;

    currentPlayer = HUMAN;

    const { status } = getBattleEls();
    if (status) status.textContent = "당신의 차례입니다";

    disableBoard(false);
  }

  function makeMove(index) {
    if (gameOver || board[index] || currentPlayer !== HUMAN) return;

    placeMark(index, HUMAN);

    if (handleGameEnd(HUMAN)) return;

    currentPlayer = AI;

    const { status } = getBattleEls();
    if (status) status.textContent = "독수리가 생각 중...";

    disableBoard(true);

    setTimeout(() => {
      aiMove();
    }, 450);
  }

  function bindBattleEvents() {
    const { cells, resetBtn, aiFirstBtn } = getBattleEls();

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const index = Number(cell.dataset.index);
        makeMove(index);
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resetBattleGame();
        if (section13ResultBubble) section13ResultBubble.classList.remove("show");
        if (section13Blackout) section13Blackout.classList.remove("show");
        if (battleGameWrap) {
          battleGameWrap.classList.remove("fade-out");
          battleGameWrap.classList.add("show");
        }
      });
    }

    if (aiFirstBtn) {
      aiFirstBtn.addEventListener("click", () => {
        resetBattleGame();

        if (section13ResultBubble) section13ResultBubble.classList.remove("show");
        if (section13Blackout) section13Blackout.classList.remove("show");
        if (battleGameWrap) {
          battleGameWrap.classList.remove("fade-out");
          battleGameWrap.classList.add("show");
        }

        currentPlayer = AI;

        const { status } = getBattleEls();
        if (status) status.textContent = "독수리가 먼저 두는 중...";

        disableBoard(true);

        setTimeout(() => {
          aiMove();
        }, 450);
      });
    }
  }

  function resetSection13() {
    if (section13IntroBubble) {
      section13IntroBubble.style.display = "block";
      restartShowClass(section13IntroBubble);
    }

    if (fightStartBtn) {
      fightStartBtn.style.display = "block";
    }

    if (battleGameWrap) {
      battleGameWrap.classList.remove("show", "fade-out");
      buildBattleUI();
      bindBattleEvents();
    }

    if (section13Blackout) {
      section13Blackout.classList.remove("show");
    }

    if (section13ResultBubble) {
      section13ResultBubble.classList.remove("show");
    }

    resetBattleGame();
  }

  if (fightStartBtn) {
    fightStartBtn.addEventListener("click", () => {
      hideEl(section13IntroBubble);
      fightStartBtn.style.display = "none";

      if (section13ResultBubble) {
        section13ResultBubble.classList.remove("show");
      }

      if (section13Blackout) {
        section13Blackout.classList.remove("show");
      }

      if (battleGameWrap) {
        battleGameWrap.classList.remove("fade-out");
        battleGameWrap.classList.add("show");
      }

      buildBattleUI();
      bindBattleEvents();
      resetBattleGame();
    });
  }

if (section13NextBtn) {
  section13NextBtn.addEventListener("click", () => {
    showSection("section14");
  });
}
if (section14NextBtn) {
  section14NextBtn.addEventListener("click", () => {
    showSection("section15");
    resetSection15();
  });
}
  /* =========================
   section15
========================= */
const section15Cuts = document.querySelectorAll("#section15 .section15-cut");
const section15NextBtns = document.querySelectorAll("#section15 .section15-next-btn");
const section15FinalBtn = document.getElementById("section15-final-btn");

function resetSection15() {
  const section15 = document.getElementById("section15");
  if (!section15) return;

  const badge = section15.querySelector(".chapter-badge");
  const firstBubble = section15.querySelector(".cut15-1 .section15-bubble");

  section15Cuts.forEach((cut) => cut.classList.remove("active"));

  if (section15Cuts[0]) {
    section15Cuts[0].classList.add("active");
  }

  if (badge) {
    badge.classList.remove("show");
    void badge.offsetWidth;
    badge.classList.add("show");
  }

  document.querySelectorAll("#section15 .section15-bubble").forEach((bubble) => {
    bubble.classList.remove("show");
  });

  setTimeout(() => {
    if (firstBubble) {
      firstBubble.classList.add("show");
    }
  }, 2000);
}

section15NextBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index < section15Cuts.length - 1) {
      section15Cuts[index].classList.remove("active");
      section15Cuts[index + 1].classList.add("active");

      const nextBubble = section15Cuts[index + 1].querySelector(".section15-bubble");
      if (nextBubble) {
        nextBubble.classList.remove("show");
        void nextBubble.offsetWidth;
        nextBubble.classList.add("show");
      }
    }
  });
});

if (section15FinalBtn) {
  section15FinalBtn.addEventListener("click", () => {

    const section15 = document.getElementById("section15");
    const section16 = document.getElementById("section16");

    if (section15) section15.style.display = "none";
    if (section16) {
      section16.style.display = "block";

      // section16 초기화 (중요)
      if (window.initSection16) {
        window.initSection16();
      }
    }

  });
}

(function () {
  const section16 = document.getElementById("section16");
  const cuts = section16.querySelectorAll(".section16-cut");

  const startBtn = document.getElementById("section16StartBtn");
  const puzzleEl = document.getElementById("section16Puzzle");
  const wordsEl = document.getElementById("section16Words");
  const messageEl = document.getElementById("section16Message");

  const words = ["FOREVER", "WITH", "YOU", "BE", "HAPPY"];
  const gridSize = 8;

  let grid = [];
  let foundWords = new Set();
  let selectedCells = [];
  let isSelecting = false;
  let currentPointerId = null;
  let puzzleStarted = false;
  let section16Completed = false;

  function showCut(index) {
    cuts.forEach((cut, i) => {
      cut.classList.toggle("active", i === index);
    });
  }

  function initSection16() {
    showCut(0);
    puzzleStarted = false;
    section16Completed = false;
    foundWords.clear();
    selectedCells = [];
    isSelecting = false;
    currentPointerId = null;
    messageEl.textContent = "";
    puzzleEl.innerHTML = "";
    wordsEl.innerHTML = "";
  }

  function startPuzzle() {
    if (puzzleStarted) return;
    puzzleStarted = true;
    showCut(1);
    generatePuzzle();
  }

  function generatePuzzle() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
    foundWords.clear();
    selectedCells = [];
    isSelecting = false;
    currentPointerId = null;
    messageEl.textContent = "";

    for (const word of words) {
      placeWord(word);
    }

    fillEmptyCells();
    renderPuzzle();
    renderWordList();
  }

  function placeWord(word) {
    const directions = [
      [1, 0],
      [0, 1],
      [1, 1],
      [-1, 1],
      [-1, 0],
      [0, -1],
      [-1, -1],
      [1, -1]
    ];

    for (let attempt = 0; attempt < 300; attempt++) {
      const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
      const startX = Math.floor(Math.random() * gridSize);
      const startY = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(word, startX, startY, dx, dy)) {
        for (let i = 0; i < word.length; i++) {
          const x = startX + dx * i;
          const y = startY + dy * i;
          grid[y][x] = word[i];
        }
        return true;
      }
    }

    return false;
  }

  function canPlaceWord(word, startX, startY, dx, dy) {
    const endX = startX + dx * (word.length - 1);
    const endY = startY + dy * (word.length - 1);

    if (endX < 0 || endX >= gridSize || endY < 0 || endY >= gridSize) {
      return false;
    }

    for (let i = 0; i < word.length; i++) {
      const x = startX + dx * i;
      const y = startY + dy * i;
      const current = grid[y][x];

      if (current !== "" && current !== word[i]) {
        return false;
      }
    }

    return true;
  }

  function fillEmptyCells() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (!grid[y][x]) {
          grid[y][x] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  }

  function renderPuzzle() {
    puzzleEl.innerHTML = "";

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = document.createElement("div");
        cell.className = "section16-cell";
        cell.textContent = grid[y][x];
        cell.dataset.x = x;
        cell.dataset.y = y;
        puzzleEl.appendChild(cell);
      }
    }
  }

  function renderWordList() {
    wordsEl.innerHTML = "";

    words.forEach((word) => {
      const item = document.createElement("div");
      item.className = "section16-word";
      item.id = `section16-word-${word}`;
      item.textContent = word;
      wordsEl.appendChild(item);
    });
  }

  function clearSelectedState() {
    puzzleEl.querySelectorAll(".section16-cell.selected").forEach((cell) => {
      cell.classList.remove("selected");
    });
    selectedCells = [];
  }

  function getCell(x, y) {
    return puzzleEl.querySelector(`.section16-cell[data-x="${x}"][data-y="${y}"]`);
  }

function startSelection(cell, pointerId) {
  if (!cell || section16Completed) return;

  clearSelectedState();
  isSelecting = true;
  currentPointerId = pointerId;
  selectedCells = [cell];
  cell.classList.add("selected");
}

  function updateSelection(cell) {
  if (!isSelecting || !cell || section16Completed) return;

  const first = selectedCells[0];
  const x1 = Number(first.dataset.x);
  const y1 = Number(first.dataset.y);
  const x2 = Number(cell.dataset.x);
  const y2 = Number(cell.dataset.y);

  const dx = x2 - x1;
  const dy = y2 - y1;

  const straight = dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy);
  if (!straight) return;

  const stepX = dx === 0 ? 0 : dx / Math.abs(dx);
  const stepY = dy === 0 ? 0 : dy / Math.abs(dy);
  const distance = Math.max(Math.abs(dx), Math.abs(dy));

  clearSelectedState();

  for (let i = 0; i <= distance; i++) {
    const nextX = x1 + stepX * i;
    const nextY = y1 + stepY * i;
    const nextCell = getCell(nextX, nextY);

    if (!nextCell) return;

    selectedCells.push(nextCell);
    nextCell.classList.add("selected");
  }
}
  function endSelection() {
    if (!isSelecting || section16Completed) return;

    isSelecting = false;
    currentPointerId = null;

    const selectedWord = selectedCells.map((cell) => cell.textContent).join("");
    const reversedWord = selectedWord.split("").reverse().join("");

    let matchedWord = null;

    if (words.includes(selectedWord)) matchedWord = selectedWord;
    if (words.includes(reversedWord)) matchedWord = reversedWord;

    if (matchedWord && !foundWords.has(matchedWord)) {
      foundWords.add(matchedWord);

      selectedCells.forEach((cell) => {
        cell.classList.remove("selected");
        cell.classList.add("found");
      });

      const wordItem = document.getElementById(`section16-word-${matchedWord}`);
      if (wordItem) wordItem.classList.add("found");

      messageEl.textContent = `${matchedWord} 찾았어요!`;
    } else {
      clearSelectedState();
    }

    selectedCells = [];

    if (foundWords.size === words.length) {
      section16Completed = true;
      messageEl.textContent = "모든 단어를 찾았어요!";

      setTimeout(() => {
        showCut(2);

        setTimeout(() => {
          goToSection17();
        }, 1200);
      }, 500);
    }
  }

  function goToSection17() {
    const currentSection = document.getElementById("section16");
    const nextSection = document.getElementById("section17");

    if (currentSection) currentSection.style.display = "none";
    if (nextSection) nextSection.style.display = "block";
  }

  startBtn.addEventListener("click", startPuzzle);

  puzzleEl.addEventListener("pointerdown", (e) => {
    const cell = e.target.closest(".section16-cell");
    if (!cell) return;

    e.preventDefault();
    puzzleEl.setPointerCapture(e.pointerId);
    startSelection(cell, e.pointerId);
  });

  puzzleEl.addEventListener("pointermove", (e) => {
    if (!isSelecting) return;
    if (currentPointerId !== e.pointerId) return;

    const target = document.elementFromPoint(e.clientX, e.clientY);
    const cell = target ? target.closest(".section16-cell") : null;

    if (!cell || !puzzleEl.contains(cell)) return;
    updateSelection(cell);
  });

  puzzleEl.addEventListener("pointerup", (e) => {
    if (currentPointerId !== e.pointerId) return;
    endSelection();
  });

  puzzleEl.addEventListener("pointercancel", () => {
    clearSelectedState();
    isSelecting = false;
    currentPointerId = null;
  });

  initSection16();

  window.initSection16 = initSection16;
})();
const skipBtn = document.getElementById("section16SkipBtn");

if (skipBtn) {
  skipBtn.addEventListener("click", () => {
    section16Completed = true;
    goToSection17();
  });
}
// section17

function goToSection17() {
  const section16 = document.getElementById("section16");
  const section17 = document.getElementById("section17");

  if (section16) section16.style.display = "none";
  if (section17) section17.style.display = "block";
}
  /* =========================
     dev nav
  ========================= */
  function goToDevSection(sectionId) {
    showSection(sectionId);

    switch (sectionId) {
      case "section01":
        break;
      case "section03":
        resetSection03();
        break;
      case "section04":
        resetSection04();
        break;
      case "section05":
        resetSection05();
        break;
      case "section06":
        resetSection06();
        break;
      case "section07":
        resetSection07();
        break;
      case "section08":
        resetSection08();
        break;
      case "section11":
        resetSection11();
        break;
      case "section12":
        resetSection12();
        break;
      case "section13":
        resetSection13();
        break;
        case "section15":
  resetSection15();
  break;
      default:
        break;
      
    }
  }

  devNavButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      goToDevSection(btn.dataset.target);
    });
  });

  /* =========================
     초기 진입
  ========================= */
  showSection("section01");
});
