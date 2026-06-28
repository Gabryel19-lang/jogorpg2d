// Jogo 2D top-down em Canvas puro.
// Tudo e desenhado com formas simples para ficar facil de estudar.

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const miniMapCanvas = document.getElementById("miniMapCanvas");
const miniCtx = miniMapCanvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const playButton = document.getElementById("playButton");
const continueButton = document.getElementById("continueButton");
const howToButton = document.getElementById("howToButton");
const creditsButton = document.getElementById("creditsButton");
const startMessage = document.getElementById("startMessage");
const characterNameInput = document.getElementById("characterNameInput");
const playerNameEl = document.getElementById("playerName");
const xpHud = document.getElementById("xpHud");
const xpFill = document.getElementById("xpFill");
const playerPositionEl = document.getElementById("playerPosition");
const questProgressEl = document.getElementById("questProgress");
const healthHud = document.getElementById("healthHud");
const manaHud = document.getElementById("manaHud");
const manaFill = document.getElementById("manaFill");
const coinHud = document.getElementById("coinHud");
const weaponHud = document.getElementById("weaponHud");
const oxygenHud = document.getElementById("oxygenHud");
const oxygenFill = document.getElementById("oxygenFill");
const powerHud = document.getElementById("powerHud");
const bossHud = document.getElementById("bossHud");
const bossNameHud = document.getElementById("bossNameHud");
const bossFill = document.getElementById("bossFill");
const resetButton = document.getElementById("resetButton");
const dialogBox = document.getElementById("dialogBox");
const dialogText = document.getElementById("dialogText");
const interactionHint = document.getElementById("interactionHint");
const inventoryPanel = document.getElementById("inventoryPanel");
const inventoryList = document.getElementById("inventoryList");
const closeInventoryButton = document.getElementById("closeInventoryButton");
const inventoryTabs = document.getElementById("inventoryTabs");
const inventoryGrid = document.getElementById("inventoryGrid");
const inventoryEmpty = document.getElementById("inventoryEmpty");
const equipmentSlots = document.getElementById("equipmentSlots");
const itemDetailName = document.getElementById("itemDetailName");
const itemDetailMeta = document.getElementById("itemDetailMeta");
const itemDetailDescription = document.getElementById("itemDetailDescription");
const itemDetailEffect = document.getElementById("itemDetailEffect");
const itemDetailActions = document.getElementById("itemDetailActions");
const shopPanel = document.getElementById("shopPanel");
const shopMessage = document.getElementById("shopMessage");
const buyPotionButton = document.getElementById("buyPotionButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameOverResetButton = document.getElementById("gameOverResetButton");
const saveButton = document.getElementById("saveButton");
const infoPanel = document.getElementById("infoPanel");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");
const closeInfoButton = document.getElementById("closeInfoButton");
const touchDirectionButtons = document.querySelectorAll("[data-touch-key]");
const touchActionButton = document.getElementById("touchActionButton");
const touchAttackButton = document.getElementById("touchAttackButton");
const touchInventoryButton = document.getElementById("touchInventoryButton");
const touchFireballButton = document.getElementById("touchFireballButton");
const touchDashButton = document.getElementById("touchDashButton");
const touchShockwaveButton = document.getElementById("touchShockwaveButton");
const touchHealButton = document.getElementById("touchHealButton");
const touchPowerButton = document.getElementById("touchPowerButton");
const touchWeaponButton = document.getElementById("touchWeaponButton");
const touchPower1Button = document.getElementById("touchPower1Button");
const touchPower2Button = document.getElementById("touchPower2Button");
const touchPower3Button = document.getElementById("touchPower3Button");
const touchPower4Button = document.getElementById("touchPower4Button");
const touchPotionButton = document.getElementById("touchPotionButton");
const touchContextLabel = document.getElementById("touchContextLabel");
const joystickBase = document.getElementById("joystickBase");
const joystickStick = document.getElementById("joystickStick");
const orientationHint = document.getElementById("orientationHint");
const mobileFullscreenButton = document.getElementById("mobileFullscreenButton");
const startFullscreenButton = document.getElementById("startFullscreenButton");
const mobilePauseButton = document.getElementById("mobilePauseButton");
const mobileDebugButton = document.getElementById("mobileDebugButton");
const hudMenuButton = document.getElementById("hudMenuButton");
const pausePanel = document.getElementById("pausePanel");
const pauseContinueButton = document.getElementById("pauseContinueButton");
const pauseSaveButton = document.getElementById("pauseSaveButton");
const pauseResetButton = document.getElementById("pauseResetButton");
const pauseHowToButton = document.getElementById("pauseHowToButton");
const pauseMissionsButton = document.getElementById("pauseMissionsButton");
const pauseStatusButton = document.getElementById("pauseStatusButton");
const pauseInventoryButton = document.getElementById("pauseInventoryButton");
const pauseMenuButton = document.getElementById("pauseMenuButton");
const missionsPanel = document.getElementById("missionsPanel");
const missionsList = document.getElementById("missionsList");
const closeMissionsButton = document.getElementById("closeMissionsButton");
const statusPanel = document.getElementById("statusPanel");
const statusList = document.getElementById("statusList");
const closeStatusButton = document.getElementById("closeStatusButton");
const debugPanel = document.getElementById("debugPanel");
const dialogContinueButton = document.getElementById("dialogContinueButton");

if (bossHud && canvas.parentElement && bossHud.parentElement !== canvas.parentElement) {
  canvas.parentElement.appendChild(bossHud);
}

if (pausePanel && pausePanel.parentElement !== document.body) {
  document.body.appendChild(pausePanel);
}

const urlParams = new URLSearchParams(window.location.search);
const shouldAutoStart = urlParams.get("play") === "1" || urlParams.get("start") === "1";
const SAVE_KEY = "gabryel-garcia-o-brabo-save-v1";
const DEFAULT_NEW_PLAYER_NAME = "Upminaa";
const FALLBACK_PLAYER_NAME = "Lia";
const PLAYER_MAX_LEVEL = 1000;
const TILE = 32;
const MAP_COLS = 82;
const MAP_ROWS = 60;
const WORLD_WIDTH = MAP_COLS * TILE;
const WORLD_HEIGHT = MAP_ROWS * TILE;
const HOME_COLS = 30;
const HOME_ROWS = 20;
const HOME_WIDTH = HOME_COLS * TILE;
const HOME_HEIGHT = HOME_ROWS * TILE;
const CRYSTAL_COLS = 46;
const CRYSTAL_ROWS = 34;
const CRYSTAL_WIDTH = CRYSTAL_COLS * TILE;
const CRYSTAL_HEIGHT = CRYSTAL_ROWS * TILE;

const keys = new Set();
const camera = { x: 0, y: 0 };
let lastTime = 0;
let dialogOpen = false;
let currentScene = "village";
let lastVillagePosition = { x: 30 * TILE, y: 24 * TILE };
let inventoryOpen = false;
let shopOpen = false;
let gameOver = false;
let gameStarted = false;
let attackTimer = 0;
let damageCooldown = 0;
let saveNoticeTimer = 0;
let audioContext = null;
let musicGain = null;
let musicTimer = null;
let lastErrorMessage = "";
let attackWindupTimer = 0;
let attackRecoveryTimer = 0;
let attackHitDone = false;
let attackDirection = "down";
let hitstopTimer = 0;
let playerInvulnerableTimer = 0;
let playerKnockbackX = 0;
let playerKnockbackY = 0;
let regenTickTimer = 0;
let oxygenDamageTimer = 0;
let waterSoundTimer = 0;
let weaponCooldownTimer = 0;
let dodgeCooldownTimer = 0;
let equippedPower = "fireball";
let currentWeaponIndex = 0;
let currentMeleeAttack = null;
let isMobile = false;
let pauseOpen = false;
let missionsOpen = false;
let statusOpen = false;
let mobileLockedTarget = null;
let currentAutoAimTarget = null;
let pressedMobileButton = "";
let fpsEstimate = 0;
let fpsFrameCount = 0;
let fpsTimer = 0;
let debugEnabled = urlParams.get("debug") === "1";
let hudToastTimer = 0;
let hudToastText = "";
let inventoryTab = "all";
let selectedInventoryItemId = "";

const joystick = {
  active: false,
  pointerId: null,
  centerX: 0,
  centerY: 0,
  x: 0,
  y: 0,
  strength: 0
};

const mouseAim = {
  screenX: 0,
  screenY: 0,
  worldX: 30 * TILE,
  worldY: 24 * TILE,
  angle: 0,
  active: false
};

const activePowerUps = {
  speed: 0,
  force: 0,
  shield: 0,
  regen: 0,
  waterBreathing: 0
};

const projectiles = [];
const playerProjectiles = projectiles;
const enemyProjectiles = [];
const floatingTexts = [];
const shockwaves = [];
const dashTrails = [];
const healBursts = [];
const lootItems = [];
const hazardZones = [];

const spellCosts = {
  fireball: 2,
  blueRay: 2,
  dash: 1,
  shockwave: 3,
  heal: 3
};

const powerSlots = ["fireball", "blueRay", "shockwave", "heal"];

const powerNames = {
  fireball: "Bola de Fogo",
  blueRay: "Raio Azul",
  shockwave: "Onda de Choque",
  heal: "Cura Magica"
};

const weaponOrder = ["sword", "bow", "staff", "spear"];

const weapons = {
  sword: { name: "Espada curta", damage: 2, range: 48, cooldown: 0.32, arc: Math.PI * 0.72, kind: "melee", damageType: "fisico" },
  bow: { name: "Arco", damage: 2, range: 420, cooldown: 0.42, projectile: "arrow", projectileSpeed: 420, kind: "projectile", damageType: "fisico" },
  staff: { name: "Cajado", damage: 3, range: 390, cooldown: 0.52, projectile: "blueMagic", projectileSpeed: 330, kind: "projectile", damageType: "magico" },
  spear: { name: "Lanca", damage: 3, range: 72, cooldown: 0.48, arc: Math.PI * 0.24, kind: "line", damageType: "fisico" }
};

const quest = {
  status: "notStarted",
  collected: 0,
  total: 3,
  reward: "Amuleto da Vila"
};

const inventory = {
  cristais: 0,
  chaves: 0,
  pocoes: 1,
  moedas: 8,
  espadas: 0,
  cartas: 0,
  fragmentos: 0,
  flechas: 12,
  chavesRaras: 0,
  manaOrbes: 0,
  itensBoss: []
};

const questBook = {
  keyFound: false,
  forestMonstersDefeated: 0,
  forestMonstersGoal: 3,
  letterPicked: false,
  letterDelivered: false,
  bossDefeated: false,
  bossChestOpened: false,
  defeatedBosses: {},
  openedChests: {},
  discoveredAreas: {}
};

const dimensionQuest = {
  entered: false,
  status: "notStarted",
  activatedCrystals: 0,
  totalCrystals: 3,
  bridgeOpen: false,
  chestOpened: false,
  missionDone: false
};

const dimensionParticles = Array.from({ length: 70 }, (_, index) => ({
  x: ((index * 97) % CRYSTAL_WIDTH),
  y: ((index * 151) % CRYSTAL_HEIGHT),
  size: 2 + (index % 3),
  speed: 0.4 + (index % 5) * 0.12,
  phase: index * 0.73
}));

const player = {
  name: DEFAULT_NEW_PLAYER_NAME,
  x: 30 * TILE,
  y: 24 * TILE,
  startX: 30 * TILE,
  startY: 24 * TILE,
  width: 22,
  height: 26,
  speed: 150,
  baseSpeed: 150,
  maxHealth: 5,
  health: 5,
  defense: 0,
  critChance: 0.12,
  level: 1,
  xp: 0,
  xpToNextLevel: 58,
  maxLevel: PLAYER_MAX_LEVEL,
  totalXp: 0,
  skillPoints: 0,
  damageBonus: 0,
  levelGlowTimer: 0,
  maxMana: 6,
  mana: 6,
  manaRegen: 0.45,
  spellCooldowns: {
    fireball: 0,
    blueRay: 0,
    dash: 0,
    shockwave: 0,
    heal: 0
  },
  unlockedWeapons: ["sword", "bow", "staff", "spear"],
  isSwimming: false,
  maxOxygen: 10,
  oxygen: 10,
  direction: "down",
  moving: false,
  frame: 0,
  animTimer: 0
};

normalizeLevelState();
playerNameEl.textContent = getPlayerHudName();
if (characterNameInput) characterNameInput.value = DEFAULT_NEW_PLAYER_NAME;

// G = grama, F = floresta, D = caminho, P = praca, W = agua
const worldMap = createWorldMap();
const homeMap = createHomeMap();
const crystalDimensionMap = createCrystalDimensionMap();

function createWorldMap() {
  const map = Array.from({ length: MAP_ROWS }, () => Array(MAP_COLS).fill("G"));

  fillRect(map, 0, 0, 15, MAP_ROWS, "F");
  fillRect(map, 49, 0, 15, MAP_ROWS, "F");
  fillRect(map, 0, 0, MAP_COLS, 5, "F");
  fillRect(map, 0, 39, MAP_COLS, 7, "F");

  fillRect(map, 30, 5, 4, 35, "D");
  fillRect(map, 8, 22, 48, 4, "D");
  fillRect(map, 17, 10, 4, 27, "D");
  fillRect(map, 43, 11, 4, 24, "D");
  fillRect(map, 25, 18, 15, 10, "P");
  fillRect(map, 28, 21, 9, 4, "P");
  fillRect(map, 6, 31, 12, 7, "P");
  fillRect(map, 53, 31, 8, 7, "P");
  fillRect(map, 4, 8, 10, 7, "G");
  fillRect(map, 24, 33, 7, 5, "G");
  fillRect(map, 41, 6, 8, 5, "G");
  fillRect(map, 9, 24, 3, 9, "D");
  fillRect(map, 14, 33, 17, 3, "D");
  fillRect(map, 46, 24, 10, 3, "D");
  fillRect(map, 55, 26, 3, 7, "D");
  fillRect(map, 11, 14, 3, 9, "D");

  paintEllipse(map, 50, 13, 8, 6, "W");
  paintEllipse(map, 54, 17, 6, 4, "W");

  // Expansao do mapa: novas regioes conectadas por caminhos.
  fillRect(map, 60, 6, 15, 11, "P");   // ruinas antigas
  fillRect(map, 58, 30, 18, 11, "G");  // campo aberto
  fillRect(map, 3, 47, 18, 10, "F");   // cemiterio abandonado
  fillRect(map, 0, 45, 25, 15, "F");   // floresta profunda
  fillRect(map, 61, 43, 13, 10, "P");  // arena de treino
  fillRect(map, 70, 45, 10, 12, "F");  // monstros fortes

  fillRect(map, 56, 24, 4, 23, "D");
  fillRect(map, 31, 40, 30, 3, "D");
  fillRect(map, 18, 49, 45, 3, "D");
  fillRect(map, 67, 16, 4, 29, "D");
  fillRect(map, 63, 38, 9, 3, "D");
  fillRect(map, 65, 48, 10, 3, "D");
  fillRect(map, 6, 51, 16, 3, "D");
  fillRect(map, 51, 52, 14, 2, "D");   // caminho secreto

  paintEllipse(map, 66, 24, 10, 7, "W");
  paintEllipse(map, 73, 24, 6, 5, "W");
  paintEllipse(map, 62, 27, 5, 4, "W");
  paintEllipse(map, 36, 32, 3, 2, "W");

  return map;
}

function createHomeMap() {
  const map = Array.from({ length: HOME_ROWS }, () => Array(HOME_COLS).fill("I"));
  fillHomeRect(map, 0, 0, HOME_COLS, 1, "B");
  fillHomeRect(map, 0, HOME_ROWS - 1, HOME_COLS, 1, "B");
  fillHomeRect(map, 0, 0, 1, HOME_ROWS, "B");
  fillHomeRect(map, HOME_COLS - 1, 0, 1, HOME_ROWS, "B");
  fillHomeRect(map, 7, 7, 6, 4, "R");
  fillHomeRect(map, 14, HOME_ROWS - 1, 2, 1, "I");
  return map;
}

function createCrystalDimensionMap() {
  const map = Array.from({ length: CRYSTAL_ROWS }, () => Array(CRYSTAL_COLS).fill("C"));

  fillCrystalRect(map, 0, 0, CRYSTAL_COLS, 1, "M");
  fillCrystalRect(map, 0, CRYSTAL_ROWS - 1, CRYSTAL_COLS, 1, "M");
  fillCrystalRect(map, 0, 0, 1, CRYSTAL_ROWS, "M");
  fillCrystalRect(map, CRYSTAL_COLS - 1, 0, 1, CRYSTAL_ROWS, "M");

  fillCrystalRect(map, 20, 27, 7, 5, "Q");
  fillCrystalRect(map, 21, 13, 5, 16, "Q");
  fillCrystalRect(map, 9, 18, 28, 5, "Q");
  fillCrystalRect(map, 17, 7, 12, 7, "Q");
  fillCrystalRect(map, 21, 4, 5, 5, "Q");

  paintCrystalEllipse(map, 9, 10, 6, 4, "M");
  paintCrystalEllipse(map, 36, 9, 6, 4, "M");
  paintCrystalEllipse(map, 37, 25, 6, 4, "M");
  paintCrystalEllipse(map, 8, 27, 4, 3, "M");

  return map;
}

function fillHomeRect(map, startX, startY, width, height, tile) {
  for (let y = startY; y < startY + height; y++) {
    for (let x = startX; x < startX + width; x++) {
      if (x >= 0 && y >= 0 && x < HOME_COLS && y < HOME_ROWS) {
        map[y][x] = tile;
      }
    }
  }
}

function fillCrystalRect(map, startX, startY, width, height, tile) {
  for (let y = startY; y < startY + height; y++) {
    for (let x = startX; x < startX + width; x++) {
      if (x >= 0 && y >= 0 && x < CRYSTAL_COLS && y < CRYSTAL_ROWS) {
        map[y][x] = tile;
      }
    }
  }
}

function fillRect(map, startX, startY, width, height, tile) {
  for (let y = startY; y < startY + height; y++) {
    for (let x = startX; x < startX + width; x++) {
      if (x >= 0 && y >= 0 && x < MAP_COLS && y < MAP_ROWS) {
        map[y][x] = tile;
      }
    }
  }
}

function paintEllipse(map, centerX, centerY, radiusX, radiusY, tile) {
  for (let y = centerY - radiusY; y <= centerY + radiusY; y++) {
    for (let x = centerX - radiusX; x <= centerX + radiusX; x++) {
      const dx = (x - centerX) / radiusX;
      const dy = (y - centerY) / radiusY;
      if (dx * dx + dy * dy <= 1 && x >= 0 && y >= 0 && x < MAP_COLS && y < MAP_ROWS) {
        map[y][x] = tile;
      }
    }
  }
}

function paintCrystalEllipse(map, centerX, centerY, radiusX, radiusY, tile) {
  for (let y = centerY - radiusY; y <= centerY + radiusY; y++) {
    for (let x = centerX - radiusX; x <= centerX + radiusX; x++) {
      const dx = (x - centerX) / radiusX;
      const dy = (y - centerY) / radiusY;
      if (dx * dx + dy * dy <= 1 && x >= 0 && y >= 0 && x < CRYSTAL_COLS && y < CRYSTAL_ROWS) {
        map[y][x] = tile;
      }
    }
  }
}

const villageObjects = [
  playerHouse(24, 33),
  shop(42, 6),
  house(22, 8, "Casa da Dona Mina"),
  house(36, 8, "Casa do Prefeito"),
  house(21, 29, "Pousada da Vila"),
  house(38, 29, "Armazem"),
  house(12, 15, "Cabana da Floresta"),
  house(48, 28, "Casa do Pescador"),
  house(27, 12, "Padaria"),
  house(35, 14, "Atelie"),
  well(31, 21),
  portal(34, 24),
  portal(55, 32),
  bench(8, 34, "horizontal"),
  bench(13, 34, "horizontal"),
  bench(8, 36, "horizontal"),
  caveEntrance(10, 10),
  secretStone(7, 10),

  tree(3, 4), tree(6, 3), tree(10, 6), tree(13, 8), tree(4, 11),
  tree(8, 14), tree(12, 20), tree(5, 25), tree(10, 30), tree(6, 35),
  tree(2, 40), tree(13, 39), tree(50, 4), tree(55, 5), tree(60, 7),
  tree(51, 26), tree(58, 28), tree(53, 34), tree(60, 38), tree(48, 40),
  tree(19, 40), tree(25, 41), tree(33, 40), tree(43, 39),
  tree(3, 7), tree(6, 7), tree(9, 7), tree(12, 7), tree(14, 9),
  tree(14, 12), tree(3, 14), tree(6, 15), tree(9, 15),

  fence(20, 7, 7, "horizontal"),
  fence(35, 7, 7, "horizontal"),
  fence(20, 32, 7, "horizontal"),
  fence(38, 32, 7, "horizontal"),
  fence(23, 17, 5, "vertical"),
  fence(40, 17, 5, "vertical"),

  sign(30, 27, "Placa da praca: Bem-vindo a Vila Pixel! A vila fica ao redor da praca."),
  sign(14, 22, "Placa da floresta: As arvores sao solidas, mas as flores nao bloqueiam o caminho."),
  sign(48, 21, "Placa do lago: A agua tem colisao. Melhor admirar da margem."),
  sign(31, 5, "Placa norte: Siga o caminho para voltar ate a praca."),
  sign(25, 36, "Casa da Lia: seu ponto de descanso depois das aventuras."),
  sign(44, 10, "Loja Estrela Azul: pocoes, mapas e biscoitos de viagem."),
  sign(8, 33, "Parque da Vila: respire fundo e siga explorando."),
  sign(36, 27, "PORTAL NOVO: pressione E perto do brilho para entrar na Dimensao Cristalina."),
  sign(56, 38, "Portal antigo: o brilho agora leva para a Dimensao Cristalina."),

  npc(29, 20, "Nico", "Nico: Preciso de ajuda! Encontre 3 cristais brilhantes pela vila e volte aqui."),
  npc(44, 24, "Ari", "Ari: O lago cresceu depois das ultimas chuvas. Nao tente atravessar."),
  npc(18, 24, "Mina", "Mina: Na floresta ha flores por toda parte, mas cuidado com as arvores."),
  npc(45, 9, "Vendedor", "Vendedor: Bem-vinda a Loja Estrela Azul!", "shopkeeper"),
  npc(12, 34, "Beto", "Beto: Estou esperando uma carta da Mina.", "letterTarget"),

  crystal(12, 28), crystal(47, 20), crystal(35, 36),
  collectible(7, 11, "chave"),
  collectible(19, 23, "carta"),
  collectible(27, 34, "pocao"),
  collectible(13, 36, "espada"),
  collectible(54, 29, "espada"),
  collectible(9, 32, "moeda"), collectible(10, 35, "moeda"), collectible(45, 25, "moeda"),
  collectible(52, 24, "moeda"), collectible(56, 36, "moeda"), collectible(6, 12, "moeda"),
  enemy(9, 18, "slime"), enemy(12, 25, "slime"), enemy(52, 34, "slime"),
  enemy(7, 9, "morcego"),

  flower(26, 19, "pink"), flower(37, 19, "yellow"), flower(26, 26, "blue"),
  flower(38, 26, "pink"), flower(16, 18, "yellow"), flower(11, 27, "blue"),
  flower(9, 33, "pink"), flower(45, 31, "yellow"), flower(52, 24, "blue"),
  flower(56, 22, "pink"), flower(24, 35, "yellow"), flower(34, 34, "blue"),
  rock(15, 12), rock(11, 19), rock(47, 19), rock(56, 27),
  rock(18, 35), rock(41, 36), rock(7, 38), rock(58, 10),

  sign(33, 28, "MAPA EXPANDIDO: siga o novo caminho ao sul da praca para descobrir outras regioes."),
  sign(35, 30, "TESTE DE COMBATE: use mouse, Tab, Q, 1-4 e Espaco para praticar."),
  sign(34, 33, "Area de treino: armas liberadas, cristais de mana e lago pequeno para nadar."),
  sign(63, 18, "Lago Maior: a agua magica ficou mais profunda nesta parte da vila."),
  sign(63, 23, "Lago dos Ecos: entre na agua para nadar, mas cuide do oxigenio."),
  sign(61, 9, "Ruinas Antigas: dizem que um guardiao desperta quando alguem treina magia aqui."),
  sign(58, 37, "Campo Aberto: bom para testar dash e bola de fogo."),
  sign(7, 50, "Floresta profunda: aranhas, goblins e morcegos cercam os caminhos."),
  sign(63, 43, "Arena do Guardiao: bosses mostram barra de vida no topo."),
  sign(72, 46, "Area Perigosa: monstros fortes causam mais dano."),
  sign(74, 45, "Perigo: inimigos fortes e miniDragao guardam tesouros."),
  sign(53, 53, "Caminho Secreto: siga as pedras claras ate a floresta profunda."),

  house(60, 32, "Casa do Campo"),
  house(72, 34, "Casa do Treinador"),
  house(6, 53, "Cabana Esquecida"),
  fence(61, 42, 12, "horizontal"),
  fence(61, 52, 12, "horizontal"),
  fence(61, 43, 8, "vertical"),
  fence(72, 43, 8, "vertical"),
  fence(3, 46, 16, "horizontal"),

  tree(2, 48), tree(5, 46), tree(9, 45), tree(13, 46), tree(17, 48),
  tree(3, 55), tree(12, 56), tree(19, 54), tree(24, 50), tree(27, 52),
  tree(73, 47), tree(77, 48), tree(80, 52), tree(76, 56), tree(70, 57),
  tree(58, 29), tree(61, 30), tree(75, 31), tree(78, 34),
  rock(60, 8), rock(65, 9), rock(72, 12), rock(68, 15),
  rock(58, 35), rock(70, 38), rock(64, 47), rock(75, 50),
  flower(59, 33, "yellow"), flower(63, 36, "blue"), flower(70, 32, "pink"),
  flower(74, 39, "yellow"), flower(12, 49, "blue"), flower(16, 54, "pink"),

  enemy(62, 35, "slime"), enemy(67, 37, "morcego"),
  enemy(9, 51, "mago"), enemy(15, 53, "slimeVermelho"),
  enemy(73, 49, "slimeVermelho"), enemy(77, 52, "golem"),
  enemy(68, 47, "guardiao"),
  enemy(34, 31, "slimeVerde"), enemy(37, 34, "slimeVerde"), enemy(39, 31, "arqueiroGoblin"),
  enemy(58, 34, "slimeVerde"), enemy(62, 38, "goblin"), enemy(66, 35, "arqueiroGoblin"),
  enemy(8, 49, "aranha"), enemy(12, 50, "goblin"), enemy(17, 52, "morcego"),
  enemy(20, 55, "aranha"), enemy(24, 51, "arqueiroGoblin"),
  enemy(60, 24, "slimeAzul"), enemy(66, 26, "peixeHostil"), enemy(72, 24, "peixeHostil"),
  enemy(63, 12, "fantasma"), enemy(68, 13, "magoSombrio"), enemy(72, 10, "golemPedra"),
  enemy(75, 48, "miniDragao"), enemy(79, 54, "golemPedra"), enemy(74, 55, "magoSombrio"),
  boss(35, 35, "miniGuardiao"),
  boss(60, 30, "reiSlime"),
  boss(14, 56, "aranhaRainha"),
  boss(69, 10, "golemAncestral"),
  boss(73, 14, "bruxoSombrio"),
  boss(69, 24, "serpenteLago"),
  rareChest(67, 49)
];

const homeObjects = [
  block(0, 0, HOME_COLS, 1),
  block(0, 0, 1, HOME_ROWS),
  block(HOME_COLS - 1, 0, 1, HOME_ROWS),
  block(0, HOME_ROWS - 1, 14, 1),
  block(16, HOME_ROWS - 1, 14, 1),
  interiorBed(2, 2),
  interiorTable(12, 7),
  interiorBookshelf(25, 2),
  interiorChest(3, 10),
  interiorPlant(25, 12),
  sign(14, 17, "Porta de saida: caminhe para baixo para voltar a vila.")
];

const shopInteriorObjects = [
  block(0, 0, HOME_COLS, 1),
  block(0, 0, 1, HOME_ROWS),
  block(HOME_COLS - 1, 0, 1, HOME_ROWS),
  block(0, HOME_ROWS - 1, 14, 1),
  block(16, HOME_ROWS - 1, 14, 1),
  shopCounter(7, 5),
  interiorBookshelf(3, 2),
  interiorBookshelf(24, 2),
  interiorChest(22, 11),
  npc(14, 7, "Vendedor", "Vendedor: Pocao fresquinha por 5 moedas!", "shopkeeper"),
  sign(14, 17, "Saida da loja: caminhe para baixo para voltar a vila.")
];

const mayorInteriorObjects = [
  block(0, 0, HOME_COLS, 1),
  block(0, 0, 1, HOME_ROWS),
  block(HOME_COLS - 1, 0, 1, HOME_ROWS),
  block(0, HOME_ROWS - 1, 14, 1),
  block(16, HOME_ROWS - 1, 14, 1),
  mayorDesk(11, 5),
  interiorBookshelf(3, 2),
  interiorBookshelf(25, 2),
  interiorPlant(4, 12),
  npc(14, 9, "Prefeito", "Prefeito: Gabryel Garcia o Brabo protege esta vila!", "mayor"),
  sign(14, 17, "Saida da casa do prefeito: caminhe para baixo para voltar a vila.")
];

const crystalDimensionObjects = [
  block(0, 0, CRYSTAL_COLS, 1),
  block(0, CRYSTAL_ROWS - 1, CRYSTAL_COLS, 1),
  block(0, 0, 1, CRYSTAL_ROWS),
  block(CRYSTAL_COLS - 1, 0, 1, CRYSTAL_ROWS),
  dimensionPortal(22, 29, "exit"),
  dimensionBlocker(21, 13, 5, 2),

  npc(20, 25, "Orion", "Orion: Ative tres cristais magicos para abrir o caminho secreto.", "dimensionGuide"),
  npc(28, 17, "Nyx", "Nyx: Esta dimensao guarda ecos da vila. As pedras flutuam quando alguem desperta os cristais.", "dimensionMystic"),

  dimensionCrystal(12, 20, 0, "Cristal da Memoria: ele mostra a vila refletida em luz roxa."),
  dimensionCrystal(34, 20, 1, "Cristal do Caminho: linhas brilhantes apontam para o norte."),
  dimensionCrystal(23, 16, 2, "Cristal do Portal: um som baixo vibra dentro dele."),
  dimensionChest(22, 6),
  dimensionSign(20, 28, "Inscricao: tres luzes acordam a ponte perdida."),
  talkingStone(31, 25, "Pedra flutuante: quem entra deve lembrar o caminho de volta."),
  magicFountain(16, 9, "Fonte magica: a agua brilha, mas ainda bloqueia a passagem."),

  largeCrystal(7, 17), largeCrystal(39, 17), largeCrystal(18, 12), largeCrystal(28, 12),
  largeCrystal(15, 25), largeCrystal(31, 28), largeCrystal(10, 6), largeCrystal(40, 7),
  strangeTree(5, 23), strangeTree(39, 26), strangeTree(6, 14), strangeTree(36, 14),
  floatingRock(14, 18), floatingRock(32, 18), floatingRock(18, 24), floatingRock(27, 24),
  floatingRock(20, 9), floatingRock(27, 9)
];

const powerUps = [
  powerUp(35, 29, "speed"),
  powerUp(60, 35, "speed"),
  powerUp(64, 11, "force"),
  powerUp(73, 50, "force"),
  powerUp(64, 45, "shield"),
  powerUp(8, 52, "shield"),
  powerUp(12, 50, "regen"),
  powerUp(70, 38, "regen"),
  powerUp(58, 52, "mana"),
  powerUp(69, 24, "mana"),
  powerUp(63, 25, "waterBreathing"),
  powerUp(36, 32, "waterBreathing")
];

let objects = villageObjects;
let colliders = objects.filter((obj) => obj.solid);
let interactables = objects.filter((obj) => obj.message);

function block(tileX, tileY, widthTiles, heightTiles) {
  return {
    type: "block",
    x: tileX * TILE,
    y: tileY * TILE,
    width: widthTiles * TILE,
    height: heightTiles * TILE,
    solid: true
  };
}

function house(tileX, tileY, title) {
  return {
    type: "house",
    title,
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 4,
    height: TILE * 3,
    solid: true
  };
}

function playerHouse(tileX, tileY) {
  return {
    type: "playerHouse",
    title: "Casa da Lia",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 4,
    height: TILE * 3,
    solid: true
  };
}

function shop(tileX, tileY) {
  return {
    type: "shop",
    title: "Loja Estrela Azul",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 4,
    height: TILE * 3,
    solid: true
  };
}

function tree(tileX, tileY) {
  return {
    type: "tree",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE,
    height: TILE * 2,
    solid: true
  };
}

function fence(tileX, tileY, length, direction) {
  return {
    type: "fence",
    x: tileX * TILE,
    y: tileY * TILE,
    width: direction === "horizontal" ? TILE * length : TILE,
    height: direction === "horizontal" ? TILE : TILE * length,
    direction,
    solid: true
  };
}

function sign(tileX, tileY, message) {
  return {
    type: "sign",
    x: tileX * TILE + 8,
    y: tileY * TILE + 6,
    width: 18,
    height: 24,
    solid: true,
    message
  };
}

function well(tileX, tileY) {
  return {
    type: "well",
    x: tileX * TILE + 2,
    y: tileY * TILE + 2,
    width: 28,
    height: 28,
    solid: true
  };
}

function bench(tileX, tileY, direction) {
  return {
    type: "bench",
    x: tileX * TILE + 2,
    y: tileY * TILE + 10,
    width: direction === "horizontal" ? 28 : 12,
    height: direction === "horizontal" ? 12 : 28,
    direction,
    solid: true
  };
}

function portal(tileX, tileY) {
  return {
    type: "portal",
    role: "crystalEntry",
    x: tileX * TILE,
    y: tileY * TILE - 8,
    width: TILE * 2,
    height: TILE * 3,
    solid: false,
    message: "Pressione E para entrar no portal."
  };
}

function dimensionPortal(tileX, tileY, role) {
  return {
    type: "dimensionPortal",
    role,
    x: tileX * TILE,
    y: tileY * TILE - 8,
    width: TILE * 2,
    height: TILE * 3,
    solid: false,
    message: role === "exit" ? "Portal de volta: pressione E para retornar a vila." : "Portal cristalino."
  };
}

function dimensionBlocker(tileX, tileY, widthTiles, heightTiles) {
  return {
    type: "dimensionBlocker",
    x: tileX * TILE,
    y: tileY * TILE,
    width: widthTiles * TILE,
    height: heightTiles * TILE,
    solid: true
  };
}

function dimensionCrystal(tileX, tileY, crystalIndex, message) {
  return {
    type: "dimensionCrystal",
    crystalIndex,
    x: tileX * TILE + 6,
    y: tileY * TILE,
    width: 22,
    height: 32,
    solid: false,
    message,
    activated: false,
    activatedAt: 0
  };
}

function dimensionChest(tileX, tileY) {
  return {
    type: "dimensionChest",
    x: tileX * TILE,
    y: tileY * TILE + 8,
    width: TILE * 2,
    height: TILE,
    solid: true,
    opened: false,
    message: "Bau especial: a fechadura tem tres marcas de cristal."
  };
}

function dimensionSign(tileX, tileY, message) {
  return {
    type: "dimensionSign",
    x: tileX * TILE + 8,
    y: tileY * TILE + 6,
    width: 18,
    height: 24,
    solid: true,
    message
  };
}

function talkingStone(tileX, tileY, message) {
  return {
    type: "talkingStone",
    x: tileX * TILE + 4,
    y: tileY * TILE + 8,
    width: 24,
    height: 20,
    solid: true,
    message
  };
}

function magicFountain(tileX, tileY, message) {
  return {
    type: "magicFountain",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 2,
    height: TILE * 2,
    solid: true,
    message
  };
}

function largeCrystal(tileX, tileY) {
  return {
    type: "largeCrystal",
    x: tileX * TILE + 2,
    y: tileY * TILE - 4,
    width: 28,
    height: 42,
    solid: true
  };
}

function strangeTree(tileX, tileY) {
  return {
    type: "strangeTree",
    x: tileX * TILE,
    y: tileY * TILE - 8,
    width: TILE,
    height: TILE * 2,
    solid: true
  };
}

function floatingRock(tileX, tileY) {
  return {
    type: "floatingRock",
    x: tileX * TILE + 5,
    y: tileY * TILE + 8,
    width: 22,
    height: 18,
    solid: true
  };
}

function secretStone(tileX, tileY) {
  return {
    type: "secretStone",
    x: tileX * TILE + 4,
    y: tileY * TILE + 8,
    width: 24,
    height: 20,
    solid: false,
    message: "Voce encontrou a clareira secreta escondida atras das arvores!"
  };
}

function caveEntrance(tileX, tileY) {
  return {
    type: "cave",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 3,
    height: TILE * 2,
    solid: true,
    message: "Caverna escondida: morcegos costumam rondar essa entrada."
  };
}

function interiorBed(tileX, tileY) {
  return {
    type: "bed",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 3,
    height: TILE * 2,
    solid: true
  };
}

function interiorTable(tileX, tileY) {
  return {
    type: "table",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 3,
    height: TILE * 2,
    solid: true
  };
}

function shopCounter(tileX, tileY) {
  return {
    type: "counter",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 16,
    height: TILE * 2,
    solid: true
  };
}

function mayorDesk(tileX, tileY) {
  return {
    type: "mayorDesk",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 7,
    height: TILE * 3,
    solid: true
  };
}

function interiorBookshelf(tileX, tileY) {
  return {
    type: "bookshelf",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 2,
    height: TILE * 3,
    solid: true
  };
}

function interiorChest(tileX, tileY) {
  return {
    type: "chest",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 2,
    height: TILE,
    solid: true,
    message: "Bau da Lia: tem mapas, fitas coloridas e uma lanterna pequena."
  };
}

function rareChest(tileX, tileY) {
  return {
    type: "rareChest",
    x: tileX * TILE,
    y: tileY * TILE + 8,
    width: TILE * 2,
    height: TILE,
    solid: true,
    message: "Bau raro do Guardiao: parece esperar a queda do boss."
  };
}

function interiorPlant(tileX, tileY) {
  return {
    type: "plant",
    x: tileX * TILE + 4,
    y: tileY * TILE,
    width: 24,
    height: 32,
    solid: true
  };
}

function flower(tileX, tileY, color) {
  return {
    type: "flower",
    color,
    x: tileX * TILE + 10,
    y: tileY * TILE + 12,
    width: 12,
    height: 12,
    solid: false
  };
}

function rock(tileX, tileY) {
  return {
    type: "rock",
    x: tileX * TILE + 7,
    y: tileY * TILE + 11,
    width: 18,
    height: 15,
    solid: false
  };
}

function crystal(tileX, tileY) {
  return {
    type: "crystal",
    x: tileX * TILE + 8,
    y: tileY * TILE + 4,
    width: 16,
    height: 24,
    solid: false,
    collected: false
  };
}

function collectible(tileX, tileY, item) {
  return {
    type: "collectible",
    item,
    x: tileX * TILE + 8,
    y: tileY * TILE + 8,
    width: 16,
    height: 16,
    solid: false,
    collected: false
  };
}

function powerUp(tileX, tileY, kind, dropped = false) {
  return {
    type: "powerUp",
    kind,
    x: tileX * TILE + 7,
    y: tileY * TILE + 7,
    width: 18,
    height: 18,
    solid: false,
    collected: false,
    dropped
  };
}

function enemy(tileX, tileY, kind) {
  const stats = getEnemyStats(kind);
  return {
    type: "enemy",
    kind,
    x: tileX * TILE + 4,
    y: tileY * TILE + 4,
    width: stats.width,
    height: stats.height,
    solid: false,
    hp: stats.hp,
    maxHp: stats.hp,
    damage: stats.damage,
    speed: stats.speed,
    state: "idle",
    spawnX: tileX * TILE + 4,
    spawnY: tileY * TILE + 4,
    aggroRange: stats.aggroRange,
    attackRange: stats.attackRange,
    attackCooldown: 0,
    attackDelay: stats.attackDelay,
    attackTimer: 0,
    invulnerableTimer: 0,
    knockbackX: 0,
    knockbackY: 0,
    canFly: Boolean(stats.canFly),
    canSwim: Boolean(stats.canSwim),
    projectileType: stats.projectileType || null,
    dropTable: stats.dropTable,
    xpReward: stats.xpReward || stats.coinReward,
    coinReward: stats.coinReward,
    coinsReward: stats.coinReward,
    defense: stats.defense || 0,
    resistances: stats.resistances || {},
    boss: stats.boss,
    bossItem: stats.bossItem || null,
    phase: 1,
    direction: Math.random() > 0.5 ? "left" : "right",
    moveTimer: 0,
    alive: true
  };
}

function boss(tileX, tileY, kind) {
  const obj = enemy(tileX, tileY, kind);
  obj.boss = true;
  obj.state = "bossIdle";
  return obj;
}

function getEnemyStats(kind) {
  const baseDrop = { coin: 0.8, potion: 0.12, powerUp: 0.15, loot: 0.2 };
  const stats = {
    slimeVerde: {
      width: 22, height: 20, hp: 3, damage: 1, speed: 45,
      aggroRange: 190, attackRange: 28, attackDelay: 1.1, coinReward: 3,
      projectileType: null, dropTable: baseDrop, xpReward: 2
    },
    slimeVermelho: {
      width: 24, height: 22, hp: 5, damage: 2, speed: 54,
      aggroRange: 230, attackRange: 30, attackDelay: 1.0, coinReward: 6,
      projectileType: null, dropTable: { coin: 0.9, potion: 0.16, powerUp: 0.22, loot: 0.24 }, xpReward: 4
    },
    slimeAzul: {
      width: 23, height: 21, hp: 4, damage: 1, speed: 48,
      aggroRange: 230, attackRange: 150, attackDelay: 1.35, coinReward: 5,
      canSwim: true, projectileType: "bubble", resistances: { agua: 0.5 },
      dropTable: { coin: 0.8, potion: 0.1, powerUp: 0.2, loot: 0.3 }, xpReward: 3
    },
    morcego: {
      width: 24, height: 18, hp: 2, damage: 1, speed: 82,
      aggroRange: 250, attackRange: 26, attackDelay: 0.9, coinReward: 5,
      canFly: true, dropTable: { coin: 0.8, potion: 0.08, powerUp: 0.16, loot: 0.18 }, xpReward: 3
    },
    aranha: {
      width: 24, height: 18, hp: 4, damage: 1, speed: 62,
      aggroRange: 230, attackRange: 32, attackDelay: 1.0, coinReward: 5,
      projectileType: "web", dropTable: { coin: 0.75, potion: 0.1, powerUp: 0.18, loot: 0.25 }, xpReward: 4
    },
    goblin: {
      width: 22, height: 28, hp: 5, damage: 1, speed: 66,
      aggroRange: 250, attackRange: 30, attackDelay: 0.95, coinReward: 7,
      dropTable: { coin: 0.9, potion: 0.12, powerUp: 0.18, loot: 0.28 }, xpReward: 5
    },
    arqueiroGoblin: {
      width: 22, height: 28, hp: 4, damage: 1, speed: 52,
      aggroRange: 280, attackRange: 215, attackDelay: 1.45, coinReward: 8,
      projectileType: "arrow", dropTable: { coin: 0.9, potion: 0.1, powerUp: 0.2, loot: 0.4 }, xpReward: 5
    },
    magoSombrio: {
      width: 24, height: 28, hp: 5, damage: 1, speed: 42,
      aggroRange: 295, attackRange: 230, attackDelay: 1.55, coinReward: 10,
      projectileType: "shadow", resistances: { sombra: 0.5 },
      dropTable: { coin: 1, potion: 0.16, powerUp: 0.28, loot: 0.45 }, xpReward: 7
    },
    golemPedra: {
      width: 30, height: 30, hp: 9, damage: 2, speed: 32,
      aggroRange: 220, attackRange: 36, attackDelay: 1.35, coinReward: 10,
      projectileType: "stone", defense: 1, resistances: { fisico: 0.75, magico: 1.25 },
      dropTable: { coin: 1, potion: 0.2, powerUp: 0.24, loot: 0.36 }, xpReward: 8
    },
    fantasma: {
      width: 24, height: 28, hp: 4, damage: 1, speed: 58,
      aggroRange: 270, attackRange: 30, attackDelay: 1.1, coinReward: 7,
      canFly: true, resistances: { fisico: 0.45, magico: 1.2 },
      dropTable: { coin: 0.8, potion: 0.08, powerUp: 0.22, loot: 0.35 }, xpReward: 6
    },
    peixeHostil: {
      width: 24, height: 16, hp: 3, damage: 1, speed: 72,
      aggroRange: 240, attackRange: 26, attackDelay: 0.85, coinReward: 5,
      canSwim: true, resistances: { agua: 0.5 },
      dropTable: { coin: 0.75, potion: 0.08, powerUp: 0.2, loot: 0.35 }, xpReward: 4
    },
    miniDragao: {
      width: 34, height: 26, hp: 12, damage: 2, speed: 68,
      aggroRange: 330, attackRange: 250, attackDelay: 1.2, coinReward: 18,
      canFly: true, projectileType: "fire", resistances: { fogo: 0.5, agua: 1.35 },
      dropTable: { coin: 1, potion: 0.35, powerUp: 0.5, loot: 0.7 }, xpReward: 14
    },
    miniGuardiao: {
      width: 34, height: 36, hp: 14, damage: 1, speed: 38,
      aggroRange: 260, attackRange: 150, attackDelay: 1.25, coinReward: 20,
      projectileType: "stone", defense: 1, boss: true, bossItem: "Insignia de Treino",
      dropTable: { coin: 1, potion: 0.5, powerUp: 0.8, loot: 0.7 }, xpReward: 12
    },
    reiSlime: {
      width: 42, height: 34, hp: 28, damage: 2, speed: 46,
      aggroRange: 330, attackRange: 44, attackDelay: 1.05, coinReward: 35,
      boss: true, bossItem: "Gelatina Real", projectileType: "slimeBall",
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 25
    },
    aranhaRainha: {
      width: 44, height: 34, hp: 34, damage: 2, speed: 54,
      aggroRange: 350, attackRange: 210, attackDelay: 1.25, coinReward: 42,
      boss: true, bossItem: "Presa da Rainha", projectileType: "web",
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 30
    },
    golemAncestral: {
      width: 46, height: 48, hp: 42, damage: 3, speed: 30,
      aggroRange: 350, attackRange: 230, attackDelay: 1.35, coinReward: 50,
      boss: true, bossItem: "Nucleo de Pedra", projectileType: "stone", defense: 2,
      resistances: { fisico: 0.65, magico: 1.25 },
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 36
    },
    bruxoSombrio: {
      width: 30, height: 38, hp: 36, damage: 2, speed: 48,
      aggroRange: 380, attackRange: 260, attackDelay: 1.05, coinReward: 48,
      boss: true, bossItem: "Olho Sombrio", projectileType: "shadow", resistances: { sombra: 0.45 },
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 34
    },
    serpenteLago: {
      width: 54, height: 24, hp: 38, damage: 2, speed: 72,
      aggroRange: 360, attackRange: 240, attackDelay: 1.15, coinReward: 50,
      boss: true, bossItem: "Escama da Serpente", projectileType: "bubble", canSwim: true,
      resistances: { agua: 0.45, fogo: 1.35 },
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 35
    },
    guardiao: {
      width: 38, height: 42, hp: 22, damage: 2, speed: 44,
      aggroRange: 330, attackRange: 240, attackDelay: 1.35, coinReward: 35,
      dropTable: { coin: 1, potion: 1, powerUp: 1 },
      boss: true
    }
  };

  stats.slime = stats.slimeVerde;
  stats.golem = stats.golemPedra;
  stats.mago = stats.magoSombrio;

  return stats[kind] || stats.slime;
}

function npc(tileX, tileY, name, message, role = "villager") {
  return {
    type: "npc",
    name,
    role,
    x: tileX * TILE + 5,
    y: tileY * TILE + 4,
    width: 22,
    height: 28,
    solid: true,
    message,
    bob: Math.random() * Math.PI * 2,
    speed: 28,
    direction: Math.random() > 0.5 ? "left" : "right",
    moveTimer: 1 + Math.random() * 2,
    spawnX: tileX * TILE + 5,
    spawnY: tileY * TILE + 4
  };
}

function getPlayerRect(nextX = player.x, nextY = player.y) {
  return {
    x: nextX + 5,
    y: nextY + 8,
    width: player.width - 10,
    height: player.height - 8
  };
}

function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function isWaterAt(tileX, tileY) {
  if (currentScene === "crystalDimension") {
    if (tileX < 0 || tileY < 0 || tileX >= CRYSTAL_COLS || tileY >= CRYSTAL_ROWS) {
      return true;
    }
    return crystalDimensionMap[tileY][tileX] === "M";
  }

  if (currentScene !== "village") return false;

  if (tileX < 0 || tileY < 0 || tileX >= MAP_COLS || tileY >= MAP_ROWS) {
    return true;
  }
  return worldMap[tileY][tileX] === "W";
}

function isColliderActive(obj) {
  if (obj.type === "dimensionBlocker" && dimensionQuest.bridgeOpen) return false;
  if (obj.type === "rareChest" && (!questBook.bossDefeated || questBook.bossChestOpened)) return false;
  return obj.solid;
}

function hitsWater(rect) {
  const left = Math.floor(rect.x / TILE);
  const right = Math.floor((rect.x + rect.width - 1) / TILE);
  const top = Math.floor(rect.y / TILE);
  const bottom = Math.floor((rect.y + rect.height - 1) / TILE);

  for (let y = top; y <= bottom; y++) {
    for (let x = left; x <= right; x++) {
      if (isWaterAt(x, y)) return true;
    }
  }

  return false;
}

function isPointInVillageWater(x, y) {
  if (currentScene !== "village") return false;
  const tileX = Math.floor(x / TILE);
  const tileY = Math.floor(y / TILE);
  if (tileX < 0 || tileY < 0 || tileX >= MAP_COLS || tileY >= MAP_ROWS) return false;
  return worldMap[tileY][tileX] === "W";
}

function updateSwimming(delta) {
  if (currentScene !== "village") {
    player.isSwimming = false;
    player.oxygen = Math.min(player.maxOxygen, player.oxygen + delta * 3);
    return;
  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2 + 6;
  player.isSwimming = isPointInVillageWater(centerX, centerY);

  if (player.isSwimming) {
    if (activePowerUps.waterBreathing <= 0) {
      player.oxygen = Math.max(0, player.oxygen - delta * 0.55);
    } else {
      player.oxygen = Math.min(player.maxOxygen, player.oxygen + delta * 1.5);
    }

    waterSoundTimer -= delta;
    if (waterSoundTimer <= 0) {
      playSound("water");
      waterSoundTimer = 1.6;
    }

    if (player.oxygen <= 0) {
      oxygenDamageTimer -= delta;
      if (oxygenDamageTimer <= 0) {
        takeDamage(1, centerX, centerY);
        oxygenDamageTimer = 1.4;
      }
    } else {
      oxygenDamageTimer = 0.6;
    }
  } else {
    player.oxygen = Math.min(player.maxOxygen, player.oxygen + delta * 2.2);
    oxygenDamageTimer = 0;
  }
}

function canMoveTo(nextX, nextY) {
  const rect = getPlayerRect(nextX, nextY);
  if (gameOver) return false;
  const sceneWidth = getSceneWidth();
  const sceneHeight = getSceneHeight();

  if (
    rect.x < 0 ||
    rect.y < 0 ||
    rect.x + rect.width > sceneWidth ||
    rect.y + rect.height > sceneHeight
  ) {
    return false;
  }

  if (hitsWater(rect) && currentScene !== "village") return false;

  return !colliders.some((obj) => isColliderActive(obj) && rectsOverlap(rect, obj));
}

function canEntityMoveTo(entity, nextX, nextY) {
  const rect = {
    x: nextX,
    y: nextY,
    width: entity.width,
    height: entity.height
  };
  const sceneWidth = getSceneWidth();
  const sceneHeight = getSceneHeight();

  if (rect.x < 0 || rect.y < 0 || rect.x + rect.width > sceneWidth || rect.y + rect.height > sceneHeight) {
    return false;
  }

  if (currentScene === "crystalDimension" && hitsWater(rect)) return false;
  if (currentScene === "village" && hitsWater(rect) && !entity.canSwim && !entity.canFly) return false;

  return !colliders.some((obj) => (
    obj !== entity &&
    obj.type !== "enemy" &&
    isColliderActive(obj) &&
    !entityIgnoresCollider(entity, obj) &&
    rectsOverlap(rect, obj)
  ));
}

function entityIgnoresCollider(entity, obj) {
  if (entity.canFly && ["tree", "fence", "rock", "well", "bench"].includes(obj.type)) return true;
  if (entity.kind === "fantasma" && !["block", "house", "playerHouse", "shop", "cave"].includes(obj.type)) return true;
  return false;
}

function getSceneWidth() {
  if (currentScene === "village") return WORLD_WIDTH;
  if (currentScene === "crystalDimension") return CRYSTAL_WIDTH;
  return HOME_WIDTH;
}

function getSceneHeight() {
  if (currentScene === "village") return WORLD_HEIGHT;
  if (currentScene === "crystalDimension") return CRYSTAL_HEIGHT;
  return HOME_HEIGHT;
}

function getSceneName() {
  if (currentScene === "home") return "Casa";
  if (currentScene === "shopInterior") return "Loja";
  if (currentScene === "mayorInterior") return "Prefeito";
  if (currentScene === "crystalDimension") return "Dimensao Cristalina";
  return "Vila";
}

function setActiveScene(scene) {
  const validScenes = ["village", "home", "shopInterior", "mayorInterior", "crystalDimension"];
  const safeScene = validScenes.includes(scene) ? scene : "village";
  if (safeScene !== scene) {
    showErrorMessage(`Cena invalida "${scene}". Voltando para a vila.`);
  }

  currentScene = safeScene;
  if (safeScene === "home") objects = homeObjects;
  else if (safeScene === "shopInterior") objects = shopInteriorObjects;
  else if (safeScene === "mayorInterior") objects = mayorInteriorObjects;
  else if (safeScene === "crystalDimension") objects = crystalDimensionObjects;
  else objects = villageObjects;
  normalizeRuntimeState();
  colliders = objects.filter((obj) => obj.solid);
  interactables = objects.filter((obj) => obj.message);
  closeDialog();
  closeShop();
  keys.clear();
  projectiles.length = 0;
  enemyProjectiles.length = 0;
}

function normalizeRuntimeState() {
  normalizeLevelState();
  inventory.cristais = Number(inventory.cristais || 0);
  inventory.chaves = Number(inventory.chaves || 0);
  inventory.pocoes = Number(inventory.pocoes || 0);
  inventory.moedas = Number(inventory.moedas || 0);
  inventory.espadas = Number(inventory.espadas || 0);
  inventory.cartas = Number(inventory.cartas || 0);
  inventory.fragmentos = Number(inventory.fragmentos || 0);
  inventory.flechas = Number(inventory.flechas ?? 12);
  inventory.chavesRaras = Number(inventory.chavesRaras || 0);
  inventory.manaOrbes = Number(inventory.manaOrbes || 0);
  if (!Array.isArray(inventory.itensBoss)) inventory.itensBoss = [];

  if (!questBook.defeatedBosses || typeof questBook.defeatedBosses !== "object") {
    questBook.defeatedBosses = {};
  }
  if (!questBook.openedChests || typeof questBook.openedChests !== "object") {
    questBook.openedChests = {};
  }
  if (!questBook.discoveredAreas || typeof questBook.discoveredAreas !== "object") {
    questBook.discoveredAreas = {};
  }

  if (!Array.isArray(player.unlockedWeapons) || !player.unlockedWeapons.length) player.unlockedWeapons = [...weaponOrder];
  player.unlockedWeapons = player.unlockedWeapons.filter((key) => weapons[key]);
  if (!player.unlockedWeapons.length) player.unlockedWeapons = ["sword"];
  currentWeaponIndex = Number.isFinite(Number(currentWeaponIndex)) ? Math.floor(Number(currentWeaponIndex)) : 0;
  currentWeaponIndex = clamp(currentWeaponIndex, 0, player.unlockedWeapons.length - 1);
  if (!powerSlots.includes(equippedPower)) equippedPower = "fireball";
  if (!Number.isFinite(player.oxygen)) player.oxygen = player.maxOxygen;
  if (!Number.isFinite(player.maxOxygen)) player.maxOxygen = 10;
  player.oxygen = clamp(player.oxygen, 0, player.maxOxygen);

  for (const obj of villageObjects) {
    if (obj.type === "enemy") normalizeEnemy(obj);
  }
}

function normalizeEnemy(obj) {
  const stats = getEnemyStats(obj.kind);
  obj.width = obj.width || stats.width;
  obj.height = obj.height || stats.height;
  obj.maxHp = obj.maxHp || stats.hp;
  obj.hp = Number.isFinite(obj.hp) ? clamp(obj.hp, 0, obj.maxHp) : obj.maxHp;
  obj.damage = obj.damage || stats.damage;
  obj.speed = obj.speed || stats.speed;
  obj.aggroRange = obj.aggroRange || stats.aggroRange;
  obj.attackRange = obj.attackRange || stats.attackRange;
  obj.attackDelay = obj.attackDelay || stats.attackDelay;
  obj.attackCooldown = Number.isFinite(obj.attackCooldown) ? obj.attackCooldown : 0;
  obj.attackTimer = Number.isFinite(obj.attackTimer) ? obj.attackTimer : 0;
  obj.invulnerableTimer = Number.isFinite(obj.invulnerableTimer) ? obj.invulnerableTimer : 0;
  obj.knockbackX = Number.isFinite(obj.knockbackX) ? obj.knockbackX : 0;
  obj.knockbackY = Number.isFinite(obj.knockbackY) ? obj.knockbackY : 0;
  obj.spawnX = Number.isFinite(obj.spawnX) ? obj.spawnX : obj.x;
  obj.spawnY = Number.isFinite(obj.spawnY) ? obj.spawnY : obj.y;
  obj.canFly = Boolean(obj.canFly || stats.canFly);
  obj.canSwim = Boolean(obj.canSwim || stats.canSwim);
  obj.projectileType = obj.projectileType || stats.projectileType || null;
  obj.dropTable = obj.dropTable || stats.dropTable || { coin: 0.7, potion: 0.1, powerUp: 0.1, loot: 0.1 };
  obj.coinReward = Number.isFinite(obj.coinReward) ? obj.coinReward : stats.coinReward;
  obj.coinsReward = obj.coinReward;
  obj.xpReward = obj.xpReward || stats.xpReward || obj.coinReward;
  obj.defense = Number.isFinite(obj.defense) ? obj.defense : stats.defense || 0;
  obj.resistances = obj.resistances || stats.resistances || {};
  obj.boss = Boolean(obj.boss || stats.boss);
  obj.bossItem = obj.bossItem || stats.bossItem || null;
  obj.phase = obj.phase || 1;
  obj.direction = obj.direction || "down";
  obj.moveTimer = Number.isFinite(obj.moveTimer) ? obj.moveTimer : 0;
  obj.alive = obj.alive !== false;
}

function updateDeviceMode() {
  isMobile = window.matchMedia("(max-width: 880px), (pointer: coarse)").matches;
  document.body.classList.toggle("is-mobile", isMobile);

  const tooSmall = isMobile && window.innerWidth < 720 && window.innerHeight > window.innerWidth;
  orientationHint?.classList.toggle("hidden", !tooSmall);
  mobileDebugButton?.classList.toggle("hidden", !debugEnabled);
  debugPanel?.classList.toggle("hidden", !debugEnabled);
}

function ensureCanvasSize() {
  if (canvas.width <= 0) canvas.width = 960;
  if (canvas.height <= 0) canvas.height = 640;
  if (miniMapCanvas.width <= 0) miniMapCanvas.width = 170;
  if (miniMapCanvas.height <= 0) miniMapCanvas.height = 124;
}

function vibrate(pattern = 20) {
  if (!isMobile || !navigator.vibrate) return;
  try {
    navigator.vibrate(pattern);
  } catch (error) {
    // Alguns navegadores bloqueiam vibracao fora de gestos do usuario.
  }
}

function setMobilePressedButton(name) {
  pressedMobileButton = name;
}

function clearMobilePressedButton(name) {
  if (pressedMobileButton === name) pressedMobileButton = "";
}

function requestGameFullscreen() {
  const target = document.documentElement;
  const request = target.requestFullscreen || target.webkitRequestFullscreen || target.msRequestFullscreen;
  if (!request) {
    startMessage.textContent = "Tela cheia nao e suportada neste navegador.";
    return;
  }

  try {
    const result = request.call(target);
    if (result?.catch) {
      result.catch(() => {
        startMessage.textContent = "Toque novamente para ativar tela cheia.";
      });
    }
  } catch (error) {
    startMessage.textContent = "Toque novamente para ativar tela cheia.";
  }
}

function keepPauseMenuVisible() {
  if (!pausePanel || pausePanel.classList.contains("hidden")) return;
  const menu = pausePanel.querySelector(".pause-menu");
  if (menu) menu.scrollTop = Math.min(menu.scrollTop, Math.max(0, menu.scrollHeight - menu.clientHeight));
}

function setPause(open) {
  pauseOpen = Boolean(open);
  pausePanel?.classList.toggle("hidden", !pauseOpen);
  if (pauseOpen) {
    keepPauseMenuVisible();
    closeOverlayPanels();
    if (inventoryOpen) toggleInventory(false);
    closeShop();
    keys.clear();
  } else {
    keys.clear();
  }
}

function showHowTo() {
  showInfo(
    "Como Jogar",
    "PC:\nW A S D ou setas: mover\nE: interagir\nI: inventario\nMouse: mirar\nClique esquerdo: atacar\nQ: usar poder equipado\n1, 2, 3, 4: escolher poder\nTab: trocar arma\nEspaco: dash\nU: usar pocao\nM: missoes\nC: status\nEsc: menu\nF3: debug\n\nCelular:\nJoystick: mover\nAtaque: atacar\nPoder: usar poder equipado\nInteragir: conversar, abrir, entrar ou ativar\nInventario: abrir bolsa\nDash: esquivar\nPocao: curar\n\nProgressao:\nDerrote inimigos, complete missoes, ative cristais e abra baus para ganhar XP.\nO nivel maximo e 1000."
  );
}

function returnToStartMenu() {
  setPause(false);
  closeOverlayPanels();
  closeDialog();
  closeShop();
  inventoryOpen = false;
  inventoryPanel.classList.add("hidden");
  gameStarted = false;
  startScreen.classList.remove("hidden");
  keys.clear();
  resetJoystick();
}

function enterHome() {
  lastVillagePosition = { x: player.x, y: player.y };
  setActiveScene("home");
  player.x = 14 * TILE + 8;
  player.y = 16 * TILE;
  player.direction = "up";
}

function exitHome() {
  setActiveScene("village");
  player.x = 25 * TILE;
  player.y = 37 * TILE;
  player.direction = "down";
}

function enterShopInterior() {
  lastVillagePosition = { x: player.x, y: player.y };
  setActiveScene("shopInterior");
  player.x = 14 * TILE + 8;
  player.y = 16 * TILE;
  player.direction = "up";
}

function exitShopInterior() {
  setActiveScene("village");
  player.x = 43 * TILE + 12;
  player.y = 10 * TILE + 18;
  player.direction = "down";
}

function enterMayorInterior() {
  lastVillagePosition = { x: player.x, y: player.y };
  setActiveScene("mayorInterior");
  player.x = 14 * TILE + 8;
  player.y = 16 * TILE;
  player.direction = "up";
}

function exitMayorInterior() {
  setActiveScene("village");
  player.x = 37 * TILE + 12;
  player.y = 11 * TILE + 18;
  player.direction = "down";
}

function enterCrystalDimension() {
  lastVillagePosition = { x: player.x, y: player.y };
  const firstVisit = !questBook.discoveredAreas?.crystalDimension;
  if (!questBook.discoveredAreas) questBook.discoveredAreas = {};
  questBook.discoveredAreas.crystalDimension = true;
  dimensionQuest.entered = true;
  setActiveScene("crystalDimension");
  player.x = 22 * TILE + 16;
  player.y = 30 * TILE;
  player.direction = "up";
  playSound("portal");
  vibrate([20, 35, 20]);
  showHudToast("Voce entrou na Dimensao Cristalina");
  showDialogMessage("Voce atravessou o portal e chegou na Dimensao Cristalina.");
  if (firstVisit) awardXp(150, "Nova dimensao");
  updateQuestProgress();
}

function exitCrystalDimension() {
  setActiveScene("village");
  player.x = 35 * TILE;
  player.y = 27 * TILE;
  player.direction = "down";
  playSound("portal");
  vibrate([20, 35, 20]);
  showHudToast("Voce voltou para a vila");
  showDialogMessage("O portal devolveu voce para a vila.");
  updateQuestProgress();
}

function handleMapTransitions() {
  const playerCenter = {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    width: 1,
    height: 1
  };

  if (currentScene === "village") {
    const homeDoor = {
      x: 24 * TILE + 18,
      y: 33 * TILE + 82,
      width: 40,
      height: 30
    };
    if (rectsOverlap(playerCenter, homeDoor)) enterHome();
    const shopDoor = {
      x: 42 * TILE + 18,
      y: 6 * TILE + 82,
      width: 40,
      height: 30
    };
    if (rectsOverlap(playerCenter, shopDoor)) enterShopInterior();
    const mayorDoor = {
      x: 36 * TILE + 18,
      y: 8 * TILE + 82,
      width: 40,
      height: 30
    };
    if (rectsOverlap(playerCenter, mayorDoor)) enterMayorInterior();
    return;
  }

  const exitDoor = {
    x: 14 * TILE,
    y: 18 * TILE,
    width: TILE * 2,
    height: TILE * 2
  };
  if (!rectsOverlap(playerCenter, exitDoor)) return;
  if (currentScene === "home") exitHome();
  else if (currentScene === "shopInterior") exitShopInterior();
  else if (currentScene === "mayorInterior") exitMayorInterior();
}

function update(delta) {
  ensureCanvasSize();
  if (!["village", "home", "shopInterior", "mayorInterior", "crystalDimension"].includes(currentScene)) {
    setActiveScene("village");
  }

  if (!gameStarted) {
    updateHud();
    updateDebugPanel(delta);
    updateHudToast(delta);
    return;
  }

  if (gameOver) {
    updateHud();
    updateDebugPanel(delta);
    updateHudToast(delta);
    return;
  }

  updateTimedEffects(delta);
  player.levelGlowTimer = Math.max(0, Number(player.levelGlowTimer || 0) - delta);
  if (hitstopTimer > 0) {
    hitstopTimer = Math.max(0, hitstopTimer - delta);
    updateAttack(delta);
    updateFloatingTexts(delta);
    updateVisualEffects(delta);
    updateHud();
    updateHudToast(delta);
    return;
  }

  if (pauseOpen || inventoryOpen || shopOpen) {
    updateHud();
    updateInteractionHint();
    updateDebugPanel(delta);
    updateHudToast(delta);
    return;
  }

  const movement = getMovementInput();
  const inputX = movement.x;
  const inputY = movement.y;

  player.moving = inputX !== 0 || inputY !== 0;

  applyPlayerKnockback(delta);
  updateSwimming(delta);

  if (player.moving && !dialogOpen && !inventoryOpen && !shopOpen && Math.abs(playerKnockbackX) + Math.abs(playerKnockbackY) < 8) {
    const length = Math.hypot(inputX, inputY) || 1;
    const strength = movement.strength;
    const moveX = (inputX / length) * getPlayerSpeed() * strength * delta;
    const moveY = (inputY / length) * getPlayerSpeed() * strength * delta;

    if (Math.abs(inputX) > Math.abs(inputY)) {
      player.direction = inputX > 0 ? "right" : "left";
    } else if (inputY !== 0) {
      player.direction = inputY > 0 ? "down" : "up";
    }

    // Testa cada eixo separado para o jogador deslizar em paredes.
    if (canMoveTo(player.x + moveX, player.y)) player.x += moveX;
    if (canMoveTo(player.x, player.y + moveY)) player.y += moveY;
    updateSwimming(delta);
    handleMapTransitions();

    player.animTimer += delta;
    if (player.animTimer > 0.14) {
      player.frame = (player.frame + 1) % 4;
      player.animTimer = 0;
    }
  } else {
    player.frame = 0;
    player.animTimer = 0;
  }

  updateNpcs(delta);
  updateEnemies(delta);
  updateProjectiles(delta);
  updateEnemyProjectiles(delta);
  updateHazards(delta);
  collectWorldItems();
  collectPowerUps();
  updateLoot(delta);
  updateAttack(delta);
  updateFloatingTexts(delta);
  updateVisualEffects(delta);

  camera.x = clamp(player.x + player.width / 2 - canvas.width / 2, 0, getSceneWidth() - canvas.width);
  camera.y = clamp(player.y + player.height / 2 - canvas.height / 2, 0, getSceneHeight() - canvas.height);

  playerPositionEl.textContent = getAreaName();
  checkAreaDiscovery();
  collectCrystals();
  updateQuestProgress();
  updateHud();
  updateInteractionHint();
  updateDebugPanel(delta);
  updateHudToast(delta);
  if (saveNoticeTimer > 0) saveNoticeTimer = Math.max(0, saveNoticeTimer - delta);
}

function updateNpcs(delta) {
  if (currentScene !== "village" || dialogOpen || shopOpen) return;

  for (const obj of villageObjects) {
    if (obj.type !== "npc" || obj.role === "shopkeeper") continue;

    obj.moveTimer -= delta;
    if (obj.moveTimer <= 0) {
      const directions = ["up", "down", "left", "right", "idle"];
      obj.direction = directions[Math.floor(Math.random() * directions.length)];
      obj.moveTimer = 1 + Math.random() * 2.5;
    }

    if (obj.direction === "idle") continue;

    const step = directionVector(obj.direction);
    const nextX = obj.x + step.x * obj.speed * delta;
    const nextY = obj.y + step.y * obj.speed * delta;
    const nearSpawn = Math.hypot(nextX - obj.spawnX, nextY - obj.spawnY) < TILE * 4;
    if (nearSpawn && canEntityMoveTo(obj, nextX, nextY)) {
      obj.x = nextX;
      obj.y = nextY;
    } else {
      obj.moveTimer = 0;
    }
  }
}

function updateEnemies(delta) {
  if (currentScene !== "village") return;

  damageCooldown = Math.max(0, damageCooldown - delta);
  const playerRect = getPlayerRect();
  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive) continue;
    normalizeEnemy(obj);

    obj.invulnerableTimer = Math.max(0, obj.invulnerableTimer - delta);
    obj.attackCooldown = Math.max(0, obj.attackCooldown - delta);
    obj.attackTimer = Math.max(0, obj.attackTimer - delta);

    if (Math.abs(obj.knockbackX) + Math.abs(obj.knockbackY) > 1) {
      const nextX = obj.x + obj.knockbackX * delta;
      const nextY = obj.y + obj.knockbackY * delta;
      if (canEntityMoveTo(obj, nextX, obj.y)) obj.x = nextX;
      if (canEntityMoveTo(obj, obj.x, nextY)) obj.y = nextY;
      obj.knockbackX *= 0.84;
      obj.knockbackY *= 0.84;
      continue;
    }

    obj.knockbackX = 0;
    obj.knockbackY = 0;

    const enemyCenterX = obj.x + obj.width / 2;
    const enemyCenterY = obj.y + obj.height / 2;
    const distanceToPlayer = Math.hypot(playerCenterX - enemyCenterX, playerCenterY - enemyCenterY);
    const distanceToSpawn = Math.hypot(obj.x - obj.spawnX, obj.y - obj.spawnY);
    const isAquaticHunter = obj.kind === "peixeHostil" || obj.kind === "serpenteLago";
    const canNoticePlayer = !isAquaticHunter || player.isSwimming || distanceToPlayer < 90;
    const isRanged = Boolean(obj.projectileType);

    if (obj.boss) {
      obj.phase = obj.hp <= obj.maxHp * 0.5 ? 2 : 1;
    }

    if (canNoticePlayer && isRanged && distanceToPlayer < obj.attackRange && obj.attackCooldown <= 0) {
      fireEnemyProjectile(obj, playerCenterX, playerCenterY);
      if (obj.boss && obj.phase === 2) fireBossPattern(obj, playerCenterX, playerCenterY);
      if (obj.kind === "aranhaRainha" || obj.kind === "aranha") {
        spawnHazardZone("web", playerCenterX, playerCenterY, obj.boss ? 44 : 30, 2.3, 1);
      }
      obj.attackCooldown = obj.attackDelay * (obj.phase === 2 ? 0.72 : 1);
      obj.state = "attack";
    }

    if (distanceToPlayer < obj.aggroRange && canNoticePlayer) {
      obj.state = "chase";
      const lowHealth = obj.hp <= obj.maxHp * 0.3;
      const shouldFlee = lowHealth && ["goblin", "arqueiroGoblin", "magoSombrio", "bruxoSombrio"].includes(obj.kind);
      const shouldKeepDistance = isRanged && distanceToPlayer < obj.attackRange * 0.55;
      const speedMultiplier = obj.boss && obj.phase === 2 ? 1.18 : 1;

      if (shouldFlee || shouldKeepDistance) {
        obj.state = "retreat";
        moveEnemyToward(obj, enemyCenterX - playerCenterX, enemyCenterY - playerCenterY, delta, speedMultiplier * 0.78);
      } else {
        let chaseX = playerCenterX - enemyCenterX;
        let chaseY = playerCenterY - enemyCenterY;
        if (obj.kind === "aranha" || obj.kind === "aranhaRainha") {
          chaseX += Math.sin(performance.now() / 260 + obj.spawnX) * 60;
          chaseY += Math.cos(performance.now() / 280 + obj.spawnY) * 45;
        }
        moveEnemyToward(obj, chaseX, chaseY, delta, speedMultiplier);
      }
    } else if (distanceToSpawn > TILE * 2) {
      obj.state = "return";
      moveEnemyToward(obj, obj.spawnX - obj.x, obj.spawnY - obj.y, delta, 0.75);
    } else {
      obj.state = "idle";
      updateEnemyWander(obj, delta);
    }

    if (obj.kind === "slimeVermelho" && obj.state === "chase" && Math.random() < delta * 0.55) {
      spawnHazardZone("slime", enemyCenterX, enemyCenterY, 24, 1.8, 1);
    }

    if (obj.kind === "serpenteLago" && obj.phase === 2 && Math.random() < delta * 0.35) {
      spawnHazardZone("whirlpool", playerCenterX, playerCenterY, 38, 1.6, 1);
    }

    if (obj.boss && distanceToPlayer < 130 && obj.attackTimer <= 0) {
      enemyProjectiles.push({
        type: "bossWave",
        x: enemyCenterX,
        y: enemyCenterY,
        radius: 10,
        maxRadius: obj.phase === 2 ? 120 : 88,
        timer: 0.7,
        damage: obj.damage
      });
      obj.attackTimer = obj.attackDelay + (obj.phase === 2 ? 0.35 : 0.8);
      playSound("shockwave");
    }

    if (rectsOverlap(playerRect, obj) && damageCooldown <= 0) {
      takeDamage(obj.damage, enemyCenterX, enemyCenterY);
      damageCooldown = obj.attackDelay;
    }
  }
}

function moveEnemyToward(obj, dx, dy, delta, speedMultiplier = 1) {
  const length = Math.hypot(dx, dy) || 1;
  const nextX = obj.x + (dx / length) * obj.speed * speedMultiplier * delta;
  const nextY = obj.y + (dy / length) * obj.speed * speedMultiplier * delta;

  if (Math.abs(dx) > Math.abs(dy)) obj.direction = dx > 0 ? "right" : "left";
  else obj.direction = dy > 0 ? "down" : "up";

  if (canEntityMoveTo(obj, nextX, obj.y) && !enemyWouldCrowd(obj, nextX, obj.y)) obj.x = nextX;
  if (canEntityMoveTo(obj, obj.x, nextY) && !enemyWouldCrowd(obj, obj.x, nextY)) obj.y = nextY;
}

function enemyWouldCrowd(obj, nextX, nextY) {
  const centerX = nextX + obj.width / 2;
  const centerY = nextY + obj.height / 2;

  return villageObjects.some((other) => {
    if (other === obj || other.type !== "enemy" || !other.alive) return false;
    const otherCenterX = other.x + other.width / 2;
    const otherCenterY = other.y + other.height / 2;
    const minDistance = (Math.max(obj.width, obj.height) + Math.max(other.width, other.height)) * 0.38;
    return Math.hypot(centerX - otherCenterX, centerY - otherCenterY) < minDistance;
  });
}

function updateEnemyWander(obj, delta) {
  obj.moveTimer -= delta;
  if (obj.moveTimer <= 0) {
    const directions = ["up", "down", "left", "right", "idle"];
    obj.direction = directions[Math.floor(Math.random() * directions.length)];
    obj.moveTimer = 0.8 + Math.random() * 1.8;
  }

  if (obj.direction === "idle") return;
  const step = directionVector(obj.direction);
  const nextX = obj.x + step.x * obj.speed * 0.55 * delta;
  const nextY = obj.y + step.y * obj.speed * 0.55 * delta;
  const nearSpawn = Math.hypot(nextX - obj.spawnX, nextY - obj.spawnY) < TILE * 4;
  if (nearSpawn && canEntityMoveTo(obj, nextX, nextY) && !enemyWouldCrowd(obj, nextX, nextY)) {
    obj.x = nextX;
    obj.y = nextY;
  } else {
    obj.moveTimer = 0;
  }
}

function fireEnemyProjectile(obj, targetX, targetY, angleOffset = 0) {
  const centerX = obj.x + obj.width / 2;
  const centerY = obj.y + obj.height / 2;
  const dx = targetX - centerX;
  const dy = targetY - centerY;
  const angle = Math.atan2(dy, dx) + angleOffset;
  const type = obj.projectileType || (obj.boss ? "bossBolt" : "shadow");
  const config = getEnemyProjectileConfig(type, obj);

  enemyProjectiles.push({
    type,
    x: centerX - config.width / 2,
    y: centerY - config.height / 2,
    width: config.width,
    height: config.height,
    vx: Math.cos(angle) * config.speed,
    vy: Math.sin(angle) * config.speed,
    damage: obj.damage,
    timer: config.timer
  });
  playSound("enemyMagic");
}

function getEnemyProjectileConfig(type, obj) {
  const bossBoost = obj.boss ? 1.18 : 1;
  const configs = {
    arrow: { width: 14, height: 5, speed: 210 * bossBoost, timer: 2.2 },
    shadow: { width: 11, height: 11, speed: 170 * bossBoost, timer: 2.1 },
    stone: { width: 13, height: 13, speed: 155 * bossBoost, timer: 2.3 },
    bubble: { width: 12, height: 12, speed: 170 * bossBoost, timer: 2.2 },
    fire: { width: 13, height: 13, speed: 220 * bossBoost, timer: 2.0 },
    slimeBall: { width: 14, height: 12, speed: 165 * bossBoost, timer: 2.0 },
    web: { width: 14, height: 14, speed: 155 * bossBoost, timer: 2.0 },
    bossBolt: { width: 14, height: 14, speed: 190, timer: 2.2 }
  };
  return configs[type] || configs.shadow;
}

function fireBossPattern(obj, targetX, targetY) {
  if (obj.kind === "reiSlime") {
    fireEnemyProjectile(obj, targetX, targetY, -0.38);
    fireEnemyProjectile(obj, targetX, targetY, 0.38);
  } else if (obj.kind === "aranhaRainha") {
    spawnHazardZone("web", targetX, targetY, 48, 2.5, 1);
  } else if (obj.kind === "golemAncestral") {
    fireEnemyProjectile(obj, targetX, targetY, -0.24);
    fireEnemyProjectile(obj, targetX, targetY, 0.24);
  } else if (obj.kind === "bruxoSombrio") {
    for (const offset of [-0.42, 0, 0.42]) fireEnemyProjectile(obj, targetX, targetY, offset);
  } else if (obj.kind === "serpenteLago") {
    spawnHazardZone("whirlpool", targetX, targetY, 42, 1.8, 1);
    fireEnemyProjectile(obj, targetX, targetY, -0.3);
    fireEnemyProjectile(obj, targetX, targetY, 0.3);
  } else {
    fireEnemyProjectile(obj, targetX, targetY, 0.32);
  }
}

function directionVector(direction) {
  if (direction === "left") return { x: -1, y: 0 };
  if (direction === "right") return { x: 1, y: 0 };
  if (direction === "up") return { x: 0, y: -1 };
  return { x: 0, y: 1 };
}

function getMovementInput() {
  const keyboardX = (keys.has("arrowright") || keys.has("d") ? 1 : 0) -
    (keys.has("arrowleft") || keys.has("a") ? 1 : 0);
  const keyboardY = (keys.has("arrowdown") || keys.has("s") ? 1 : 0) -
    (keys.has("arrowup") || keys.has("w") ? 1 : 0);
  const keyboardLength = Math.hypot(keyboardX, keyboardY);

  if (joystick.active || joystick.strength > 0.05) {
    return {
      x: joystick.x,
      y: joystick.y,
      strength: clamp(joystick.strength, 0, 1)
    };
  }

  return {
    x: keyboardX,
    y: keyboardY,
    strength: keyboardLength > 0 ? 1 : 0
  };
}

function getAimVector() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  if (isMobile) {
    return getMobileAimDirection();
  }

  if (mouseAim.active) {
    const dx = mouseAim.worldX - centerX;
    const dy = mouseAim.worldY - centerY;
    const length = Math.hypot(dx, dy) || 1;
    return { x: dx / length, y: dy / length, angle: Math.atan2(dy, dx) };
  }

  const vector = directionVector(player.direction);
  return { ...vector, angle: Math.atan2(vector.y, vector.x) };
}

function getNearestEnemyToPlayer(maxDistance = 320) {
  if (currentScene !== "village") return null;

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  let nearest = null;
  let nearestDistance = maxDistance;

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive) continue;
    const enemyX = obj.x + obj.width / 2;
    const enemyY = obj.y + obj.height / 2;
    const distance = Math.hypot(enemyX - centerX, enemyY - centerY);
    if (distance <= nearestDistance) {
      nearest = obj;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function getMobileAimDirection(maxDistance = 360) {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  let target = mobileLockedTarget;

  if (!target || !target.alive || Math.hypot(target.x - player.x, target.y - player.y) > maxDistance + 90) {
    target = getNearestEnemyToPlayer(maxDistance);
  }

  currentAutoAimTarget = target;

  if (target) {
    const dx = target.x + target.width / 2 - centerX;
    const dy = target.y + target.height / 2 - centerY;
    const length = Math.hypot(dx, dy) || 1;
    return { x: dx / length, y: dy / length, angle: Math.atan2(dy, dx), target };
  }

  if (joystick.strength > 0.08) {
    return { x: joystick.x, y: joystick.y, angle: Math.atan2(joystick.y, joystick.x), target: null };
  }

  const vector = directionVector(player.direction);
  return { ...vector, angle: Math.atan2(vector.y, vector.x), target: null };
}

function updateDirectionFromAim() {
  const aim = getAimVector();
  if (Math.abs(aim.x) > Math.abs(aim.y)) player.direction = aim.x >= 0 ? "right" : "left";
  else player.direction = aim.y >= 0 ? "down" : "up";
}

function getCurrentWeaponKey() {
  const unlocked = player.unlockedWeapons?.length ? player.unlockedWeapons : weaponOrder;
  return unlocked[currentWeaponIndex % unlocked.length] || "sword";
}

function getCurrentWeapon() {
  return weapons[getCurrentWeaponKey()] || weapons.sword;
}

function cycleWeapon() {
  const unlocked = player.unlockedWeapons?.length ? player.unlockedWeapons : weaponOrder;
  currentWeaponIndex = (currentWeaponIndex + 1) % unlocked.length;
  spawnFloatingText(`Arma: ${getCurrentWeapon().name}`, player.x + 10, player.y - 18, "#fff264");
  showHudToast(`Arma equipada: ${getCurrentWeapon().name}`);
  playSound("weaponSwap");
  updateHud();
}

function equipWeapon(weaponKey) {
  const unlocked = player.unlockedWeapons?.length ? player.unlockedWeapons : weaponOrder;
  const index = unlocked.indexOf(weaponKey);
  if (index === -1 || !weapons[weaponKey]) {
    showHudToast("Arma ainda bloqueada.");
    playSound("invalid");
    return false;
  }

  currentWeaponIndex = index;
  spawnFloatingText(`Arma: ${weapons[weaponKey].name}`, player.x + 10, player.y - 18, "#fff264");
  showHudToast(`Arma equipada: ${weapons[weaponKey].name}`);
  playSound("equipItem");
  updateHud();
  return true;
}

function equipPower(slotIndex) {
  equippedPower = powerSlots[slotIndex] || "fireball";
  spawnFloatingText(`Poder equipado: ${powerNames[equippedPower]}`, player.x + 12, player.y - 18, "#55e8ff");
  showHudToast(`Poder equipado: ${powerNames[equippedPower]}`);
  playSound("powerup");
  vibrate(10);
  updateMobilePowerButtons();
  updateHud();
}

function useEquippedPower() {
  if (equippedPower === "fireball") castFireball();
  else if (equippedPower === "blueRay") castBlueRay();
  else if (equippedPower === "shockwave") shockwave();
  else if (equippedPower === "heal") quickHeal();
}

function updateMobilePowerButtons() {
  const buttons = [touchPower1Button, touchPower2Button, touchPower3Button, touchPower4Button];
  buttons.forEach((button, index) => {
    button?.classList.toggle("is-equipped", powerSlots[index] === equippedPower);
  });
}

function getPlayerSpeed() {
  let speed = player.speed + (activePowerUps.speed > 0 ? 70 : 0);
  if (player.isSwimming) speed *= activePowerUps.waterBreathing > 0 ? 0.82 : 0.58;
  return speed;
}

function getAreaName() {
  if (currentScene !== "village") return getSceneName();
  const tileX = Math.floor(player.x / TILE);
  const tileY = Math.floor(player.y / TILE);

  if (tileX >= 60 && tileY <= 18) return "Ruinas Antigas";
  if (tileX >= 61 && tileY >= 43 && tileY <= 54) return "Arena de Treino";
  if (tileX >= 70 && tileY >= 45) return "Monstros Fortes";
  if (tileX <= 25 && tileY >= 45) return "Floresta Profunda";
  if (tileX <= 21 && tileY >= 47) return "Cemiterio Abandonado";
  if (tileX >= 58 && tileY >= 30 && tileY <= 41) return "Campo Aberto";
  if (tileX >= 58 && tileY >= 18 && tileY <= 30) return "Lago Maior";
  if (tileX >= 51 && tileY >= 51) return "Caminho Secreto";
  return "Vila Principal";
}

function checkAreaDiscovery() {
  if (currentScene !== "village" || !gameStarted || gameOver) return;
  if (!questBook.discoveredAreas) questBook.discoveredAreas = {};
  const areaName = getAreaName();
  if (areaName === "Vila Principal" || questBook.discoveredAreas[areaName]) return;

  questBook.discoveredAreas[areaName] = true;
  awardXp(50, "Nova area");
}

function updateTimedEffects(delta) {
  updatePowerUps(delta);
  playerInvulnerableTimer = Math.max(0, playerInvulnerableTimer - delta);
  player.mana = Math.min(player.maxMana, player.mana + player.manaRegen * delta);

  for (const key of Object.keys(player.spellCooldowns)) {
    player.spellCooldowns[key] = Math.max(0, player.spellCooldowns[key] - delta);
  }
}

function updatePowerUps(delta) {
  for (const key of Object.keys(activePowerUps)) {
    activePowerUps[key] = Math.max(0, activePowerUps[key] - delta);
  }

  if (activePowerUps.regen > 0) {
    regenTickTimer += delta;
    if (regenTickTimer >= 1.2) {
      regenTickTimer = 0;
      if (player.health < player.maxHealth) {
        player.health = Math.min(player.maxHealth, player.health + 1);
        spawnFloatingText("+1", player.x + 8, player.y - 8, "#7bdb73");
      }
    }
  } else {
    regenTickTimer = 0;
  }
}

function applyPlayerKnockback(delta) {
  if (Math.abs(playerKnockbackX) + Math.abs(playerKnockbackY) < 1) {
    playerKnockbackX = 0;
    playerKnockbackY = 0;
    return;
  }

  const nextX = player.x + playerKnockbackX * delta;
  const nextY = player.y + playerKnockbackY * delta;
  if (canMoveTo(nextX, player.y)) player.x = nextX;
  if (canMoveTo(player.x, nextY)) player.y = nextY;
  playerKnockbackX *= 0.86;
  playerKnockbackY *= 0.86;
}

function spendMana(cost) {
  if (player.mana < cost) {
    spawnFloatingText("Mana insuficiente!", player.x - 18, player.y - 18, "#55e8ff");
    showHudToast("Mana insuficiente!");
    return false;
  }

  player.mana = Math.max(0, player.mana - cost);
  return true;
}

function canUsePower(name, cost) {
  if (gameOver || dialogOpen || inventoryOpen || shopOpen || pauseOpen) return false;
  if (player.spellCooldowns[name] > 0) return false;
  return spendMana(cost);
}

function castFireball() {
  if (!canUsePower("fireball", spellCosts.fireball)) return;

  updateDirectionFromAim();
  const vector = getAimVector();
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  spawnPlayerProjectile({
    type: "fireball",
    x: centerX - 6,
    y: centerY - 6,
    width: 12,
    height: 12,
    vx: vector.x * 330,
    vy: vector.y * 330,
    damage: activePowerUps.force > 0 ? 4 : 3,
    damageType: "fogo",
    distance: 0,
    maxDistance: 360
  });
  player.spellCooldowns.fireball = 0.55;
  playSound("magic");
  vibrate(22);
}

function castBlueRay() {
  if (!canUsePower("blueRay", spellCosts.blueRay)) return;

  updateDirectionFromAim();
  const vector = getAimVector();
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  spawnPlayerProjectile({
    type: "blueRay",
    x: centerX - 5,
    y: centerY - 5,
    width: 10,
    height: 10,
    vx: vector.x * 520,
    vy: vector.y * 520,
    damage: 3,
    damageType: "magico",
    distance: 0,
    maxDistance: 520,
    pierce: 1,
    hitKeys: new Set()
  });
  player.spellCooldowns.blueRay = 0.72;
  playSound("magic");
  vibrate(18);
}

function spawnPlayerProjectile(config) {
  playerProjectiles.push({
    pierce: 0,
    damageType: "fisico",
    hitKeys: new Set(),
    ...config
  });
}

function dash() {
  if (!canUsePower("dash", spellCosts.dash)) return;

  const vector = directionVector(player.direction);
  let moved = 0;
  for (let i = 0; i < 12; i++) {
    const nextX = player.x + vector.x * 12;
    const nextY = player.y + vector.y * 12;
    if (!canMoveTo(nextX, nextY)) break;
    dashTrails.push({ x: player.x, y: player.y, timer: 0.22, direction: player.direction });
    player.x = nextX;
    player.y = nextY;
    moved += 12;
  }

  if (moved > 0) {
    playerInvulnerableTimer = Math.max(playerInvulnerableTimer, 0.35);
    player.spellCooldowns.dash = 1.0;
    playSound("dash");
  }
}

function dodgeDash() {
  if (gameOver || dialogOpen || inventoryOpen || shopOpen || pauseOpen || dodgeCooldownTimer > 0) return;

  let vector = directionVector(player.direction);
  if (isMobile && joystick.strength > 0.08) {
    vector = { x: joystick.x, y: joystick.y };
    if (Math.abs(vector.x) > Math.abs(vector.y)) player.direction = vector.x >= 0 ? "right" : "left";
    else player.direction = vector.y >= 0 ? "down" : "up";
  } else {
    updateDirectionFromAim();
    vector = directionVector(player.direction);
  }
  let moved = 0;
  for (let i = 0; i < 7; i++) {
    const nextX = player.x + vector.x * 10;
    const nextY = player.y + vector.y * 10;
    if (!canMoveTo(nextX, nextY)) break;
    dashTrails.push({ x: player.x, y: player.y, timer: 0.18, direction: player.direction });
    player.x = nextX;
    player.y = nextY;
    moved += 10;
  }

  if (moved > 0) {
    playerInvulnerableTimer = Math.max(playerInvulnerableTimer, 0.28);
    dodgeCooldownTimer = 0.55;
    playSound("dash");
    vibrate(16);
  }
}

function shockwave() {
  if (!canUsePower("shockwave", spellCosts.shockwave)) return;

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const radius = 78;
  shockwaves.push({ x: centerX, y: centerY, radius, timer: 0.32, maxTimer: 0.32 });

  if (currentScene === "village") {
    for (const obj of villageObjects) {
      if (obj.type !== "enemy" || !obj.alive) continue;
      const enemyCenterX = obj.x + obj.width / 2;
      const enemyCenterY = obj.y + obj.height / 2;
      const distance = Math.hypot(enemyCenterX - centerX, enemyCenterY - centerY);
      if (distance <= radius) {
        damageEnemy(obj, 1, centerX, centerY, 260, "magico");
      }
    }
  }

  player.spellCooldowns.shockwave = 2.6;
  playSound("shockwave");
  vibrate([22, 30, 22]);
}

function quickHeal() {
  if (!canUsePower("heal", spellCosts.heal)) return;

  const healed = Math.min(2, player.maxHealth - player.health);
  if (healed <= 0) {
    spawnFloatingText("Vida cheia", player.x - 8, player.y - 18, "#7bdb73");
    player.mana = Math.min(player.maxMana, player.mana + spellCosts.heal);
    return;
  }

  player.health += healed;
  healBursts.push({ x: player.x + player.width / 2, y: player.y + player.height / 2, timer: 0.55, maxTimer: 0.55 });
  spawnFloatingText(`+${healed}`, player.x + 8, player.y - 12, "#7bdb73");
  player.spellCooldowns.heal = 3.0;
  playSound("heal");
  vibrate(18);
}

function updateProjectiles(delta) {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const obj = projectiles[i];
    const moveX = obj.vx * delta;
    const moveY = obj.vy * delta;
    obj.x += moveX;
    obj.y += moveY;
    obj.distance += Math.hypot(moveX, moveY);

    if (currentScene === "village" && projectileTouchesWater(obj)) {
      if (obj.type === "fireball" || obj.type === "fire") {
        spawnFloatingText("pshh", obj.x, obj.y, "#55e8ff");
        projectiles.splice(i, 1);
        continue;
      }
      if (obj.type === "arrow") {
        obj.vx *= 0.985;
        obj.vy *= 0.985;
      }
    }

    if (obj.distance > obj.maxDistance || projectileHitsObstacle(obj)) {
      projectiles.splice(i, 1);
      continue;
    }

    if (currentScene !== "village") continue;
    const target = villageObjects.find((enemyObj) => (
      enemyObj.type === "enemy" &&
      enemyObj.alive &&
      rectsOverlap(obj, enemyObj)
    ));

    if (target) {
      const targetKey = getSaveObjectKey(target);
      if (!obj.hitKeys?.has(targetKey)) {
        damageEnemy(target, obj.damage, obj.x, obj.y, 210, obj.damageType);
        obj.hitKeys?.add(targetKey);
        if (obj.pierce > 0) {
          obj.pierce -= 1;
        } else {
          projectiles.splice(i, 1);
        }
      }
    }
  }
}

function updateEnemyProjectiles(delta) {
  const playerRect = getPlayerRect();

  for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
    const obj = enemyProjectiles[i];

    if (obj.type === "bossWave") {
      obj.timer -= delta;
      obj.radius += (obj.maxRadius / 0.7) * delta;
      const centerX = player.x + player.width / 2;
      const centerY = player.y + player.height / 2;
      const distance = Math.hypot(centerX - obj.x, centerY - obj.y);
      if (distance <= obj.radius && distance >= obj.radius - 20 && damageCooldown <= 0) {
        takeDamage(obj.damage, obj.x, obj.y);
        damageCooldown = 1.0;
      }
      if (obj.timer <= 0) enemyProjectiles.splice(i, 1);
      continue;
    }

    obj.timer -= delta;
    obj.x += obj.vx * delta;
    obj.y += obj.vy * delta;

    if (currentScene === "village" && projectileTouchesWater(obj)) {
      if (obj.type === "fire") {
        spawnFloatingText("pshh", obj.x, obj.y, "#55e8ff");
        enemyProjectiles.splice(i, 1);
        continue;
      }
      if (obj.type === "arrow") {
        obj.vx *= 0.985;
        obj.vy *= 0.985;
      }
    }

    if (obj.timer <= 0 || projectileHitsObstacle(obj)) {
      enemyProjectiles.splice(i, 1);
      continue;
    }

    if (rectsOverlap(playerRect, obj)) {
      takeDamage(obj.damage, obj.x, obj.y);
      enemyProjectiles.splice(i, 1);
    }
  }
}

function projectileHitsObstacle(obj) {
  if (obj.x < 0 || obj.y < 0 || obj.x + obj.width > getSceneWidth() || obj.y + obj.height > getSceneHeight()) {
    return true;
  }

  if (currentScene !== "village" && hitsWater(obj)) return true;
  return colliders.some((collider) => isColliderActive(collider) && rectsOverlap(obj, collider));
}

function projectileTouchesWater(obj) {
  return isPointInVillageWater(obj.x + obj.width / 2, obj.y + obj.height / 2);
}

function damageEnemy(obj, amount, sourceX, sourceY, knockbackPower = 170, damageType = "fisico") {
  if (!obj.alive || obj.invulnerableTimer > 0) return false;

  const critical = Math.random() < player.critChance;
  const resistance = obj.resistances?.[damageType] ?? 1;
  const rawDamage = (critical ? amount * 2 : amount) * resistance - (obj.defense || 0);
  const damage = Math.max(1, Math.round(rawDamage));
  obj.hp -= damage;
  obj.invulnerableTimer = 0.28;

  const centerX = obj.x + obj.width / 2;
  const centerY = obj.y + obj.height / 2;
  const dx = centerX - sourceX;
  const dy = centerY - sourceY;
  const length = Math.hypot(dx, dy) || 1;
  obj.knockbackX = (dx / length) * knockbackPower;
  obj.knockbackY = (dy / length) * knockbackPower;

  spawnFloatingText(critical ? `CRITICO -${damage}` : `-${damage}`, obj.x + obj.width / 2, obj.y - 8, critical ? "#ff4f62" : "#fff264");
  playSound("hitEnemy");
  hitstopTimer = 0.055;

  if (obj.hp <= 0) defeatEnemy(obj);
  return true;
}

function defeatEnemy(obj) {
  obj.alive = false;
  inventory.moedas += obj.coinReward;
  awardXp(getEnemyXpReward(obj), obj.boss ? "Boss derrotado" : "Inimigo derrotado");
  spawnFloatingText(`+${obj.coinReward} moedas`, obj.x, obj.y - 18, "#fff264");
  playSound(obj.boss ? "bossDown" : "enemyDown");

  if (["slime", "slimeVerde", "slimeVermelho", "aranha", "goblin", "morcego"].includes(obj.kind)) {
    const previousCount = questBook.forestMonstersDefeated;
    questBook.forestMonstersDefeated = Math.min(
      questBook.forestMonstersGoal,
      questBook.forestMonstersDefeated + 1
    );
    if (previousCount < questBook.forestMonstersGoal && questBook.forestMonstersDefeated >= questBook.forestMonstersGoal) {
      awardXp(300, "Missao dos monstros");
    }
  }

  if (obj.boss) {
    questBook.bossDefeated = true;
    questBook.defeatedBosses[obj.kind] = true;
    inventory.moedas += 20;
    spawnFloatingText("Item raro!", obj.x, obj.y - 34, "#55e8ff");
    vibrate([40, 60, 60]);
  }

  spawnEnemyDrops(obj);
  updateHud();
  renderInventory();
}

function spawnEnemyDrops(obj) {
  const dropTable = obj.dropTable || {};
  const centerX = obj.x + obj.width / 2 - 8;
  const centerY = obj.y + obj.height / 2 - 8;
  const scatter = (index) => ({
    x: centerX + ((index % 3) - 1) * 16,
    y: centerY + (Math.floor(index / 3) - 1) * 14
  });

  let slot = 0;
  const coinAmount = Math.max(1, Math.ceil(obj.coinReward / 3));
  if (Math.random() < (dropTable.coin ?? 0.75)) {
    const pos = scatter(slot++);
    lootItems.push(lootItem(pos.x, pos.y, "moeda", coinAmount));
  }

  if (Math.random() < (dropTable.potion ?? 0.1)) {
    const pos = scatter(slot++);
    lootItems.push(lootItem(pos.x, pos.y, "pocao", 1));
  }

  if (Math.random() < (dropTable.loot ?? 0.15)) {
    const kind = chooseLootKind(obj);
    const pos = scatter(slot++);
    lootItems.push(lootItem(pos.x, pos.y, kind, kind === "flechas" ? 4 : 1));
  }

  if (obj.boss && obj.bossItem) {
    const pos = scatter(slot++);
    lootItems.push(lootItem(pos.x, pos.y, "bossItem", 1, obj.bossItem));
  }

  if (Math.random() < (dropTable.powerUp ?? 0.1)) {
    const kinds = ["speed", "force", "shield", "regen", "mana"];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    powerUps.push(powerUp(Math.floor(obj.x / TILE), Math.floor(obj.y / TILE), kind, true));
  }
}

function chooseLootKind(obj) {
  if (obj.kind === "arqueiroGoblin") return "flechas";
  if (obj.kind === "magoSombrio" || obj.kind === "bruxoSombrio") return "manaOrbe";
  if (obj.kind === "golemPedra" || obj.kind === "golemAncestral") return "fragmento";
  if (obj.kind === "peixeHostil" || obj.kind === "serpenteLago") return "fragmentoAzul";
  if (Math.random() < 0.06) return "chaveRara";
  return Math.random() < 0.5 ? "fragmento" : "flechas";
}

function lootItem(x, y, kind, amount = 1, itemName = "") {
  return {
    type: "loot",
    kind,
    itemName,
    amount,
    x,
    y,
    width: 16,
    height: 16,
    timer: 0,
    collected: false
  };
}

function updateLoot(delta) {
  if (currentScene !== "village") return;

  const playerRect = getPlayerRect();
  for (let i = lootItems.length - 1; i >= 0; i--) {
    const obj = lootItems[i];
    obj.timer += delta;
    if (!rectsOverlap(playerRect, obj)) continue;
    collectLoot(obj);
    lootItems.splice(i, 1);
  }
}

function collectLoot(obj) {
  const amount = obj.amount || 1;

  if (obj.kind === "moeda") {
    inventory.moedas += amount;
    playSound("coin");
    spawnFloatingText(`+${amount} moedas`, obj.x, obj.y - 8, "#fff264");
  } else if (obj.kind === "pocao") {
    inventory.pocoes += amount;
    playSound("powerup");
    spawnFloatingText("+pocao", obj.x, obj.y - 8, "#d24c63");
  } else if (obj.kind === "flechas") {
    inventory.flechas += amount;
    playSound("powerup");
    spawnFloatingText(`+${amount} flechas`, obj.x, obj.y - 8, "#fff3d6");
  } else if (obj.kind === "manaOrbe") {
    inventory.manaOrbes += amount;
    player.mana = Math.min(player.maxMana, player.mana + 2);
    playSound("magic");
    spawnFloatingText("+mana", obj.x, obj.y - 8, "#55e8ff");
  } else if (obj.kind === "chaveRara") {
    inventory.chavesRaras += amount;
    playSound("chest");
    spawnFloatingText("Chave rara!", obj.x, obj.y - 8, "#fff264");
  } else if (obj.kind === "bossItem") {
    if (!inventory.itensBoss.includes(obj.itemName)) inventory.itensBoss.push(obj.itemName);
    playSound("chest");
    spawnFloatingText(obj.itemName, obj.x, obj.y - 8, "#55e8ff");
  } else {
    inventory.fragmentos += amount;
    playSound("powerup");
    spawnFloatingText(`+${amount} fragmento`, obj.x, obj.y - 8, "#c7ccd4");
  }

  vibrate(obj.kind === "bossItem" || obj.kind === "chaveRara" ? [18, 35, 18] : 12);
  updateHud();
  renderInventory();
}

function spawnHazardZone(type, x, y, radius = 28, timer = 2.2, damage = 1) {
  hazardZones.push({
    type,
    x,
    y,
    radius,
    timer,
    maxTimer: timer,
    damage,
    tick: 0
  });
}

function updateHazards(delta) {
  if (currentScene !== "village") {
    hazardZones.length = 0;
    return;
  }

  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;

  for (let i = hazardZones.length - 1; i >= 0; i--) {
    const obj = hazardZones[i];
    obj.timer -= delta;
    obj.tick -= delta;

    if (obj.timer <= 0) {
      hazardZones.splice(i, 1);
      continue;
    }

    const distance = Math.hypot(playerCenterX - obj.x, playerCenterY - obj.y);
    if (distance <= obj.radius) {
      if (obj.type === "web" && player.moving) {
        player.animTimer += delta * 0.5;
      }

      if (obj.tick <= 0 && damageCooldown <= 0) {
        takeDamage(obj.damage, obj.x, obj.y);
        damageCooldown = obj.type === "whirlpool" ? 0.9 : 1.2;
        obj.tick = 1.1;
      }
    }
  }
}

function spawnFloatingText(text, x, y, color) {
  floatingTexts.push({ text, x, y, color, timer: 1.1, vy: -22 });
}

function updateFloatingTexts(delta) {
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const obj = floatingTexts[i];
    obj.timer -= delta;
    obj.y += obj.vy * delta;
    if (obj.timer <= 0) floatingTexts.splice(i, 1);
  }
}

function updateVisualEffects(delta) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    shockwaves[i].timer -= delta;
    if (shockwaves[i].timer <= 0) shockwaves.splice(i, 1);
  }

  for (let i = dashTrails.length - 1; i >= 0; i--) {
    dashTrails[i].timer -= delta;
    if (dashTrails[i].timer <= 0) dashTrails.splice(i, 1);
  }

  for (let i = healBursts.length - 1; i >= 0; i--) {
    healBursts[i].timer -= delta;
    if (healBursts[i].timer <= 0) healBursts.splice(i, 1);
  }
}

function drawProjectiles() {
  for (const obj of projectiles) {
    const color = getPlayerProjectileColor(obj.type);
    ctx.fillStyle = color.glow;
    ctx.fillRect(obj.x - 5, obj.y - 5, obj.width + 10, obj.height + 10);

    if (obj.type === "arrow") {
      ctx.save();
      ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
      ctx.rotate(Math.atan2(obj.vy, obj.vx));
      ctx.fillStyle = "#273052";
      ctx.fillRect(-8, -2, 16, 4);
      ctx.fillStyle = "#f0b276";
      ctx.fillRect(-6, -1, 11, 2);
      ctx.fillStyle = "#fff3d6";
      ctx.fillRect(4, -3, 4, 6);
      ctx.restore();
      continue;
    }

    ctx.fillStyle = color.main;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    ctx.fillStyle = color.core;
    ctx.fillRect(obj.x + 3, obj.y + 3, Math.max(2, obj.width - 6), Math.max(2, obj.height - 6));
  }

  for (const obj of enemyProjectiles) {
    if (obj.type === "bossWave") {
      ctx.strokeStyle = "rgba(255, 79, 98, 0.85)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.stroke();
      continue;
    }

    const color = getEnemyProjectileColor(obj.type);
    ctx.fillStyle = color.glow;
    ctx.fillRect(obj.x - 4, obj.y - 4, obj.width + 8, obj.height + 8);
    ctx.fillStyle = color.main;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    ctx.fillStyle = color.core;
    ctx.fillRect(obj.x + 3, obj.y + 3, Math.max(2, obj.width - 6), Math.max(2, obj.height - 6));
  }
}

function getPlayerProjectileColor(type) {
  if (type === "blueRay" || type === "blueMagic") {
    return { glow: "rgba(85, 232, 255, 0.34)", main: "#3f8fe5", core: "#e9ffff" };
  }
  if (type === "arrow") {
    return { glow: "rgba(255, 243, 214, 0.18)", main: "#f0b276", core: "#fff3d6" };
  }
  return { glow: "rgba(255, 90, 58, 0.32)", main: "#ff4f62", core: "#fff264" };
}

function getEnemyProjectileColor(type) {
  if (type === "arrow") return { glow: "rgba(255, 243, 214, 0.18)", main: "#f0b276", core: "#fff3d6" };
  if (type === "stone") return { glow: "rgba(199, 204, 212, 0.25)", main: "#8a8da2", core: "#c7ccd4" };
  if (type === "bubble") return { glow: "rgba(85, 232, 255, 0.32)", main: "#3f8fe5", core: "#e9ffff" };
  if (type === "fire") return { glow: "rgba(255, 79, 98, 0.35)", main: "#ff4f62", core: "#fff264" };
  if (type === "slimeBall") return { glow: "rgba(123, 219, 115, 0.32)", main: "#7bdb73", core: "#d9ff73" };
  if (type === "web") return { glow: "rgba(233, 255, 255, 0.22)", main: "#c8dbff", core: "#e9ffff" };
  if (type === "bossBolt") return { glow: "rgba(255, 79, 98, 0.35)", main: "#ff4f62", core: "#fff264" };
  return { glow: "rgba(180, 109, 255, 0.35)", main: "#b46dff", core: "#55e8ff" };
}

function drawShockwaves() {
  for (const obj of shockwaves) {
    const progress = 1 - obj.timer / obj.maxTimer;
    ctx.strokeStyle = `rgba(85, 232, 255, ${1 - progress})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius * progress, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawDashTrails() {
  for (const obj of dashTrails) {
    ctx.fillStyle = `rgba(85, 232, 255, ${obj.timer / 0.22})`;
    ctx.fillRect(obj.x + 4, obj.y + 5, player.width, player.height);
  }
}

function drawHealBursts() {
  for (const obj of healBursts) {
    const progress = 1 - obj.timer / obj.maxTimer;
    ctx.strokeStyle = `rgba(123, 219, 115, ${1 - progress})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, 18 + progress * 28, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawFloatingTexts() {
  ctx.font = "bold 12px Trebuchet MS, Arial";
  ctx.textAlign = "center";
  for (const obj of floatingTexts) {
    ctx.fillStyle = "rgba(26, 31, 61, 0.85)";
    ctx.fillText(obj.text, obj.x + 1, obj.y + 1);
    ctx.fillStyle = obj.color;
    ctx.fillText(obj.text, obj.x, obj.y);
  }
  ctx.textAlign = "start";
}

function drawAimCursor() {
  if (!mouseAim.active || !gameStarted || currentScene !== "village") return;

  ctx.strokeStyle = "rgba(255, 242, 100, 0.75)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(mouseAim.worldX - 8, mouseAim.worldY);
  ctx.lineTo(mouseAim.worldX + 8, mouseAim.worldY);
  ctx.moveTo(mouseAim.worldX, mouseAim.worldY - 8);
  ctx.lineTo(mouseAim.worldX, mouseAim.worldY + 8);
  ctx.stroke();

  ctx.strokeStyle = "rgba(39, 48, 82, 0.85)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(mouseAim.worldX, mouseAim.worldY, 10, 0, Math.PI * 2);
  ctx.stroke();
}

function drawMobileTargetMark() {
  if (!isMobile || currentScene !== "village") return;
  const target = currentAutoAimTarget || getNearestEnemyToPlayer(300);
  if (!target || !target.alive) return;

  const cx = target.x + target.width / 2;
  const cy = target.y + target.height / 2;
  const pulse = 4 + Math.sin(performance.now() / 120) * 2;
  ctx.strokeStyle = "rgba(255, 242, 100, 0.9)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(target.width, target.height) / 2 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 242, 100, 0.85)";
  ctx.fillRect(cx - 2, target.y - 12, 4, 7);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sanitizePlayerName(name, fallback = FALLBACK_PLAYER_NAME) {
  const cleaned = String(name || "").trim().replace(/\s+/g, " ").slice(0, 16);
  return cleaned || fallback;
}

function isTypingInTextField() {
  const el = document.activeElement;
  return Boolean(el && (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT" ||
    el.isContentEditable
  ));
}

function isInfoPanelOpen() {
  return Boolean(infoPanel && !infoPanel.classList.contains("hidden"));
}

function getNameFromInput() {
  return sanitizePlayerName(characterNameInput?.value, DEFAULT_NEW_PLAYER_NAME);
}

function setPlayerName(name, fallback = FALLBACK_PLAYER_NAME) {
  player.name = sanitizePlayerName(name, fallback);
  if (characterNameInput) characterNameInput.value = player.name;
  updateHud();
}

function getPlayerDisplayName() {
  return sanitizePlayerName(player.name, FALLBACK_PLAYER_NAME);
}

function getPlayerHudName() {
  normalizeLevelState();
  if (player.level >= player.maxLevel) return `${getPlayerDisplayName()} | Nv. ${player.level} MAX`;
  return `${getPlayerDisplayName()} | Nv. ${player.level}`;
}

function getXpToNextLevel(level) {
  const safeLevel = clamp(Math.floor(Number(level) || 1), 1, PLAYER_MAX_LEVEL);
  if (safeLevel >= PLAYER_MAX_LEVEL) return 0;
  return Math.floor(50 + safeLevel * safeLevel * 8);
}

function normalizeLevelState() {
  player.name = sanitizePlayerName(player.name, FALLBACK_PLAYER_NAME);
  player.maxLevel = Number.isFinite(Number(player.maxLevel)) ? Math.floor(Number(player.maxLevel)) : PLAYER_MAX_LEVEL;
  player.maxLevel = clamp(player.maxLevel, 1, PLAYER_MAX_LEVEL);
  player.level = Number.isFinite(Number(player.level)) ? Math.floor(Number(player.level)) : 1;
  player.level = clamp(player.level, 1, player.maxLevel);
  player.xp = Math.max(0, Math.floor(Number(player.xp) || 0));
  player.totalXp = Math.max(0, Math.floor(Number(player.totalXp) || 0));
  player.skillPoints = Math.max(0, Math.floor(Number(player.skillPoints) || 0));
  player.damageBonus = Math.max(0, Number(player.damageBonus) || 0);
  player.baseSpeed = Number.isFinite(Number(player.baseSpeed)) ? Number(player.baseSpeed) : 150;
  player.speed = Number.isFinite(Number(player.speed)) ? Number(player.speed) : player.baseSpeed;

  if (player.level >= player.maxLevel) {
    player.level = player.maxLevel;
    player.xp = 0;
    player.xpToNextLevel = 0;
  } else {
    player.xpToNextLevel = getXpToNextLevel(player.level);
  }
}

function awardXp(amount, reason = "XP") {
  normalizeLevelState();
  if (player.level >= player.maxLevel) {
    showHudToast("Nivel maximo");
    updateHud();
    return;
  }

  const gained = Math.max(0, Math.floor(Number(amount) || 0));
  if (!gained) return;

  player.xp += gained;
  player.totalXp += gained;
  spawnFloatingText(`+${gained} XP`, player.x + 8, player.y - 26, "#55e8ff");

  let levelsGained = 0;
  let guard = 0;
  while (player.level < player.maxLevel && player.xp >= player.xpToNextLevel && guard < PLAYER_MAX_LEVEL) {
    player.xp -= player.xpToNextLevel;
    player.level += 1;
    levelsGained += 1;
    applyLevelReward(player.level);
    player.xpToNextLevel = getXpToNextLevel(player.level);
    guard += 1;
  }

  if (player.level >= player.maxLevel) {
    player.level = player.maxLevel;
    player.xp = 0;
    player.xpToNextLevel = 0;
  }

  if (levelsGained > 0) {
    player.levelGlowTimer = 1.6;
    playSound("levelUp");
    vibrate([20, 35, 20]);
    showHudToast(`Subiu para o nivel ${player.level}!`);
    spawnFloatingText(`Nivel ${player.level}!`, player.x - 4, player.y - 42, "#fff264");
  } else {
    showHudToast(`${reason}: +${gained} XP`, 1.7);
  }

  updateHud();
  if (statusOpen) renderStatusPanel();
}

function applyLevelReward(level) {
  player.skillPoints = (player.skillPoints || 0) + 1;
  player.damageBonus = Number(player.damageBonus || 0) + 0.05;

  if (level % 5 === 0) {
    player.maxHealth += 1;
    player.health = Math.min(player.maxHealth, player.health + 1);
  }
  if (level % 3 === 0) {
    player.maxMana += 1;
    player.mana = Math.min(player.maxMana, player.mana + 1);
  }
  if (level % 10 === 0) {
    player.defense += 1;
  }
  if (level % 25 === 0) {
    player.speed = Math.min(190, player.speed + 1);
  }
}

function getEnemyXpReward(obj) {
  if (obj.boss) {
    if (["reiSlime", "aranhaRainha", "golemAncestral", "bruxoSombrio", "serpenteLago"].includes(obj.kind)) return 1000;
    return 200;
  }

  const rewards = {
    slime: 10,
    slimeVerde: 10,
    slimeVermelho: 14,
    slimeAzul: 12,
    morcego: 10,
    aranha: 15,
    goblin: 25,
    arqueiroGoblin: 30,
    magoSombrio: 50,
    golemPedra: 50,
    fantasma: 35,
    peixeHostil: 18,
    miniDragao: 80,
    guardiao: 200
  };

  return rewards[obj.kind] || Math.max(10, Number(obj.xpReward || 10));
}

function countDefeatedBosses() {
  return Object.values(questBook.defeatedBosses || {}).filter(Boolean).length;
}

function countCompletedMissions() {
  return [
    quest.status === "done",
    Boolean(questBook.keyFound),
    questBook.forestMonstersDefeated >= questBook.forestMonstersGoal,
    Boolean(questBook.letterDelivered),
    Boolean(dimensionQuest.missionDone),
    Boolean(questBook.bossChestOpened)
  ].filter(Boolean).length;
}

function readSaveRaw() {
  try {
    return localStorage.getItem(SAVE_KEY);
  } catch (error) {
    startMessage.textContent = "Nao foi possivel acessar o save neste navegador.";
    showHudToast("Save indisponivel neste navegador.");
    return null;
  }
}

function writeSaveRaw(payload) {
  try {
    localStorage.setItem(SAVE_KEY, payload);
    return true;
  } catch (error) {
    startMessage.textContent = "Nao foi possivel salvar, mas o jogo continua.";
    showHudToast("Nao foi possivel salvar.");
    return false;
  }
}

function draw() {
  ensureCanvasSize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-Math.round(camera.x), -Math.round(camera.y));

  drawMap();
  if (currentScene === "crystalDimension") drawDimensionAmbient();
  drawHazards();

  const visibleObjects = objects.filter((obj) => {
    if (!isOnCamera(obj, 96)) return false;
    if (obj.type === "crystal" || obj.type === "collectible") return !obj.collected;
    if (obj.type === "enemy") return obj.alive;
    if (obj.type === "dimensionBlocker" && dimensionQuest.bridgeOpen) return false;
    if (obj.type === "rareChest") return questBook.bossDefeated && !questBook.bossChestOpened;
    return obj.type !== "block";
  });
  const visiblePowerUps = currentScene === "village" ? powerUps.filter((obj) => !obj.collected && isOnCamera(obj, 80)) : [];
  const visibleLoot = currentScene === "village" ? lootItems.filter((obj) => !obj.collected && isOnCamera(obj, 80)) : [];
  const drawables = [...visibleObjects, ...visiblePowerUps, ...visibleLoot, { type: "player", y: player.y, height: player.height }];
  drawables.sort((a, b) => (a.y + a.height) - (b.y + b.height));

  for (const item of drawables) {
    if (item.type === "player") drawPlayer();
    else drawObject(item);
  }
  drawMobileTargetMark();
  drawAttack();
  drawProjectiles();
  drawShockwaves();
  drawDashTrails();
  drawHealBursts();
  drawFloatingTexts();
  drawAimCursor();

  ctx.restore();
  drawMiniMap();
}

function isOnCamera(obj, margin = 64) {
  return (
    obj.x + obj.width >= camera.x - margin &&
    obj.x <= camera.x + canvas.width + margin &&
    obj.y + obj.height >= camera.y - margin &&
    obj.y <= camera.y + canvas.height + margin
  );
}

function drawMap() {
  let activeMap = homeMap;
  let cols = HOME_COLS;
  let rows = HOME_ROWS;

  if (currentScene === "village") {
    activeMap = worldMap;
    cols = MAP_COLS;
    rows = MAP_ROWS;
  } else if (currentScene === "crystalDimension") {
    activeMap = crystalDimensionMap;
    cols = CRYSTAL_COLS;
    rows = CRYSTAL_ROWS;
  }

  const startCol = Math.floor(camera.x / TILE) - 1;
  const endCol = Math.ceil((camera.x + canvas.width) / TILE) + 1;
  const startRow = Math.floor(camera.y / TILE) - 1;
  const endRow = Math.ceil((camera.y + canvas.height) / TILE) + 1;

  for (let y = startRow; y <= endRow; y++) {
    for (let x = startCol; x <= endCol; x++) {
      if (x < 0 || y < 0 || x >= cols || y >= rows) continue;

      const tile = activeMap[y][x];
      const px = x * TILE;
      const py = y * TILE;

      if (tile === "D") drawDirt(px, py, x, y);
      else if (tile === "W") drawWater(px, py, x, y);
      else if (tile === "F") drawForestGrass(px, py, x, y);
      else if (tile === "P") drawPlaza(px, py, x, y);
      else if (tile === "I") drawInteriorFloor(px, py, x, y);
      else if (tile === "B") drawInteriorWall(px, py, x, y);
      else if (tile === "R") drawRug(px, py, x, y);
      else if (tile === "C") drawCrystalFloor(px, py, x, y);
      else if (tile === "Q") drawCrystalPath(px, py, x, y);
      else if (tile === "M") drawMagicWater(px, py, x, y);
      else drawGrass(px, py, x, y);
    }
  }
}

function pixelRect(x, y, width, height, fill, outline = "#273052") {
  ctx.fillStyle = outline;
  ctx.fillRect(Math.round(x), Math.round(y), width, height);
  ctx.fillStyle = fill;
  ctx.fillRect(Math.round(x) + 2, Math.round(y) + 2, width - 4, height - 4);
}

function drawGrass(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#8de68f" : "#82dc83";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#2f8b60";
  if ((tileX * 7 + tileY * 3) % 5 === 0) {
    ctx.fillRect(x + 7, y + 19, 3, 8);
    ctx.fillRect(x + 10, y + 23, 3, 3);
  }
  if ((tileX * 2 + tileY * 9) % 7 === 0) {
    ctx.fillRect(x + 23, y + 8, 3, 8);
    ctx.fillRect(x + 20, y + 13, 3, 3);
  }
}

function drawForestGrass(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#70c96f" : "#67be66";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#26794d";
  ctx.fillRect(x + 5, y + 6, 4, 12);
  if ((tileX * 5 + tileY * 11) % 4 === 0) {
    ctx.fillRect(x + 20, y + 16, 5, 10);
    ctx.fillRect(x + 16, y + 21, 4, 4);
  }
}

function drawDirt(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#a85f4a" : "#9c5744";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#5d3843";
  ctx.fillRect(x + 4, y + 7, 8, 3);
  ctx.fillRect(x + 22, y + 20, 7, 3);
  ctx.fillRect(x + 15, y + 14, 4, 3);
}

function drawPlaza(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#ffd38b" : "#f2c27d";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = "#916b55";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
  ctx.fillStyle = "rgba(255, 255, 240, 0.3)";
  if ((tileX + tileY) % 3 === 0) ctx.fillRect(x + 8, y + 8, 8, 3);
}

function drawWater(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#48a7e6" : "#3b9cdc";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#7bd5ff";
  ctx.fillRect(x + 4, y + 10, 9, 3);
  ctx.fillRect(x + 16, y + 18, 11, 3);
  ctx.fillStyle = "rgba(37, 79, 150, 0.3)";
  ctx.fillRect(x, y + TILE - 3, TILE, 3);
}

function drawCrystalFloor(x, y, tileX, tileY) {
  const pulse = Math.sin(performance.now() / 1200 + tileX * 0.3 + tileY * 0.2) * 10;
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#34205f" : "#2a1a52";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = `rgba(124, ${84 + pulse}, 220, 0.18)`;
  if ((tileX * 3 + tileY * 5) % 6 === 0) ctx.fillRect(x + 8, y + 9, 5, 5);
  if ((tileX * 7 + tileY * 2) % 8 === 0) ctx.fillRect(x + 21, y + 20, 6, 3);
}

function drawCrystalPath(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#5a3d86" : "#50357c";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(222, 194, 255, 0.2)";
  ctx.fillRect(x + 6, y + 7, 10, 3);
  ctx.fillRect(x + 18, y + 21, 8, 3);
  ctx.strokeStyle = "rgba(25, 17, 45, 0.45)";
  ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
}

function drawMagicWater(x, y, tileX, tileY) {
  const wave = Math.sin(performance.now() / 300 + tileX + tileY) * 2;
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#3d48c9" : "#3341aa";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(112, 242, 255, 0.7)";
  ctx.fillRect(x + 5, y + 10 + wave, 10, 3);
  ctx.fillRect(x + 18, y + 19 - wave, 9, 3);
  ctx.fillStyle = "rgba(188, 111, 255, 0.3)";
  ctx.fillRect(x, y + TILE - 4, TILE, 4);
}

function drawDimensionAmbient() {
  const time = performance.now() / 1000;
  const alpha = 0.06 + Math.sin(time * 0.8) * 0.025;

  if (dimensionQuest.bridgeOpen) drawCrystalBridge();

  ctx.fillStyle = `rgba(141, 75, 224, ${alpha})`;
  ctx.fillRect(camera.x, camera.y, canvas.width, canvas.height);

  const particleStep = isMobile ? 2 : 1;
  for (let i = 0; i < dimensionParticles.length; i += particleStep) {
    const particle = dimensionParticles[i];
    const px = particle.x + Math.sin(time * particle.speed + particle.phase) * 14;
    const py = particle.y + Math.cos(time * particle.speed + particle.phase) * 10;
    if (px < camera.x - 8 || px > camera.x + canvas.width + 8 || py < camera.y - 8 || py > camera.y + canvas.height + 8) continue;
    ctx.fillStyle = particle.size === 2 ? "rgba(129, 239, 255, 0.55)" : "rgba(255, 242, 100, 0.45)";
    ctx.fillRect(px, py, particle.size, particle.size);
  }
}

function drawInteriorFloor(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#f0c686" : "#e7b978";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = "rgba(112, 75, 55, 0.28)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
}

function drawInteriorWall(x, y, tileX, tileY) {
  ctx.fillStyle = y < TILE ? "#9cc7f2" : "#6d5c75";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#273052";
  if (tileY === 0) ctx.fillRect(x, y + TILE - 4, TILE, 4);
}

function drawRug(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#d24c63" : "#bd4058";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(255, 242, 100, 0.22)";
  ctx.fillRect(x + 8, y + 8, 16, 16);
}

function drawObject(obj) {
  if (obj.type === "house") drawHouse(obj);
  if (obj.type === "playerHouse") drawPlayerHouse(obj);
  if (obj.type === "shop") drawShop(obj);
  if (obj.type === "tree") drawTree(obj);
  if (obj.type === "fence") drawFence(obj);
  if (obj.type === "sign") drawSign(obj);
  if (obj.type === "well") drawWell(obj);
  if (obj.type === "bench") drawBench(obj);
  if (obj.type === "portal") drawPortal(obj);
  if (obj.type === "dimensionPortal") drawPortal(obj);
  if (obj.type === "dimensionBlocker") drawDimensionBlocker(obj);
  if (obj.type === "dimensionCrystal") drawDimensionCrystal(obj);
  if (obj.type === "dimensionChest") drawDimensionChest(obj);
  if (obj.type === "dimensionSign") drawDimensionSign(obj);
  if (obj.type === "talkingStone") drawTalkingStone(obj);
  if (obj.type === "magicFountain") drawMagicFountain(obj);
  if (obj.type === "largeCrystal") drawLargeCrystal(obj);
  if (obj.type === "strangeTree") drawStrangeTree(obj);
  if (obj.type === "floatingRock") drawFloatingRock(obj);
  if (obj.type === "secretStone") drawSecretStone(obj);
  if (obj.type === "cave") drawCave(obj);
  if (obj.type === "bed") drawBed(obj);
  if (obj.type === "table") drawTable(obj);
  if (obj.type === "counter") drawCounter(obj);
  if (obj.type === "mayorDesk") drawMayorDesk(obj);
  if (obj.type === "bookshelf") drawBookshelf(obj);
  if (obj.type === "chest") drawChest(obj);
  if (obj.type === "rareChest") drawRareChest(obj);
  if (obj.type === "plant") drawPlant(obj);
  if (obj.type === "flower") drawFlower(obj);
  if (obj.type === "rock") drawRock(obj);
  if (obj.type === "crystal") drawCrystal(obj);
  if (obj.type === "collectible") drawCollectible(obj);
  if (obj.type === "loot") drawLootItem(obj);
  if (obj.type === "powerUp") drawPowerUp(obj);
  if (obj.type === "enemy") drawEnemy(obj);
  if (obj.type === "npc") drawNpc(obj);
}

function drawHouse(obj) {
  const x = obj.x;
  const y = obj.y;
  const roofColor = obj.title.length % 2 === 0 ? "#d24c63" : "#3f8fe5";

  ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
  ctx.fillRect(x + 6, y + obj.height - 5, obj.width - 12, 8);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 5, y + 35, obj.width - 10, obj.height - 35);
  ctx.fillStyle = "#d9d3d7";
  ctx.fillRect(x + 9, y + 39, obj.width - 18, obj.height - 43);
  ctx.fillStyle = "#b7b2bd";
  ctx.fillRect(x + 9, y + obj.height - 14, obj.width - 18, 10);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x - 3, y + 17, obj.width + 6, 24);
  ctx.fillStyle = roofColor;
  ctx.fillRect(x + 1, y + 21, obj.width - 2, 16);
  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(x + 8, y + 24, obj.width - 16, 4);

  pixelRect(x + 24, y + 61, 22, 31, "#985b44");
  ctx.fillStyle = "#ffd18b";
  ctx.fillRect(x + 38, y + 75, 3, 3);

  pixelRect(x + 73, y + 57, 25, 22, "#56b7f4");
  ctx.fillStyle = "#e6fbff";
  ctx.fillRect(x + 88, y + 61, 5, 5);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 84, y + 57, 3, 22);
  ctx.fillRect(x + 73, y + 67, 25, 3);
}

function drawPlayerHouse(obj) {
  drawHouse({ ...obj, title: "Minha Casa" });
  const x = obj.x;
  const y = obj.y;

  ctx.fillStyle = "#fff264";
  ctx.fillRect(x + 56, y + 23, 10, 10);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 59, y + 25, 4, 6);
}

function drawShop(obj) {
  drawHouse({ ...obj, title: "Loja" });
  const x = obj.x;
  const y = obj.y;

  pixelRect(x + 34, y + 42, 58, 14, "#fff264");
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 42, y + 47, 6, 4);
  ctx.fillRect(x + 53, y + 47, 6, 4);
  ctx.fillRect(x + 64, y + 47, 6, 4);
  ctx.fillRect(x + 75, y + 47, 6, 4);
}

function drawTree(obj) {
  const x = obj.x;
  const y = obj.y;

  ctx.fillStyle = "rgba(39, 48, 82, 0.22)";
  ctx.fillRect(x + 2, y + 55, 29, 6);
  pixelRect(x + 11, y + 35, 12, 25, "#8b5a3f");

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 4, y + 13, 24, 30);
  ctx.fillRect(x, y + 23, 32, 23);
  ctx.fillRect(x + 8, y + 4, 19, 18);
  ctx.fillStyle = "#bdf25a";
  ctx.fillRect(x + 7, y + 16, 19, 24);
  ctx.fillRect(x + 3, y + 25, 26, 15);
  ctx.fillRect(x + 10, y + 7, 15, 15);
  ctx.fillStyle = "#d9ff73";
  ctx.fillRect(x + 10, y + 10, 8, 5);
  ctx.fillRect(x + 17, y + 20, 7, 4);
}

function drawFence(obj) {
  const dark = "#273052";
  const wood = "#f0b276";

  if (obj.direction === "horizontal") {
    for (let x = obj.x; x < obj.x + obj.width; x += TILE) {
      pixelRect(x + 4, obj.y + 7, 8, 23, wood, dark);
      pixelRect(x + 20, obj.y + 7, 8, 23, wood, dark);
    }
    pixelRect(obj.x, obj.y + 13, obj.width, 7, wood, dark);
  } else {
    for (let y = obj.y; y < obj.y + obj.height; y += TILE) {
      pixelRect(obj.x + 7, y + 4, 23, 8, wood, dark);
      pixelRect(obj.x + 7, y + 20, 23, 8, wood, dark);
    }
    pixelRect(obj.x + 13, obj.y, 7, obj.height, wood, dark);
  }
}

function drawSign(obj) {
  pixelRect(obj.x + 7, obj.y + 10, 5, 18, "#8f5a3f");
  pixelRect(obj.x, obj.y, 19, 14, "#efbd75");
  ctx.fillStyle = "#8a5b4b";
  ctx.fillRect(obj.x + 4, obj.y + 5, 11, 2);
}

function drawWell(obj) {
  pixelRect(obj.x + 3, obj.y + 10, 22, 16, "#8a8da2");
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 6, obj.y + 13, 16, 8);
  pixelRect(obj.x + 1, obj.y + 3, 26, 8, "#d24c63");
  pixelRect(obj.x + 4, obj.y, 5, 15, "#8b5a3f");
  pixelRect(obj.x + 20, obj.y, 5, 15, "#8b5a3f");
}

function drawBench(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#f0b276");
  ctx.fillStyle = "#8f5a3f";
  if (obj.direction === "horizontal") {
    ctx.fillRect(obj.x + 4, obj.y + 3, obj.width - 8, 2);
    ctx.fillRect(obj.x + 4, obj.y + 8, obj.width - 8, 2);
  } else {
    ctx.fillRect(obj.x + 3, obj.y + 4, 2, obj.height - 8);
    ctx.fillRect(obj.x + 8, obj.y + 4, 2, obj.height - 8);
  }
}

function drawPortal(obj) {
  const time = performance.now() / 1000;
  const pulse = Math.sin(time * 3.8);
  const isDimensional = obj.type === "dimensionPortal";
  const mainColor = isDimensional ? "#ff72dc" : "#55e8ff";
  const deepColor = isDimensional ? "#8d3fd1" : "#1f7bd8";
  const lightColor = isDimensional ? "#ffe4fb" : "#e9ffff";
  const runeColor = isDimensional ? "#fff264" : "#fff264";
  const x = obj.x;
  const y = obj.y;
  const cx = x + 32;
  const cy = y + 55;

  ctx.save();

  // Aura grande no fundo, em blocos translúcidos para manter o estilo pixel art.
  ctx.globalAlpha = 0.16 + Math.abs(pulse) * 0.07;
  ctx.fillStyle = mainColor;
  ctx.fillRect(x - 9, y + 19, 82, 69);
  ctx.globalAlpha = 0.1 + Math.abs(pulse) * 0.05;
  ctx.fillRect(x - 16, y + 34, 96, 36);
  ctx.globalAlpha = 1;

  drawSoftShadow(x + 2, y + 84, 62, 10, 0.3);

  // Plataforma de pedra com degraus e runas.
  pixelRect(x + 4, y + 80, 56, 12, "#777f98", "#232a46");
  pixelRect(x + 10, y + 72, 44, 12, "#9aa2b6", "#232a46");
  ctx.fillStyle = "#555d78";
  ctx.fillRect(x + 11, y + 83, 43, 3);
  ctx.fillRect(x + 17, y + 75, 30, 2);
  ctx.fillStyle = runeColor;
  ctx.fillRect(x + 13, y + 82, 4, 4);
  ctx.fillRect(x + 47, y + 82, 4, 4);
  ctx.fillStyle = mainColor;
  ctx.fillRect(x + 29, y + 75, 6, 3);

  // Pilares laterais, mais grossos e detalhados.
  pixelRect(x + 3, y + 18, 14, 66, "#858ca3", "#222944");
  pixelRect(x + 47, y + 18, 14, 66, "#858ca3", "#222944");
  pixelRect(x, y + 14, 20, 9, "#aeb5c8", "#222944");
  pixelRect(x + 44, y + 14, 20, 9, "#aeb5c8", "#222944");
  pixelRect(x + 7, y + 8, 50, 12, "#9ea6bd", "#222944");
  pixelRect(x + 18, y + 3, 28, 10, "#b8bfd0", "#222944");

  // Rachaduras e brilho nas pedras.
  ctx.fillStyle = "rgba(255, 255, 255, 0.24)";
  ctx.fillRect(x + 7, y + 25, 4, 18);
  ctx.fillRect(x + 51, y + 25, 4, 18);
  ctx.fillRect(x + 14, y + 11, 18, 3);
  ctx.fillStyle = "#3b435f";
  ctx.fillRect(x + 12, y + 51, 2, 13);
  ctx.fillRect(x + 50, y + 45, 2, 10);
  ctx.fillRect(x + 23, y + 8, 13, 2);
  ctx.fillStyle = mainColor;
  ctx.fillRect(x + 8, y + 60, 5, 5);
  ctx.fillRect(x + 51, y + 60, 5, 5);
  ctx.fillStyle = lightColor;
  ctx.fillRect(x + 29, y + 7, 6, 5);

  // Campo mágico interno com camadas pulsantes.
  ctx.globalAlpha = 0.75 + Math.abs(pulse) * 0.18;
  ctx.fillStyle = deepColor;
  ctx.fillRect(x + 18, y + 24, 28, 52);
  ctx.fillStyle = mainColor;
  ctx.fillRect(x + 22, y + 27 + pulse * 2, 20, 46 - pulse * 2);
  ctx.fillStyle = lightColor;
  ctx.fillRect(x + 29, y + 31 + pulse * 2, 7, 37);
  ctx.globalAlpha = 1;

  // Cristal/fenda central em formato facetado.
  ctx.save();
  ctx.translate(cx, cy + pulse * 1.5);
  ctx.shadowColor = mainColor;
  ctx.shadowBlur = 10;
  ctx.fillStyle = mainColor;
  ctx.beginPath();
  ctx.moveTo(0, -28);
  ctx.lineTo(15, -9);
  ctx.lineTo(10, 22);
  ctx.lineTo(0, 31);
  ctx.lineTo(-10, 22);
  ctx.lineTo(-15, -9);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = lightColor;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.fillRect(-4, -20, 5, 32);
  ctx.fillStyle = "rgba(255, 255, 255, 0.32)";
  ctx.fillRect(3, -12, 5, 23);
  ctx.restore();

  // Anéis/losangos de energia girando em volta do cristal.
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(time * 1.25);
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(-20, -27, 40, 54);
  ctx.restore();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-time * 0.9 + 0.6);
  ctx.strokeStyle = lightColor;
  ctx.globalAlpha = 0.8;
  ctx.lineWidth = 2;
  ctx.strokeRect(-16, -23, 32, 46);
  ctx.restore();

  // Raios quebrados, estilo fenda dimensional.
  ctx.strokeStyle = lightColor;
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    const off = Math.sin(time * 4 + i) * 3;
    ctx.beginPath();
    ctx.moveTo(x + 21 + i * 9, y + 31 + off);
    ctx.lineTo(x + 17 + i * 8, y + 45 - off);
    ctx.lineTo(x + 24 + i * 6, y + 57 + off);
    ctx.lineTo(x + 20 + i * 8, y + 70 - off);
    ctx.stroke();
  }

  // Partículas orbitando e subindo.
  for (let i = 0; i < 18; i++) {
    const angle = time * 2.2 + i * 0.7;
    const radiusX = 30 + (i % 3) * 5 + Math.sin(time * 2 + i) * 2;
    const radiusY = 34 + (i % 4) * 3;
    const px = cx + Math.cos(angle) * radiusX;
    const py = cy + Math.sin(angle) * radiusY - ((time * 18 + i * 11) % 26) * 0.25;
    drawPixelSpark(px, py, i % 3 === 0 ? lightColor : i % 2 === 0 ? mainColor : runeColor);
  }

  // Luz no chão, para o portal parecer importante na praça.
  ctx.globalAlpha = 0.28 + Math.abs(pulse) * 0.07;
  ctx.fillStyle = mainColor;
  ctx.fillRect(x + 13, y + 90, 38, 4);
  ctx.fillRect(x + 22, y + 96, 20, 3);
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawCrystalBridge() {
  const x = 21 * TILE;
  const y = 13 * TILE;
  const width = 5 * TILE;
  const height = 2 * TILE;

  ctx.fillStyle = "rgba(255, 242, 100, 0.2)";
  ctx.fillRect(x - 4, y - 4, width + 8, height + 8);
  pixelRect(x, y + 6, width, height - 12, "#8f6ec9", "#24193f");
  ctx.fillStyle = "#bba0ff";
  for (let ix = x + 12; ix < x + width - 8; ix += 24) {
    ctx.fillRect(ix, y + 12, 4, height - 24);
  }
}

function drawDimensionBlocker(obj) {
  if (dimensionQuest.bridgeOpen) return;

  const shimmer = Math.sin(performance.now() / 180) * 3;
  ctx.fillStyle = "rgba(14, 9, 30, 0.55)";
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
  for (let x = obj.x + 8; x < obj.x + obj.width; x += 24) {
    pixelRect(x, obj.y + 8 + shimmer, 14, 40, "#6a39c7", "#1b1336");
    ctx.fillStyle = "#c7fcff";
    ctx.fillRect(x + 5, obj.y + 13 + shimmer, 4, 10);
  }
}

function drawDimensionCrystal(obj) {
  const glow = obj.activated ? 0.45 : 0.22;
  const pulse = Math.sin(performance.now() / 220 + obj.crystalIndex) * 3;
  const flash = performance.now() - obj.activatedAt < 650 ? 8 : 0;

  ctx.fillStyle = `rgba(129, 239, 255, ${glow})`;
  ctx.fillRect(obj.x - 6 - flash, obj.y + 4 - flash, obj.width + 12 + flash * 2, obj.height + 8 + flash * 2);
  ctx.fillStyle = "#1b1336";
  ctx.fillRect(obj.x + 7, obj.y, 8, 4);
  ctx.fillRect(obj.x + 3, obj.y + 4, 16, 6);
  ctx.fillRect(obj.x, obj.y + 10, 22, 15);
  ctx.fillRect(obj.x + 6, obj.y + 25, 10, 7);
  ctx.fillStyle = obj.activated ? "#fff264" : "#55e8ff";
  ctx.fillRect(obj.x + 8, obj.y + 3 + pulse, 6, 5);
  ctx.fillRect(obj.x + 5, obj.y + 9 + pulse, 12, 15);
  ctx.fillRect(obj.x + 9, obj.y + 24 + pulse, 4, 6);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(obj.x + 12, obj.y + 10 + pulse, 3, 8);
}

function drawDimensionChest(obj) {
  const opened = obj.opened || dimensionQuest.chestOpened;
  pixelRect(obj.x, obj.y + 12, obj.width, 20, opened ? "#a97146" : "#7f543b", "#1b1336");
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + obj.width / 2 - 4, obj.y + 20, 8, 7);
  if (opened) {
    pixelRect(obj.x + 3, obj.y, obj.width - 6, 16, "#d69b5e", "#1b1336");
    ctx.fillStyle = "rgba(255, 242, 100, 0.6)";
    ctx.fillRect(obj.x + 12, obj.y - 12, obj.width - 24, 12);
  } else {
    pixelRect(obj.x + 3, obj.y + 4, obj.width - 6, 15, "#b87955", "#1b1336");
  }
}

function drawDimensionSign(obj) {
  pixelRect(obj.x + 7, obj.y + 10, 5, 18, "#6d4a8d", "#1b1336");
  pixelRect(obj.x, obj.y, 20, 14, "#bba0ff", "#1b1336");
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + 5, obj.y + 5, 10, 2);
}

function drawTalkingStone(obj) {
  pixelRect(obj.x, obj.y + 4, obj.width, obj.height, "#8a8da2", "#1b1336");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 8, obj.y + 1, 8, 5);
  ctx.fillStyle = "#1b1336";
  ctx.fillRect(obj.x + 6, obj.y + 13, 4, 3);
  ctx.fillRect(obj.x + 15, obj.y + 13, 4, 3);
}

function drawMagicFountain(obj) {
  pixelRect(obj.x + 8, obj.y + 24, obj.width - 16, 25, "#6d5c75", "#1b1336");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 20, obj.y + 8, 24, 24);
  ctx.fillStyle = "rgba(255, 242, 100, 0.45)";
  ctx.fillRect(obj.x + 26, obj.y + 2, 12, 12);
  ctx.fillStyle = "#3d48c9";
  ctx.fillRect(obj.x + 18, obj.y + 30, 28, 10);
}

function drawLargeCrystal(obj) {
  const pulse = Math.sin(performance.now() / 300 + obj.x) * 2;
  ctx.fillStyle = "rgba(129, 239, 255, 0.25)";
  ctx.fillRect(obj.x - 5, obj.y + 8, obj.width + 10, obj.height);
  ctx.fillStyle = "#1b1336";
  ctx.fillRect(obj.x + 10, obj.y, 8, 6);
  ctx.fillRect(obj.x + 4, obj.y + 6, 20, 18);
  ctx.fillRect(obj.x, obj.y + 24, 28, 16);
  ctx.fillStyle = "#8d4be0";
  ctx.fillRect(obj.x + 8, obj.y + 8 + pulse, 12, 18);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 11, obj.y + 11 + pulse, 5, 16);
  ctx.fillStyle = "#bba0ff";
  ctx.fillRect(obj.x + 7, obj.y + 27 + pulse, 14, 12);
}

function drawStrangeTree(obj) {
  const x = obj.x;
  const y = obj.y;
  pixelRect(x + 11, y + 36, 12, 28, "#4b386f", "#1b1336");
  ctx.fillStyle = "#1b1336";
  ctx.fillRect(x + 3, y + 13, 26, 28);
  ctx.fillRect(x, y + 25, 32, 23);
  ctx.fillStyle = "#7c4fd4";
  ctx.fillRect(x + 6, y + 17, 21, 20);
  ctx.fillRect(x + 4, y + 29, 24, 14);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(x + 13, y + 21, 5, 5);
}

function drawFloatingRock(obj) {
  const float = Math.sin(performance.now() / 420 + obj.x) * 3;
  ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
  ctx.fillRect(obj.x + 2, obj.y + 17, obj.width - 4, 5);
  pixelRect(obj.x, obj.y + float, obj.width, obj.height, "#76708e", "#1b1336");
  ctx.fillStyle = "#bba0ff";
  ctx.fillRect(obj.x + 6, obj.y + 5 + float, 8, 3);
}

function drawSecretStone(obj) {
  pixelRect(obj.x, obj.y + 4, obj.width, obj.height, "#9ba1ad");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 9, obj.y, 6, 6);
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 6, obj.y + 12, 12, 3);
}

function drawCave(obj) {
  const x = obj.x;
  const y = obj.y;
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 4, y + 18, obj.width - 8, obj.height - 18);
  ctx.fillStyle = "#6d5c75";
  ctx.fillRect(x + 10, y + 10, obj.width - 20, 20);
  ctx.fillStyle = "#1a1f3d";
  ctx.fillRect(x + 28, y + 30, 38, 34);
  ctx.fillStyle = "#9ba1ad";
  ctx.fillRect(x + 14, y + 18, 10, 9);
  ctx.fillRect(x + 70, y + 24, 8, 8);
}

function drawBed(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#9cc7f2");
  ctx.fillStyle = "#fff3d6";
  ctx.fillRect(obj.x + 8, obj.y + 8, 28, 18);
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(obj.x + 8, obj.y + 32, obj.width - 16, 20);
}

function drawTable(obj) {
  pixelRect(obj.x + 8, obj.y + 8, obj.width - 16, obj.height - 16, "#b87955");
  ctx.fillStyle = "#8f5a3f";
  ctx.fillRect(obj.x + 18, obj.y + 48, 8, 16);
  ctx.fillRect(obj.x + obj.width - 26, obj.y + 48, 8, 16);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + 42, obj.y + 22, 10, 10);
}

function drawCounter(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#b87955");
  ctx.fillStyle = "#8f5a3f";
  for (let x = obj.x + 12; x < obj.x + obj.width - 12; x += 42) {
    ctx.fillRect(x, obj.y + 8, 24, 8);
  }
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(obj.x + 70, obj.y + 18, 16, 16);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 132, obj.y + 16, 16, 18);
}

function drawMayorDesk(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#8f5a3f");
  ctx.fillStyle = "#b87955";
  ctx.fillRect(obj.x + 8, obj.y + 8, obj.width - 16, obj.height - 16);
  ctx.fillStyle = "#fff3d6";
  ctx.fillRect(obj.x + 24, obj.y + 18, 34, 22);
  ctx.fillRect(obj.x + 96, obj.y + 22, 42, 18);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + obj.width / 2 - 8, obj.y + 48, 16, 12);
}

function drawBookshelf(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#8f5a3f");
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 7, obj.y + 22, obj.width - 14, 4);
  ctx.fillRect(obj.x + 7, obj.y + 50, obj.width - 14, 4);
  ctx.fillStyle = "#55c4ff";
  ctx.fillRect(obj.x + 10, obj.y + 8, 7, 14);
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(obj.x + 21, obj.y + 8, 7, 14);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + 34, obj.y + 36, 7, 14);
}

function drawChest(obj) {
  pixelRect(obj.x, obj.y + 4, obj.width, obj.height - 4, "#b87955");
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + obj.width / 2 - 4, obj.y + 14, 8, 8);
}

function drawRareChest(obj) {
  const shine = Math.sin(performance.now() / 180) * 3;
  ctx.fillStyle = "rgba(255, 242, 100, 0.35)";
  ctx.fillRect(obj.x - 6, obj.y - 8 + shine, obj.width + 12, obj.height + 16);
  pixelRect(obj.x, obj.y + 8, obj.width, 22, "#8f5a3f", "#1a1f3d");
  pixelRect(obj.x + 4, obj.y, obj.width - 8, 18, "#fff264", "#1a1f3d");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + obj.width / 2 - 5, obj.y + 14, 10, 8);
}

function drawPlant(obj) {
  pixelRect(obj.x + 5, obj.y + 18, 14, 14, "#d24c63");
  ctx.fillStyle = "#26794d";
  ctx.fillRect(obj.x + 10, obj.y + 8, 4, 14);
  ctx.fillStyle = "#7bdb73";
  ctx.fillRect(obj.x + 4, obj.y + 3, 10, 8);
  ctx.fillRect(obj.x + 12, obj.y, 10, 9);
}

function drawFlower(obj) {
  const colors = {
    pink: "#ff6fa8",
    yellow: "#fff264",
    blue: "#55c4ff"
  };

  ctx.fillStyle = "#26794d";
  ctx.fillRect(obj.x + 5, obj.y + 5, 2, 8);
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 2, obj.y, 9, 9);
  ctx.fillStyle = colors[obj.color] || colors.pink;
  ctx.fillRect(obj.x + 3, obj.y + 1, 3, 3);
  ctx.fillRect(obj.x + 7, obj.y + 1, 3, 3);
  ctx.fillRect(obj.x + 5, obj.y + 4, 3, 3);
}

function drawRock(obj) {
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 1, obj.y + 5, 16, 10);
  ctx.fillStyle = "#9ba1ad";
  ctx.fillRect(obj.x + 3, obj.y + 6, 12, 7);
  ctx.fillStyle = "#c7ccd4";
  ctx.fillRect(obj.x + 6, obj.y + 4, 7, 4);
}

function drawCrystal(obj) {
  const pulse = Math.sin(performance.now() / 180) * 2;
  const y = obj.y + pulse;

  ctx.fillStyle = "rgba(85, 196, 255, 0.35)";
  ctx.fillRect(obj.x - 3, obj.y + 18, 22, 6);
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 5, y, 7, 6);
  ctx.fillRect(obj.x + 2, y + 5, 13, 14);
  ctx.fillRect(obj.x + 5, y + 18, 7, 6);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 6, y + 2, 5, 5);
  ctx.fillRect(obj.x + 4, y + 7, 9, 10);
  ctx.fillRect(obj.x + 7, y + 17, 4, 4);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(obj.x + 6, y + 8, 3, 5);
}

function drawCollectible(obj) {
  const x = obj.x;
  const y = obj.y + Math.sin(performance.now() / 240) * 1.5;

  if (obj.item === "moeda") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 3, y + 2, 12, 12);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 5, y + 4, 8, 8);
    ctx.fillStyle = "#f0b276";
    ctx.fillRect(x + 8, y + 5, 2, 6);
    return;
  }

  if (obj.item === "pocao") {
    pixelRect(x + 4, y + 2, 10, 15, "#d24c63");
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 6, y, 6, 4);
    return;
  }

  if (obj.item === "chave") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 5, 14, 6);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 3, y + 6, 8, 4);
    ctx.fillRect(x + 10, y + 9, 6, 3);
    ctx.fillRect(x + 13, y + 12, 3, 3);
    return;
  }

  if (obj.item === "espada") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 7, y, 4, 18);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 8, y + 1, 2, 13);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 4, y + 13, 10, 3);
    return;
  }

  if (obj.item === "carta") {
    pixelRect(x + 1, y + 3, 16, 12, "#fff3d6");
    ctx.fillStyle = "#d24c63";
    ctx.fillRect(x + 6, y + 7, 5, 4);
  }
}

function drawLootItem(obj) {
  const x = obj.x;
  const y = obj.y + Math.sin(performance.now() / 190 + obj.x) * 2;

  if (obj.kind === "bossItem") {
    ctx.fillStyle = "rgba(85, 232, 255, 0.35)";
    ctx.fillRect(x - 3, y - 3, 22, 22);
    pixelRect(x + 2, y + 2, 12, 12, "#55e8ff");
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 6, y + 5, 4, 4);
    return;
  }

  if (obj.kind === "fragmento" || obj.kind === "fragmentoAzul") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 4, 12, 10);
    ctx.fillStyle = obj.kind === "fragmentoAzul" ? "#55e8ff" : "#c7ccd4";
    ctx.fillRect(x + 4, y + 5, 8, 7);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 7, y + 4, 4, 3);
    return;
  }

  if (obj.kind === "flechas") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 7, 14, 4);
    ctx.fillRect(x + 10, y + 4, 4, 10);
    ctx.fillStyle = "#f0b276";
    ctx.fillRect(x + 3, y + 8, 11, 2);
    ctx.fillStyle = "#fff3d6";
    ctx.fillRect(x + 12, y + 5, 3, 3);
    return;
  }

  if (obj.kind === "manaOrbe") {
    ctx.fillStyle = "rgba(180, 109, 255, 0.3)";
    ctx.fillRect(x - 2, y - 2, 20, 20);
    pixelRect(x + 3, y + 3, 10, 10, "#b46dff");
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 7, y + 5, 3, 3);
    return;
  }

  if (obj.kind === "chaveRara") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 1, y + 5, 16, 6);
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 3, y + 6, 9, 4);
    ctx.fillRect(x + 11, y + 9, 6, 3);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 5, y + 7, 3, 2);
    return;
  }

  drawCollectible({
    item: obj.kind === "moeda" ? "moeda" : "pocao",
    x,
    y
  });
}

function drawHazards() {
  for (const obj of hazardZones) {
    const alpha = Math.max(0, obj.timer / obj.maxTimer);
    if (obj.type === "web") {
      ctx.strokeStyle = `rgba(233, 255, 255, ${0.35 * alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(obj.x - obj.radius, obj.y);
      ctx.lineTo(obj.x + obj.radius, obj.y);
      ctx.moveTo(obj.x, obj.y - obj.radius);
      ctx.lineTo(obj.x, obj.y + obj.radius);
      ctx.stroke();
    } else if (obj.type === "whirlpool") {
      ctx.strokeStyle = `rgba(85, 232, 255, ${0.55 * alpha})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius * (1 - alpha * 0.25), performance.now() / 300, Math.PI * 1.6 + performance.now() / 300);
      ctx.stroke();
    } else {
      ctx.fillStyle = `rgba(255, 79, 98, ${0.18 * alpha})`;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawPowerUp(obj) {
  const x = obj.x;
  const y = obj.y + Math.sin(performance.now() / 210 + obj.x) * 2;
  const glow = 0.28 + Math.sin(performance.now() / 180) * 0.08;

  const colors = {
    speed: "#55e8ff",
    force: "#ff4f62",
    shield: "#fff264",
    regen: "#7bdb73",
    mana: "#b46dff"
  };
  colors.waterBreathing = "#7bd5ff";

  ctx.fillStyle = `rgba(255, 255, 255, ${glow})`;
  ctx.fillRect(x - 5, y - 5, 28, 28);
  ctx.fillStyle = "#273052";

  if (obj.kind === "speed") {
    ctx.fillRect(x + 3, y + 5, 12, 12);
    ctx.fillStyle = colors.speed;
    ctx.fillRect(x + 5, y + 3, 8, 10);
    ctx.fillRect(x + 2, y + 12, 15, 5);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 11, y + 5, 3, 5);
    return;
  }

  if (obj.kind === "force") {
    ctx.fillRect(x + 8, y, 4, 20);
    ctx.fillStyle = colors.force;
    ctx.fillRect(x + 9, y + 1, 2, 14);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 4, y + 14, 12, 3);
    return;
  }

  if (obj.kind === "shield") {
    ctx.fillRect(x + 3, y + 2, 14, 17);
    ctx.fillStyle = colors.shield;
    ctx.fillRect(x + 5, y + 4, 10, 10);
    ctx.fillRect(x + 8, y + 14, 4, 4);
    return;
  }

  if (obj.kind === "regen") {
    ctx.fillStyle = colors.regen;
    ctx.fillRect(x + 6, y + 4, 8, 4);
    ctx.fillRect(x + 4, y + 8, 12, 4);
    ctx.fillRect(x + 6, y + 12, 8, 4);
    ctx.fillRect(x + 8, y + 16, 4, 3);
    return;
  }

  if (obj.kind === "waterBreathing") {
    ctx.fillStyle = colors.waterBreathing;
    ctx.fillRect(x + 4, y + 8, 12, 8);
    ctx.fillRect(x + 7, y + 4, 6, 6);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 5, y + 2, 4, 4);
    ctx.fillRect(x + 13, y, 3, 3);
    return;
  }

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 2, y + 2, 16, 16);
  ctx.fillStyle = colors.mana;
  ctx.fillRect(x + 5, y + 5, 10, 10);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(x + 8, y + 4, 4, 4);
}

function drawEnemy(obj) {
  const x = obj.x;
  const y = obj.y;
  const blinking = obj.invulnerableTimer > 0 && Math.floor(performance.now() / 70) % 2 === 0;
  const phaseGlow = obj.boss && obj.phase === 2;

  ctx.save();
  if (blinking) ctx.globalAlpha = 0.45;

  if (phaseGlow) {
    ctx.fillStyle = "rgba(255, 79, 98, 0.22)";
    ctx.fillRect(x - 6, y - 8, obj.width + 12, obj.height + 14);
  }

  if (obj.kind === "morcego") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x, y + 8, 24, 8);
    ctx.fillRect(x + 8, y + 3, 8, 14);
    ctx.fillStyle = "#6d5c75";
    ctx.fillRect(x + 2, y + 9, 7, 4);
    ctx.fillRect(x + 15, y + 9, 7, 4);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 10, y + 7, 2, 2);
    ctx.fillRect(x + 14, y + 7, 2, 2);
  } else if (obj.kind === "slimeVermelho" || obj.kind === "reiSlime" || obj.kind === "slimeVerde" || obj.kind === "slimeAzul" || obj.kind === "slime") {
    const slimeColor = obj.kind === "slimeVermelho" ? "#ff4f62" :
      obj.kind === "slimeAzul" ? "#55e8ff" :
        obj.kind === "reiSlime" ? "#7bdb73" : "#55e8ff";
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 2, y + obj.height - 4, obj.width - 2, 5);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 1, y + 5, obj.width - 2, obj.height - 5);
    ctx.fillStyle = slimeColor;
    ctx.fillRect(x + 3, y + 7, obj.width - 6, obj.height - 9);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 6, y + 11, 2, 2);
    ctx.fillRect(x + obj.width - 8, y + 11, 2, 2);
    if (obj.kind === "reiSlime") {
      ctx.fillStyle = "#fff264";
      ctx.fillRect(x + obj.width / 2 - 7, y, 14, 5);
      ctx.fillRect(x + obj.width / 2 - 4, y - 4, 3, 5);
      ctx.fillRect(x + obj.width / 2 + 3, y - 4, 3, 5);
    }
  } else if (obj.kind === "golem" || obj.kind === "golemPedra" || obj.kind === "golemAncestral") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 1, y + obj.height - 4, obj.width, 6);
    pixelRect(x + 4, y + Math.max(10, obj.height - 20), obj.width - 8, 18, "#8a8da2");
    pixelRect(x + 7, y + 2, obj.width - 14, 14, "#76708e");
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 9, y + 8, 3, 3);
    ctx.fillRect(x + obj.width - 13, y + 8, 3, 3);
  } else if (obj.kind === "mago" || obj.kind === "magoSombrio" || obj.kind === "bruxoSombrio") {
    pixelRect(x + 4, y + 9, obj.width - 8, obj.height - 9, obj.kind === "bruxoSombrio" ? "#6d3d8f" : "#4b386f");
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 4, obj.width - 4, 8);
    ctx.fillStyle = "#b46dff";
    ctx.fillRect(x + obj.width / 2 - 4, y + 1, 8, 8);
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + obj.width / 2 - 2, y + 15, 4, 4);
  } else if (obj.kind === "guardiao" || obj.kind === "miniGuardiao") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.3)";
    ctx.fillRect(x + 2, y + obj.height - 5, obj.width - 2, 7);
    pixelRect(x + 4, y + 16, obj.width - 8, obj.height - 17, "#7c6b8f", "#1a1f3d");
    pixelRect(x + 9, y + 1, obj.width - 18, 19, "#8a8da2", "#1a1f3d");
    ctx.fillStyle = "#ff4f62";
    ctx.fillRect(x + 13, y + 9, 4, 4);
    ctx.fillRect(x + obj.width - 17, y + 9, 4, 4);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + obj.width / 2 - 3, y + obj.height - 15, 7, 7);
  } else if (obj.kind === "aranha" || obj.kind === "aranhaRainha") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 2, y + obj.height - 4, obj.width - 2, 5);
    ctx.fillStyle = "#273052";
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(x + 2 + i * 6, y + 6, 4, obj.height - 6);
      ctx.fillRect(x + 1 + i * 7, y + obj.height - 8, 6, 3);
    }
    ctx.fillStyle = obj.kind === "aranhaRainha" ? "#d24c63" : "#6d5c75";
    ctx.fillRect(x + 6, y + 7, obj.width - 12, obj.height - 9);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 10, y + 11, 2, 2);
    ctx.fillRect(x + obj.width - 12, y + 11, 2, 2);
  } else if (obj.kind === "goblin" || obj.kind === "arqueiroGoblin") {
    pixelRect(x + 4, y + 11, obj.width - 8, obj.height - 10, obj.kind === "arqueiroGoblin" ? "#7bdb73" : "#a45d3d");
    pixelRect(x + 5, y + 2, obj.width - 10, 13, "#7bdb73");
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 7, 5, 3);
    ctx.fillRect(x + obj.width - 7, y + 7, 5, 3);
    ctx.fillRect(x + 8, y + 8, 2, 2);
    ctx.fillRect(x + obj.width - 11, y + 8, 2, 2);
    if (obj.kind === "arqueiroGoblin") {
      ctx.fillStyle = "#f0b276";
      ctx.fillRect(x + obj.width - 4, y + 9, 3, 17);
    }
  } else if (obj.kind === "fantasma") {
    ctx.globalAlpha = blinking ? 0.35 : 0.78;
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 3, obj.width - 4, obj.height - 4);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 4, y + 5, obj.width - 8, obj.height - 8);
    ctx.fillStyle = "#b46dff";
    ctx.fillRect(x + 8, y + 12, 3, 3);
    ctx.fillRect(x + obj.width - 11, y + 12, 3, 3);
    ctx.fillRect(x + 5, y + obj.height - 8, 4, 5);
    ctx.fillRect(x + 14, y + obj.height - 8, 4, 5);
  } else if (obj.kind === "peixeHostil" || obj.kind === "serpenteLago") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 2, y + obj.height - 2, obj.width - 4, 4);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 1, y + 4, obj.width - 6, obj.height - 6);
    ctx.fillRect(x + obj.width - 9, y + 8, 8, 8);
    ctx.fillStyle = obj.kind === "serpenteLago" ? "#3f8fe5" : "#55e8ff";
    ctx.fillRect(x + 3, y + 6, obj.width - 10, obj.height - 10);
    ctx.fillRect(x + obj.width - 7, y + 10, 5, 4);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 8, y + 8, 2, 2);
  } else if (obj.kind === "miniDragao") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 3, y + obj.height - 4, obj.width - 5, 5);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 3, y + 8, obj.width - 8, obj.height - 8);
    ctx.fillRect(x + obj.width - 8, y + 4, 8, 11);
    ctx.fillRect(x + 2, y + 4, 8, 8);
    ctx.fillStyle = "#ff4f62";
    ctx.fillRect(x + 5, y + 10, obj.width - 13, obj.height - 12);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + obj.width - 6, y + 7, 2, 2);
  } else {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 2, y + 17, 20, 5);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 1, y + 5, 20, 15);
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 3, y + 7, 16, 11);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 6, y + 11, 2, 2);
    ctx.fillRect(x + 14, y + 11, 2, 2);
  }

  ctx.fillStyle = "#273052";
  ctx.fillRect(x, y - 6, obj.width, 4);
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(x, y - 6, Math.max(0, obj.width * (obj.hp / obj.maxHp)), 4);
  if (obj.boss) {
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x, y - 12, Math.max(0, obj.width * (obj.hp / obj.maxHp)), 3);
  }
  ctx.restore();
}

function drawAttack() {
  if (attackTimer <= 0 || !currentMeleeAttack) return;
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const preparing = attackWindupTimer > 0;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(currentMeleeAttack.angle);
  ctx.strokeStyle = preparing ? "#55e8ff" : "#fff264";
  ctx.fillStyle = preparing ? "rgba(85, 232, 255, 0.12)" : "rgba(255, 242, 100, 0.32)";
  ctx.lineWidth = preparing ? 2 : 4;

  if (currentMeleeAttack.weaponKey === "spear") {
    ctx.fillRect(8, -5, currentMeleeAttack.range, 10);
    ctx.strokeRect(8, -5, currentMeleeAttack.range, 10);
  } else {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, currentMeleeAttack.range, -currentMeleeAttack.arc / 2, currentMeleeAttack.arc / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawNpc(obj) {
  const bob = Math.sin(performance.now() / 300 + obj.bob) * 2;
  const x = obj.x;
  const y = obj.y + bob;
  const shirt = obj.role === "dimensionGuide" ? "#8d4be0" :
    obj.role === "dimensionMystic" ? "#55e8ff" :
      obj.name === "Nico" ? "#3f8fe5" : obj.name === "Ari" ? "#d24c63" : "#7bdb73";

  ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
  ctx.fillRect(x + 4, y + 27, 20, 5);
  pixelRect(x + 5, y + 11, 14, 16, shirt);
  pixelRect(x + 4, y + 2, 16, 13, "#f4bd8f");
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 3, y, 18, 5);
  ctx.fillRect(x + 7, y + 27, 4, 6);
  ctx.fillRect(x + 15, y + 27, 4, 6);
  ctx.fillRect(x + 8, y + 8, 2, 2);
  ctx.fillRect(x + 15, y + 8, 2, 2);
}

function drawPlayer() {
  const x = player.x;
  const y = player.y;
  const legOffset = player.moving ? [0, 2, 0, -2][player.frame] : 0;
  const blinking = playerInvulnerableTimer > 0 && Math.floor(performance.now() / 80) % 2 === 0;

  ctx.save();
  if (blinking) ctx.globalAlpha = 0.45;

  if (player.isSwimming) {
    ctx.strokeStyle = "rgba(233, 255, 255, 0.75)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x + 12, y + 25, 18, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (player.levelGlowTimer > 0) {
    const pulse = 0.35 + Math.sin(performance.now() / 80) * 0.18;
    ctx.fillStyle = `rgba(255, 242, 100, ${pulse})`;
    ctx.fillRect(x - 8, y - 8, player.width + 16, player.height + 16);
    ctx.fillStyle = "rgba(85, 232, 255, 0.34)";
    ctx.fillRect(x - 2, y - 14, player.width + 4, 5);
    ctx.fillRect(x + 3, y + player.height + 4, player.width - 6, 4);
  }

  ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
  ctx.fillRect(x + 3, y + 25, 22, 5);

  pixelRect(x + 5, y + 12, 17, 14, "#313a78");
  ctx.fillStyle = "#f4bd8f";
  ctx.fillRect(x + 7, y + 4, 14, 10);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 5, y + 2, 18, 5);
  ctx.fillRect(x + 4, y + 6, 5, 8);
  ctx.fillStyle = "#5ad6e7";
  ctx.fillRect(x + 7, y, 12, 5);
  ctx.fillRect(x + 4, y + 5, 5, 7);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 7, y + 25 + legOffset, 5, 6);
  ctx.fillRect(x + 16, y + 25 - legOffset, 5, 6);

  if (player.direction === "up") {
    ctx.fillRect(x + 9, y + 6, 10, 2);
  } else if (player.direction === "down") {
    ctx.fillRect(x + 11, y + 9, 2, 2);
    ctx.fillRect(x + 17, y + 9, 2, 2);
  } else if (player.direction === "left") {
    ctx.fillRect(x + 9, y + 9, 2, 2);
  } else {
    ctx.fillRect(x + 19, y + 9, 2, 2);
  }

  ctx.restore();
}

function findInteraction() {
  const playerCenter = {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    width: 1,
    height: 1
  };

  return interactables.find((obj) => {
    if (obj.type === "rareChest" && (!questBook.bossDefeated || questBook.bossChestOpened)) return false;
    const range = {
      x: obj.x - 26,
      y: obj.y - 26,
      width: obj.width + 52,
      height: obj.height + 52
    };
    return rectsOverlap(playerCenter, range);
  });
}

function countActivatedDimensionCrystals() {
  return crystalDimensionObjects.filter((obj) => obj.type === "dimensionCrystal" && obj.activated).length;
}

function syncDimensionQuestState() {
  dimensionQuest.activatedCrystals = countActivatedDimensionCrystals();
  if (dimensionQuest.activatedCrystals >= dimensionQuest.totalCrystals) {
    dimensionQuest.bridgeOpen = true;
    if (dimensionQuest.status === "active") dimensionQuest.status = "ready";
  }

  const chestObj = crystalDimensionObjects.find((obj) => obj.type === "dimensionChest");
  if (chestObj) chestObj.opened = dimensionQuest.chestOpened;
}

function getDimensionNpcMessage(npcObj) {
  if (npcObj.role === "dimensionGuide") {
    if (dimensionQuest.status === "notStarted") {
      dimensionQuest.status = "active";
      return "Orion: A ponte esta selada. Ative os 3 cristais magicos e o caminho para o bau vai aparecer.";
    }

    if (dimensionQuest.status === "active") {
      return `Orion: Ainda faltam cristais. Progresso: ${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals}.`;
    }

    if (dimensionQuest.status === "ready" && !dimensionQuest.chestOpened) {
      return "Orion: A ponte brilhou! Siga para o norte e abra o bau especial.";
    }

    return "Orion: A dimensao reconhece sua coragem. A ponte continuara aberta para voce.";
  }

  if (npcObj.role === "dimensionMystic") {
    if (!dimensionQuest.bridgeOpen) {
      return "Nyx: As pedras flutuantes escutam os cristais. Quando tres luzes acordarem, o norte vai se abrir.";
    }
    return "Nyx: A passagem secreta esta viva. O bau guarda uma recompensa da propria dimensao.";
  }

  return npcObj.message;
}

function activateDimensionCrystal(crystalObj) {
  if (dimensionQuest.status === "notStarted") {
    return `${crystalObj.message} Uma voz distante sussurra: fale com Orion antes de ativar este cristal.`;
  }

  if (crystalObj.activated) {
    return `${crystalObj.message} Este cristal ja esta ativo. Cristais ativados: ${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals}.`;
  }

  crystalObj.activated = true;
  crystalObj.activatedAt = performance.now();
  dimensionQuest.activatedCrystals = countActivatedDimensionCrystals();
  awardXp(150, "Cristal ativado");
  playSound("crystal");

  let message = `${crystalObj.message} Voce ativou uma luz magica. Cristais ativados: ${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals}.`;

  if (dimensionQuest.activatedCrystals >= dimensionQuest.totalCrystals) {
    dimensionQuest.bridgeOpen = true;
    dimensionQuest.status = "ready";
    playSound("mission");
    message += " A ponte secreta apareceu ao norte!";
  }

  return message;
}

function openDimensionChest(chestObj) {
  if (!dimensionQuest.bridgeOpen) {
    return "Bau especial: as tres marcas ainda estao apagadas. Ative os cristais primeiro.";
  }

  if (dimensionQuest.chestOpened || chestObj.opened) {
    return "Bau especial: ele ja foi aberto. A luz roxa ainda gira devagar dentro dele.";
  }

  chestObj.opened = true;
  dimensionQuest.chestOpened = true;
  dimensionQuest.missionDone = true;
  dimensionQuest.status = "done";
  inventory.moedas += 25;
  inventory.pocoes += 1;
  inventory.espadas += 1;
  player.maxHealth += 1;
  player.health = Math.min(player.maxHealth, player.health + 1);
  awardXp(300, "Bau da dimensao");
  playSound("chest");
  updateHud();
  renderInventory();
  return "Bau especial aberto! Voce recebeu 25 moedas, 1 pocao, 1 espada rara e ganhou mais 1 coracao maximo.";
}

function openRareChest() {
  if (!questBook.bossDefeated) {
    return "Bau raro: derrote o Guardiao das Ruinas para quebrar o selo.";
  }

  if (questBook.bossChestOpened) {
    return "Bau raro: ele ja foi aberto. So resta um brilho dourado.";
  }

  questBook.bossChestOpened = true;
  inventory.moedas += 50;
  inventory.pocoes += 2;
  inventory.espadas += 1;
  player.maxMana += 1;
  player.mana = player.maxMana;
  awardXp(300, "Bau raro");
  playSound("chest");
  updateHud();
  renderInventory();
  return "Bau raro aberto! Voce recebeu 50 moedas, 2 pocoes, uma espada rara e +1 mana maxima.";
}

function getQuestMessage(npcObj) {
  if (npcObj.type === "rareChest") {
    return openRareChest();
  }

  if (npcObj.type === "portal") {
    enterCrystalDimension();
    return "";
  }

  if (npcObj.type === "dimensionPortal") {
    exitCrystalDimension();
    return "";
  }

  if (npcObj.type === "dimensionCrystal") {
    return activateDimensionCrystal(npcObj);
  }

  if (npcObj.type === "dimensionChest") {
    return openDimensionChest(npcObj);
  }

  if (npcObj.type === "npc" && (npcObj.role === "dimensionGuide" || npcObj.role === "dimensionMystic")) {
    return getDimensionNpcMessage(npcObj);
  }

  if (npcObj.type === "npc" && npcObj.role === "shopkeeper") {
    openShop();
    return "Vendedor: Escolha com calma. Pocao custa 5 moedas.";
  }

  if (npcObj.type === "npc" && npcObj.role === "letterTarget") {
    if (inventory.cartas > 0 && !questBook.letterDelivered) {
      inventory.cartas -= 1;
      questBook.letterDelivered = true;
      inventory.moedas += 6;
      awardXp(300, "Carta entregue");
      return `Beto: Minha carta! Obrigado, ${getPlayerDisplayName()}. Aceite 6 moedas pela entrega.`;
    }
    if (questBook.letterDelivered) return "Beto: Obrigado pela carta. A vila precisava dessa noticia.";
    return "Beto: Se encontrar uma carta perdida, pode trazer para mim?";
  }

  if (npcObj.type !== "npc" || npcObj.name !== "Nico") return npcObj.message;

  if (quest.status === "notStarted") {
    quest.status = "active";
    return `Nico: ${getPlayerDisplayName()}, preciso de ajuda! Encontre 3 cristais brilhantes pela vila e volte aqui.`;
  }

  if (quest.status === "active") {
    return `Nico: Voce encontrou ${quest.collected}/${quest.total} cristais. Continue procurando!`;
  }

  if (quest.status === "ready") {
    quest.status = "done";
    awardXp(300, "Missao dos cristais");
    return `Nico: Voce conseguiu, ${getPlayerDisplayName()}! Receba sua recompensa: ${quest.reward}.`;
  }

  return `Nico: Obrigado de novo pela ajuda. O ${quest.reward} combina com voce!`;
}

function collectCrystals() {
  if (currentScene !== "village") return;
  if (quest.status !== "active") return;

  const playerRect = getPlayerRect();
  for (const obj of villageObjects) {
    if (obj.type === "crystal" && !obj.collected && rectsOverlap(playerRect, obj)) {
      obj.collected = true;
      quest.collected += 1;
      inventory.cristais += 1;
      if (quest.collected >= quest.total) {
        quest.status = "ready";
      }
    }
  }
}

function collectWorldItems() {
  if (currentScene !== "village") return;

  const playerRect = getPlayerRect();
  for (const obj of villageObjects) {
    if (obj.type !== "collectible" || obj.collected || !rectsOverlap(playerRect, obj)) continue;

    obj.collected = true;
    if (obj.item === "moeda") {
      inventory.moedas += 1;
      playSound("coin");
    }
    if (obj.item === "pocao") inventory.pocoes += 1;
    if (obj.item === "chave") {
      inventory.chaves += 1;
      questBook.keyFound = true;
    }
    if (obj.item === "espada") inventory.espadas += 1;
    if (obj.item === "carta") {
      inventory.cartas += 1;
      questBook.letterPicked = true;
    }
    vibrate(12);
  }
}

function collectPowerUps() {
  if (currentScene !== "village") return;

  const playerRect = getPlayerRect();
  for (const obj of powerUps) {
    if (obj.collected || !rectsOverlap(playerRect, obj)) continue;

    obj.collected = true;
    applyPowerUp(obj.kind);
    spawnFloatingText(getPowerUpName(obj.kind), obj.x - 8, obj.y - 14, "#fff264");
    playSound("powerup");
    vibrate(16);
  }
}

function applyPowerUp(kind) {
  if (kind === "speed") activePowerUps.speed = 10;
  if (kind === "force") activePowerUps.force = 10;
  if (kind === "shield") activePowerUps.shield = 10;
  if (kind === "regen") activePowerUps.regen = 8;
  if (kind === "waterBreathing") activePowerUps.waterBreathing = 20;
  if (kind === "mana") player.mana = player.maxMana;
}

function getPowerUpName(kind) {
  if (kind === "speed") return "Velocidade";
  if (kind === "force") return "Forca";
  if (kind === "shield") return "Escudo";
  if (kind === "regen") return "Regeneracao";
  if (kind === "waterBreathing") return "Respiracao Aquatica";
  return "Mana cheia";
}

function updateQuestProgress() {
  syncDimensionQuestState();
  questProgressEl.textContent = getCompactMissionText();
  if (missionsOpen) renderMissionsPanel();
}

function getCompactMissionText() {
  if (currentScene === "crystalDimension" || dimensionQuest.status === "active" || dimensionQuest.status === "ready") {
    if (dimensionQuest.chestOpened) return "Dimensao: bau aberto";
    if (dimensionQuest.bridgeOpen) return "Dimensao: abra o bau";
    return `Cristais ativados: ${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals}`;
  }

  if (quest.status === "notStarted") return "Missao: fale com Nico";
  if (quest.status === "active") return `Cristais: ${quest.collected}/${quest.total}`;
  if (quest.status === "ready") return "Cristais: volte ao Nico";
  if (!questBook.keyFound) return "Chave: perdida";
  if (questBook.forestMonstersDefeated < questBook.forestMonstersGoal) {
    return `Monstros: ${questBook.forestMonstersDefeated}/${questBook.forestMonstersGoal}`;
  }
  if (!questBook.letterDelivered) return questBook.letterPicked ? "Carta: leve ao Beto" : "Carta: perdida";
  return "Missoes: em dia";
}

function updateHud() {
  normalizeLevelState();
  updateMobilePowerButtons();
  playerNameEl.textContent = getPlayerHudName();
  if (xpHud) {
    xpHud.textContent = player.level >= player.maxLevel ? "XP: Nivel maximo" : `XP: ${player.xp}/${player.xpToNextLevel}`;
  }
  if (xpFill) {
    const percent = player.level >= player.maxLevel ? 100 : clamp((player.xp / player.xpToNextLevel) * 100, 0, 100);
    xpFill.style.width = `${percent}%`;
  }
  healthHud.textContent = "♥ ".repeat(player.health).trim() || "0";
  manaHud.textContent = `${Math.floor(player.mana)}/${player.maxMana}`;
  manaFill.style.width = `${clamp((player.mana / player.maxMana) * 100, 0, 100)}%`;
  coinHud.textContent = inventory.moedas;
  playerPositionEl.textContent = getAreaName();
  weaponHud.textContent = `Arma: ${getCurrentWeapon().name}${getCurrentWeaponKey() === "bow" ? ` (${inventory.flechas})` : ""}`;
  if (player.isSwimming) {
    oxygenHud.textContent = activePowerUps.waterBreathing > 0 ? "Respirando" : `${Math.ceil(player.oxygen)}/${player.maxOxygen}`;
  } else {
    oxygenHud.textContent = "Fora da agua";
  }
  oxygenFill.style.width = `${clamp((player.oxygen / player.maxOxygen) * 100, 0, 100)}%`;
  const oxygenBox = oxygenHud.closest(".hud-oxygen-box");
  oxygenBox?.classList.toggle("mobile-hidden", isMobile && !player.isSwimming);
  oxygenBox?.classList.toggle("hidden", !player.isSwimming);
  oxygenBox?.classList.toggle("is-low", player.isSwimming && player.oxygen <= 3);
  powerHud.textContent = getPowerHudText();
  if (statusOpen) renderStatusPanel();

  const activeBoss = getActiveBoss();
  bossHud.classList.toggle("hidden", !activeBoss);
  if (activeBoss) {
    bossNameHud.textContent = `${getEnemyDisplayName(activeBoss.kind)}${activeBoss.phase === 2 ? " - fase 2" : ""}`;
    bossFill.style.width = `${clamp((activeBoss.hp / activeBoss.maxHp) * 100, 0, 100)}%`;
  }
}

function getPowerHudText() {
  const cooldown = player.spellCooldowns[equippedPower] || 0;
  const suffix = cooldown > 0 ? ` ${formatCooldown(cooldown)}` : "";
  return `Q: ${powerNames[equippedPower] || "Poder"}${suffix}`;
}

function formatCooldown(value) {
  return value <= 0 ? "ok" : `${value.toFixed(1)}s`;
}

function renderMissionsPanel() {
  if (!missionsList) return;
  syncDimensionQuestState();
  const rows = [
    ["Cristais", quest.status === "notStarted" ? "fale com Nico" : quest.status === "ready" ? "volte ao Nico" : quest.status === "done" ? "ok" : `${quest.collected}/${quest.total}`],
    ["Chave", questBook.keyFound ? "ok" : "perdida"],
    ["Monstros", `${questBook.forestMonstersDefeated}/${questBook.forestMonstersGoal}`],
    ["Carta", questBook.letterDelivered ? "ok" : questBook.letterPicked ? "levar ao Beto" : "perdida"],
    ["Dimensao", `${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals} cristais`],
    ["Bau da dimensao", dimensionQuest.chestOpened ? "aberto" : dimensionQuest.bridgeOpen ? "liberado" : "selado"]
  ];
  missionsList.innerHTML = rows.map(([name, value]) => `<li><span>${name}</span><strong>${value}</strong></li>`).join("");
}

function renderStatusPanel() {
  if (!statusList) return;
  const buffs = Object.entries(activePowerUps)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => `${getPowerUpName(key)} ${Math.ceil(value)}s`);
  const rows = [
    ["Nome", getPlayerDisplayName()],
    ["Nivel", player.level >= player.maxLevel ? `${player.level} MAX` : player.level],
    ["XP", player.level >= player.maxLevel ? "Nivel maximo" : `${player.xp}/${player.xpToNextLevel}`],
    ["XP total", player.totalXp],
    ["Vida", `${player.health}/${player.maxHealth}`],
    ["Mana", `${Math.floor(player.mana)}/${player.maxMana}`],
    ["Oxigenio", player.isSwimming ? `${Math.ceil(player.oxygen)}/${player.maxOxygen}` : "fora da agua"],
    ["Dano base", `+${Math.floor(player.damageBonus || 0)}`],
    ["Defesa", player.defense || 0],
    ["Critico", `${Math.round((player.critChance || 0) * 100)}%`],
    ["Arma", getCurrentWeapon().name],
    ["Poder", powerNames[equippedPower] || "Poder"],
    ["Pontos", player.skillPoints || 0],
    ["Bosses", countDefeatedBosses()],
    ["Missoes", countCompletedMissions()],
    ["Buffs", buffs.length ? buffs.join(", ") : "nenhum"]
  ];
  statusList.innerHTML = rows.map(([name, value]) => `<li><span>${name}</span><strong>${value}</strong></li>`).join("");
}

function toggleMissionsPanel(force) {
  missionsOpen = typeof force === "boolean" ? force : !missionsOpen;
  missionsPanel?.classList.toggle("hidden", !missionsOpen);
  if (missionsOpen) {
    statusOpen = false;
    statusPanel?.classList.add("hidden");
    setPause(false);
    renderMissionsPanel();
  }
}

function toggleStatusPanel(force) {
  statusOpen = typeof force === "boolean" ? force : !statusOpen;
  statusPanel?.classList.toggle("hidden", !statusOpen);
  if (statusOpen) {
    missionsOpen = false;
    missionsPanel?.classList.add("hidden");
    setPause(false);
    renderStatusPanel();
  }
}

function closeOverlayPanels() {
  missionsOpen = false;
  statusOpen = false;
  missionsPanel?.classList.add("hidden");
  statusPanel?.classList.add("hidden");
}

function showHudToast(text, duration = 2.4) {
  hudToastText = text || "";
  hudToastTimer = duration;
  let toast = document.getElementById("hudToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "hudToast";
    toast.className = "hud-toast hidden";
    canvas.parentElement?.appendChild(toast);
  }
  toast.textContent = hudToastText;
  toast.classList.toggle("hidden", !hudToastText);
}

function updateHudToast(delta) {
  if (hudToastTimer <= 0) return;
  hudToastTimer = Math.max(0, hudToastTimer - delta);
  if (hudToastTimer <= 0) {
    const toast = document.getElementById("hudToast");
    toast?.classList.add("hidden");
  }
}

function getStrongEnemyWarning() {
  if (currentScene !== "village") return "";

  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  const strong = villageObjects.find((obj) => {
    if (obj.type !== "enemy" || !obj.alive) return false;
    if (!obj.boss && !["slimeVermelho", "golem", "golemPedra", "mago", "magoSombrio", "guardiao", "miniDragao"].includes(obj.kind)) return false;
    return Math.hypot(obj.x - playerCenterX, obj.y - playerCenterY) < 190;
  });

  return strong ? "Inimigo forte perto!" : "";
}

function getActiveBoss() {
  if (currentScene !== "village") return null;

  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  let nearest = null;
  let nearestDistance = Infinity;

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive || !obj.boss) continue;
    const distance = Math.hypot(obj.x + obj.width / 2 - playerCenterX, obj.y + obj.height / 2 - playerCenterY);
    if ((distance < 520 || obj.hp < obj.maxHp) && distance < nearestDistance) {
      nearest = obj;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function getEnemyDisplayName(kind) {
  const names = {
    slimeVerde: "Slime Verde",
    slimeVermelho: "Slime Vermelho",
    slimeAzul: "Slime Azul",
    morcego: "Morcego",
    aranha: "Aranha",
    goblin: "Goblin",
    arqueiroGoblin: "Arqueiro Goblin",
    magoSombrio: "Mago Sombrio",
    golemPedra: "Golem de Pedra",
    fantasma: "Fantasma",
    peixeHostil: "Peixe Hostil",
    miniDragao: "Mini Dragao",
    miniGuardiao: "Mini Guardiao",
    reiSlime: "Rei Slime",
    aranhaRainha: "Aranha Rainha",
    golemAncestral: "Golem Ancestral",
    bruxoSombrio: "Bruxo Sombrio",
    serpenteLago: "Serpente do Lago",
    guardiao: "Guardiao das Ruinas",
    slime: "Slime",
    golem: "Golem de Pedra",
    mago: "Mago Sombrio"
  };
  return names[kind] || kind;
}

function drawMiniMap() {
  miniCtx.clearRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);
  miniCtx.fillStyle = "rgba(39, 48, 82, 0.95)";
  miniCtx.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

  if (currentScene === "crystalDimension") {
    const sx = miniMapCanvas.width / CRYSTAL_WIDTH;
    const sy = miniMapCanvas.height / CRYSTAL_HEIGHT;

    miniCtx.fillStyle = "#2a1a52";
    miniCtx.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

    miniCtx.fillStyle = "#3341aa";
    for (let y = 0; y < CRYSTAL_ROWS; y++) {
      for (let x = 0; x < CRYSTAL_COLS; x++) {
        if (crystalDimensionMap[y][x] === "M") {
          miniCtx.fillRect(x * TILE * sx, y * TILE * sy, Math.ceil(TILE * sx), Math.ceil(TILE * sy));
        }
      }
    }

    miniCtx.fillStyle = "#55e8ff";
    for (const obj of crystalDimensionObjects) {
      if (obj.type === "dimensionPortal" || obj.type === "dimensionCrystal") {
        miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 5, 5);
      }
    }

    miniCtx.fillStyle = "#fff264";
    for (const obj of crystalDimensionObjects) {
      if (obj.type === "npc" || obj.type === "dimensionChest") {
        miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 5, 5);
      }
    }

    miniCtx.fillStyle = "#d24c63";
    miniCtx.fillRect(player.x * sx - 3, player.y * sy - 3, 7, 7);
    return;
  }

  if (currentScene !== "village") {
    miniCtx.fillStyle = "#f0c686";
    miniCtx.fillRect(12, 12, miniMapCanvas.width - 24, miniMapCanvas.height - 24);
    miniCtx.fillStyle = "#273052";
    miniCtx.fillRect(12, 12, miniMapCanvas.width - 24, 8);
    miniCtx.fillStyle = "#fff264";
    miniCtx.fillRect(miniMapCanvas.width / 2 - 3, miniMapCanvas.height - 16, 6, 6);
    miniCtx.fillStyle = "#d24c63";
    miniCtx.fillRect(
      (player.x / HOME_WIDTH) * (miniMapCanvas.width - 24) + 12 - 3,
      (player.y / HOME_HEIGHT) * (miniMapCanvas.height - 24) + 12 - 3,
      6,
      6
    );
    return;
  }

  const sx = miniMapCanvas.width / WORLD_WIDTH;
  const sy = miniMapCanvas.height / WORLD_HEIGHT;

  miniCtx.fillStyle = "#82dc83";
  miniCtx.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

  miniCtx.fillStyle = "#48a7e6";
  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < MAP_COLS; x++) {
      if (worldMap[y][x] === "W") {
        miniCtx.fillRect(x * TILE * sx, y * TILE * sy, Math.ceil(TILE * sx), Math.ceil(TILE * sy));
      }
    }
  }

  miniCtx.fillStyle = "#fff264";
  for (const obj of villageObjects) {
    if (obj.type === "house" || obj.type === "playerHouse" || obj.type === "shop") {
      miniCtx.fillRect(obj.x * sx, obj.y * sy, obj.width * sx, obj.height * sy);
    }
  }

  miniCtx.fillStyle = "#3f8fe5";
  for (const obj of villageObjects) {
    if (obj.type === "npc" && ["Nico", "Vendedor", "Beto"].includes(obj.name)) {
      miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 5, 5);
    }
  }

  miniCtx.fillStyle = "#ff4f62";
  for (const obj of villageObjects) {
    if (obj.type === "enemy" && obj.boss && obj.alive) {
      miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 6, 6);
    }
  }

  miniCtx.fillStyle = "#d24c63";
  miniCtx.fillRect(player.x * sx - 3, player.y * sy - 3, 7, 7);
}

function saveGame() {
  syncDimensionQuestState();
  normalizeLevelState();
  const save = {
    scene: currentScene,
    player: {
      name: getPlayerDisplayName(),
      x: player.x,
      y: player.y,
      level: player.level,
      xp: player.xp,
      xpToNextLevel: player.xpToNextLevel,
      maxLevel: player.maxLevel,
      totalXp: player.totalXp,
      skillPoints: player.skillPoints,
      damageBonus: player.damageBonus,
      speed: player.speed,
      baseSpeed: player.baseSpeed,
      defense: player.defense,
      health: player.health,
      maxHealth: player.maxHealth,
      mana: player.mana,
      maxMana: player.maxMana,
      oxygen: player.oxygen,
      maxOxygen: player.maxOxygen,
      isSwimming: player.isSwimming,
      spellCooldowns: { ...player.spellCooldowns },
      direction: player.direction,
      currentWeaponIndex,
      equippedPower,
      unlockedWeapons: [...player.unlockedWeapons]
    },
    inventory: { ...inventory },
    quest: { ...quest },
    questBook: { ...questBook },
    unlockedPowers: { fireball: true, dash: true, shockwave: true, heal: true },
    activePowerUps: { ...activePowerUps },
    dimensionQuest: { ...dimensionQuest },
    dimensionCrystals: crystalDimensionObjects
      .filter((obj) => obj.type === "dimensionCrystal" && obj.activated)
      .map((obj) => obj.crystalIndex),
    powerUpsCollected: powerUps
      .filter((obj) => obj.collected)
      .map(getSaveObjectKey),
    collected: villageObjects
      .filter((obj) => (obj.type === "collectible" || obj.type === "crystal") && obj.collected)
      .map(getSaveObjectKey),
    enemies: villageObjects
      .filter((obj) => obj.type === "enemy")
      .map((obj) => ({ key: getSaveObjectKey(obj), alive: obj.alive, hp: obj.hp, phase: obj.phase })),
    lootItems: lootItems
      .filter((obj) => !obj.collected)
      .map((obj) => ({
        kind: obj.kind,
        itemName: obj.itemName,
        amount: obj.amount,
        x: obj.x,
        y: obj.y
      }))
  };

  if (!writeSaveRaw(JSON.stringify(save))) return;
  startMessage.textContent = "Jogo salvo!";
  showHudToast("Jogo salvo!");
  saveNoticeTimer = 2;
}

function loadGame() {
  const raw = readSaveRaw();
  if (!raw) return false;

  try {
    const save = JSON.parse(raw);
    Object.assign(inventory, save.inventory || {});
    Object.assign(quest, save.quest || {});
    Object.assign(questBook, save.questBook || {});
    Object.assign(dimensionQuest, save.dimensionQuest || {});
    Object.assign(activePowerUps, save.activePowerUps || {});
    currentWeaponIndex = save.player?.currentWeaponIndex ?? 0;
    equippedPower = save.player?.equippedPower || "fireball";
    player.unlockedWeapons = save.player?.unlockedWeapons || player.unlockedWeapons;
    player.name = sanitizePlayerName(save.player?.name, FALLBACK_PLAYER_NAME);
    player.level = save.player?.level ?? 1;
    player.xp = save.player?.xp ?? 0;
    player.xpToNextLevel = save.player?.xpToNextLevel ?? getXpToNextLevel(player.level);
    player.maxLevel = save.player?.maxLevel ?? PLAYER_MAX_LEVEL;
    player.totalXp = save.player?.totalXp ?? 0;
    player.skillPoints = save.player?.skillPoints ?? 0;
    player.damageBonus = save.player?.damageBonus ?? 0;
    player.defense = save.player?.defense ?? 0;
    player.baseSpeed = save.player?.baseSpeed ?? 150;
    player.speed = save.player?.speed ?? player.baseSpeed;

    const collected = new Set(save.collected || []);
    const powerUpsCollected = new Set(save.powerUpsCollected || []);
    const enemies = new Map((save.enemies || []).map((entry) => [entry.key, entry]));
    for (const obj of villageObjects) {
      if (obj.type === "collectible" || obj.type === "crystal") {
        obj.collected = collected.has(getSaveObjectKey(obj));
      }
      if (obj.type === "enemy") {
        const savedEnemy = enemies.get(getSaveObjectKey(obj));
        obj.alive = savedEnemy ? savedEnemy.alive : true;
        obj.hp = savedEnemy ? savedEnemy.hp : obj.maxHp;
        obj.phase = savedEnemy?.phase || 1;
      }
    }

    lootItems.length = 0;
    for (const obj of save.lootItems || []) {
      if (!Number.isFinite(obj.x) || !Number.isFinite(obj.y)) continue;
      lootItems.push(lootItem(obj.x, obj.y, obj.kind || "moeda", obj.amount || 1, obj.itemName || ""));
    }

    for (const obj of powerUps) {
      obj.collected = powerUpsCollected.has(getSaveObjectKey(obj));
    }

    const dimensionCrystals = new Set(save.dimensionCrystals || []);
    for (const obj of crystalDimensionObjects) {
      if (obj.type === "dimensionCrystal") {
        obj.activated = dimensionCrystals.has(obj.crystalIndex);
        obj.activatedAt = obj.activated ? performance.now() - 1000 : 0;
      }
      if (obj.type === "dimensionChest") {
        obj.opened = Boolean(dimensionQuest.chestOpened);
      }
    }
    syncDimensionQuestState();

    const savedScene = ["village", "home", "shopInterior", "mayorInterior", "crystalDimension"].includes(save.scene) ?
      save.scene : "village";
    setActiveScene(savedScene);
    if (savedScene === "crystalDimension") dimensionQuest.entered = true;
    player.x = save.player?.x ?? player.startX;
    player.y = save.player?.y ?? player.startY;
    player.maxHealth = save.player?.maxHealth ?? 5;
    player.health = save.player?.health ?? player.maxHealth;
    player.maxMana = save.player?.maxMana ?? 6;
    player.mana = save.player?.mana ?? player.maxMana;
    player.maxOxygen = save.player?.maxOxygen ?? 10;
    player.oxygen = save.player?.oxygen ?? player.maxOxygen;
    player.isSwimming = Boolean(save.player?.isSwimming);
    Object.assign(player.spellCooldowns, save.player?.spellCooldowns || {});
    player.direction = save.player?.direction || "down";
    normalizeRuntimeState();
    if (characterNameInput) characterNameInput.value = getPlayerDisplayName();
    gameOver = player.health <= 0;
    gameOverScreen.classList.toggle("hidden", !gameOver);
    updateQuestProgress();
    updateHud();
    renderInventory();
    return true;
  } catch (error) {
    console.error("Erro ao carregar save", error);
    return false;
  }
}

function getSaveObjectKey(obj) {
  if (obj.type === "enemy") {
    return `${obj.type}:${obj.kind}:${Math.round(obj.spawnX ?? obj.x)}:${Math.round(obj.spawnY ?? obj.y)}`;
  }

  return `${obj.type}:${obj.item || obj.kind || "item"}:${Math.round(obj.x)}:${Math.round(obj.y)}`;
}

function resetProgressForNewGame(name) {
  closeOverlayPanels();
  closeDialog();
  closeShop();
  inventoryOpen = false;
  inventoryPanel?.classList.add("hidden");
  gameOver = false;
  gameOverScreen.classList.add("hidden");
  gameStarted = false;

  Object.assign(inventory, {
    cristais: 0,
    chaves: 0,
    pocoes: 1,
    moedas: 8,
    espadas: 0,
    cartas: 0,
    fragmentos: 0,
    flechas: 12,
    chavesRaras: 0,
    manaOrbes: 0,
    itensBoss: []
  });

  Object.assign(quest, {
    status: "notStarted",
    collected: 0,
    total: 3,
    reward: "Amuleto da Vila"
  });

  Object.assign(questBook, {
    keyFound: false,
    forestMonstersDefeated: 0,
    forestMonstersGoal: 3,
    letterPicked: false,
    letterDelivered: false,
    bossDefeated: false,
    bossChestOpened: false,
    defeatedBosses: {},
    openedChests: {},
    discoveredAreas: {}
  });

  Object.assign(dimensionQuest, {
    entered: false,
    status: "notStarted",
    activatedCrystals: 0,
    totalCrystals: 3,
    bridgeOpen: false,
    chestOpened: false,
    missionDone: false
  });

  for (const key of Object.keys(activePowerUps)) activePowerUps[key] = 0;
  lootItems.length = 0;
  projectiles.length = 0;
  enemyProjectiles.length = 0;
  floatingTexts.length = 0;
  shockwaves.length = 0;
  dashTrails.length = 0;
  healBursts.length = 0;
  hazardZones.length = 0;

  for (const obj of villageObjects) {
    if (obj.type === "collectible" || obj.type === "crystal") obj.collected = false;
    if (obj.type === "enemy") {
      obj.alive = true;
      obj.hp = obj.maxHp;
      obj.phase = 1;
      obj.x = obj.spawnX ?? obj.x;
      obj.y = obj.spawnY ?? obj.y;
      normalizeEnemy(obj);
    }
  }

  for (const obj of crystalDimensionObjects) {
    if (obj.type === "dimensionCrystal") {
      obj.activated = false;
      obj.activatedAt = 0;
    }
    if (obj.type === "dimensionChest") obj.opened = false;
  }

  for (const obj of powerUps) obj.collected = false;

  Object.assign(player, {
    name: sanitizePlayerName(name, DEFAULT_NEW_PLAYER_NAME),
    x: player.startX,
    y: player.startY,
    speed: 150,
    baseSpeed: 150,
    maxHealth: 5,
    health: 5,
    defense: 0,
    critChance: 0.12,
    level: 1,
    xp: 0,
    xpToNextLevel: getXpToNextLevel(1),
    maxLevel: PLAYER_MAX_LEVEL,
    totalXp: 0,
    skillPoints: 0,
    damageBonus: 0,
    levelGlowTimer: 0,
    maxMana: 6,
    mana: 6,
    maxOxygen: 10,
    oxygen: 10,
    isSwimming: false,
    direction: "down",
    moving: false,
    frame: 0,
    animTimer: 0
  });
  Object.assign(player.spellCooldowns, { fireball: 0, blueRay: 0, dash: 0, shockwave: 0, heal: 0 });
  player.unlockedWeapons = ["sword", "bow", "staff", "spear"];
  currentWeaponIndex = 0;
  equippedPower = "fireball";
  lastVillagePosition = { x: player.startX, y: player.startY };
  playerInvulnerableTimer = 0;
  playerKnockbackX = 0;
  playerKnockbackY = 0;
  damageCooldown = 0;
  weaponCooldownTimer = 0;
  dodgeCooldownTimer = 0;
  hitstopTimer = 0;

  setActiveScene("village");
  normalizeRuntimeState();
  if (characterNameInput) characterNameInput.value = getPlayerDisplayName();
  updateHud();
  updateQuestProgress();
  renderInventory();
}

function startNewGame() {
  ensureAudio();
  startMusic();
  updateDeviceMode();
  setPause(false);
  const chosenName = getNameFromInput();
  if (readSaveRaw()) {
    const confirmed = window.confirm("Existe um save antigo. Comecar do zero e apagar o progresso salvo?");
    if (!confirmed) {
      startMessage.textContent = "Novo jogo cancelado. Use Continuar para carregar o save.";
      return;
    }
  }

  resetProgressForNewGame(chosenName);
  gameStarted = true;
  startScreen.classList.add("hidden");
  saveGame();
}

function startGame(loadSave = false) {
  ensureAudio();
  startMusic();
  updateDeviceMode();
  setPause(false);

  if (loadSave && !loadGame()) {
    startMessage.textContent = "Nenhum jogo salvo encontrado.";
    return;
  }

  normalizeRuntimeState();
  if (!loadSave) setPlayerName(getNameFromInput(), DEFAULT_NEW_PLAYER_NAME);
  gameStarted = true;
  startScreen.classList.add("hidden");
  updateHud();
  updateQuestProgress();
}

function showInfo(title, text) {
  infoTitle.textContent = title;
  infoText.textContent = text;
  infoPanel.classList.remove("hidden");
}

function showErrorMessage(error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message === lastErrorMessage) return;

  lastErrorMessage = message;
  console.error("Erro no jogo:", error);
  showInfo("Erro no jogo", `Algo deu errado, mas a tela nao vai ficar preta. Detalhe: ${message}`);
}

function updateDebugPanel(delta) {
  if (!debugEnabled || !debugPanel) return;

  fpsFrameCount += 1;
  fpsTimer += delta;
  if (fpsTimer >= 0.5) {
    fpsEstimate = Math.round(fpsFrameCount / fpsTimer);
    fpsFrameCount = 0;
    fpsTimer = 0;
  }

  debugPanel.innerHTML = [
    `Tela: ${window.innerWidth}x${window.innerHeight}`,
    `Canvas: ${canvas.width}x${canvas.height}`,
    `FPS: ${fpsEstimate || "--"}`,
    `isMobile: ${isMobile}`,
    `Cena: ${currentScene}`,
    `X/Y: ${Math.round(player.x)} / ${Math.round(player.y)}`,
    `Erro: ${lastErrorMessage || "nenhum"}`,
    `Joystick: ${joystick.active ? "ativo" : "parado"} ${joystick.strength.toFixed(2)}`,
    `Botao: ${pressedMobileButton || "nenhum"}`
  ].join("<br>");
}

function ensureAudio() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  } catch (error) {
    audioContext = null;
  }
}

function playTone(frequency, duration, type = "square", volume = 0.08) {
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function playSound(name) {
  ensureAudio();
  if (!audioContext) return;
  if (name === "coin") {
    playTone(880, 0.08, "square", 0.09);
    setTimeout(() => playTone(1320, 0.08, "square", 0.07), 70);
  } else if (name === "npc") {
    playTone(360, 0.08, "triangle", 0.07);
    setTimeout(() => playTone(430, 0.08, "triangle", 0.06), 80);
  } else if (name === "dialog") {
    playTone(620, 0.06, "sine", 0.06);
  } else if (name === "inventoryOpen") {
    playTone(260, 0.06, "square", 0.05);
    setTimeout(() => playTone(520, 0.08, "triangle", 0.05), 55);
  } else if (name === "inventoryClose") {
    playTone(420, 0.05, "triangle", 0.04);
    setTimeout(() => playTone(220, 0.07, "square", 0.035), 55);
  } else if (name === "selectItem") {
    playTone(680, 0.04, "square", 0.035);
  } else if (name === "usePotion") {
    playTone(540, 0.08, "triangle", 0.06);
    setTimeout(() => playTone(760, 0.08, "triangle", 0.05), 70);
  } else if (name === "equipItem") {
    playTone(480, 0.05, "square", 0.05);
    setTimeout(() => playTone(720, 0.06, "square", 0.04), 55);
  } else if (name === "levelUp") {
    playTone(520, 0.08, "triangle", 0.07);
    setTimeout(() => playTone(780, 0.09, "triangle", 0.065), 80);
    setTimeout(() => playTone(1040, 0.12, "sine", 0.06), 170);
  } else if (name === "invalid") {
    playTone(110, 0.09, "sawtooth", 0.045);
  } else if (name === "hit") {
    playTone(150, 0.12, "sawtooth", 0.08);
  } else if (name === "portal") {
    playTone(220, 0.12, "sine", 0.08);
    setTimeout(() => playTone(440, 0.12, "triangle", 0.07), 90);
    setTimeout(() => playTone(880, 0.16, "sine", 0.06), 180);
  } else if (name === "crystal") {
    playTone(760, 0.08, "triangle", 0.08);
    setTimeout(() => playTone(1140, 0.1, "sine", 0.06), 75);
  } else if (name === "chest") {
    playTone(520, 0.08, "square", 0.08);
    setTimeout(() => playTone(740, 0.08, "square", 0.07), 80);
    setTimeout(() => playTone(980, 0.13, "triangle", 0.07), 160);
  } else if (name === "mission") {
    playTone(330, 0.08, "triangle", 0.06);
    setTimeout(() => playTone(660, 0.08, "triangle", 0.06), 90);
    setTimeout(() => playTone(990, 0.12, "triangle", 0.06), 180);
  } else if (name === "attack") {
    playTone(260, 0.05, "sawtooth", 0.05);
    setTimeout(() => playTone(180, 0.05, "sawtooth", 0.04), 55);
  } else if (name === "hitEnemy") {
    playTone(170, 0.08, "square", 0.06);
    setTimeout(() => playTone(110, 0.06, "square", 0.05), 55);
  } else if (name === "playerHit") {
    playTone(120, 0.12, "sawtooth", 0.08);
  } else if (name === "powerup") {
    playTone(680, 0.08, "triangle", 0.08);
    setTimeout(() => playTone(1020, 0.11, "triangle", 0.07), 70);
  } else if (name === "magic") {
    playTone(420, 0.08, "sine", 0.07);
    setTimeout(() => playTone(840, 0.08, "triangle", 0.06), 70);
  } else if (name === "dash") {
    playTone(520, 0.06, "sawtooth", 0.06);
    setTimeout(() => playTone(260, 0.05, "sawtooth", 0.05), 45);
  } else if (name === "shockwave") {
    playTone(96, 0.14, "sine", 0.09);
    setTimeout(() => playTone(192, 0.12, "sine", 0.07), 90);
  } else if (name === "heal") {
    playTone(540, 0.08, "triangle", 0.06);
    setTimeout(() => playTone(720, 0.08, "triangle", 0.06), 80);
  } else if (name === "enemyMagic") {
    playTone(300, 0.08, "triangle", 0.05);
    setTimeout(() => playTone(240, 0.08, "triangle", 0.04), 70);
  } else if (name === "enemyDown") {
    playTone(330, 0.08, "square", 0.07);
    setTimeout(() => playTone(520, 0.1, "square", 0.06), 80);
  } else if (name === "bossDown") {
    playTone(180, 0.12, "sawtooth", 0.09);
    setTimeout(() => playTone(360, 0.12, "triangle", 0.08), 110);
    setTimeout(() => playTone(720, 0.18, "triangle", 0.07), 230);
  } else if (name === "weaponSwap") {
    playTone(420, 0.05, "square", 0.05);
    setTimeout(() => playTone(640, 0.06, "square", 0.04), 55);
  } else if (name === "bow") {
    playTone(220, 0.04, "triangle", 0.045);
    setTimeout(() => playTone(160, 0.05, "triangle", 0.035), 45);
  } else if (name === "water") {
    playTone(180, 0.06, "sine", 0.025);
    setTimeout(() => playTone(240, 0.05, "sine", 0.02), 40);
  }
}

function startMusic() {
  if (musicTimer || !audioContext) return;

  const notes = [262, 330, 392, 523, 392, 330, 294, 392];
  let index = 0;
  musicGain = audioContext.createGain();
  musicGain.gain.value = 0.035;
  musicGain.connect(audioContext.destination);

  musicTimer = setInterval(() => {
    if (!audioContext || audioContext.state !== "running") return;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.value = notes[index % notes.length];
    gain.gain.setValueAtTime(0.0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.8, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.32);
    oscillator.connect(gain);
    gain.connect(musicGain);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.34);
    index += 1;
  }, 360);
}

function toggleInventory(force) {
  const nextOpen = typeof force === "boolean" ? force : !inventoryOpen;
  if (inventoryOpen === nextOpen) return;

  inventoryOpen = nextOpen;
  inventoryPanel?.classList.toggle("hidden", !inventoryOpen);

  if (inventoryOpen) {
    closeOverlayPanels();
    closeShop();
    setPause(false);
    keys.clear();
    playSound("inventoryOpen");
    renderInventory();
  } else {
    playSound("inventoryClose");
  }
}

function getInventoryItems() {
  const items = [];
  const addItem = (item) => {
    if (!item || item.quantity <= 0) return;
    items.push({
      rarity: "comum",
      typeLabel: "Item",
      effect: "",
      action: "",
      ...item
    });
  };

  addItem({
    id: "moedas",
    name: "Moedas",
    icon: "$",
    quantity: Number(inventory.moedas || 0),
    category: "materiais",
    typeLabel: "Dinheiro",
    rarity: "comum",
    description: "Usadas para comprar pocoes e recompensas na vila.",
    effect: "Loja: 5 moedas compram 1 pocao."
  });
  addItem({
    id: "pocoes",
    name: "Pocoes",
    icon: "P",
    quantity: Number(inventory.pocoes || 0),
    category: "consumiveis",
    typeLabel: "Consumivel",
    rarity: "comum",
    description: "Frasco vermelho para recuperar vida durante a aventura.",
    effect: "Recupera 1 coracao.",
    action: "usePotion"
  });
  addItem({
    id: "cristais",
    name: "Cristais",
    icon: "C",
    quantity: Number(inventory.cristais || 0),
    category: "missao",
    typeLabel: "Missao",
    rarity: "incomum",
    description: "Cristais brilhantes pedidos por Nico.",
    effect: "Leve 3 cristais para concluir a primeira missao.",
    locked: true
  });
  addItem({
    id: "chaves",
    name: "Chaves",
    icon: "K",
    quantity: Number(inventory.chaves || 0),
    category: "missao",
    typeLabel: "Missao",
    rarity: "incomum",
    description: "Chaves perdidas encontradas pela vila.",
    effect: "Podem abrir caminhos e completar missoes.",
    locked: true
  });
  addItem({
    id: "cartas",
    name: "Cartas",
    icon: "L",
    quantity: Number(inventory.cartas || 0),
    category: "missao",
    typeLabel: "Entrega",
    rarity: "comum",
    description: "Carta que precisa chegar ao morador certo.",
    effect: "Entregue para concluir a missao da carta.",
    locked: true
  });
  addItem({
    id: "espadas-extra",
    name: "Espadas extras",
    icon: "S",
    quantity: Number(inventory.espadas || 0),
    category: "armas",
    typeLabel: "Arma rara",
    rarity: "raro",
    description: "Espadas especiais obtidas em recompensa.",
    effect: "Cada espada extra aumenta o dano fisico em +1.",
    locked: true
  });
  addItem({
    id: "flechas",
    name: "Flechas",
    icon: "A",
    quantity: Number(inventory.flechas || 0),
    category: "materiais",
    typeLabel: "Municao",
    rarity: "comum",
    description: "Municao usada pelo arco.",
    effect: "O arco consome 1 flecha por disparo."
  });
  addItem({
    id: "fragmentos",
    name: "Fragmentos",
    icon: "F",
    quantity: Number(inventory.fragmentos || 0),
    category: "materiais",
    typeLabel: "Material",
    rarity: "raro",
    description: "Pedacos brilhantes deixados por monstros fortes.",
    effect: "Material raro para futuras melhorias.",
    locked: true
  });
  addItem({
    id: "mana-orbes",
    name: "Orbes de mana",
    icon: "M",
    quantity: Number(inventory.manaOrbes || 0),
    category: "consumiveis",
    typeLabel: "Energia",
    rarity: "incomum",
    description: "Orbes roxos cheios de magia.",
    effect: "Recarregam mana quando coletados pelo mapa.",
    locked: true
  });
  addItem({
    id: "chaves-raras",
    name: "Chaves raras",
    icon: "R",
    quantity: Number(inventory.chavesRaras || 0),
    category: "raros",
    typeLabel: "Raro",
    rarity: "epico",
    description: "Chaves antigas carregadas de energia.",
    effect: "Guardam segredos de baus especiais.",
    locked: true
  });

  const collectedPowerUps = typeof powerUps !== "undefined" ? powerUps.filter((obj) => obj.collected).length : 0;
  addItem({
    id: "powerups-coletados",
    name: "Power-ups coletados",
    icon: "B",
    quantity: collectedPowerUps,
    category: "raros",
    typeLabel: "Registro",
    rarity: "incomum",
    description: "Total de power-ups temporarios ja encontrados.",
    effect: "Velocidade, forca, escudo, regeneracao e respiracao aquatica.",
    locked: true
  });

  for (const [key, timeLeft] of Object.entries(activePowerUps)) {
    if (timeLeft <= 0) continue;
    addItem({
      id: `buff-${key}`,
      name: getPowerUpName(key),
      icon: "B",
      quantity: Math.ceil(timeLeft),
      category: "raros",
      typeLabel: "Buff ativo",
      rarity: "epico",
      description: "Power-up temporario ativo agora.",
      effect: `Tempo restante: ${Math.ceil(timeLeft)}s.`,
      locked: true
    });
  }

  for (const weaponKey of player.unlockedWeapons || []) {
    const weapon = weapons[weaponKey] || weapons.sword;
    const rarity = weaponKey === "sword" ? "comum" : weaponKey === "bow" ? "incomum" : weaponKey === "staff" ? "raro" : "epico";
    addItem({
      id: `weapon-${weaponKey}`,
      name: weapon.name,
      icon: weaponKey === "bow" ? "A" : weaponKey === "staff" ? "W" : weaponKey === "spear" ? "L" : "S",
      quantity: 1,
      category: "armas",
      typeLabel: "Arma",
      rarity,
      description: getWeaponDescription(weaponKey),
      effect: `Dano ${weapon.damage} | Alcance ${weapon.range}`,
      action: "equipWeapon",
      weaponKey
    });
  }

  for (const powerKey of powerSlots) {
    addItem({
      id: `power-${powerKey}`,
      name: powerNames[powerKey] || "Poder",
      icon: "Q",
      quantity: 1,
      category: "raros",
      typeLabel: "Poder",
      rarity: powerKey === "heal" ? "incomum" : powerKey === "shockwave" ? "epico" : "raro",
      description: getPowerDescription(powerKey),
      effect: `Custo de mana: ${spellCosts[powerKey] || 0}`,
      action: "equipPower",
      powerKey
    });
  }

  if (quest.status === "done") {
    addItem({
      id: "amuleto-vila",
      name: quest.reward || "Amuleto da Vila",
      icon: "O",
      quantity: 1,
      category: "raros",
      typeLabel: "Amuleto",
      rarity: "lendario",
      description: "Recompensa por ajudar Nico com os cristais.",
      effect: "Simbolo de amizade com a vila.",
      locked: true
    });
  }

  (inventory.itensBoss || []).forEach((itemName, index) => {
    addItem({
      id: `boss-${index}-${String(itemName).replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
      name: itemName || "Item misterioso",
      icon: "X",
      quantity: 1,
      category: "raros",
      typeLabel: "Boss",
      rarity: "lendario",
      description: "Trofeu raro deixado por um chefe derrotado.",
      effect: "Item especial guardado na bolsa.",
      locked: true
    });
  });

  return items;
}

function getWeaponDescription(weaponKey) {
  if (weaponKey === "bow") return "Arma de longo alcance que consome flechas.";
  if (weaponKey === "staff") return "Cajado magico que dispara energia azul.";
  if (weaponKey === "spear") return "Lanca com ataque frontal mais comprido.";
  return "Espada confiavel para combate de perto.";
}

function getPowerDescription(powerKey) {
  if (powerKey === "blueRay") return "Disparo magico rapido para acertar inimigos a distancia.";
  if (powerKey === "shockwave") return "Onda de choque que empurra e fere inimigos ao redor.";
  if (powerKey === "heal") return "Magia de cura para recuperar vida usando mana.";
  return "Bola de fogo para causar dano magico.";
}

function getFilteredInventoryItems(items) {
  if (inventoryTab === "all") return items;
  if (inventoryTab === "raros") return items.filter((item) => item.category === "raros" || ["raro", "epico", "lendario"].includes(item.rarity));
  return items.filter((item) => item.category === inventoryTab);
}

function getInventoryItemById(itemId) {
  return getInventoryItems().find((item) => item.id === itemId) || null;
}

function formatRarity(rarity) {
  if (rarity === "incomum") return "Incomum";
  if (rarity === "raro") return "Raro";
  if (rarity === "epico") return "Epico";
  if (rarity === "lendario") return "Lendario";
  return "Comum";
}

function renderInventory() {
  const items = getInventoryItems();
  const filteredItems = getFilteredInventoryItems(items);
  const selectedExists = filteredItems.some((item) => item.id === selectedInventoryItemId);
  if (!selectedExists) selectedInventoryItemId = filteredItems[0]?.id || "";

  renderInventoryTabs();
  renderInventoryGrid(filteredItems, items.length);
  renderEquipmentSlots();
  renderItemDetails(getInventoryItemById(selectedInventoryItemId));

  if (inventoryList) {
    inventoryList.innerHTML = items.map((item) => `<li>${item.name}: <strong>${item.quantity}</strong></li>`).join("");
  }
}

function renderInventoryTabs() {
  if (!inventoryTabs) return;
  for (const button of inventoryTabs.querySelectorAll("[data-inventory-tab]")) {
    button.classList.toggle("is-active", button.dataset.inventoryTab === inventoryTab);
  }
}

function renderInventoryGrid(filteredItems, totalItems) {
  if (!inventoryGrid) return;

  const slotCount = Math.max(30, filteredItems.length);
  const slots = [];
  for (let index = 0; index < slotCount; index += 1) {
    const item = filteredItems[index];
    if (!item) {
      slots.push(`<button class="inventory-slot is-empty" type="button" disabled aria-label="Slot vazio"></button>`);
      continue;
    }

    const equipped = (item.weaponKey && item.weaponKey === getCurrentWeaponKey()) ||
      (item.powerKey && item.powerKey === equippedPower);
    slots.push(`
      <button class="inventory-slot rarity-${item.rarity}${selectedInventoryItemId === item.id ? " is-selected" : ""}${equipped ? " is-equipped" : ""}" type="button" data-item-id="${item.id}">
        <span class="item-icon">${item.icon || "?"}</span>
        <span class="item-qty">${item.quantity > 1 ? item.quantity : ""}</span>
      </button>
    `);
  }

  inventoryGrid.innerHTML = slots.join("");
  if (inventoryEmpty) {
    inventoryEmpty.textContent = totalItems ? "Nada nesta aba." : "Sua bolsa esta vazia.";
    inventoryEmpty.classList.toggle("hidden", filteredItems.length > 0);
  }
}

function renderEquipmentSlots() {
  if (!equipmentSlots) return;

  const bossItem = inventory.itensBoss?.[0] || "Vazio";
  const slots = [
    ["Arma", getCurrentWeapon().name],
    ["Poder Q", powerNames[equippedPower] || "Nenhum"],
    ["Amuleto", quest.status === "done" ? (quest.reward || "Amuleto da Vila") : "Vazio"],
    ["Especial", bossItem],
    ["Defesa", `${player.defense || 0}`]
  ];

  equipmentSlots.innerHTML = slots.map(([label, value]) => `
    <div class="equipment-slot">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function renderItemDetails(item) {
  if (!itemDetailName || !itemDetailMeta || !itemDetailDescription || !itemDetailEffect || !itemDetailActions) return;

  if (!item) {
    itemDetailName.textContent = "Bolsa vazia";
    itemDetailMeta.textContent = "Nenhum item selecionado.";
    itemDetailDescription.textContent = "Colete moedas, pocoes, cristais, chaves e armas pelo mapa.";
    itemDetailEffect.textContent = "";
    itemDetailActions.innerHTML = "";
    return;
  }

  itemDetailName.textContent = item.name;
  itemDetailMeta.textContent = `${item.typeLabel} | ${formatRarity(item.rarity)} | Qtd. ${item.quantity}`;
  itemDetailDescription.textContent = item.description || "Item desconhecido guardado com cuidado.";
  itemDetailEffect.textContent = item.effect || "";
  itemDetailActions.innerHTML = getInventoryActionHtml(item);
}

function getInventoryActionHtml(item) {
  if (item.action === "usePotion") {
    const disabled = player.health >= player.maxHealth ? " disabled" : "";
    const text = player.health >= player.maxHealth ? "Vida cheia" : "Usar pocao";
    return `<button type="button" data-inventory-action="usePotion"${disabled}>${text}</button>`;
  }

  if (item.action === "equipWeapon") {
    const isEquipped = item.weaponKey === getCurrentWeaponKey();
    return `<button type="button" data-inventory-action="equipWeapon" data-weapon-key="${item.weaponKey}">${isEquipped ? "Equipado" : "Equipar arma"}</button>`;
  }

  if (item.action === "equipPower") {
    const isEquipped = item.powerKey === equippedPower;
    return `<button type="button" data-inventory-action="equipPower" data-power-key="${item.powerKey}">${isEquipped ? "Equipado no Q" : "Equipar no Q"}</button>`;
  }

  if (item.locked || item.category === "missao") {
    return `<button type="button" disabled>Item de missao</button>`;
  }

  return `<button type="button" disabled>Sem acao</button>`;
}

function handleInventoryAction(actionButton) {
  const action = actionButton.dataset.inventoryAction;
  if (action === "usePotion") {
    usePotion();
  } else if (action === "equipWeapon") {
    equipWeapon(actionButton.dataset.weaponKey);
  } else if (action === "equipPower") {
    const slotIndex = powerSlots.indexOf(actionButton.dataset.powerKey);
    if (slotIndex === -1) {
      playSound("invalid");
      showHudToast("Poder desconhecido.");
    } else {
      equipPower(slotIndex);
      playSound("equipItem");
    }
  } else {
    playSound("invalid");
  }

  renderInventory();
}

function openShop() {
  playSound("npc");
  shopOpen = true;
  shopPanel.classList.remove("hidden");
  shopMessage.textContent = `Voce tem ${inventory.moedas} moedas.`;
}

function closeShop() {
  shopOpen = false;
  shopPanel.classList.add("hidden");
}

function buyPotion() {
  if (inventory.moedas < 5) {
    shopMessage.textContent = "Moedas insuficientes.";
    return;
  }
  inventory.moedas -= 5;
  inventory.pocoes += 1;
  shopMessage.textContent = "Pocao comprada!";
  renderInventory();
  updateHud();
}

function usePotion() {
  if (gameOver) return false;
  if (inventory.pocoes <= 0) {
    showHudToast("Voce nao tem pocoes.");
    playSound("invalid");
    return false;
  }
  if (player.health >= player.maxHealth) {
    showHudToast("Vida ja esta cheia.");
    playSound("invalid");
    return false;
  }

  inventory.pocoes -= 1;
  player.health = Math.min(player.maxHealth, player.health + 1);
  showHudToast("Pocao usada.");
  playSound("usePotion");
  renderInventory();
  updateHud();
  return true;
}

function takeDamage(amount, sourceX = player.x, sourceY = player.y) {
  if (gameOver || playerInvulnerableTimer > 0) return;

  const shieldBlock = activePowerUps.shield > 0 ? 1 : 0;
  const finalDamage = Math.max(0, amount - shieldBlock - (player.defense || 0));
  playerInvulnerableTimer = 0.9;
  playSound("playerHit");
  vibrate(finalDamage > 0 ? 45 : 16);

  if (finalDamage > 0) {
    player.health = Math.max(0, player.health - finalDamage);
    spawnFloatingText(`-${finalDamage}`, player.x + 12, player.y - 12, "#ff4f62");
  } else {
    spawnFloatingText("Bloqueou!", player.x + 12, player.y - 12, "#fff264");
  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const dx = centerX - sourceX;
  const dy = centerY - sourceY;
  const length = Math.hypot(dx, dy) || 1;
  playerKnockbackX = (dx / length) * 160;
  playerKnockbackY = (dy / length) * 160;
  updateHud();
  if (player.health <= 0) {
    gameOver = true;
    gameOverScreen.classList.remove("hidden");
  }
}

function triggerAttack() {
  triggerPrimaryAttack();
}

function triggerPrimaryAttack() {
  if (gameOver || dialogOpen || inventoryOpen || shopOpen || pauseOpen || currentScene !== "village") return;
  if (weaponCooldownTimer > 0 || attackWindupTimer > 0 || attackRecoveryTimer > 0 || attackTimer > 0) return;

  updateDirectionFromAim();
  const weapon = getCurrentWeapon();
  const aim = getAimVector();
  const swimPenalty = player.isSwimming && weapon.kind !== "projectile" ? 1.35 : 1;
  weaponCooldownTimer = weapon.cooldown * swimPenalty;

  if (weapon.kind === "projectile") {
    fireWeaponProjectile(weapon, aim);
    return;
  }

  attackDirection = player.direction;
  attackWindupTimer = weapon.kind === "line" ? 0.12 * swimPenalty : 0.09 * swimPenalty;
  attackRecoveryTimer = weapon.cooldown * swimPenalty;
  attackTimer = weapon.cooldown * swimPenalty;
  attackHitDone = false;
  currentMeleeAttack = {
    weaponKey: getCurrentWeaponKey(),
    angle: aim.angle,
    range: isMobile ? weapon.range + 16 : weapon.range,
    arc: isMobile ? Math.min(Math.PI * 0.95, weapon.arc * 1.22) : weapon.arc,
    timer: attackTimer,
    maxTimer: attackTimer
  };
  playSound("attack");
  vibrate(18);
}

function fireWeaponProjectile(weapon, aim) {
  if (weapon.projectile === "arrow") {
    if (inventory.flechas <= 0) {
      weaponCooldownTimer = 0.12;
      spawnFloatingText("Sem flechas", player.x + 4, player.y - 16, "#fff264");
      return;
    }
    inventory.flechas -= 1;
    renderInventory();
    updateHud();
  }

  if (weapon.projectile === "arrow" && player.isSwimming) {
    spawnFloatingText("Flecha lenta na agua", player.x + 8, player.y - 16, "#55e8ff");
  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const waterSlow = player.isSwimming && weapon.projectile === "arrow" ? 0.48 : 1;
  spawnPlayerProjectile({
    type: weapon.projectile,
    x: centerX - 5,
    y: centerY - 5,
    width: weapon.projectile === "arrow" ? 14 : 11,
    height: weapon.projectile === "arrow" ? 5 : 11,
    vx: aim.x * weapon.projectileSpeed * waterSlow,
    vy: aim.y * weapon.projectileSpeed * waterSlow,
    damage: weapon.damage,
    damageType: weapon.damageType,
    distance: 0,
    maxDistance: weapon.range
  });
  playSound(weapon.projectile === "arrow" ? "bow" : "magic");
}

function updateAttack(delta) {
  weaponCooldownTimer = Math.max(0, weaponCooldownTimer - delta);
  dodgeCooldownTimer = Math.max(0, dodgeCooldownTimer - delta);

  if (attackWindupTimer > 0) {
    attackWindupTimer = Math.max(0, attackWindupTimer - delta);
    if (attackWindupTimer <= 0 && !attackHitDone) {
      resolveBasicAttack();
      attackHitDone = true;
    }
  }

  if (attackWindupTimer <= 0 && attackRecoveryTimer > 0) {
    attackRecoveryTimer = Math.max(0, attackRecoveryTimer - delta);
  }

  attackTimer = Math.max(0, attackTimer - delta);
  if (currentMeleeAttack) {
    currentMeleeAttack.timer = Math.max(0, currentMeleeAttack.timer - delta);
    if (currentMeleeAttack.timer <= 0) currentMeleeAttack = null;
  }
}

function resolveBasicAttack() {
  if (!currentMeleeAttack) return;
  let hit = false;

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive || !enemyInMeleeArc(obj, currentMeleeAttack)) continue;
    const damage = getBasicAttackDamage(currentMeleeAttack.weaponKey);
    const weapon = weapons[currentMeleeAttack.weaponKey] || weapons.sword;
    if (damageEnemy(obj, damage, player.x + player.width / 2, player.y + player.height / 2, 190, weapon.damageType)) {
      hit = true;
    }
  }

  if (hit) playSound("hitEnemy");
}

function enemyInMeleeArc(enemyObj, attack) {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const enemyX = enemyObj.x + enemyObj.width / 2;
  const enemyY = enemyObj.y + enemyObj.height / 2;
  const dx = enemyX - centerX;
  const dy = enemyY - centerY;
  const distance = Math.hypot(dx, dy);
  if (distance > attack.range + Math.max(enemyObj.width, enemyObj.height) / 2) return false;

  const angle = Math.atan2(dy, dx);
  const diff = Math.abs(angleDifference(angle, attack.angle));
  return diff <= attack.arc / 2;
}

function angleDifference(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function getBasicAttackDamage(weaponKey = getCurrentWeaponKey()) {
  const weapon = weapons[weaponKey] || weapons.sword;
  return weapon.damage + Math.floor(player.damageBonus || 0) + (inventory.espadas > 0 ? 1 : 0) + (activePowerUps.force > 0 ? 1 : 0);
}

function getAttackRect(direction = player.direction) {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const forward = direction === "up" || direction === "down" ? 42 : 46;
  const side = direction === "up" || direction === "down" ? 32 : 30;

  if (direction === "left") return { x: centerX - forward, y: centerY - side / 2, width: forward, height: side };
  if (direction === "right") return { x: centerX, y: centerY - side / 2, width: forward, height: side };
  if (direction === "up") return { x: centerX - side / 2, y: centerY - forward, width: side, height: forward };
  return { x: centerX - side / 2, y: centerY, width: side, height: forward };
}

function updateInteractionHint() {
  const target = findInteraction();
  const hidden = !target || dialogOpen || shopOpen;
  interactionHint.classList.toggle("hidden", hidden);
  touchActionButton?.classList.toggle("is-context-ready", Boolean(target) && !dialogOpen && !shopOpen);
  if (hidden) {
    if (touchContextLabel) touchContextLabel.textContent = "...";
    return;
  }

  let label = "Interagir";
  if (target.type === "portal") {
    interactionHint.textContent = "Pressione E para entrar no portal";
    label = "Entrar";
  } else if (target.type === "dimensionPortal") {
    interactionHint.textContent = "Pressione E para voltar";
    label = "Entrar";
  } else if (target.type === "dimensionCrystal") {
    interactionHint.textContent = "Pressione E para ativar cristal";
    label = "Ativar";
  } else if (target.type === "dimensionChest" || target.type === "rareChest") {
    interactionHint.textContent = target.type === "rareChest" ? "Pressione E para abrir o bau raro" : "Pressione E para abrir o bau";
    label = "Abrir";
  } else if (target.type === "npc") {
    interactionHint.textContent = "Pressione E para conversar";
    label = target.role === "shopkeeper" ? "Comprar" : "Falar";
  } else {
    interactionHint.textContent = "Pressione E para interagir";
  }
  if (touchContextLabel) touchContextLabel.textContent = label;
}

function showDialogMessage(message) {
  if (!message) return;
  dialogText.textContent = message;
  dialogBox.classList.remove("hidden");
  dialogOpen = true;
}

function toggleInteraction() {
  if (shopOpen) {
    closeShop();
    closeDialog();
    return;
  }

  if (dialogOpen) {
    closeDialog();
    return;
  }

  const target = findInteraction();
  if (target) {
    const specialSound = ["portal", "dimensionPortal", "dimensionCrystal", "dimensionChest"].includes(target.type);
    if (!specialSound) playSound(target.type === "npc" ? "npc" : "dialog");
    const message = getQuestMessage(target);
    updateQuestProgress();
    showDialogMessage(message);
  }
}

function closeDialog() {
  dialogBox.classList.add("hidden");
  dialogOpen = false;
}

function resetPlayer() {
  if (currentScene !== "village") {
    setActiveScene("village");
  }
  gameOver = false;
  gameOverScreen.classList.add("hidden");
  player.health = player.maxHealth;
  player.mana = player.maxMana;
  player.oxygen = player.maxOxygen;
  player.isSwimming = false;
  playerInvulnerableTimer = 0;
  playerKnockbackX = 0;
  playerKnockbackY = 0;
  projectiles.length = 0;
  enemyProjectiles.length = 0;
  hazardZones.length = 0;
  floatingTexts.length = 0;
  player.x = player.startX;
  player.y = player.startY;
  player.direction = "down";
  closeDialog();
}

function gameLoop(time) {
  const delta = Math.min((time - lastTime) / 1000, 0.05);
  lastTime = time;

  try {
    update(delta);
    draw();
  } catch (error) {
    showErrorMessage(error);
  }
  requestAnimationFrame(gameLoop);
}

window.addEventListener("error", (event) => {
  showErrorMessage(event.error || event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  showErrorMessage(event.reason || "Promessa rejeitada sem detalhe.");
});

function updateMouseAim(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  mouseAim.screenX = (event.clientX - rect.left) * scaleX;
  mouseAim.screenY = (event.clientY - rect.top) * scaleY;
  mouseAim.worldX = mouseAim.screenX + camera.x;
  mouseAim.worldY = mouseAim.screenY + camera.y;
  mouseAim.angle = Math.atan2(
    mouseAim.worldY - (player.y + player.height / 2),
    mouseAim.worldX - (player.x + player.width / 2)
  );
  mouseAim.active = true;
}

canvas.addEventListener("mousemove", updateMouseAim);

canvas.addEventListener("mousedown", (event) => {
  updateMouseAim(event);
  event.preventDefault();

  if (event.button === 0) {
    triggerPrimaryAttack();
  } else if (event.button === 2) {
    useEquippedPower();
  }
});

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse") return;
  event.preventDefault();
  selectMobileTargetFromPoint(event);
});

function selectMobileTargetFromPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const worldX = (event.clientX - rect.left) * scaleX + camera.x;
  const worldY = (event.clientY - rect.top) * scaleY + camera.y;
  const tapRect = { x: worldX - 18, y: worldY - 18, width: 36, height: 36 };

  const target = villageObjects.find((obj) => (
    obj.type === "enemy" &&
    obj.alive &&
    rectsOverlap(tapRect, obj)
  ));

  if (target) {
    mobileLockedTarget = target;
    currentAutoAimTarget = target;
    spawnFloatingText("Alvo", target.x + target.width / 2, target.y - 12, "#fff264");
    vibrate(10);
  }
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const gameplayKeys = ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "e", "i", "u", "q", "r", "f", "c", "m", "escape", "f3", " ", "tab", "1", "2", "3", "4"];

  if (isTypingInTextField()) {
    keys.clear();
    if (key === "escape") {
      document.activeElement?.blur();
    } else if (key === "enter" && !gameStarted && document.activeElement === characterNameInput) {
      event.preventDefault();
      startNewGame();
    }
    return;
  }

  if (gameplayKeys.includes(key)) {
    event.preventDefault();
  }

  if (key === "f3") {
    debugEnabled = !debugEnabled;
    debugPanel?.classList.toggle("hidden", !debugEnabled);
    mobileDebugButton?.classList.toggle("hidden", !debugEnabled);
    return;
  }

  if (isInfoPanelOpen()) {
    if (key === "escape" || key === "enter") {
      infoPanel.classList.add("hidden");
    }
    return;
  }

  if (!gameStarted) {
    keys.clear();
    if (key === "enter") startNewGame();
    if (key === "escape") closeOverlayPanels();
    return;
  }

  if (key === "escape") {
    if (inventoryOpen) {
      toggleInventory(false);
    } else if (missionsOpen || statusOpen) {
      closeOverlayPanels();
    } else if (shopOpen) {
      closeShop();
      closeDialog();
    } else if (dialogOpen) {
      closeDialog();
    } else {
      setPause(!pauseOpen);
    }
    return;
  }

  if (key === "m" && !inventoryOpen && !shopOpen && !dialogOpen) {
    toggleMissionsPanel();
    return;
  }

  if (key === "c" && !inventoryOpen && !shopOpen && !dialogOpen) {
    toggleStatusPanel();
    return;
  }

  if (key === "i") {
    toggleInventory();
    return;
  }

  if (dialogOpen || shopOpen) {
    if (key === "e") toggleInteraction();
    return;
  }

  if (inventoryOpen || missionsOpen || statusOpen) {
    keys.clear();
    return;
  }

  if (pauseOpen) {
    return;
  }

  if (["1", "2", "3", "4"].includes(key)) {
    equipPower(Number(key) - 1);
    return;
  }

  if (key === "tab") {
    cycleWeapon();
    return;
  }

  if (key === "u") {
    usePotion();
    return;
  }

  if (key === " ") {
    dodgeDash();
    return;
  }

  if (key === "q") {
    useEquippedPower();
    return;
  }

  if (key === "r") {
    dash();
    return;
  }

  if (key === "f") {
    shockwave();
    return;
  }

  if (key === "e") {
    toggleInteraction();
    return;
  }

  keys.add(key);
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

function setupTouchControls() {
  setupJoystick();
  if (touchActionButton) touchActionButton.textContent = "E";

  for (const button of touchDirectionButtons) {
    const key = button.dataset.touchKey;

    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      button.setPointerCapture(event.pointerId);
      button.classList.add("is-pressed");
      keys.add(key);
    });

    const release = (event) => {
      event.preventDefault();
      button.classList.remove("is-pressed");
      keys.delete(key);
    };

    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", () => {
      button.classList.remove("is-pressed");
      keys.delete(key);
    });
  }

  const bindTouchAction = (button, action, name = "") => {
    if (!button) return;
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      try {
        button.setPointerCapture(event.pointerId);
      } catch (error) {
        // Alguns navegadores nao permitem captura em certos eventos sinteticos.
      }
      button.classList.add("is-pressed");
      setMobilePressedButton(name || button.id);
      action();
    });
    button.addEventListener("pointerup", (event) => {
      event.preventDefault();
      button.classList.remove("is-pressed");
      clearMobilePressedButton(name || button.id);
    });
    button.addEventListener("pointercancel", () => {
      button.classList.remove("is-pressed");
      clearMobilePressedButton(name || button.id);
    });
    button.addEventListener("lostpointercapture", () => {
      button.classList.remove("is-pressed");
      clearMobilePressedButton(name || button.id);
    });
  };

  bindTouchAction(touchActionButton, toggleInteraction, "interagir");
  bindTouchAction(touchAttackButton, triggerPrimaryAttack, "ataque");
  bindTouchAction(touchInventoryButton, toggleInventory, "inventario");
  bindTouchAction(touchPotionButton, usePotion, "pocao");
  bindTouchAction(touchFireballButton, () => {
    equipPower(0);
    useEquippedPower();
  }, "fogo");
  bindTouchAction(touchDashButton, dodgeDash, "dash");
  bindTouchAction(touchShockwaveButton, () => {
    equipPower(2);
    useEquippedPower();
  }, "onda");
  bindTouchAction(touchHealButton, () => {
    equipPower(3);
    useEquippedPower();
  }, "cura");
  bindTouchAction(touchPowerButton, useEquippedPower, "poder");
  bindTouchAction(touchWeaponButton, cycleWeapon, "arma");
  bindTouchAction(touchPower1Button, () => equipPower(0), "poder1");
  bindTouchAction(touchPower2Button, () => equipPower(1), "poder2");
  bindTouchAction(touchPower3Button, () => equipPower(2), "poder3");
  bindTouchAction(touchPower4Button, () => equipPower(3), "poder4");
  bindTouchAction(mobileFullscreenButton, requestGameFullscreen, "fullscreen");
  bindTouchAction(startFullscreenButton, requestGameFullscreen, "fullscreen");
  bindTouchAction(mobilePauseButton, () => setPause(true), "pausa");
  bindTouchAction(hudMenuButton, () => setPause(true), "menu");
  bindTouchAction(mobileDebugButton, () => {
    debugEnabled = !debugEnabled;
    debugPanel?.classList.toggle("hidden", !debugEnabled);
  }, "debug");
  bindTouchAction(dialogContinueButton, closeDialog, "dialogo");

  document.addEventListener("touchmove", (event) => {
    if (event.target.closest(".touch-controls")) {
      event.preventDefault();
    }
  }, { passive: false });
}

function setupJoystick() {
  if (!joystickBase || !joystickStick) return;

  joystickBase.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    joystick.active = true;
    joystick.pointerId = event.pointerId;
    const rect = joystickBase.getBoundingClientRect();
    joystick.centerX = rect.left + rect.width / 2;
    joystick.centerY = rect.top + rect.height / 2;
    try {
      joystickBase.setPointerCapture(event.pointerId);
    } catch (error) {
      // Captura nao e obrigatoria.
    }
    updateJoystick(event);
  });

  joystickBase.addEventListener("pointermove", (event) => {
    if (!joystick.active || event.pointerId !== joystick.pointerId) return;
    event.preventDefault();
    updateJoystick(event);
  });

  const release = (event) => {
    if (event.pointerId !== joystick.pointerId) return;
    event.preventDefault();
    resetJoystick();
  };

  joystickBase.addEventListener("pointerup", release);
  joystickBase.addEventListener("pointercancel", release);
  joystickBase.addEventListener("lostpointercapture", resetJoystick);
}

function updateJoystick(event) {
  const radius = joystickBase.getBoundingClientRect().width * 0.38;
  const dx = event.clientX - joystick.centerX;
  const dy = event.clientY - joystick.centerY;
  const distance = Math.hypot(dx, dy);
  const clamped = Math.min(distance, radius);
  const angle = Math.atan2(dy, dx);
  const stickX = Math.cos(angle) * clamped;
  const stickY = Math.sin(angle) * clamped;

  joystick.x = distance > 4 ? dx / Math.max(distance, 1) : 0;
  joystick.y = distance > 4 ? dy / Math.max(distance, 1) : 0;
  joystick.strength = clamp(distance / radius, 0, 1);
  joystickStick.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;
}

function resetJoystick() {
  joystick.active = false;
  joystick.pointerId = null;
  joystick.x = 0;
  joystick.y = 0;
  joystick.strength = 0;
  if (joystickStick) joystickStick.style.transform = "translate(-50%, -50%)";
}

resetButton.addEventListener("click", resetPlayer);
gameOverResetButton.addEventListener("click", resetPlayer);
buyPotionButton.addEventListener("click", buyPotion);
saveButton.addEventListener("click", () => {
  saveGame();
  saveButton.textContent = "Salvo!";
  setTimeout(() => {
    saveButton.textContent = "Salvar Jogo";
  }, 1200);
});
playButton.addEventListener("click", startNewGame);
continueButton.addEventListener("click", () => startGame(true));
howToButton.addEventListener("click", () => {
  showHowTo();
});
creditsButton.addEventListener("click", () => {
  showInfo(
    "Creditos",
    "Eternal Rift\n\nCriadores:\nGabryel Garcia\nVictor Ricardo Fonseca Baldin\n\nFeito em HTML, CSS e JavaScript com Canvas 2D."
  );
});
closeInfoButton.addEventListener("click", () => infoPanel.classList.add("hidden"));
hudMenuButton?.addEventListener("click", () => setPause(true));
pauseContinueButton?.addEventListener("click", () => setPause(false));
pauseSaveButton?.addEventListener("click", () => {
  saveGame();
  setPause(false);
});
pauseResetButton?.addEventListener("click", () => {
  resetPlayer();
  setPause(false);
});
pauseHowToButton?.addEventListener("click", () => {
  setPause(false);
  showHowTo();
});
pauseMissionsButton?.addEventListener("click", () => toggleMissionsPanel(true));
pauseStatusButton?.addEventListener("click", () => toggleStatusPanel(true));
pauseInventoryButton?.addEventListener("click", () => {
  setPause(false);
  if (!inventoryOpen) toggleInventory();
});
pauseMenuButton?.addEventListener("click", returnToStartMenu);
closeMissionsButton?.addEventListener("click", () => toggleMissionsPanel(false));
closeStatusButton?.addEventListener("click", () => toggleStatusPanel(false));
characterNameInput?.addEventListener("focus", () => {
  keys.clear();
  resetJoystick();
});
characterNameInput?.addEventListener("input", () => {
  if (characterNameInput.value.length > 16) {
    characterNameInput.value = characterNameInput.value.slice(0, 16);
  }
});
closeInventoryButton?.addEventListener("click", () => toggleInventory(false));
inventoryTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-inventory-tab]");
  if (!button) return;
  inventoryTab = button.dataset.inventoryTab || "all";
  selectedInventoryItemId = "";
  playSound("selectItem");
  renderInventory();
});
inventoryGrid?.addEventListener("click", (event) => {
  const slot = event.target.closest("[data-item-id]");
  if (!slot) return;
  selectedInventoryItemId = slot.dataset.itemId || "";
  playSound("selectItem");
  renderInventory();
});
itemDetailActions?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-inventory-action]");
  if (!button || button.disabled) return;
  handleInventoryAction(button);
});
inventoryPanel?.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
});
inventoryPanel?.addEventListener("touchmove", (event) => {
  event.stopPropagation();
}, { passive: true });

window.addEventListener("resize", updateDeviceMode);
window.addEventListener("orientationchange", () => setTimeout(updateDeviceMode, 250));
document.addEventListener("fullscreenchange", () => {
  updateDeviceMode();
  setTimeout(keepPauseMenuVisible, 80);
});
window.addEventListener("blur", () => {
  if (gameStarted && !gameOver && isMobile) setPause(true);
});

updateDeviceMode();
setupTouchControls();
requestAnimationFrame(gameLoop);

if (shouldAutoStart) {
  setTimeout(() => startGame(false), 120);
}


/* ==================================================
   Eternal Rift - Visual upgrade patch
   Inspirado em RPG 2D pixel art, mantendo Canvas puro.
   ================================================== */

function visualHash(tileX, tileY, salt = 0) {
  const raw = Math.sin(tileX * 127.1 + tileY * 311.7 + salt * 43.13) * 43758.5453123;
  return raw - Math.floor(raw);
}

function drawPixelSpark(x, y, color, shadow = "rgba(26, 31, 61, 0.35)") {
  ctx.fillStyle = shadow;
  ctx.fillRect(Math.round(x) - 1, Math.round(y), 4, 2);
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), 2, 2);
}

function drawSoftShadow(x, y, width, height, alpha = 0.22) {
  ctx.fillStyle = `rgba(26, 31, 61, ${alpha})`;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
}

function drawTilePebbles(x, y, tileX, tileY, colorA, colorB) {
  if (visualHash(tileX, tileY, 1) > 0.44) {
    ctx.fillStyle = colorA;
    ctx.fillRect(x + 5 + Math.floor(visualHash(tileX, tileY, 2) * 8), y + 6, 3, 2);
  }
  if (visualHash(tileX, tileY, 3) > 0.58) {
    ctx.fillStyle = colorB;
    ctx.fillRect(x + 20, y + 18 + Math.floor(visualHash(tileX, tileY, 4) * 7), 4, 2);
  }
}

function drawGrassTuft(x, y, offsetX, offsetY, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x + offsetX, y + offsetY + 4, 2, 7);
  ctx.fillRect(x + offsetX + 2, y + offsetY + 2, 2, 9);
  ctx.fillRect(x + offsetX + 4, y + offsetY + 5, 2, 5);
}

function drawGrass(x, y, tileX, tileY) {
  const variant = visualHash(tileX, tileY, 10);
  const base = variant < 0.34 ? "#83d873" : variant < 0.67 ? "#8ee47c" : "#78ca67";
  ctx.fillStyle = base;
  ctx.fillRect(x, y, TILE, TILE);

  ctx.fillStyle = "rgba(255, 255, 210, 0.08)";
  if (visualHash(tileX, tileY, 11) > 0.54) ctx.fillRect(x, y, TILE, 3);
  ctx.fillStyle = "rgba(39, 92, 61, 0.10)";
  if (visualHash(tileX, tileY, 12) > 0.5) ctx.fillRect(x, y + TILE - 4, TILE, 4);

  if (visualHash(tileX, tileY, 13) > 0.24) drawGrassTuft(x, y, 6, 17, "#2f8b60");
  if (visualHash(tileX, tileY, 14) > 0.62) drawGrassTuft(x, y, 22, 7, "#3fa164");
  if (visualHash(tileX, tileY, 15) > 0.84) {
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 15, y + 15, 2, 2);
    ctx.fillStyle = "#ff7ab5";
    ctx.fillRect(x + 18, y + 16, 2, 2);
  }
}

function drawForestGrass(x, y, tileX, tileY) {
  const variant = visualHash(tileX, tileY, 20);
  ctx.fillStyle = variant < 0.5 ? "#68bb64" : "#5fb45d";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(23, 73, 45, 0.18)";
  ctx.fillRect(x, y + TILE - 5, TILE, 5);
  drawGrassTuft(x, y, 4, 6, "#236f48");
  if (visualHash(tileX, tileY, 21) > 0.38) drawGrassTuft(x, y, 20, 16, "#2e844e");
  if (visualHash(tileX, tileY, 22) > 0.7) {
    ctx.fillStyle = "#bdf25a";
    ctx.fillRect(x + 11, y + 24, 4, 2);
    ctx.fillRect(x + 15, y + 21, 2, 4);
  }
}

function drawDirt(x, y, tileX, tileY) {
  const variant = visualHash(tileX, tileY, 30);
  ctx.fillStyle = variant < 0.36 ? "#ad6c4e" : variant < 0.72 ? "#9b5b43" : "#b87552";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(82, 45, 39, 0.32)";
  ctx.fillRect(x, y + TILE - 4, TILE, 4);
  ctx.fillStyle = "rgba(255, 229, 166, 0.16)";
  if (visualHash(tileX, tileY, 31) > 0.48) ctx.fillRect(x + 3, y + 6, 18, 3);
  if (visualHash(tileX, tileY, 32) > 0.48) ctx.fillRect(x + 13, y + 19, 14, 3);
  drawTilePebbles(x, y, tileX, tileY, "#6f463f", "#d99b67");
}

function drawPlaza(x, y, tileX, tileY) {
  const variant = visualHash(tileX, tileY, 40);
  ctx.fillStyle = variant < 0.5 ? "#e8c382" : "#d9b475";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = "rgba(91, 70, 61, 0.55)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
  ctx.fillStyle = "rgba(255, 246, 202, 0.28)";
  if ((tileX + tileY) % 2 === 0) ctx.fillRect(x + 5, y + 5, 9, 3);
  if ((tileX * 3 + tileY) % 4 === 0) ctx.fillRect(x + 19, y + 21, 8, 3);
  ctx.fillStyle = "rgba(116, 84, 64, 0.22)";
  if (visualHash(tileX, tileY, 41) > 0.65) ctx.fillRect(x + 2, y + 27, 28, 2);
}

function drawWater(x, y, tileX, tileY) {
  const time = performance.now() / 450;
  const wave = Math.sin(time + tileX * 0.6 + tileY * 0.4) * 2;
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#3c99dd" : "#338bd0";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(17, 81, 145, 0.28)";
  ctx.fillRect(x, y + TILE - 5, TILE, 5);
  ctx.fillStyle = "rgba(137, 224, 255, 0.72)";
  ctx.fillRect(x + 4, y + 9 + wave, 10, 2);
  ctx.fillRect(x + 17, y + 18 - wave, 11, 2);
  ctx.fillStyle = "rgba(233, 255, 255, 0.35)";
  if (visualHash(tileX, tileY, 50) > 0.68) ctx.fillRect(x + 9, y + 23, 5, 2);
}

function drawInteriorFloor(x, y, tileX, tileY) {
  const variant = visualHash(tileX, tileY, 60);
  ctx.fillStyle = variant < 0.5 ? "#c98a57" : "#b9794b";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(78, 47, 35, 0.35)";
  ctx.fillRect(x, y + 15, TILE, 2);
  ctx.fillRect(x, y + 31, TILE, 1);
  ctx.fillStyle = "rgba(255, 220, 155, 0.18)";
  if (visualHash(tileX, tileY, 61) > 0.55) ctx.fillRect(x + 7, y + 6, 12, 2);
  if (visualHash(tileX, tileY, 62) > 0.62) ctx.fillRect(x + 20, y + 22, 6, 2);
}

function drawInteriorWall(x, y, tileX, tileY) {
  const isTop = tileY === 0;
  ctx.fillStyle = isTop ? "#9bbfe0" : "#7d6a80";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = isTop ? "rgba(236, 249, 255, 0.24)" : "rgba(255, 234, 176, 0.12)";
  ctx.fillRect(x + 4, y + 5, 9, 3);
  if ((tileX + tileY) % 3 === 0) ctx.fillRect(x + 18, y + 17, 7, 3);
  ctx.fillStyle = "#273052";
  if (isTop) ctx.fillRect(x, y + TILE - 5, TILE, 5);
}

function drawRug(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#c8465e" : "#a93b55";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#7f2e49";
  ctx.fillRect(x, y, TILE, 3);
  ctx.fillRect(x, y + TILE - 3, TILE, 3);
  ctx.fillStyle = "rgba(255, 242, 100, 0.32)";
  ctx.fillRect(x + 9, y + 8, 14, 4);
  ctx.fillRect(x + 12, y + 16, 8, 8);
}

function drawObject(obj) {
  if (obj.type === "outdoorDecor") return drawOutdoorDecor(obj);
  if (obj.type === "furniture") return drawFurniture(obj);
  if (obj.type === "house") return drawHouse(obj);
  if (obj.type === "playerHouse") return drawPlayerHouse(obj);
  if (obj.type === "shop") return drawShop(obj);
  if (obj.type === "tree") return drawTree(obj);
  if (obj.type === "fence") return drawFence(obj);
  if (obj.type === "sign") return drawSign(obj);
  if (obj.type === "well") return drawWell(obj);
  if (obj.type === "bench") return drawBench(obj);
  if (obj.type === "portal") return drawPortal(obj);
  if (obj.type === "dimensionPortal") return drawPortal(obj);
  if (obj.type === "dimensionBlocker") return drawDimensionBlocker(obj);
  if (obj.type === "dimensionCrystal") return drawDimensionCrystal(obj);
  if (obj.type === "dimensionChest") return drawDimensionChest(obj);
  if (obj.type === "dimensionSign") return drawDimensionSign(obj);
  if (obj.type === "talkingStone") return drawTalkingStone(obj);
  if (obj.type === "magicFountain") return drawMagicFountain(obj);
  if (obj.type === "largeCrystal") return drawLargeCrystal(obj);
  if (obj.type === "strangeTree") return drawStrangeTree(obj);
  if (obj.type === "floatingRock") return drawFloatingRock(obj);
  if (obj.type === "secretStone") return drawSecretStone(obj);
  if (obj.type === "cave") return drawCave(obj);
  if (obj.type === "bed") return drawBed(obj);
  if (obj.type === "table") return drawTable(obj);
  if (obj.type === "counter") return drawCounter(obj);
  if (obj.type === "mayorDesk") return drawMayorDesk(obj);
  if (obj.type === "bookshelf") return drawBookshelf(obj);
  if (obj.type === "chest") return drawChest(obj);
  if (obj.type === "rareChest") return drawRareChest(obj);
  if (obj.type === "plant") return drawPlant(obj);
  if (obj.type === "flower") return drawFlower(obj);
  if (obj.type === "rock") return drawRock(obj);
  if (obj.type === "crystal") return drawCrystal(obj);
  if (obj.type === "collectible") return drawCollectible(obj);
  if (obj.type === "loot") return drawLootItem(obj);
  if (obj.type === "powerUp") return drawPowerUp(obj);
  if (obj.type === "enemy") return drawEnemy(obj);
  if (obj.type === "npc") return drawNpc(obj);
}

function drawHouse(obj) {
  const x = obj.x;
  const y = obj.y;
  const variant = visualHash(Math.floor(x / TILE), Math.floor(y / TILE), obj.title?.length || 0);
  const roofColor = variant < 0.25 ? "#c94a5c" : variant < 0.5 ? "#d68045" : variant < 0.75 ? "#4c86d9" : "#9b5fc7";
  const wallColor = variant < 0.5 ? "#e5d1aa" : "#d8c2a0";

  drawSoftShadow(x + 7, y + obj.height - 4, obj.width - 8, 10, 0.26);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 4, y + 34, obj.width - 8, obj.height - 34);
  ctx.fillStyle = wallColor;
  ctx.fillRect(x + 8, y + 38, obj.width - 16, obj.height - 42);
  ctx.fillStyle = "rgba(121, 88, 70, 0.18)";
  for (let yy = y + 43; yy < y + obj.height - 14; yy += 14) {
    ctx.fillRect(x + 10, yy, obj.width - 20, 2);
  }
  ctx.fillStyle = "rgba(255, 255, 235, 0.24)";
  ctx.fillRect(x + 14, y + 44, 30, 4);
  ctx.fillRect(x + 72, y + 48, 32, 4);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x - 5, y + 14, obj.width + 10, 31);
  ctx.fillStyle = roofColor;
  ctx.fillRect(x - 1, y + 18, obj.width + 2, 23);
  ctx.fillStyle = "rgba(255, 245, 207, 0.18)";
  for (let rx = x + 6; rx < x + obj.width - 8; rx += 18) ctx.fillRect(rx, y + 22, 10, 5);
  ctx.fillStyle = "rgba(91, 39, 53, 0.22)";
  ctx.fillRect(x - 1, y + 36, obj.width + 2, 5);
  pixelRect(x + 88, y + 3, 15, 25, "#a36a46");
  ctx.fillStyle = "#f3c77a";
  ctx.fillRect(x + 92, y + 7, 7, 4);

  pixelRect(x + 24, y + 60, 23, 32, "#93583d");
  ctx.fillStyle = "#f5ce79";
  ctx.fillRect(x + 39, y + 75, 3, 3);
  ctx.fillStyle = "rgba(35, 31, 42, 0.28)";
  ctx.fillRect(x + 27, y + 87, 17, 3);

  drawHouseWindow(x + 73, y + 56, "#63c8f5");
  drawHouseWindow(x + 12, y + 50, "#9ee6ff");

  ctx.fillStyle = "#7bdb73";
  ctx.fillRect(x + 72, y + 77, 28, 5);
  ctx.fillStyle = "#ff7ab5";
  ctx.fillRect(x + 78, y + 73, 3, 3);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(x + 89, y + 74, 3, 3);
}

function drawHouseWindow(x, y, glass) {
  pixelRect(x, y, 25, 21, glass);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(x + 5, y + 4, 7, 4);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 11, y, 3, 21);
  ctx.fillRect(x, y + 9, 25, 3);
}

function drawPlayerHouse(obj) {
  drawHouse({ ...obj, title: "Minha Casa" });
  const x = obj.x;
  const y = obj.y;
  ctx.fillStyle = "#fff264";
  ctx.fillRect(x + 55, y + 20, 13, 12);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 59, y + 23, 5, 7);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(x + 60, y + 21, 3, 3);
}

function drawShop(obj) {
  drawHouse({ ...obj, title: "Loja" });
  const x = obj.x;
  const y = obj.y;
  pixelRect(x + 33, y + 42, 60, 15, "#fff264");
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 40, y + 47, 7, 4);
  ctx.fillRect(x + 52, y + 47, 7, 4);
  ctx.fillRect(x + 64, y + 47, 7, 4);
  ctx.fillRect(x + 76, y + 47, 7, 4);
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(x + 98, y + 54, 9, 18);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(x + 100, y + 58, 5, 5);
}

function drawTree(obj) {
  const x = obj.x;
  const y = obj.y;
  drawSoftShadow(x + 2, y + 56, 30, 7, 0.24);
  pixelRect(x + 11, y + 34, 12, 27, "#8c5a3e");
  ctx.fillStyle = "#b87955";
  ctx.fillRect(x + 15, y + 38, 3, 17);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 6, y + 11, 22, 22);
  ctx.fillRect(x, y + 24, 32, 24);
  ctx.fillRect(x + 8, y + 4, 20, 18);
  ctx.fillRect(x + 3, y + 16, 27, 20);
  ctx.fillStyle = "#6fc95b";
  ctx.fillRect(x + 8, y + 13, 18, 19);
  ctx.fillRect(x + 3, y + 25, 26, 17);
  ctx.fillRect(x + 10, y + 7, 15, 16);
  ctx.fillStyle = "#93e665";
  ctx.fillRect(x + 11, y + 10, 8, 5);
  ctx.fillRect(x + 18, y + 22, 7, 4);
  ctx.fillStyle = "#4ca84e";
  ctx.fillRect(x + 5, y + 37, 11, 5);
  ctx.fillRect(x + 19, y + 31, 7, 5);
}

function drawFence(obj) {
  const dark = "#273052";
  const wood = "#d99b67";
  const light = "#f4c27c";
  if (obj.direction === "horizontal") {
    for (let x = obj.x; x < obj.x + obj.width; x += TILE) {
      pixelRect(x + 4, obj.y + 7, 8, 23, wood, dark);
      pixelRect(x + 20, obj.y + 7, 8, 23, wood, dark);
      ctx.fillStyle = light;
      ctx.fillRect(x + 6, obj.y + 10, 3, 6);
    }
    pixelRect(obj.x, obj.y + 13, obj.width, 7, wood, dark);
    ctx.fillStyle = "rgba(115, 70, 47, 0.45)";
    ctx.fillRect(obj.x + 2, obj.y + 18, obj.width - 4, 2);
  } else {
    for (let y = obj.y; y < obj.y + obj.height; y += TILE) {
      pixelRect(obj.x + 7, y + 4, 23, 8, wood, dark);
      pixelRect(obj.x + 7, y + 20, 23, 8, wood, dark);
    }
    pixelRect(obj.x + 13, obj.y, 7, obj.height, wood, dark);
  }
}

function drawSign(obj) {
  pixelRect(obj.x + 7, obj.y + 10, 5, 18, "#8f5a3f");
  pixelRect(obj.x - 1, obj.y, 21, 15, "#e9b56f");
  ctx.fillStyle = "#7b4b38";
  ctx.fillRect(obj.x + 4, obj.y + 5, 12, 2);
  ctx.fillRect(obj.x + 6, obj.y + 9, 8, 2);
}

function drawWell(obj) {
  drawSoftShadow(obj.x + 2, obj.y + 22, 27, 7, 0.24);
  pixelRect(obj.x + 3, obj.y + 10, 22, 16, "#9298a7");
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 6, obj.y + 13, 16, 8);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 9, obj.y + 15, 10, 3);
  pixelRect(obj.x + 1, obj.y + 3, 26, 8, "#c94a5c");
  pixelRect(obj.x + 4, obj.y, 5, 15, "#8b5a3f");
  pixelRect(obj.x + 20, obj.y, 5, 15, "#8b5a3f");
}

function drawBench(obj) {
  drawSoftShadow(obj.x + 1, obj.y + obj.height - 2, obj.width, 5, 0.22);
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#d99b67");
  ctx.fillStyle = "#8f5a3f";
  if (obj.direction === "horizontal") {
    ctx.fillRect(obj.x + 4, obj.y + 3, obj.width - 8, 2);
    ctx.fillRect(obj.x + 4, obj.y + 8, obj.width - 8, 2);
  } else {
    ctx.fillRect(obj.x + 3, obj.y + 4, 2, obj.height - 8);
    ctx.fillRect(obj.x + 8, obj.y + 4, 2, obj.height - 8);
  }
}

function drawPortal(obj) {
  const time = performance.now() / 1000;
  const pulse = Math.sin(time * 3.8);
  const isDimensional = obj.type === "dimensionPortal";
  const mainColor = isDimensional ? "#ff72dc" : "#55e8ff";
  const deepColor = isDimensional ? "#8d3fd1" : "#1f7bd8";
  const lightColor = isDimensional ? "#ffe4fb" : "#e9ffff";
  const runeColor = isDimensional ? "#fff264" : "#fff264";
  const x = obj.x;
  const y = obj.y;
  const cx = x + 32;
  const cy = y + 55;

  ctx.save();

  // Aura grande no fundo, em blocos translúcidos para manter o estilo pixel art.
  ctx.globalAlpha = 0.16 + Math.abs(pulse) * 0.07;
  ctx.fillStyle = mainColor;
  ctx.fillRect(x - 9, y + 19, 82, 69);
  ctx.globalAlpha = 0.1 + Math.abs(pulse) * 0.05;
  ctx.fillRect(x - 16, y + 34, 96, 36);
  ctx.globalAlpha = 1;

  drawSoftShadow(x + 2, y + 84, 62, 10, 0.3);

  // Plataforma de pedra com degraus e runas.
  pixelRect(x + 4, y + 80, 56, 12, "#777f98", "#232a46");
  pixelRect(x + 10, y + 72, 44, 12, "#9aa2b6", "#232a46");
  ctx.fillStyle = "#555d78";
  ctx.fillRect(x + 11, y + 83, 43, 3);
  ctx.fillRect(x + 17, y + 75, 30, 2);
  ctx.fillStyle = runeColor;
  ctx.fillRect(x + 13, y + 82, 4, 4);
  ctx.fillRect(x + 47, y + 82, 4, 4);
  ctx.fillStyle = mainColor;
  ctx.fillRect(x + 29, y + 75, 6, 3);

  // Pilares laterais, mais grossos e detalhados.
  pixelRect(x + 3, y + 18, 14, 66, "#858ca3", "#222944");
  pixelRect(x + 47, y + 18, 14, 66, "#858ca3", "#222944");
  pixelRect(x, y + 14, 20, 9, "#aeb5c8", "#222944");
  pixelRect(x + 44, y + 14, 20, 9, "#aeb5c8", "#222944");
  pixelRect(x + 7, y + 8, 50, 12, "#9ea6bd", "#222944");
  pixelRect(x + 18, y + 3, 28, 10, "#b8bfd0", "#222944");

  // Rachaduras e brilho nas pedras.
  ctx.fillStyle = "rgba(255, 255, 255, 0.24)";
  ctx.fillRect(x + 7, y + 25, 4, 18);
  ctx.fillRect(x + 51, y + 25, 4, 18);
  ctx.fillRect(x + 14, y + 11, 18, 3);
  ctx.fillStyle = "#3b435f";
  ctx.fillRect(x + 12, y + 51, 2, 13);
  ctx.fillRect(x + 50, y + 45, 2, 10);
  ctx.fillRect(x + 23, y + 8, 13, 2);
  ctx.fillStyle = mainColor;
  ctx.fillRect(x + 8, y + 60, 5, 5);
  ctx.fillRect(x + 51, y + 60, 5, 5);
  ctx.fillStyle = lightColor;
  ctx.fillRect(x + 29, y + 7, 6, 5);

  // Campo mágico interno com camadas pulsantes.
  ctx.globalAlpha = 0.75 + Math.abs(pulse) * 0.18;
  ctx.fillStyle = deepColor;
  ctx.fillRect(x + 18, y + 24, 28, 52);
  ctx.fillStyle = mainColor;
  ctx.fillRect(x + 22, y + 27 + pulse * 2, 20, 46 - pulse * 2);
  ctx.fillStyle = lightColor;
  ctx.fillRect(x + 29, y + 31 + pulse * 2, 7, 37);
  ctx.globalAlpha = 1;

  // Cristal/fenda central em formato facetado.
  ctx.save();
  ctx.translate(cx, cy + pulse * 1.5);
  ctx.shadowColor = mainColor;
  ctx.shadowBlur = 10;
  ctx.fillStyle = mainColor;
  ctx.beginPath();
  ctx.moveTo(0, -28);
  ctx.lineTo(15, -9);
  ctx.lineTo(10, 22);
  ctx.lineTo(0, 31);
  ctx.lineTo(-10, 22);
  ctx.lineTo(-15, -9);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = lightColor;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.fillRect(-4, -20, 5, 32);
  ctx.fillStyle = "rgba(255, 255, 255, 0.32)";
  ctx.fillRect(3, -12, 5, 23);
  ctx.restore();

  // Anéis/losangos de energia girando em volta do cristal.
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(time * 1.25);
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(-20, -27, 40, 54);
  ctx.restore();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-time * 0.9 + 0.6);
  ctx.strokeStyle = lightColor;
  ctx.globalAlpha = 0.8;
  ctx.lineWidth = 2;
  ctx.strokeRect(-16, -23, 32, 46);
  ctx.restore();

  // Raios quebrados, estilo fenda dimensional.
  ctx.strokeStyle = lightColor;
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    const off = Math.sin(time * 4 + i) * 3;
    ctx.beginPath();
    ctx.moveTo(x + 21 + i * 9, y + 31 + off);
    ctx.lineTo(x + 17 + i * 8, y + 45 - off);
    ctx.lineTo(x + 24 + i * 6, y + 57 + off);
    ctx.lineTo(x + 20 + i * 8, y + 70 - off);
    ctx.stroke();
  }

  // Partículas orbitando e subindo.
  for (let i = 0; i < 18; i++) {
    const angle = time * 2.2 + i * 0.7;
    const radiusX = 30 + (i % 3) * 5 + Math.sin(time * 2 + i) * 2;
    const radiusY = 34 + (i % 4) * 3;
    const px = cx + Math.cos(angle) * radiusX;
    const py = cy + Math.sin(angle) * radiusY - ((time * 18 + i * 11) % 26) * 0.25;
    drawPixelSpark(px, py, i % 3 === 0 ? lightColor : i % 2 === 0 ? mainColor : runeColor);
  }

  // Luz no chão, para o portal parecer importante na praça.
  ctx.globalAlpha = 0.28 + Math.abs(pulse) * 0.07;
  ctx.fillStyle = mainColor;
  ctx.fillRect(x + 13, y + 90, 38, 4);
  ctx.fillRect(x + 22, y + 96, 20, 3);
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawBed(obj) {
  drawSoftShadow(obj.x + 1, obj.y + obj.height - 2, obj.width, 5, 0.22);
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#7b4b5f");
  ctx.fillStyle = "#f4e1bf";
  ctx.fillRect(obj.x + 8, obj.y + 8, obj.width - 16, 18);
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(obj.x + 8, obj.y + 30, obj.width - 16, obj.height - 38);
  ctx.fillStyle = "rgba(255, 242, 100, 0.22)";
  ctx.fillRect(obj.x + 16, obj.y + 38, obj.width - 32, 5);
}

function drawTable(obj) {
  drawSoftShadow(obj.x + 3, obj.y + obj.height - 2, obj.width - 6, 6, 0.2);
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#9b613f");
  ctx.fillStyle = "#d99b67";
  ctx.fillRect(obj.x + 8, obj.y + 8, obj.width - 16, 15);
  ctx.fillStyle = "#fff3d6";
  ctx.fillRect(obj.x + 20, obj.y + 13, 17, 8);
  ctx.fillStyle = "#7bdb73";
  ctx.fillRect(obj.x + 53, obj.y + 10, 9, 12);
}

function drawCounter(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#a56b44");
  ctx.fillStyle = "#d99b67";
  ctx.fillRect(obj.x + 8, obj.y + 8, obj.width - 16, 12);
  ctx.fillStyle = "#8f5a3f";
  for (let x = obj.x + 12; x < obj.x + obj.width - 12; x += 42) ctx.fillRect(x, obj.y + 24, 24, 8);
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(obj.x + 70, obj.y + 18, 16, 16);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 132, obj.y + 16, 16, 18);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + 200, obj.y + 19, 11, 11);
}

function drawMayorDesk(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#7d4d38");
  ctx.fillStyle = "#b87955";
  ctx.fillRect(obj.x + 8, obj.y + 8, obj.width - 16, obj.height - 16);
  ctx.fillStyle = "#fff3d6";
  ctx.fillRect(obj.x + 24, obj.y + 18, 34, 22);
  ctx.fillRect(obj.x + 96, obj.y + 22, 42, 18);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + obj.width / 2 - 8, obj.y + 48, 16, 12);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + obj.width / 2 - 3, obj.y + 51, 6, 5);
}

function drawBookshelf(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#854f38");
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 7, obj.y + 22, obj.width - 14, 4);
  ctx.fillRect(obj.x + 7, obj.y + 50, obj.width - 14, 4);
  const books = ["#55c4ff", "#d24c63", "#fff264", "#7bdb73", "#b46dff"];
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = books[i % books.length];
    const bx = obj.x + 10 + (i % 4) * 11;
    const by = obj.y + 7 + Math.floor(i / 4) * 28;
    ctx.fillRect(bx, by, 7, 15);
  }
}

function drawChest(obj) {
  drawSoftShadow(obj.x + 2, obj.y + obj.height - 1, obj.width - 2, 5, 0.2);
  pixelRect(obj.x, obj.y + 4, obj.width, obj.height - 4, "#9b613f");
  ctx.fillStyle = "#f5ce79";
  ctx.fillRect(obj.x + obj.width / 2 - 4, obj.y + 14, 8, 8);
  ctx.fillStyle = "rgba(255, 242, 100, 0.2)";
  ctx.fillRect(obj.x + 6, obj.y + 8, obj.width - 12, 4);
}

function drawPlant(obj) {
  pixelRect(obj.x + 5, obj.y + 18, 14, 14, "#b44d60");
  ctx.fillStyle = "#26794d";
  ctx.fillRect(obj.x + 10, obj.y + 8, 4, 14);
  ctx.fillStyle = "#7bdb73";
  ctx.fillRect(obj.x + 4, obj.y + 3, 10, 8);
  ctx.fillRect(obj.x + 12, obj.y, 10, 9);
  ctx.fillStyle = "#bdf25a";
  ctx.fillRect(obj.x + 8, obj.y + 5, 5, 3);
}

function drawFlower(obj) {
  const colors = { pink: "#ff7ab5", yellow: "#fff264", blue: "#55c4ff" };
  ctx.fillStyle = "#26794d";
  ctx.fillRect(obj.x + 5, obj.y + 5, 2, 8);
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 2, obj.y, 9, 9);
  ctx.fillStyle = colors[obj.color] || colors.pink;
  ctx.fillRect(obj.x + 3, obj.y + 1, 3, 3);
  ctx.fillRect(obj.x + 7, obj.y + 1, 3, 3);
  ctx.fillRect(obj.x + 5, obj.y + 4, 3, 3);
  ctx.fillStyle = "#fff3d6";
  ctx.fillRect(obj.x + 6, obj.y + 3, 1, 1);
}

function drawRock(obj) {
  drawSoftShadow(obj.x + 1, obj.y + 13, 17, 4, 0.2);
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 1, obj.y + 5, 16, 10);
  ctx.fillStyle = "#8f98a5";
  ctx.fillRect(obj.x + 3, obj.y + 6, 12, 7);
  ctx.fillStyle = "#c8d0d8";
  ctx.fillRect(obj.x + 6, obj.y + 4, 7, 4);
  ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
  ctx.fillRect(obj.x + 4, obj.y + 12, 10, 2);
}

function drawCrystal(obj) {
  const pulse = Math.sin(performance.now() / 180) * 2;
  const y = obj.y + pulse;
  ctx.fillStyle = "rgba(85, 196, 255, 0.35)";
  ctx.fillRect(obj.x - 5, obj.y + 18, 26, 8);
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 5, y, 7, 6);
  ctx.fillRect(obj.x + 2, y + 5, 13, 14);
  ctx.fillRect(obj.x + 5, y + 18, 7, 6);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 6, y + 2, 5, 5);
  ctx.fillRect(obj.x + 4, y + 7, 9, 10);
  ctx.fillRect(obj.x + 7, y + 17, 4, 4);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(obj.x + 6, y + 8, 3, 5);
  drawPixelSpark(obj.x + 17, obj.y + 3 + pulse, "#fff264");
}

function drawFurniture(obj) {
  const x = obj.x;
  const y = obj.y;
  const kind = obj.kind;
  if (kind === "chair") {
    drawSoftShadow(x + 2, y + 21, 24, 5, 0.18);
    pixelRect(x + 4, y + 7, 22, 18, "#9b613f");
    ctx.fillStyle = "#d99b67";
    ctx.fillRect(x + 8, y + 11, 14, 8);
    return;
  }
  if (kind === "armoire") {
    pixelRect(x, y, obj.width, obj.height, "#7d4d38");
    ctx.fillStyle = "#b87955";
    ctx.fillRect(x + 8, y + 8, obj.width - 16, obj.height - 16);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + obj.width / 2 - 2, y + 7, 4, obj.height - 14);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + obj.width / 2 - 8, y + 34, 3, 3);
    ctx.fillRect(x + obj.width / 2 + 5, y + 34, 3, 3);
    return;
  }
  if (kind === "barrel") {
    drawSoftShadow(x + 2, y + 25, 26, 5, 0.18);
    pixelRect(x + 4, y + 4, 24, 27, "#9b613f");
    ctx.fillStyle = "#d99b67";
    ctx.fillRect(x + 7, y + 8, 18, 5);
    ctx.fillRect(x + 7, y + 22, 18, 5);
    return;
  }
  if (kind === "stove") {
    pixelRect(x, y + 6, obj.width, obj.height - 6, "#6d5c75");
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 9, y + 18, obj.width - 18, 16);
    ctx.fillStyle = "#ff8a4b";
    ctx.fillRect(x + 17, y + 23, 14, 7);
    ctx.fillStyle = "#f5ce79";
    ctx.fillRect(x + 22, y + 21, 5, 5);
    return;
  }
  if (kind === "window") {
    drawHouseWindow(x + 4, y + 5, "#73d5ff");
    ctx.fillStyle = "#f5ce79";
    ctx.fillRect(x + 2, y + 27, 34, 4);
    return;
  }
  if (kind === "painting") {
    pixelRect(x + 2, y + 5, obj.width - 4, obj.height - 10, "#f5ce79");
    ctx.fillStyle = "#3f8fe5";
    ctx.fillRect(x + 8, y + 10, obj.width - 16, obj.height - 20);
    ctx.fillStyle = "#7bdb73";
    ctx.fillRect(x + 9, y + obj.height - 14, obj.width - 18, 5);
    return;
  }
  if (kind === "lamp") {
    pixelRect(x + 13, y + 10, 6, 18, "#8f5a3f");
    ctx.fillStyle = "rgba(255, 242, 100, 0.32)";
    ctx.fillRect(x + 5, y + 3, 22, 16);
    pixelRect(x + 8, y + 4, 16, 12, "#fff264");
    return;
  }
  if (kind === "vase") {
    pixelRect(x + 9, y + 17, 14, 13, "#c94a5c");
    ctx.fillStyle = "#26794d";
    ctx.fillRect(x + 15, y + 7, 3, 11);
    ctx.fillStyle = "#7bdb73";
    ctx.fillRect(x + 9, y + 5, 9, 6);
    ctx.fillRect(x + 16, y + 3, 9, 7);
    return;
  }
  if (kind === "shelf") {
    pixelRect(x, y + 8, obj.width, 18, "#8f5a3f");
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 10, y + 5, 8, 8);
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 26, y + 4, 7, 9);
    ctx.fillStyle = "#d24c63";
    ctx.fillRect(x + 42, y + 6, 9, 7);
    return;
  }
  if (kind === "rugSmall") {
    ctx.fillStyle = "#7f2e49";
    ctx.fillRect(x + 2, y + 7, obj.width - 4, obj.height - 14);
    ctx.fillStyle = "#d24c63";
    ctx.fillRect(x + 5, y + 10, obj.width - 10, obj.height - 20);
    ctx.fillStyle = "rgba(255, 242, 100, 0.3)";
    ctx.fillRect(x + obj.width / 2 - 11, y + obj.height / 2 - 3, 22, 6);
    return;
  }
  if (kind === "crate") {
    pixelRect(x + 3, y + 5, 26, 23, "#a56b44");
    ctx.fillStyle = "#7d4d38";
    ctx.fillRect(x + 7, y + 9, 18, 3);
    ctx.fillRect(x + 14, y + 9, 3, 15);
    return;
  }
  pixelRect(x + 4, y + 4, obj.width - 8, obj.height - 8, "#b87955");
}

function drawOutdoorDecor(obj) {
  const x = obj.x;
  const y = obj.y;
  const kind = obj.kind;
  if (kind === "barrel") return drawFurniture({ ...obj, type: "furniture", kind: "barrel" });
  if (kind === "crate") return drawFurniture({ ...obj, type: "furniture", kind: "crate" });
  if (kind === "lantern") {
    pixelRect(x + 13, y + 8, 6, 24, "#8f5a3f");
    ctx.fillStyle = "rgba(255, 242, 100, 0.28)";
    ctx.fillRect(x + 2, y, 28, 22);
    pixelRect(x + 8, y + 3, 16, 15, "#fff264");
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 12, y + 5, 2, 11);
    ctx.fillRect(x + 18, y + 5, 2, 11);
    return;
  }
  if (kind === "flowerPot") {
    pixelRect(x + 8, y + 17, 16, 13, "#c94a5c");
    ctx.fillStyle = "#26794d";
    ctx.fillRect(x + 15, y + 8, 3, 10);
    ctx.fillStyle = "#ff7ab5";
    ctx.fillRect(x + 10, y + 7, 7, 6);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 17, y + 5, 7, 7);
    return;
  }
  if (kind === "stonePath") {
    ctx.fillStyle = "rgba(75, 65, 62, 0.25)";
    ctx.fillRect(x + 4, y + 16, 24, 8);
    ctx.fillStyle = "#c7ccd4";
    ctx.fillRect(x + 7, y + 17, 7, 4);
    ctx.fillRect(x + 17, y + 19, 8, 4);
    return;
  }
  if (kind === "flag") {
    pixelRect(x + 8, y + 3, 5, 29, "#8f5a3f");
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 13, y + 4, 16, 10);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 17, y + 7, 5, 4);
    return;
  }
  if (kind === "marketStall") {
    drawSoftShadow(x + 2, y + 30, 59, 6, 0.22);
    pixelRect(x + 6, y + 13, 52, 22, "#b87955");
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 5, 60, 11);
    ctx.fillStyle = "#d24c63";
    ctx.fillRect(x + 5, y + 7, 12, 7);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 17, y + 7, 12, 7);
    ctx.fillStyle = "#d24c63";
    ctx.fillRect(x + 29, y + 7, 12, 7);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 41, y + 7, 12, 7);
    return;
  }
}

function drawNpc(obj) {
  const bob = Math.sin(performance.now() / 300 + obj.bob) * 2;
  const x = obj.x;
  const y = obj.y + bob;
  const role = obj.role || obj.name;
  const palette = {
    shopkeeper: { shirt: "#fff264", hair: "#7d4d38", hat: "#d24c63" },
    letterTarget: { shirt: "#7bdb73", hair: "#273052", hat: "#55c4ff" },
    mayor: { shirt: "#9b5fc7", hair: "#f5ce79", hat: "#fff264" },
    dimensionGuide: { shirt: "#8d4be0", hair: "#e9ffff", hat: "#55e8ff" },
    dimensionMystic: { shirt: "#55e8ff", hair: "#b46dff", hat: "#ff72dc" },
    Nico: { shirt: "#3f8fe5", hair: "#4a2f39", hat: "#55e8ff" },
    Ari: { shirt: "#d24c63", hair: "#273052", hat: "#ff7ab5" },
    Mina: { shirt: "#7bdb73", hair: "#8f5a3f", hat: "#fff264" }
  };
  const look = palette[role] || palette[obj.name] || { shirt: "#7bdb73", hair: "#273052", hat: "#f5ce79" };

  drawSoftShadow(x + 4, y + 27, 20, 5, 0.25);
  pixelRect(x + 5, y + 12, 15, 15, look.shirt);
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(x + 8, y + 14, 8, 3);
  pixelRect(x + 4, y + 3, 16, 12, "#f4bd8f");
  ctx.fillStyle = look.hair;
  ctx.fillRect(x + 3, y + 1, 18, 5);
  ctx.fillRect(x + 4, y + 5, 4, 7);
  if (obj.role === "shopkeeper") {
    ctx.fillStyle = look.hat;
    ctx.fillRect(x + 2, y - 3, 20, 5);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 8, y - 6, 8, 5);
  }
  if (obj.role === "mayor") {
    ctx.fillStyle = look.hat;
    ctx.fillRect(x + 5, y - 4, 14, 5);
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 11, y - 7, 3, 3);
  }
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 7, y + 27, 4, 6);
  ctx.fillRect(x + 15, y + 27, 4, 6);
  ctx.fillRect(x + 8, y + 9, 2, 2);
  ctx.fillRect(x + 15, y + 9, 2, 2);
}

function drawPlayer() {
  const x = player.x;
  const y = player.y;
  const legOffset = player.moving ? [0, 2, 0, -2][player.frame] : 0;
  const blinking = playerInvulnerableTimer > 0 && Math.floor(performance.now() / 80) % 2 === 0;

  ctx.save();
  if (blinking) ctx.globalAlpha = 0.45;

  if (player.isSwimming) {
    ctx.strokeStyle = "rgba(233, 255, 255, 0.75)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x + 12, y + 25, 18, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (player.levelGlowTimer > 0) {
    const pulse = 0.35 + Math.sin(performance.now() / 80) * 0.18;
    ctx.fillStyle = `rgba(255, 242, 100, ${pulse})`;
    ctx.fillRect(x - 8, y - 8, player.width + 16, player.height + 16);
    ctx.fillStyle = "rgba(85, 232, 255, 0.34)";
    ctx.fillRect(x - 2, y - 14, player.width + 4, 5);
    ctx.fillRect(x + 3, y + player.height + 4, player.width - 6, 4);
  }

  drawSoftShadow(x + 3, y + 25, 22, 5, 0.25);
  pixelRect(x + 5, y + 12, 17, 14, "#313a78");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(x + 8, y + 14, 11, 4);
  ctx.fillStyle = "#f4bd8f";
  ctx.fillRect(x + 7, y + 4, 14, 10);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 5, y + 2, 18, 5);
  ctx.fillRect(x + 4, y + 6, 5, 8);
  ctx.fillStyle = "#5ad6e7";
  ctx.fillRect(x + 7, y, 12, 5);
  ctx.fillRect(x + 4, y + 5, 5, 7);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(x + 18, y + 1, 3, 3);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 7, y + 25 + legOffset, 5, 6);
  ctx.fillRect(x + 16, y + 25 - legOffset, 5, 6);
  ctx.fillStyle = "#f4bd8f";
  ctx.fillRect(x + 3, y + 15, 4, 8);
  ctx.fillRect(x + 21, y + 15, 4, 8);

  if (player.direction === "up") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 9, y + 6, 10, 2);
  } else if (player.direction === "down") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 11, y + 9, 2, 2);
    ctx.fillRect(x + 17, y + 9, 2, 2);
  } else if (player.direction === "left") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 9, y + 9, 2, 2);
  } else {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 19, y + 9, 2, 2);
  }

  if (attackTimer > 0 || weaponCooldownTimer > 0) {
    ctx.fillStyle = "#e9ffff";
    if (player.direction === "left") ctx.fillRect(x - 5, y + 15, 9, 3);
    else if (player.direction === "right") ctx.fillRect(x + 22, y + 15, 9, 3);
    else if (player.direction === "up") ctx.fillRect(x + 13, y + 5, 3, 10);
    else ctx.fillRect(x + 13, y + 22, 3, 10);
  }

  ctx.restore();
}

const drawEnemyBeforeVisualPatch = drawEnemy;
drawEnemy = function drawEnemyVisualUpgrade(obj) {
  if (obj.boss) {
    const pulse = 0.16 + Math.sin(performance.now() / 180) * 0.06;
    ctx.fillStyle = `rgba(255, 79, 98, ${pulse})`;
    ctx.fillRect(obj.x - 10, obj.y - 12, obj.width + 20, obj.height + 22);
    ctx.fillStyle = "rgba(255, 242, 100, 0.22)";
    ctx.fillRect(obj.x + obj.width / 2 - 4, obj.y - 18, 8, 8);
  }
  drawEnemyBeforeVisualPatch(obj);
  if (obj.kind === "slime" || obj.kind === "slimeVerde" || obj.kind === "slimeAzul" || obj.kind === "slimeVermelho" || obj.kind === "reiSlime") {
    ctx.fillStyle = "rgba(233, 255, 255, 0.55)";
    ctx.fillRect(obj.x + 7, obj.y + 8, 6, 3);
  }
  if (obj.kind === "miniDragao") {
    ctx.fillStyle = "#fff264";
    ctx.fillRect(obj.x + 5, obj.y + 6, 5, 3);
  }
};

function outdoorDecor(tileX, tileY, kind, solid = false, widthTiles = 1, heightTiles = 1) {
  return {
    type: "outdoorDecor",
    kind,
    x: tileX * TILE,
    y: tileY * TILE,
    width: widthTiles * TILE,
    height: heightTiles * TILE,
    solid
  };
}

function interiorFurniture(tileX, tileY, kind, solid = false, widthTiles = 1, heightTiles = 1, message = "") {
  return {
    type: "furniture",
    kind,
    x: tileX * TILE,
    y: tileY * TILE,
    width: widthTiles * TILE,
    height: heightTiles * TILE,
    solid,
    message
  };
}

villageObjects.push(
  outdoorDecor(29, 22, "lantern", true), outdoorDecor(37, 22, "lantern", true),
  outdoorDecor(29, 26, "lantern", true), outdoorDecor(37, 26, "lantern", true),
  outdoorDecor(32, 20, "stonePath"), outdoorDecor(36, 20, "stonePath"), outdoorDecor(33, 27, "stonePath"),
  outdoorDecor(25, 32, "flowerPot"), outdoorDecor(28, 32, "barrel", true), outdoorDecor(41, 5, "crate", true),
  outdoorDecor(44, 5, "flowerPot"), outdoorDecor(43, 11, "marketStall", true, 2, 1),
  outdoorDecor(23, 7, "flag", true), outdoorDecor(38, 7, "flag", true),
  outdoorDecor(21, 28, "barrel", true), outdoorDecor(39, 28, "crate", true), outdoorDecor(48, 31, "flowerPot"),
  outdoorDecor(55, 31, "lantern", true), outdoorDecor(59, 31, "barrel", true), outdoorDecor(72, 33, "flag", true)
);

homeObjects.push(
  interiorFurniture(8, 2, "window", false, 2, 1), interiorFurniture(16, 2, "painting", false, 2, 1),
  interiorFurniture(6, 6, "chair", true), interiorFurniture(15, 8, "chair", true),
  interiorFurniture(18, 7, "rugSmall", false, 4, 3), interiorFurniture(20, 3, "armoire", true, 2, 3),
  interiorFurniture(22, 12, "stove", true, 2, 2), interiorFurniture(6, 12, "barrel", true),
  interiorFurniture(10, 12, "vase", true), interiorFurniture(13, 3, "lamp", false),
  interiorFurniture(19, 13, "shelf", false, 2, 1)
);

shopInteriorObjects.push(
  interiorFurniture(6, 3, "window", false, 2, 1), interiorFurniture(18, 3, "painting", false, 2, 1),
  interiorFurniture(4, 11, "crate", true), interiorFurniture(6, 11, "barrel", true), interiorFurniture(19, 11, "vase", true),
  interiorFurniture(12, 9, "rugSmall", false, 5, 2), interiorFurniture(22, 5, "lamp", false),
  interiorFurniture(2, 13, "shelf", false, 2, 1), interiorFurniture(26, 13, "shelf", false, 2, 1)
);

mayorInteriorObjects.push(
  interiorFurniture(8, 2, "painting", false, 2, 1), interiorFurniture(18, 2, "window", false, 2, 1),
  interiorFurniture(8, 9, "chair", true), interiorFurniture(20, 9, "chair", true),
  interiorFurniture(12, 10, "rugSmall", false, 5, 3), interiorFurniture(23, 12, "armoire", true, 2, 3),
  interiorFurniture(7, 13, "vase", true), interiorFurniture(14, 3, "lamp", false)
);

if (currentScene === "home") objects = homeObjects;
else if (currentScene === "shopInterior") objects = shopInteriorObjects;
else if (currentScene === "mayorInterior") objects = mayorInteriorObjects;
else if (currentScene === "crystalDimension") objects = crystalDimensionObjects;
else objects = villageObjects;
colliders = objects.filter((obj) => obj.solid);
interactables = objects.filter((obj) => obj.message);

/* ==================================================
   Eternal Rift - Visual upgrade V2
   Foco: vila mais rica, interiores aconchegantes e sprites mais legiveis.
   Tudo continua em Canvas 2D puro, sem bibliotecas externas.
   ================================================== */

const VISUAL_V2 = {
  grassA: "#7ed36c",
  grassB: "#8de57a",
  grassC: "#6fbe5c",
  darkGrass: "#276b46",
  outline: "#273052",
  woodDark: "#744631",
  wood: "#a66a43",
  woodLight: "#d59a63",
  stoneDark: "#6d655f",
  stone: "#b6aaa0",
  cream: "#f2d4a0",
  gold: "#fff264",
  blue: "#55c4ff",
  red: "#d24c63"
};

function visualHashV2(x, y, salt = 0) {
  const raw = Math.sin(x * 91.73 + y * 283.11 + salt * 17.37) * 10000;
  return raw - Math.floor(raw);
}

function fillPixelV2(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
}

function outlinePixelV2(x, y, width, height, fill, outline = VISUAL_V2.outline) {
  fillPixelV2(x, y, width, height, outline);
  if (width > 4 && height > 4) fillPixelV2(x + 2, y + 2, width - 4, height - 4, fill);
}

function drawLeafClusterV2(x, y, color, light) {
  fillPixelV2(x + 4, y + 13, 24, 15, VISUAL_V2.outline);
  fillPixelV2(x + 0, y + 19, 32, 18, VISUAL_V2.outline);
  fillPixelV2(x + 7, y + 3, 20, 17, VISUAL_V2.outline);
  fillPixelV2(x + 5, y + 14, 22, 13, color);
  fillPixelV2(x + 2, y + 20, 28, 15, color);
  fillPixelV2(x + 8, y + 5, 18, 14, color);
  fillPixelV2(x + 8, y + 11, 9, 5, light);
  fillPixelV2(x + 19, y + 20, 8, 5, light);
  fillPixelV2(x + 5, y + 28, 7, 4, "rgba(24, 78, 45, 0.45)");
}

function drawGrassBladeV2(x, y, ox, oy, color) {
  fillPixelV2(x + ox, y + oy + 5, 2, 5, color);
  fillPixelV2(x + ox + 2, y + oy + 2, 2, 8, color);
  fillPixelV2(x + ox + 4, y + oy + 6, 2, 4, color);
}

drawGrass = function drawGrassVisualV2(x, y, tileX, tileY) {
  const h = visualHashV2(tileX, tileY, 1);
  const base = h < 0.28 ? VISUAL_V2.grassA : h < 0.63 ? VISUAL_V2.grassB : VISUAL_V2.grassC;
  fillPixelV2(x, y, TILE, TILE, base);
  fillPixelV2(x, y, TILE, 2, "rgba(255,255,210,0.08)");
  if (visualHashV2(tileX, tileY, 2) > 0.32) drawGrassBladeV2(x, y, 6, 18, "#2f8b55");
  if (visualHashV2(tileX, tileY, 3) > 0.58) drawGrassBladeV2(x, y, 22, 7, "#3f9c5f");
  if (visualHashV2(tileX, tileY, 4) > 0.78) {
    fillPixelV2(x + 12, y + 12, 2, 2, "#fff264");
    fillPixelV2(x + 16, y + 14, 2, 2, "#ff7ab5");
    fillPixelV2(x + 19, y + 13, 2, 2, "#e9ffff");
  }
  if (visualHashV2(tileX, tileY, 5) > 0.88) {
    fillPixelV2(x + 8, y + 25, 8, 2, "rgba(38, 105, 69, 0.18)");
  }
};

drawForestGrass = function drawForestGrassVisualV2(x, y, tileX, tileY) {
  const base = visualHashV2(tileX, tileY, 6) < 0.5 ? "#62b957" : "#59aa51";
  fillPixelV2(x, y, TILE, TILE, base);
  fillPixelV2(x, y + 25, TILE, 7, "rgba(18, 66, 39, 0.20)");
  drawGrassBladeV2(x, y, 4, 7, "#1f6b43");
  drawGrassBladeV2(x, y, 19, 17, "#27794b");
  if (visualHashV2(tileX, tileY, 7) > 0.7) {
    fillPixelV2(x + 11, y + 23, 8, 2, "#bdf25a");
    fillPixelV2(x + 14, y + 20, 2, 6, "#bdf25a");
  }
};

drawDirt = function drawDirtVisualV2(x, y, tileX, tileY) {
  const base = visualHashV2(tileX, tileY, 10) < 0.42 ? "#a96345" : "#b57350";
  fillPixelV2(x, y, TILE, TILE, base);
  fillPixelV2(x, y + 28, TILE, 4, "rgba(81, 49, 38, 0.24)");
  fillPixelV2(x + 3, y + 5, 12, 3, "rgba(255, 221, 162, 0.15)");
  fillPixelV2(x + 19, y + 18, 9, 3, "rgba(255, 221, 162, 0.12)");
  if (visualHashV2(tileX, tileY, 11) > 0.36) fillPixelV2(x + 6, y + 17, 5, 3, "#735044");
  if (visualHashV2(tileX, tileY, 12) > 0.42) fillPixelV2(x + 23, y + 7, 4, 2, "#dba36b");
  if (visualHashV2(tileX, tileY, 13) > 0.73) fillPixelV2(x + 14, y + 25, 3, 2, "#efe0bb");
};

drawPlaza = function drawPlazaVisualV2(x, y, tileX, tileY) {
  const base = visualHashV2(tileX, tileY, 20) < 0.5 ? "#e8c98e" : "#dcbc7d";
  fillPixelV2(x, y, TILE, TILE, base);
  ctx.strokeStyle = "rgba(81, 62, 52, 0.56)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
  fillPixelV2(x + 4, y + 4, 9, 3, "rgba(255, 249, 219, 0.30)");
  if (visualHashV2(tileX, tileY, 21) > 0.5) fillPixelV2(x + 18, y + 20, 8, 3, "rgba(116, 85, 64, 0.22)");
  if ((tileX + tileY) % 4 === 0) fillPixelV2(x + 1, y + 1, 4, 4, "rgba(255, 242, 100, 0.12)");
};

drawWater = function drawWaterVisualV2(x, y, tileX, tileY) {
  const t = performance.now() / 520;
  const waveA = Math.sin(t + tileX * 0.7 + tileY * 0.35) * 2;
  const waveB = Math.cos(t * 0.8 + tileX * 0.4) * 1.5;
  fillPixelV2(x, y, TILE, TILE, (tileX + tileY) % 2 ? "#358ed1" : "#3ca2e3");
  fillPixelV2(x, y + 26, TILE, 6, "rgba(16, 74, 137, 0.28)");
  fillPixelV2(x + 4, y + 8 + waveA, 10, 2, "rgba(196, 245, 255, 0.78)");
  fillPixelV2(x + 17, y + 17 - waveB, 11, 2, "rgba(137, 224, 255, 0.72)");
  if (visualHashV2(tileX, tileY, 30) > 0.68) fillPixelV2(x + 10, y + 24, 5, 2, "rgba(233,255,255,0.36)");
};

drawInteriorFloor = function drawInteriorFloorVisualV2(x, y, tileX, tileY) {
  const plank = tileY % 2 === 0;
  const base = plank ? "#c68a56" : "#b97849";
  fillPixelV2(x, y, TILE, TILE, base);
  fillPixelV2(x, y + 15, TILE, 2, "rgba(70, 42, 32, 0.28)");
  fillPixelV2(x, y + 31, TILE, 1, "rgba(70, 42, 32, 0.34)");
  if ((tileX + tileY) % 2 === 0) fillPixelV2(x + 3, y + 5, 12, 2, "rgba(255, 224, 166, 0.14)");
  if (visualHashV2(tileX, tileY, 41) > 0.65) fillPixelV2(x + 20, y + 22, 7, 2, "rgba(83, 52, 37, 0.22)");
};

drawInteriorWall = function drawInteriorWallVisualV2(x, y, tileX, tileY) {
  const top = tileY === 0;
  fillPixelV2(x, y, TILE, TILE, top ? "#8fb5d6" : "#706078");
  fillPixelV2(x, y + 26, TILE, 6, top ? "#273052" : "#51445c");
  if ((tileX + tileY) % 3 === 0) fillPixelV2(x + 5, y + 7, 10, 3, "rgba(241, 251, 255, 0.20)");
  if ((tileX + tileY) % 4 === 0) fillPixelV2(x + 18, y + 18, 8, 3, "rgba(255, 236, 180, 0.14)");
};

drawRug = function drawRugVisualV2(x, y, tileX, tileY) {
  fillPixelV2(x, y, TILE, TILE, (tileX + tileY) % 2 === 0 ? "#b63e58" : "#95334f");
  fillPixelV2(x, y, TILE, 3, "#6f2a45");
  fillPixelV2(x, y + TILE - 3, TILE, 3, "#6f2a45");
  fillPixelV2(x + 7, y + 8, 18, 4, "rgba(255, 242, 100, 0.30)");
  fillPixelV2(x + 11, y + 17, 10, 7, "rgba(255, 220, 155, 0.24)");
};

const drawMapBeforeVisualV2 = drawMap;
drawMap = function drawMapWithVisualV2() {
  drawMapBeforeVisualV2();
  drawSceneGroundOverlayV2();
};

function drawSceneGroundOverlayV2() {
  if (currentScene === "village") {
    drawVillageGroundDetailsV2();
    return;
  }
  if (currentScene === "home" || currentScene === "shopInterior" || currentScene === "mayorInterior") {
    drawInteriorRoomBackdropV2(currentScene);
  }
}

function drawVillageGroundDetailsV2() {
  const details = [
    [30.5, 20.5, "flowerBlue"], [36.4, 20.3, "flowerPink"], [28.2, 27.1, "flowerYellow"], [39.2, 27.4, "flowerBlue"],
    [25.2, 22.2, "stoneBits"], [41.5, 22.7, "stoneBits"], [32.3, 27.6, "grassPatch"], [36.1, 27.8, "grassPatch"],
    [23.2, 32.2, "flowerPink"], [47.6, 29.8, "flowerYellow"], [61.4, 33.4, "grassPatch"], [72.5, 36.4, "stoneBits"],
    [55.5, 28.5, "reed"], [62.8, 25.5, "reed"], [66.2, 22.6, "waterLily"], [36.2, 32.8, "waterLily"]
  ];
  for (const [tx, ty, kind] of details) {
    const x = tx * TILE;
    const y = ty * TILE;
    if (x < camera.x - 48 || x > camera.x + canvas.width + 48 || y < camera.y - 48 || y > camera.y + canvas.height + 48) continue;
    if (kind === "flowerBlue") drawTinyFlowerPatchV2(x, y, "#55c4ff");
    if (kind === "flowerPink") drawTinyFlowerPatchV2(x, y, "#ff7ab5");
    if (kind === "flowerYellow") drawTinyFlowerPatchV2(x, y, "#fff264");
    if (kind === "stoneBits") drawStoneBitsV2(x, y);
    if (kind === "grassPatch") drawGrassPatchV2(x, y);
    if (kind === "reed") drawReedsV2(x, y);
    if (kind === "waterLily") drawWaterLilyV2(x, y);
  }
}

function drawTinyFlowerPatchV2(x, y, color) {
  fillPixelV2(x + 6, y + 18, 3, 8, "#26794d");
  fillPixelV2(x + 14, y + 14, 3, 9, "#26794d");
  fillPixelV2(x + 22, y + 20, 3, 7, "#26794d");
  fillPixelV2(x + 4, y + 14, 7, 5, color);
  fillPixelV2(x + 12, y + 10, 8, 6, color);
  fillPixelV2(x + 20, y + 17, 7, 5, color);
  fillPixelV2(x + 15, y + 12, 2, 2, "#fff3d6");
}

function drawStoneBitsV2(x, y) {
  fillPixelV2(x + 5, y + 18, 9, 4, "rgba(39, 48, 82, 0.20)");
  fillPixelV2(x + 7, y + 16, 7, 4, "#a4a7a8");
  fillPixelV2(x + 19, y + 12, 8, 5, "#c8d0d8");
  fillPixelV2(x + 21, y + 17, 4, 2, "#777e87");
}

function drawGrassPatchV2(x, y) {
  drawGrassBladeV2(x, y, 6, 13, "#236f48");
  drawGrassBladeV2(x, y, 14, 17, "#2e844e");
  drawGrassBladeV2(x, y, 23, 11, "#3fa164");
}

function drawReedsV2(x, y) {
  fillPixelV2(x + 8, y + 9, 3, 20, "#26794d");
  fillPixelV2(x + 15, y + 6, 3, 22, "#2f8b60");
  fillPixelV2(x + 22, y + 11, 3, 18, "#26794d");
  fillPixelV2(x + 14, y + 5, 5, 3, "#b87955");
}

function drawWaterLilyV2(x, y) {
  fillPixelV2(x + 8, y + 16, 18, 6, "rgba(28, 111, 85, 0.62)");
  fillPixelV2(x + 14, y + 12, 5, 5, "#ff7ab5");
  fillPixelV2(x + 18, y + 14, 4, 4, "#fff3d6");
}

function drawInteriorRoomBackdropV2(scene) {
  fillPixelV2(camera.x, camera.y, canvas.width, 96, "rgba(44, 37, 58, 0.10)");
  fillPixelV2(32, 32, HOME_WIDTH - 64, 20, "rgba(241, 251, 255, 0.10)");
  fillPixelV2(32, 94, HOME_WIDTH - 64, 5, "rgba(39, 48, 82, 0.45)");
  fillPixelV2(64, 76, 96, 10, "rgba(255, 242, 100, 0.12)");
  fillPixelV2(HOME_WIDTH - 160, 74, 96, 10, "rgba(85, 196, 255, 0.10)");

  if (scene === "home") {
    drawFloorRugOverlayV2(9 * TILE, 11 * TILE, 8 * TILE, 4 * TILE, "#9d3555", "#d24c63");
    drawFloorRugOverlayV2(20 * TILE, 13 * TILE, 5 * TILE, 3 * TILE, "#315a78", "#55c4ff");
  } else if (scene === "shopInterior") {
    drawFloorRugOverlayV2(8 * TILE, 10 * TILE, 12 * TILE, 3 * TILE, "#674261", "#9b5fc7");
    fillPixelV2(3 * TILE, 4 * TILE, 24 * TILE, 4, "rgba(255, 242, 100, 0.11)");
  } else if (scene === "mayorInterior") {
    drawFloorRugOverlayV2(9 * TILE, 8 * TILE, 12 * TILE, 5 * TILE, "#6b2d4a", "#d24c63");
    fillPixelV2(4 * TILE, 3 * TILE, 22 * TILE, 4, "rgba(255, 242, 100, 0.13)");
  }
}

function drawFloorRugOverlayV2(x, y, width, height, border, fill) {
  fillPixelV2(x, y, width, height, border);
  fillPixelV2(x + 6, y + 6, width - 12, height - 12, fill);
  fillPixelV2(x + width / 2 - 20, y + height / 2 - 4, 40, 8, "rgba(255, 242, 100, 0.28)");
  fillPixelV2(x + 10, y + 10, 10, 5, "rgba(255, 255, 255, 0.16)");
  fillPixelV2(x + width - 22, y + height - 16, 10, 5, "rgba(39, 48, 82, 0.18)");
}

function drawRoofTilesV2(x, y, width, roofColor) {
  fillPixelV2(x - 8, y + 15, width + 16, 33, VISUAL_V2.outline);
  fillPixelV2(x - 4, y + 18, width + 8, 26, roofColor);
  for (let rx = x; rx < x + width; rx += 16) {
    fillPixelV2(rx, y + 21, 10, 5, "rgba(255, 245, 210, 0.18)");
    fillPixelV2(rx + 8, y + 34, 11, 4, "rgba(67, 35, 49, 0.16)");
  }
  fillPixelV2(x - 4, y + 42, width + 8, 5, "rgba(53, 31, 43, 0.24)");
}

drawHouse = function drawHouseVisualV2(obj) {
  const x = obj.x;
  const y = obj.y;
  const variant = visualHashV2(Math.floor(x / TILE), Math.floor(y / TILE), obj.title?.length || 1);
  const roofColor = variant < 0.22 ? "#c94a5c" : variant < 0.45 ? "#3f8fe5" : variant < 0.7 ? "#d68045" : "#8d4be0";
  const wallColor = variant < 0.5 ? "#e8d7b8" : "#d8c2a0";
  drawSoftShadow(x + 8, y + 88, obj.width - 4, 10, 0.28);
  outlinePixelV2(x + 6, y + 39, obj.width - 12, 53, wallColor);
  for (let yy = y + 48; yy < y + 82; yy += 13) fillPixelV2(x + 10, yy, obj.width - 20, 2, "rgba(117, 85, 66, 0.18)");
  fillPixelV2(x + 12, y + 45, 36, 4, "rgba(255,255,235,0.24)");
  drawRoofTilesV2(x, y, obj.width, roofColor);
  outlinePixelV2(x + 86, y + 4, 16, 27, "#a36a46");
  fillPixelV2(x + 91, y + 8, 7, 4, "#f3c77a");
  outlinePixelV2(x + 24, y + 60, 24, 32, "#93583d");
  fillPixelV2(x + 39, y + 75, 3, 3, VISUAL_V2.gold);
  fillPixelV2(x + 29, y + 88, 15, 3, "rgba(35, 31, 42, 0.30)");
  drawHouseWindowV2(x + 72, y + 55, "#73d5ff");
  drawHouseWindowV2(x + 12, y + 52, "#9ee6ff");
  drawWindowBoxV2(x + 70, y + 77);
  drawWindowBoxV2(x + 10, y + 74);
};

function drawHouseWindowV2(x, y, glass) {
  outlinePixelV2(x, y, 25, 21, glass);
  fillPixelV2(x + 4, y + 4, 8, 5, "#e9ffff");
  fillPixelV2(x + 13, y + 3, 2, 16, VISUAL_V2.outline);
  fillPixelV2(x + 3, y + 11, 19, 2, VISUAL_V2.outline);
}

function drawWindowBoxV2(x, y) {
  fillPixelV2(x, y + 7, 30, 6, "#7d4d38");
  fillPixelV2(x + 3, y + 3, 5, 5, "#ff7ab5");
  fillPixelV2(x + 13, y + 1, 5, 6, "#fff264");
  fillPixelV2(x + 22, y + 4, 5, 5, "#55c4ff");
}

drawPlayerHouse = function drawPlayerHouseVisualV2(obj) {
  drawHouse(obj);
  fillPixelV2(obj.x + 52, obj.y + 18, 24, 9, "#55e8ff");
  fillPixelV2(obj.x + 58, obj.y + 21, 12, 3, "#fff264");
};

drawShop = function drawShopVisualV2(obj) {
  drawHouse(obj);
  fillPixelV2(obj.x + 20, obj.y + 45, 88, 16, VISUAL_V2.outline);
  fillPixelV2(obj.x + 23, obj.y + 48, 82, 10, "#fff264");
  fillPixelV2(obj.x + 31, obj.y + 51, 12, 4, "#d24c63");
  fillPixelV2(obj.x + 58, obj.y + 51, 12, 4, "#3f8fe5");
  fillPixelV2(obj.x + 84, obj.y + 51, 12, 4, "#7bdb73");
};

drawTree = function drawTreeVisualV2(obj) {
  const x = obj.x;
  const y = obj.y;
  drawSoftShadow(x - 4, y + 55, 42, 9, 0.22);
  outlinePixelV2(x + 12, y + 37, 11, 25, "#8f5a3f");
  fillPixelV2(x + 15, y + 40, 3, 20, "#d99b67");
  drawLeafClusterV2(x - 7, y - 2, "#2f9e56", "#7bdb73");
  drawLeafClusterV2(x + 4, y - 14, "#3aaa5e", "#8de57a");
  drawLeafClusterV2(x - 14, y + 10, "#26794d", "#6fbe5c");
  fillPixelV2(x + 21, y + 6, 5, 4, "rgba(255, 255, 220, 0.18)");
};

const drawBedBeforeVisualV2 = drawBed;
drawBed = function drawBedVisualV2(obj) {
  drawSoftShadow(obj.x + 4, obj.y + obj.height - 2, obj.width - 8, 7, 0.2);
  outlinePixelV2(obj.x, obj.y, obj.width, obj.height, "#88485b");
  fillPixelV2(obj.x + 8, obj.y + 8, obj.width - 16, 16, "#f4e1bf");
  fillPixelV2(obj.x + 8, obj.y + 28, obj.width - 16, obj.height - 36, "#d24c63");
  fillPixelV2(obj.x + 15, obj.y + 38, obj.width - 30, 5, "rgba(255, 242, 100, 0.26)");
  fillPixelV2(obj.x + 8, obj.y + obj.height - 8, obj.width - 16, 4, "rgba(73, 42, 50, 0.30)");
};

const drawTableBeforeVisualV2 = drawTable;
drawTable = function drawTableVisualV2(obj) {
  drawSoftShadow(obj.x + 4, obj.y + obj.height - 2, obj.width - 8, 7, 0.2);
  outlinePixelV2(obj.x, obj.y, obj.width, obj.height, "#9b613f");
  fillPixelV2(obj.x + 8, obj.y + 8, obj.width - 16, 15, "#d99b67");
  fillPixelV2(obj.x + 18, obj.y + 12, 18, 8, "#fff3d6");
  fillPixelV2(obj.x + 52, obj.y + 10, 10, 12, "#7bdb73");
  fillPixelV2(obj.x + 55, obj.y + 7, 5, 5, "#ff7ab5");
};

const drawFurnitureBeforeVisualV2 = drawFurniture;
drawFurniture = function drawFurnitureVisualV2(obj) {
  const x = obj.x;
  const y = obj.y;
  const w = obj.width;
  const h = obj.height;
  const kind = obj.kind;
  if (kind === "largeRug") return drawFloorRugOverlayV2(x, y, w, h, "#6f2a45", "#c8465e");
  if (kind === "blueRug") return drawFloorRugOverlayV2(x, y, w, h, "#244c75", "#3f8fe5");
  if (kind === "roundTable") {
    drawSoftShadow(x + 5, y + 23, 43, 7, 0.2);
    outlinePixelV2(x + 7, y + 5, 42, 29, "#9b613f");
    fillPixelV2(x + 16, y + 10, 24, 13, "#d99b67");
    fillPixelV2(x + 22, y + 13, 8, 6, "#fff3d6");
    fillPixelV2(x + 34, y + 12, 5, 8, "#55c4ff");
    return;
  }
  if (kind === "sofa") {
    drawSoftShadow(x + 4, y + h - 4, w - 8, 7, 0.2);
    outlinePixelV2(x, y + 7, w, h - 8, "#71476c");
    fillPixelV2(x + 7, y + 13, w - 14, 12, "#9b5fc7");
    fillPixelV2(x + 9, y + 28, w - 18, 9, "#dcb5ff");
    fillPixelV2(x + 13, y + 15, 12, 9, "#d24c63");
    fillPixelV2(x + w - 26, y + 15, 12, 9, "#55c4ff");
    return;
  }
  if (kind === "kitchenCounter") {
    outlinePixelV2(x, y, w, h, "#8f5a3f");
    fillPixelV2(x + 8, y + 6, w - 16, 8, "#d99b67");
    fillPixelV2(x + 12, y + 18, 16, 12, "#6d5c75");
    fillPixelV2(x + 39, y + 18, 20, 10, "#c8d0d8");
    fillPixelV2(x + 76, y + 16, 12, 12, "#d24c63");
    return;
  }
  if (kind === "fireplace") {
    outlinePixelV2(x, y, w, h, "#7b6f65");
    fillPixelV2(x + 7, y + 7, w - 14, 11, "#b6aaa0");
    fillPixelV2(x + 13, y + 22, w - 26, h - 30, VISUAL_V2.outline);
    fillPixelV2(x + 19, y + 30, w - 38, 12, "#ff8a4b");
    fillPixelV2(x + 26, y + 25, 8, 10, "#fff264");
    return;
  }
  if (kind === "tallPlant") {
    outlinePixelV2(x + 10, y + h - 18, 18, 16, "#b44d60");
    fillPixelV2(x + 18, y + 12, 4, h - 24, "#26794d");
    fillPixelV2(x + 8, y + 11, 15, 9, "#7bdb73");
    fillPixelV2(x + 20, y + 4, 16, 12, "#8de57a");
    fillPixelV2(x + 9, y + 23, 14, 8, "#3fa164");
    return;
  }
  if (kind === "nightstand") {
    outlinePixelV2(x + 4, y + 8, 24, 22, "#8f5a3f");
    fillPixelV2(x + 10, y + 12, 12, 5, "#d99b67");
    fillPixelV2(x + 14, y + 21, 4, 4, "#fff264");
    return;
  }
  if (kind === "wallBanner") {
    outlinePixelV2(x + 6, y + 3, w - 12, h - 4, "#d24c63");
    fillPixelV2(x + w / 2 - 8, y + 12, 16, 5, "#fff264");
    fillPixelV2(x + w / 2 - 4, y + 18, 8, 13, "#55c4ff");
    return;
  }
  if (kind === "displayShelf") {
    outlinePixelV2(x, y + 2, w, h - 4, "#854f38");
    fillPixelV2(x + 7, y + 20, w - 14, 4, VISUAL_V2.outline);
    fillPixelV2(x + 7, y + 42, w - 14, 4, VISUAL_V2.outline);
    const goods = ["#fff264", "#55c4ff", "#d24c63", "#7bdb73", "#b46dff"];
    for (let i = 0; i < 10; i++) {
      fillPixelV2(x + 10 + (i % 5) * 11, y + 7 + Math.floor(i / 5) * 22, 7, 12, goods[i % goods.length]);
    }
    return;
  }
  if (kind === "cashRegister") {
    outlinePixelV2(x + 4, y + 9, 26, 20, "#6d5c75");
    fillPixelV2(x + 10, y + 13, 12, 5, "#55e8ff");
    fillPixelV2(x + 10, y + 22, 3, 3, "#fff264");
    fillPixelV2(x + 16, y + 22, 3, 3, "#d24c63");
    return;
  }
  if (kind === "noticeBoard") {
    outlinePixelV2(x + 3, y + 5, w - 6, h - 10, "#8f5a3f");
    fillPixelV2(x + 10, y + 12, w - 20, 7, "#fff3d6");
    fillPixelV2(x + 12, y + 24, w - 24, 6, "#f5ce79");
    fillPixelV2(x + 14, y + 34, 18, 5, "#55c4ff");
    return;
  }
  if (kind === "partition") {
    outlinePixelV2(x, y + 4, w, h - 8, "#7d4d38");
    for (let sx = x + 7; sx < x + w - 10; sx += 15) fillPixelV2(sx, y + 9, 7, h - 18, "#d99b67");
    return;
  }
  return drawFurnitureBeforeVisualV2(obj);
};

const drawOutdoorDecorBeforeVisualV2 = drawOutdoorDecor;
drawOutdoorDecor = function drawOutdoorDecorVisualV2(obj) {
  const x = obj.x;
  const y = obj.y;
  const kind = obj.kind;
  if (kind === "lampPost") {
    outlinePixelV2(x + 13, y + 8, 7, 27, "#5c413c");
    fillPixelV2(x + 2, y, 30, 24, "rgba(255, 242, 100, 0.28)");
    outlinePixelV2(x + 7, y + 3, 18, 17, "#fff264");
    fillPixelV2(x + 12, y + 6, 2, 12, VISUAL_V2.outline);
    fillPixelV2(x + 18, y + 6, 2, 12, VISUAL_V2.outline);
    return;
  }
  if (kind === "flowerBed") {
    outlinePixelV2(x + 1, y + 17, wOrDefaultV2(obj, 30), 12, "#7d4d38");
    for (let i = 0; i < 5; i++) {
      fillPixelV2(x + 5 + i * 5, y + 12 - (i % 2), 4, 4, i % 2 ? "#fff264" : "#ff7ab5");
      fillPixelV2(x + 6 + i * 5, y + 16, 2, 6, "#26794d");
    }
    return;
  }
  if (kind === "woodPile") {
    drawSoftShadow(x + 2, y + 24, 30, 6, 0.2);
    for (let i = 0; i < 3; i++) {
      outlinePixelV2(x + 3, y + 8 + i * 7, 26, 7, "#9b613f");
      fillPixelV2(x + 7, y + 10 + i * 7, 6, 3, "#d99b67");
    }
    return;
  }
  if (kind === "mailbox") {
    outlinePixelV2(x + 13, y + 12, 6, 19, "#8f5a3f");
    outlinePixelV2(x + 6, y + 6, 22, 13, "#3f8fe5");
    fillPixelV2(x + 21, y + 10, 5, 4, "#fff264");
    return;
  }
  return drawOutdoorDecorBeforeVisualV2(obj);
};

function wOrDefaultV2(obj, fallback) {
  return obj.width || fallback;
}

drawNpc = function drawNpcVisualV2(obj) {
  const bob = Math.sin(performance.now() / 320 + (obj.bob || 0)) * 1.6;
  const x = obj.x;
  const y = obj.y + bob;
  const role = obj.role || obj.name || "villager";
  const palette = {
    shopkeeper: { shirt: "#fff264", vest: "#d24c63", hair: "#7d4d38", hat: "#d24c63" },
    letterTarget: { shirt: "#7bdb73", vest: "#3f8fe5", hair: "#273052", hat: "#55c4ff" },
    mayor: { shirt: "#9b5fc7", vest: "#fff264", hair: "#f5ce79", hat: "#fff264" },
    dimensionGuide: { shirt: "#8d4be0", vest: "#55e8ff", hair: "#e9ffff", hat: "#55e8ff" },
    dimensionMystic: { shirt: "#55e8ff", vest: "#b46dff", hair: "#b46dff", hat: "#ff72dc" },
    Nico: { shirt: "#3f8fe5", vest: "#55e8ff", hair: "#4a2f39", hat: "#55e8ff" },
    Ari: { shirt: "#d24c63", vest: "#fff264", hair: "#273052", hat: "#ff7ab5" },
    Mina: { shirt: "#7bdb73", vest: "#fff264", hair: "#8f5a3f", hat: "#fff264" },
    villager: { shirt: "#7bdb73", vest: "#f5ce79", hair: "#273052", hat: "#d99b67" }
  };
  const look = palette[role] || palette[obj.name] || palette.villager;
  drawSoftShadow(x + 3, y + 27, 22, 5, 0.25);
  outlinePixelV2(x + 5, y + 12, 17, 16, look.shirt);
  fillPixelV2(x + 8, y + 15, 11, 4, look.vest);
  outlinePixelV2(x + 4, y + 3, 17, 13, "#f4bd8f");
  fillPixelV2(x + 3, y + 1, 19, 5, look.hair);
  fillPixelV2(x + 4, y + 6, 4, 7, look.hair);
  if (role === "shopkeeper") {
    fillPixelV2(x + 2, y - 3, 21, 5, look.hat);
    fillPixelV2(x + 8, y - 7, 8, 5, VISUAL_V2.gold);
  }
  if (role === "mayor") {
    fillPixelV2(x + 5, y - 4, 14, 5, look.hat);
    fillPixelV2(x + 10, y - 8, 5, 4, VISUAL_V2.blue);
  }
  fillPixelV2(x + 7, y + 28, 5, 6, VISUAL_V2.outline);
  fillPixelV2(x + 16, y + 28, 5, 6, VISUAL_V2.outline);
  fillPixelV2(x + 9, y + 9, 2, 2, VISUAL_V2.outline);
  fillPixelV2(x + 16, y + 9, 2, 2, VISUAL_V2.outline);
};

drawPlayer = function drawPlayerVisualV2() {
  const x = player.x;
  const y = player.y;
  const leg = player.moving ? [0, 2, 0, -2][player.frame] : 0;
  const blinking = playerInvulnerableTimer > 0 && Math.floor(performance.now() / 80) % 2 === 0;
  ctx.save();
  if (blinking) ctx.globalAlpha = 0.45;
  if (player.isSwimming) {
    ctx.strokeStyle = "rgba(233, 255, 255, 0.75)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x + 12, y + 26, 18, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (player.levelGlowTimer > 0) {
    const pulse = 0.30 + Math.sin(performance.now() / 80) * 0.15;
    fillPixelV2(x - 8, y - 8, player.width + 16, player.height + 16, `rgba(255, 242, 100, ${pulse})`);
  }
  drawSoftShadow(x + 3, y + 26, 23, 5, 0.25);
  outlinePixelV2(x + 5, y + 12, 18, 15, "#2d3d83");
  fillPixelV2(x + 8, y + 14, 12, 4, "#55e8ff");
  fillPixelV2(x + 10, y + 20, 8, 5, "#3f8fe5");
  outlinePixelV2(x + 7, y + 4, 15, 11, "#f4bd8f");
  fillPixelV2(x + 5, y + 2, 18, 5, "#273052");
  fillPixelV2(x + 4, y + 6, 5, 8, "#273052");
  fillPixelV2(x + 7, y, 12, 5, "#5ad6e7");
  fillPixelV2(x + 4, y + 5, 5, 7, "#5ad6e7");
  fillPixelV2(x + 18, y + 1, 3, 3, VISUAL_V2.gold);
  fillPixelV2(x + 7, y + 26 + leg, 5, 6, VISUAL_V2.outline);
  fillPixelV2(x + 16, y + 26 - leg, 5, 6, VISUAL_V2.outline);
  fillPixelV2(x + 3, y + 15, 4, 8, "#f4bd8f");
  fillPixelV2(x + 22, y + 15, 4, 8, "#f4bd8f");
  if (player.direction === "up") fillPixelV2(x + 9, y + 7, 10, 2, VISUAL_V2.outline);
  else if (player.direction === "left") fillPixelV2(x + 9, y + 9, 2, 2, VISUAL_V2.outline);
  else if (player.direction === "right") fillPixelV2(x + 19, y + 9, 2, 2, VISUAL_V2.outline);
  else {
    fillPixelV2(x + 11, y + 9, 2, 2, VISUAL_V2.outline);
    fillPixelV2(x + 17, y + 9, 2, 2, VISUAL_V2.outline);
  }
  if (attackTimer > 0 || weaponCooldownTimer > 0) {
    const weaponKey = getCurrentWeaponKey();
    const color = weaponKey === "staff" ? "#55e8ff" : weaponKey === "bow" ? "#d99b67" : "#e9ffff";
    fillPixelV2(player.direction === "left" ? x - 8 : player.direction === "right" ? x + 23 : x + 13, player.direction === "up" ? y + 3 : player.direction === "down" ? y + 23 : y + 15, player.direction === "left" || player.direction === "right" ? 12 : 3, player.direction === "up" || player.direction === "down" ? 12 : 3, color);
  }
  ctx.restore();
};

const drawEnemyBeforeVisualV2 = drawEnemy;
drawEnemy = function drawEnemyVisualV2(obj) {
  if (obj.boss) {
    const pulse = 0.16 + Math.sin(performance.now() / 180) * 0.06;
    fillPixelV2(obj.x - 12, obj.y - 14, obj.width + 24, obj.height + 26, `rgba(255, 79, 98, ${pulse})`);
    fillPixelV2(obj.x + obj.width / 2 - 6, obj.y - 20, 12, 9, "rgba(255, 242, 100, 0.32)");
  }
  drawEnemyBeforeVisualV2(obj);
  if (["slime", "slimeVerde", "slimeAzul", "slimeVermelho", "reiSlime"].includes(obj.kind)) {
    fillPixelV2(obj.x + 7, obj.y + 7, 8, 3, "rgba(233, 255, 255, 0.70)");
    fillPixelV2(obj.x + obj.width - 12, obj.y + 14, 4, 4, "rgba(255,255,255,0.35)");
  }
  if (obj.kind === "morcego") {
    fillPixelV2(obj.x - 3, obj.y + 7, 8, 3, "#273052");
    fillPixelV2(obj.x + obj.width - 5, obj.y + 7, 8, 3, "#273052");
  }
  if (obj.kind === "goblin" || obj.kind === "arqueiroGoblin") {
    fillPixelV2(obj.x + 6, obj.y + 3, 10, 4, "#bdf25a");
    fillPixelV2(obj.x + obj.width - 7, obj.y + 11, 5, 3, "#fff264");
  }
};

function addVisualV2Objects(target, items) {
  for (const item of items) {
    if (!target.some((obj) => obj.visualV2Id === item.visualV2Id)) target.push(item);
  }
}

function furnitureV2(id, tileX, tileY, kind, solid = false, widthTiles = 1, heightTiles = 1, message = "") {
  const item = interiorFurniture(tileX, tileY, kind, solid, widthTiles, heightTiles, message);
  item.visualV2Id = id;
  return item;
}

function outdoorV2(id, tileX, tileY, kind, solid = false, widthTiles = 1, heightTiles = 1, message = "") {
  const item = outdoorDecor(tileX, tileY, kind, solid, widthTiles, heightTiles);
  item.visualV2Id = id;
  if (message) item.message = message;
  return item;
}

if (typeof window !== "undefined" && !window.ETERNAL_RIFT_VISUAL_PATCH_V2) {
  window.ETERNAL_RIFT_VISUAL_PATCH_V2 = true;

  fillHomeRect(homeMap, 9, 11, 8, 4, "I");
  fillHomeRect(homeMap, 20, 13, 5, 3, "I");
  fillHomeRect(shopInteriorObjects === objects ? homeMap : homeMap, 7, 13, 7, 2, "I");

  addVisualV2Objects(villageObjects, [
    outdoorV2("plaza-lamp-a", 27, 21, "lampPost", true), outdoorV2("plaza-lamp-b", 39, 21, "lampPost", true),
    outdoorV2("plaza-lamp-c", 27, 27, "lampPost", true), outdoorV2("plaza-lamp-d", 39, 27, "lampPost", true),
    outdoorV2("plaza-flowerbed-a", 24, 19, "flowerBed", true, 1, 1), outdoorV2("plaza-flowerbed-b", 41, 19, "flowerBed", true, 1, 1),
    outdoorV2("plaza-flowerbed-c", 24, 28, "flowerBed", true, 1, 1), outdoorV2("plaza-flowerbed-d", 41, 28, "flowerBed", true, 1, 1),
    outdoorV2("home-mailbox", 25, 36, "mailbox", true), outdoorV2("home-woodpile", 28, 35, "woodPile", true),
    outdoorV2("shop-flowerbed", 43, 9, "flowerBed", true), outdoorV2("shop-mailbox", 46, 9, "mailbox", true),
    outdoorV2("pousada-woodpile", 20, 31, "woodPile", true), outdoorV2("campo-flowerbed", 60, 34, "flowerBed", true),
    outdoorV2("treino-lamp", 68, 44, "lampPost", true), outdoorV2("cabana-mailbox", 8, 54, "mailbox", true)
  ]);

  addVisualV2Objects(homeObjects, [
    furnitureV2("home-wall-banner", 11, 1, "wallBanner", false, 4, 2), furnitureV2("home-window-left", 4, 2, "window", false, 2, 1),
    furnitureV2("home-nightstand", 7, 3, "nightstand", true), furnitureV2("home-large-rug", 9, 11, "largeRug", false, 8, 4),
    furnitureV2("home-round-table", 11, 11, "roundTable", true, 2, 1), furnitureV2("home-sofa", 2, 14, "sofa", true, 4, 2),
    furnitureV2("home-kitchen", 20, 14, "kitchenCounter", true, 4, 1), furnitureV2("home-fireplace", 23, 5, "fireplace", true, 2, 2),
    furnitureV2("home-tall-plant", 26, 8, "tallPlant", true, 1, 2), furnitureV2("home-partition", 2, 7, "partition", true, 4, 1),
    furnitureV2("home-blue-rug", 20, 12, "blueRug", false, 5, 3), furnitureV2("home-notice", 16, 2, "noticeBoard", false, 3, 2)
  ]);

  addVisualV2Objects(shopInteriorObjects, [
    furnitureV2("shop-display-left", 3, 4, "displayShelf", true, 3, 2), furnitureV2("shop-display-right", 23, 4, "displayShelf", true, 3, 2),
    furnitureV2("shop-cash-register", 15, 5, "cashRegister", false), furnitureV2("shop-large-rug", 8, 10, "blueRug", false, 12, 3),
    furnitureV2("shop-notice", 12, 2, "noticeBoard", false, 4, 2), furnitureV2("shop-sofa", 3, 14, "sofa", true, 4, 2),
    furnitureV2("shop-tall-plant", 25, 12, "tallPlant", true, 1, 2), furnitureV2("shop-partition", 21, 13, "partition", true, 5, 1)
  ]);

  addVisualV2Objects(mayorInteriorObjects, [
    furnitureV2("mayor-banner", 12, 1, "wallBanner", false, 5, 2), furnitureV2("mayor-display-left", 2, 5, "displayShelf", true, 3, 2),
    furnitureV2("mayor-display-right", 25, 5, "displayShelf", true, 3, 2), furnitureV2("mayor-large-rug", 9, 8, "largeRug", false, 12, 5),
    furnitureV2("mayor-sofa", 3, 14, "sofa", true, 5, 2), furnitureV2("mayor-fireplace", 23, 11, "fireplace", true, 2, 2),
    furnitureV2("mayor-notice", 11, 3, "noticeBoard", false, 4, 2), furnitureV2("mayor-tall-plant", 26, 14, "tallPlant", true, 1, 2)
  ]);

  if (currentScene === "home") objects = homeObjects;
  else if (currentScene === "shopInterior") objects = shopInteriorObjects;
  else if (currentScene === "mayorInterior") objects = mayorInteriorObjects;
  else if (currentScene === "crystalDimension") objects = crystalDimensionObjects;
  else objects = villageObjects;
  colliders = objects.filter((obj) => obj.solid);
  interactables = objects.filter((obj) => obj.message);
}


// === Sanctuary dimension patch ===
if (typeof window !== "undefined" && !window.ETERNAL_RIFT_SANCTUARY_PATCH) {
  window.ETERNAL_RIFT_SANCTUARY_PATCH = true;

  getSceneName = function getSceneNameSanctuary() {
    if (currentScene === "home") return "Casa";
    if (currentScene === "shopInterior") return "Loja";
    if (currentScene === "mayorInterior") return "Prefeito";
    if (currentScene === "crystalDimension") return "Refugio Cristalino";
    return "Vila";
  };

  drawCrystalFloor = function drawCrystalFloorSanctuary(x, y, tileX, tileY) {
    const mix = (tileX + tileY) % 3;
    const base = mix === 0 ? "#80c56f" : mix === 1 ? "#75ba67" : "#89cd79";
    fillPixelV2(x, y, TILE, TILE, base);
    fillPixelV2(x, y + 25, TILE, 7, "rgba(47, 114, 64, 0.18)");
    if ((tileX * 5 + tileY * 3) % 5 === 0) {
      fillPixelV2(x + 5, y + 10, 3, 7, "#3f9158");
      fillPixelV2(x + 8, y + 7, 3, 5, "#2f7c4c");
      fillPixelV2(x + 10, y + 11, 3, 6, "#4aa56b");
    }
    if ((tileX * 7 + tileY * 2) % 8 === 0) {
      fillPixelV2(x + 20, y + 14, 3, 3, "#fff3d6");
      fillPixelV2(x + 22, y + 12, 3, 3, "#ff7ab5");
      fillPixelV2(x + 18, y + 16, 2, 2, "#55c4ff");
    }
  };

  drawCrystalPath = function drawCrystalPathSanctuary(x, y, tileX, tileY) {
    const base = (tileX + tileY) % 2 === 0 ? "#d9c79b" : "#ceb98a";
    fillPixelV2(x, y, TILE, TILE, base);
    ctx.strokeStyle = "rgba(104, 84, 63, 0.42)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
    fillPixelV2(x + 2, y + 2, TILE - 4, 2, "rgba(255,255,240,0.16)");
    fillPixelV2(x + 4, y + 26, TILE - 8, 2, "rgba(76, 119, 74, 0.18)");
    if ((tileX + tileY) % 4 === 0) fillPixelV2(x + 12, y + 12, 7, 4, "rgba(255, 242, 100, 0.14)");
    if ((tileX * 3 + tileY) % 5 === 0) fillPixelV2(x + 23, y + 7, 4, 3, "rgba(141, 175, 109, 0.30)");
  };

  drawMagicWater = function drawMagicWaterSanctuary(x, y, tileX, tileY) {
    const wave = Math.sin(performance.now() / 420 + tileX * 0.7 + tileY * 0.35) * 2;
    fillPixelV2(x, y, TILE, TILE, (tileX + tileY) % 2 === 0 ? "#4aa6df" : "#3b90cf");
    fillPixelV2(x, y + 25, TILE, 7, "rgba(12, 62, 122, 0.25)");
    fillPixelV2(x + 4, y + 9 + wave, 10, 3, "rgba(222, 251, 255, 0.85)");
    fillPixelV2(x + 18, y + 18 - wave, 9, 3, "rgba(147, 236, 255, 0.80)");
    fillPixelV2(x + 10, y + 22, 6, 2, "rgba(109, 255, 201, 0.35)");
    if ((tileX * 11 + tileY * 7) % 10 === 0) {
      fillPixelV2(x + 13, y + 12, 4, 4, "#ff7ab5");
      fillPixelV2(x + 10, y + 15, 10, 3, "rgba(35, 134, 92, 0.42)");
    }
  };

  function drawSanctuaryFlowerCluster(x, y, palette = ["#ff7ab5", "#fff264", "#55c4ff"]) {
    fillPixelV2(x + 3, y + 19, 3, 7, "#26794d");
    fillPixelV2(x + 11, y + 16, 3, 9, "#2f8b60");
    fillPixelV2(x + 19, y + 19, 3, 7, "#26794d");
    fillPixelV2(x + 1, y + 14, 7, 5, palette[0]);
    fillPixelV2(x + 9, y + 11, 7, 5, palette[1]);
    fillPixelV2(x + 17, y + 15, 7, 5, palette[2]);
    fillPixelV2(x + 10, y + 13, 2, 2, "#fff3d6");
  }

  function drawSanctuaryShrub(x, y) {
    fillPixelV2(x + 4, y + 17, 24, 11, "#2f8b60");
    fillPixelV2(x + 7, y + 12, 18, 8, "#4eb86c");
    fillPixelV2(x + 12, y + 8, 10, 6, "#79d98a");
    fillPixelV2(x + 8, y + 22, 3, 3, "rgba(255,255,255,0.15)");
  }

  function drawSanctuaryLight(x, y, color) {
    fillPixelV2(x - 5, y - 5, 12, 12, color);
    fillPixelV2(x - 2, y - 2, 6, 6, "#fff3d6");
  }

  drawDimensionAmbient = function drawDimensionAmbientSanctuary() {
    if (dimensionQuest.bridgeOpen) drawCrystalBridge();

    const haze = 0.05 + Math.sin(performance.now() / 1300) * 0.015;
    fillPixelV2(camera.x, camera.y, canvas.width, canvas.height, `rgba(195, 245, 226, ${haze})`);

    const gardens = [
      [5, 5, "flowers"], [8, 7, "shrub"], [36, 7, "shrub"], [39, 5, "flowers"],
      [7, 14, "flowers"], [38, 14, "flowers"], [5, 24, "shrub"], [39, 26, "shrub"],
      [7, 28, "flowers"], [37, 29, "flowers"], [12, 22, "flowers"], [31, 22, "flowers"]
    ];

    for (const [tx, ty, kind] of gardens) {
      const px = tx * TILE;
      const py = ty * TILE;
      if (px < camera.x - 40 || px > camera.x + canvas.width + 40 || py < camera.y - 40 || py > camera.y + canvas.height + 40) continue;
      if (kind === "flowers") drawSanctuaryFlowerCluster(px, py);
      if (kind === "shrub") drawSanctuaryShrub(px, py);
    }

    const time = performance.now() / 1000;
    const particleStep = isMobile ? 2 : 1;
    for (let i = 0; i < dimensionParticles.length; i += particleStep) {
      const particle = dimensionParticles[i];
      const px = particle.x + Math.sin(time * particle.speed + particle.phase) * 12;
      const py = particle.y + Math.cos(time * particle.speed + particle.phase) * 8;
      if (px < camera.x - 8 || px > camera.x + canvas.width + 8 || py < camera.y - 8 || py > camera.y + canvas.height + 8) continue;
      const tone = i % 3 === 0 ? "rgba(255, 242, 100, 0.48)" : i % 3 === 1 ? "rgba(233, 255, 255, 0.52)" : "rgba(85, 228, 255, 0.46)";
      drawSanctuaryLight(px, py, tone);
    }
  };

  getDimensionNpcMessage = function getDimensionNpcMessageSanctuary(npcObj) {
    if (npcObj.role === "dimensionGuide") {
      if (dimensionQuest.status === "notStarted") {
        dimensionQuest.status = "active";
        return "Orion: Bem-vindo ao Refugio Cristalino. Este lugar foi preparado para ser um lar calmo para a vila. Ative os 3 cristais e a ponte do jardim sera liberada.";
      }
      if (dimensionQuest.status === "active") {
        return `Orion: O refugio esta quase completo. Cristais ativados: ${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals}.`;
      }
      if (dimensionQuest.status === "ready" && !dimensionQuest.chestOpened) {
        return "Orion: A ponte do jardim despertou. Atravesse o caminho do norte e abra o bau especial.";
      }
      return "Orion: Agora este refugio pode receber moradores da vila para descansar, conversar e admirar as aguas claras.";
    }
    if (npcObj.role === "dimensionMystic") {
      if (!dimensionQuest.bridgeOpen) {
        return "Nyx: Troquei o antigo vazio roxo por um jardim sereno. Quando os tres cristais brilharem, o refugio vai ficar completo.";
      }
      return "Nyx: O Refugio Cristalino esta em paz. Ate os moradores da vila ja conseguem imaginar piqueniques por aqui.";
    }
    return npcObj.message;
  };

  function ensureDimensionObject(matchFn, createFn) {
    if (!crystalDimensionObjects.some(matchFn)) crystalDimensionObjects.push(createFn());
  }

  addVisualV2Objects(crystalDimensionObjects, [
    outdoorV2("sanctuary-lamp-left", 18, 27, "lampPost", true),
    outdoorV2("sanctuary-lamp-right", 27, 27, "lampPost", true),
    outdoorV2("sanctuary-flowerbed-left", 15, 26, "flowerBed", true),
    outdoorV2("sanctuary-flowerbed-right", 30, 26, "flowerBed", true),
    outdoorV2("sanctuary-flowerbed-top-left", 18, 10, "flowerBed", true),
    outdoorV2("sanctuary-flowerbed-top-right", 25, 10, "flowerBed", true)
  ]);

  ensureDimensionObject(
    (obj) => obj.type === "bench" && obj.x === 14 * TILE + 2 && obj.y === 26 * TILE + 10,
    () => bench(14, 26, "horizontal")
  );
  ensureDimensionObject(
    (obj) => obj.type === "bench" && obj.x === 29 * TILE + 2 && obj.y === 26 * TILE + 10,
    () => bench(29, 26, "horizontal")
  );
  ensureDimensionObject(
    (obj) => obj.type === "npc" && obj.name === "Mila",
    () => npc(16, 25, "Mila", "Mila: Finalmente esta dimensao parece um jardim de descanso. Eu adoraria trazer mais moradores da vila para ca.")
  );
  ensureDimensionObject(
    (obj) => obj.type === "npc" && obj.name === "Caio",
    () => npc(29, 25, "Caio", "Caio: As aguas estao calmas, o ar esta leve e ate o portal parece mais amigavel agora.")
  );
  ensureDimensionObject(
    (obj) => obj.type === "npc" && obj.name === "Lina",
    () => npc(10, 11, "Lina", "Lina: Eu gosto de andar pelos caminhos de pedra e ver as luzes flutuando sobre o lago.")
  );
  ensureDimensionObject(
    (obj) => obj.type === "flower" && obj.x === 19 * TILE + 8,
    () => flower(19, 24, "pink")
  );
  ensureDimensionObject(
    (obj) => obj.type === "flower" && obj.x === 24 * TILE + 8,
    () => flower(24, 24, "blue")
  );
  ensureDimensionObject(
    (obj) => obj.type === "flower" && obj.x === 11 * TILE + 8,
    () => flower(11, 21, "yellow")
  );
  ensureDimensionObject(
    (obj) => obj.type === "flower" && obj.x === 34 * TILE + 8,
    () => flower(34, 21, "pink")
  );
  ensureDimensionObject(
    (obj) => obj.type === "sign" && obj.x === 22 * TILE + 8 && obj.y === 30 * TILE + 6,
    () => sign(22, 30, "Jardim do Refugio: um lugar tranquilo onde os moradores da vila podem descansar, conversar e apreciar a luz dos cristais.")
  );

  const dimensionGuide = crystalDimensionObjects.find((obj) => obj.type === "npc" && obj.role === "dimensionGuide");
  if (dimensionGuide) dimensionGuide.message = "Orion: Este lugar nao e mais um vazio sombrio. Agora ele pode se tornar um refugio para todos.";
  const dimensionMystic = crystalDimensionObjects.find((obj) => obj.type === "npc" && obj.role === "dimensionMystic");
  if (dimensionMystic) dimensionMystic.message = "Nyx: As aguas, flores e caminhos de pedra trouxeram paz para este plano.";

  if (currentScene === "crystalDimension") {
    objects = crystalDimensionObjects;
    colliders = objects.filter((obj) => obj.solid);
    interactables = objects.filter((obj) => obj.message);
  }
}


// === Remove placas/postes decorativos patch ===
if (typeof window !== "undefined" && !window.ETERNAL_RIFT_REMOVE_SIGNS_PATCH) {
  window.ETERNAL_RIFT_REMOVE_SIGNS_PATCH = true;

  function removeUnwantedSigns(list) {
    for (let i = list.length - 1; i >= 0; i--) {
      const obj = list[i];
      if (!obj) continue;
      const isVillageSign = obj.type === "sign";
      const isDimensionSign = obj.type === "dimensionSign";
      const isLampPostDecor = obj.type === "outdoorDecor" && obj.kind === "lampPost";
      if (isVillageSign || isDimensionSign || isLampPostDecor) {
        list.splice(i, 1);
      }
    }
  }

  removeUnwantedSigns(villageObjects);
  removeUnwantedSigns(crystalDimensionObjects);
  removeUnwantedSigns(homeObjects);
  removeUnwantedSigns(shopInteriorObjects);
  removeUnwantedSigns(mayorInteriorObjects);

  objects = currentScene === "home" ? homeObjects
    : currentScene === "shopInterior" ? shopInteriorObjects
    : currentScene === "mayorInterior" ? mayorInteriorObjects
    : currentScene === "crystalDimension" ? crystalDimensionObjects
    : villageObjects;

  colliders = objects.filter((obj) => obj.solid);
  interactables = objects.filter((obj) => obj.message);
}


// === Inventory image icons patch ===
if (typeof window !== "undefined" && !window.ETERNAL_RIFT_INVENTORY_ICONS_PATCH) {
  window.ETERNAL_RIFT_INVENTORY_ICONS_PATCH = true;

  function injectInventoryIconStyles() {
    if (document.getElementById("inventory-icon-styles")) return;
    const style = document.createElement("style");
    style.id = "inventory-icon-styles";
    style.textContent = `
      .inventory-slot { overflow: hidden; }
      .inventory-icon-wrap {
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        filter: drop-shadow(0 1px 0 rgba(0,0,0,0.35));
      }
      .inventory-art {
        width: 30px;
        height: 30px;
        display: block;
        image-rendering: pixelated;
      }
      .inventory-slot .item-icon {
        font-size: 0;
        line-height: 0;
      }
      .item-detail-icon-preview {
        display: inline-grid;
        place-items: center;
        width: 34px;
        height: 34px;
        margin-right: 8px;
        vertical-align: middle;
        border: 2px solid rgba(245, 206, 121, 0.45);
        border-radius: 6px;
        background: linear-gradient(180deg, rgba(90,58,52,.95), rgba(45,31,26,.92));
      }
    `;
    document.head.appendChild(style);
  }

  function inventoryIconKey(item) {
    if (!item) return "unknown";
    if (item.weaponKey) return item.weaponKey;
    if (item.powerKey) return item.powerKey;
    if (item.id === "moedas") return "coins";
    if (item.id === "pocoes") return "potion";
    if (item.id === "cristais") return "crystal";
    if (item.id === "chaves") return "key";
    if (item.id === "cartas") return "letter";
    if (item.id === "espadas-extra") return "sword";
    if (item.id === "flechas") return "arrows";
    if (item.id === "fragmentos") return "fragment";
    if (item.id === "mana-orbes") return "manaOrb";
    if (item.id === "chaves-raras") return "rareKey";
    if (item.id === "powerups-coletados") return "buff";
    if (item.id === "amuleto-vila") return "amulet";
    if (String(item.id).startsWith("buff-")) return "buff";
    if (String(item.id).startsWith("boss-")) return "boss";
    return "unknown";
  }

  function svgShell(inner) {
    return `<span class="inventory-icon-wrap"><svg class="inventory-art" viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${inner}</svg></span>`;
  }

  function getInventoryIconHtml(item) {
    const key = inventoryIconKey(item);
    const icons = {
      coins: svgShell(`
        <circle cx="13" cy="16" r="7" fill="#f5ce79" stroke="#8a5b2a" stroke-width="2"/>
        <circle cx="19" cy="13" r="7" fill="#fff264" stroke="#8a5b2a" stroke-width="2"/>
        <path d="M17 9h4M19 7v12" stroke="#8a5b2a" stroke-width="2"/>
      `),
      potion: svgShell(`
        <rect x="12" y="5" width="8" height="5" rx="1" fill="#9ee6ff" stroke="#273052" stroke-width="2"/>
        <path d="M12 10h8v3l3 4v8c0 2-2 3-4 3H13c-2 0-4-1-4-3v-8l3-4z" fill="#d24c63" stroke="#273052" stroke-width="2"/>
        <path d="M11 17h12" stroke="#fff3d6" stroke-width="2" opacity=".8"/>
        <circle cx="15" cy="20" r="2" fill="#fff3d6" opacity=".8"/>
      `),
      crystal: svgShell(`
        <path d="M16 3 23 8 24 17 16 29 8 17 9 8z" fill="#55e8ff" stroke="#1f7bd8" stroke-width="2"/>
        <path d="M16 7v18M11 11l5 5 5-5M11 20l5-4 5 4" stroke="#e9ffff" stroke-width="2" opacity=".85"/>
      `),
      key: svgShell(`
        <circle cx="10" cy="15" r="5" fill="none" stroke="#fff264" stroke-width="3"/>
        <path d="M15 15h9v3h-2v3h-3v-3h-4z" fill="#f5ce79" stroke="#8a5b2a" stroke-width="1.5"/>
      `),
      letter: svgShell(`
        <rect x="6" y="8" width="20" height="16" rx="2" fill="#fff3d6" stroke="#7d4d38" stroke-width="2"/>
        <path d="M7 10 16 17 25 10" fill="none" stroke="#c94a5c" stroke-width="2"/>
        <path d="M9 21h14" stroke="#d8c2a0" stroke-width="2"/>
      `),
      sword: svgShell(`
        <path d="M18 4 24 10 14 20 12 18z" fill="#e9ffff" stroke="#394066" stroke-width="2"/>
        <path d="M10 20 7 23l2 2-2 2 1 1 2-2 2 2 1-1-2-2 2-2z" fill="#f5ce79" stroke="#5c413c" stroke-width="1.5"/>
      `),
      arrows: svgShell(`
        <path d="M9 22 21 10" stroke="#d99b67" stroke-width="3"/>
        <path d="M19 8h7v7" fill="none" stroke="#e9ffff" stroke-width="2"/>
        <path d="M8 23 5 18" stroke="#fff3d6" stroke-width="2"/>
        <path d="M13 26 25 14" stroke="#d99b67" stroke-width="3" opacity=".75"/>
      `),
      fragment: svgShell(`
        <path d="M8 22 12 8 18 4 24 12 19 25z" fill="#9b5fc7" stroke="#4f2d73" stroke-width="2"/>
        <path d="M12 11 18 9M13 18l5-3" stroke="#e7d3ff" stroke-width="2" opacity=".8"/>
      `),
      manaOrb: svgShell(`
        <circle cx="16" cy="16" r="9" fill="#9b5fc7" stroke="#4f2d73" stroke-width="2"/>
        <circle cx="13" cy="13" r="4" fill="#e7d3ff" opacity=".7"/>
        <path d="M11 21c2 2 8 2 10 0" stroke="#55e8ff" stroke-width="2"/>
      `),
      rareKey: svgShell(`
        <circle cx="10" cy="15" r="5" fill="none" stroke="#55e8ff" stroke-width="3"/>
        <path d="M15 15h9v3h-2v3h-3v-3h-4z" fill="#fff264" stroke="#3f8fe5" stroke-width="1.5"/>
        <circle cx="10" cy="15" r="1.5" fill="#fff264"/>
      `),
      buff: svgShell(`
        <path d="M16 4 19 11 27 11 21 16 23 24 16 19 9 24 11 16 5 11 13 11z" fill="#fff264" stroke="#8a5b2a" stroke-width="2"/>
        <circle cx="16" cy="16" r="3" fill="#55e8ff"/>
      `),
      bow: svgShell(`
        <path d="M11 5c7 5 7 17 0 22" fill="none" stroke="#d99b67" stroke-width="3"/>
        <path d="M11 5v22" stroke="#fff3d6" stroke-width="1.5"/>
        <path d="M13 16h12" stroke="#c8d0d8" stroke-width="2"/>
        <path d="M22 13 27 16 22 19" fill="#e9ffff" stroke="#394066" stroke-width="1.5"/>
      `),
      staff: svgShell(`
        <path d="M13 6v18" stroke="#8f5a3f" stroke-width="3"/>
        <circle cx="13" cy="6" r="4" fill="#55c4ff" stroke="#273052" stroke-width="2"/>
        <path d="M18 10c4 1 6 4 7 8" stroke="#9ee6ff" stroke-width="2" opacity=".8"/>
      `),
      spear: svgShell(`
        <path d="M8 24 24 8" stroke="#d99b67" stroke-width="3"/>
        <path d="M24 8l2-5 3 3-5 2z" fill="#e9ffff" stroke="#394066" stroke-width="1.5"/>
        <path d="M8 24l-3 3" stroke="#5c413c" stroke-width="2"/>
      `),
      fireball: svgShell(`
        <circle cx="16" cy="16" r="7" fill="#ff8d4a" stroke="#9b2f1b" stroke-width="2"/>
        <path d="M17 6c3 2 5 6 4 10-2-1-5-1-7 0 0-4 1-7 3-10z" fill="#fff264" opacity=".9"/>
        <path d="M10 20c2 4 10 4 12 0" stroke="#9b2f1b" stroke-width="2"/>
      `),
      blueRay: svgShell(`
        <path d="M7 18 14 11 18 15 25 8" fill="none" stroke="#55e8ff" stroke-width="3"/>
        <path d="M18 15h6l-3 7" fill="none" stroke="#e9ffff" stroke-width="2"/>
      `),
      shockwave: svgShell(`
        <circle cx="16" cy="16" r="4" fill="#fff264" stroke="#8a5b2a" stroke-width="2"/>
        <circle cx="16" cy="16" r="8" fill="none" stroke="#ff7ab5" stroke-width="2" opacity=".8"/>
        <circle cx="16" cy="16" r="12" fill="none" stroke="#55c4ff" stroke-width="2" opacity=".7"/>
      `),
      heal: svgShell(`
        <circle cx="16" cy="16" r="10" fill="#5fcf7a" stroke="#26794d" stroke-width="2"/>
        <path d="M16 10v12M10 16h12" stroke="#fff3d6" stroke-width="3"/>
      `),
      amulet: svgShell(`
        <path d="M16 5 24 11 21 24 16 27 11 24 8 11z" fill="#fff264" stroke="#8a5b2a" stroke-width="2"/>
        <circle cx="16" cy="16" r="4" fill="#55c4ff" stroke="#394066" stroke-width="2"/>
      `),
      boss: svgShell(`
        <path d="M8 22h16l-2 4H10z" fill="#8f5a3f" stroke="#5c413c" stroke-width="1.5"/>
        <path d="M10 8h12v6c0 4-3 7-6 8-3-1-6-4-6-8z" fill="#d24c63" stroke="#5d2031" stroke-width="2"/>
        <circle cx="12" cy="11" r="2" fill="#fff264"/><circle cx="20" cy="11" r="2" fill="#fff264"/>
      `),
      unknown: svgShell(`
        <rect x="7" y="7" width="18" height="18" rx="4" fill="#c8d0d8" stroke="#394066" stroke-width="2"/>
        <path d="M16 11c2 0 4 1 4 3 0 2-2 3-3 4-1 1-1 1-1 2" fill="none" stroke="#394066" stroke-width="2"/>
        <circle cx="16" cy="23" r="1.8" fill="#394066"/>
      `)
    };
    return icons[key] || icons.unknown;
  }

  function getInventoryNameHtml(item) {
    return `<span class="item-detail-icon-preview">${getInventoryIconHtml(item)}</span><span>${item.name}</span>`;
  }

  injectInventoryIconStyles();

  renderInventoryGrid = function renderInventoryGridWithImages(filteredItems, totalItems) {
    if (!inventoryGrid) return;

    const slotCount = Math.max(30, filteredItems.length);
    const slots = [];
    for (let index = 0; index < slotCount; index += 1) {
      const item = filteredItems[index];
      if (!item) {
        slots.push(`<button class="inventory-slot is-empty" type="button" disabled aria-label="Slot vazio"></button>`);
        continue;
      }

      const equipped = (item.weaponKey && item.weaponKey === getCurrentWeaponKey()) ||
        (item.powerKey && item.powerKey === equippedPower);
      slots.push(`
        <button class="inventory-slot rarity-${item.rarity}${selectedInventoryItemId === item.id ? " is-selected" : ""}${equipped ? " is-equipped" : ""}" type="button" data-item-id="${item.id}" aria-label="${item.name}">
          <span class="item-icon">${getInventoryIconHtml(item)}</span>
          <span class="item-qty">${item.quantity > 1 ? item.quantity : ""}</span>
        </button>
      `);
    }

    inventoryGrid.innerHTML = slots.join("");
    if (inventoryEmpty) {
      inventoryEmpty.textContent = totalItems ? "Nada nesta aba." : "Sua bolsa esta vazia.";
      inventoryEmpty.classList.toggle("hidden", filteredItems.length > 0);
    }
  };

  renderItemDetails = function renderItemDetailsWithPreview(item) {
    if (!itemDetailName || !itemDetailMeta || !itemDetailDescription || !itemDetailEffect || !itemDetailActions) return;

    if (!item) {
      itemDetailName.textContent = "Bolsa vazia";
      itemDetailMeta.textContent = "Nenhum item selecionado.";
      itemDetailDescription.textContent = "Colete moedas, pocoes, cristais, chaves e armas pelo mapa.";
      itemDetailEffect.textContent = "";
      itemDetailActions.innerHTML = "";
      return;
    }

    itemDetailName.innerHTML = getInventoryNameHtml(item);
    itemDetailMeta.textContent = `${item.typeLabel} | ${formatRarity(item.rarity)} | Qtd. ${item.quantity}`;
    itemDetailDescription.textContent = item.description || "Item desconhecido guardado com cuidado.";
    itemDetailEffect.textContent = item.effect || "";
    itemDetailActions.innerHTML = getInventoryActionHtml(item);
  };
}

// === Weapon visuals patch: armas visiveis na mao, ataques e projeteis ===
var weaponVisualState = typeof weaponVisualState === "undefined" ? {
  timer: 0,
  maxTimer: 0,
  weaponKey: "sword",
  angle: 0,
  kind: "idle"
} : weaponVisualState;

function safeCurrentWeaponKeyForVisual() {
  try {
    const key = typeof getCurrentWeaponKey === "function" ? getCurrentWeaponKey() : "sword";
    return weapons?.[key] ? key : "sword";
  } catch (error) {
    return "sword";
  }
}

function safeCurrentWeaponForVisual() {
  const key = safeCurrentWeaponKeyForVisual();
  return weapons?.[key] || weapons.sword || { name: "Espada curta", kind: "melee", range: 48 };
}

function safeAimForWeaponVisual() {
  try {
    const aim = typeof getAimVector === "function" ? getAimVector() : null;
    if (aim && Number.isFinite(aim.x) && Number.isFinite(aim.y)) {
      const length = Math.hypot(aim.x, aim.y) || 1;
      return { x: aim.x / length, y: aim.y / length, angle: Number.isFinite(aim.angle) ? aim.angle : Math.atan2(aim.y, aim.x) };
    }
  } catch (error) {
    // Usa direcao do jogador abaixo.
  }

  const fallback = typeof directionVector === "function" ? directionVector(player?.direction || "down") : { x: 0, y: 1 };
  return { x: fallback.x, y: fallback.y, angle: Math.atan2(fallback.y, fallback.x) };
}

function drawPixelBlade(width, height, color, stroke = "#273052") {
  ctx.fillStyle = stroke;
  ctx.fillRect(0, -height / 2 - 1, width + 2, height + 2);
  ctx.fillStyle = color;
  ctx.fillRect(1, -height / 2, width, height);
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.fillRect(3, -height / 2 + 1, Math.max(4, width - 8), 2);
}

function drawWeaponHandle(x, y, length = 10) {
  ctx.fillStyle = "#273052";
  ctx.fillRect(x - 1, y - 3, length + 2, 6);
  ctx.fillStyle = "#7d4d38";
  ctx.fillRect(x, y - 2, length, 4);
  ctx.fillStyle = "#f5ce79";
  ctx.fillRect(x + length - 2, y - 3, 3, 6);
}

function getWeaponVisualProgress() {
  if (currentMeleeAttack && currentMeleeAttack.maxTimer > 0) {
    return 1 - clamp(currentMeleeAttack.timer / currentMeleeAttack.maxTimer, 0, 1);
  }
  if (weaponVisualState.maxTimer > 0 && weaponVisualState.timer > 0) {
    return 1 - clamp(weaponVisualState.timer / weaponVisualState.maxTimer, 0, 1);
  }
  return 0;
}

function getWeaponVisualAngle(baseAim, weaponKey) {
  if (currentMeleeAttack && Number.isFinite(currentMeleeAttack.angle)) {
    const progress = getWeaponVisualProgress();
    if (weaponKey === "sword") return currentMeleeAttack.angle - 0.75 + progress * 1.5;
    return currentMeleeAttack.angle;
  }
  if (weaponVisualState.timer > 0 && Number.isFinite(weaponVisualState.angle)) {
    return weaponVisualState.angle;
  }
  return baseAim.angle;
}

function drawSwordInHand(progress) {
  const thrust = progress > 0 ? Math.sin(Math.min(1, progress) * Math.PI) * 7 : 0;
  ctx.translate(8 + thrust, 0);
  drawWeaponHandle(-7, 0, 9);
  ctx.fillStyle = "#273052";
  ctx.fillRect(0, -6, 5, 12);
  drawPixelBlade(24, 6, "#e9ffff");
  ctx.fillStyle = "#c8d0d8";
  ctx.fillRect(8, -1, 11, 2);
}

function drawSpearInHand(progress) {
  const thrust = progress > 0 ? Math.sin(Math.min(1, progress) * Math.PI) * 15 : 0;
  ctx.translate(6 + thrust, 0);
  ctx.fillStyle = "#273052";
  ctx.fillRect(-10, -3, 42, 6);
  ctx.fillStyle = "#9b613f";
  ctx.fillRect(-9, -2, 39, 4);
  ctx.fillStyle = "#273052";
  ctx.beginPath();
  ctx.moveTo(29, -8);
  ctx.lineTo(43, 0);
  ctx.lineTo(29, 8);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#e9ffff";
  ctx.beginPath();
  ctx.moveTo(31, -5);
  ctx.lineTo(41, 0);
  ctx.lineTo(31, 5);
  ctx.closePath();
  ctx.fill();
  if (progress > 0) {
    ctx.fillStyle = "rgba(233,255,255,0.75)";
    ctx.fillRect(39, -2, 12, 4);
  }
}

function drawBowInHand(progress) {
  const tension = progress > 0 ? Math.sin(Math.min(1, progress) * Math.PI) * 5 : 0;
  ctx.translate(6, 0);
  ctx.strokeStyle = "#273052";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, 15, -1.15, 1.15);
  ctx.stroke();
  ctx.strokeStyle = "#9b613f";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 15, -1.1, 1.1);
  ctx.stroke();
  ctx.strokeStyle = "#fff3d6";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(6, -13);
  ctx.lineTo(-6 - tension, 0);
  ctx.lineTo(6, 13);
  ctx.stroke();
  if (progress > 0) {
    ctx.fillStyle = "#273052";
    ctx.fillRect(-6 - tension, -2, 27 + tension, 4);
    ctx.fillStyle = "#d99b67";
    ctx.fillRect(-5 - tension, -1, 22 + tension, 2);
    ctx.fillStyle = "#e9ffff";
    ctx.beginPath();
    ctx.moveTo(18 + tension, -5);
    ctx.lineTo(27 + tension, 0);
    ctx.lineTo(18 + tension, 5);
    ctx.closePath();
    ctx.fill();
  }
}

function drawStaffInHand(progress) {
  const glow = progress > 0 ? 0.35 + Math.sin(Math.min(1, progress) * Math.PI) * 0.45 : 0.22;
  ctx.translate(7, 0);
  ctx.fillStyle = "#273052";
  ctx.fillRect(-9, -3, 31, 6);
  ctx.fillStyle = "#7d4d38";
  ctx.fillRect(-8, -2, 28, 4);
  ctx.fillStyle = `rgba(85,232,255,${glow})`;
  ctx.fillRect(17, -11, 18, 22);
  ctx.fillStyle = "#273052";
  ctx.fillRect(20, -7, 11, 14);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(22, -5, 7, 10);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(24, -3, 3, 5);
  if (progress > 0) {
    ctx.fillStyle = "rgba(155,95,199,0.55)";
    ctx.fillRect(32, -4, 14, 8);
    ctx.fillStyle = "rgba(85,232,255,0.75)";
    ctx.fillRect(37, -2, 12, 4);
  }
}

function drawEquippedWeapon() {
  try {
    if (!player || gameOver) return;
    const weaponKey = safeCurrentWeaponKeyForVisual();
    const aim = safeAimForWeaponVisual();
    const progress = getWeaponVisualProgress();
    const angle = getWeaponVisualAngle(aim, weaponKey);
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;
    const handX = centerX + Math.cos(angle) * 8;
    const handY = centerY + Math.sin(angle) * 7 + 3;

    ctx.save();
    ctx.translate(handX, handY);
    ctx.rotate(angle);
    if (Math.cos(angle) < -0.05) ctx.scale(1, -1);

    if (weaponKey === "spear") drawSpearInHand(progress);
    else if (weaponKey === "bow") drawBowInHand(progress || (weaponVisualState.weaponKey === "bow" ? getWeaponVisualProgress() : 0));
    else if (weaponKey === "staff") drawStaffInHand(progress || (weaponVisualState.weaponKey === "staff" ? getWeaponVisualProgress() : 0));
    else drawSwordInHand(progress);

    ctx.restore();
  } catch (error) {
    drawWeaponPatchError("Erro arma: " + (error?.message || error));
  }
}

function drawSwordSwingEffect(attack, progress) {
  const range = attack.range || 48;
  const arc = attack.arc || Math.PI * 0.72;
  const sweep = -arc / 2 + arc * progress;
  ctx.strokeStyle = "rgba(255, 252, 210, 0.86)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, range, sweep - 0.34, sweep + 0.34);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 242, 100, 0.42)";
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.arc(0, 0, range - 4, sweep - 0.20, sweep + 0.20);
  ctx.stroke();
}

function drawSpearThrustEffect(attack, progress) {
  const range = attack.range || 72;
  const reach = 16 + range * (0.68 + Math.sin(progress * Math.PI) * 0.22);
  ctx.fillStyle = "rgba(233, 255, 255, 0.18)";
  ctx.fillRect(11, -7, reach, 14);
  ctx.strokeStyle = "rgba(85, 232, 255, 0.78)";
  ctx.lineWidth = 3;
  ctx.strokeRect(12, -5, reach, 10);
  ctx.fillStyle = "rgba(255, 242, 100, 0.65)";
  ctx.beginPath();
  ctx.moveTo(12 + reach, -8);
  ctx.lineTo(24 + reach, 0);
  ctx.lineTo(12 + reach, 8);
  ctx.closePath();
  ctx.fill();
}

function drawAttack() {
  try {
    if (attackTimer <= 0 || !currentMeleeAttack) return;
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;
    const progress = 1 - clamp(currentMeleeAttack.timer / Math.max(0.001, currentMeleeAttack.maxTimer || attackTimer), 0, 1);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentMeleeAttack.angle || 0);
    if (currentMeleeAttack.weaponKey === "spear") drawSpearThrustEffect(currentMeleeAttack, progress);
    else drawSwordSwingEffect(currentMeleeAttack, progress);
    ctx.restore();
  } catch (error) {
    drawWeaponPatchError("Erro ataque: " + (error?.message || error));
  }
}

function drawProjectileTrail(obj, color, length = 18) {
  const angle = Math.atan2(obj.vy || 0, obj.vx || 1);
  const cx = obj.x + obj.width / 2;
  const cy = obj.y + obj.height / 2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.fillRect(-length, -1, length, 2);
  ctx.restore();
}

function drawArrowProjectile(obj) {
  drawProjectileTrail(obj, "rgba(255, 243, 214, 0.45)", 20);
  const angle = Math.atan2(obj.vy || 0, obj.vx || 1);
  ctx.save();
  ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
  ctx.rotate(angle);
  ctx.fillStyle = "rgba(39, 48, 82, 0.35)";
  ctx.fillRect(-11, -4, 24, 8);
  ctx.fillStyle = "#273052";
  ctx.fillRect(-9, -2, 18, 4);
  ctx.fillStyle = "#d99b67";
  ctx.fillRect(-8, -1, 16, 2);
  ctx.fillStyle = "#e9ffff";
  ctx.beginPath();
  ctx.moveTo(8, -5);
  ctx.lineTo(17, 0);
  ctx.lineTo(8, 5);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#fff3d6";
  ctx.fillRect(-12, -4, 5, 2);
  ctx.fillRect(-12, 2, 5, 2);
  ctx.restore();
}

function drawMagicProjectile(obj) {
  const isFire = obj.type === "fireball" || obj.type === "fire";
  const isRay = obj.type === "blueRay";
  const glow = isFire ? "rgba(255, 79, 98, 0.42)" : isRay ? "rgba(85, 232, 255, 0.46)" : "rgba(155, 95, 199, 0.42)";
  const main = isFire ? "#ff4f62" : isRay ? "#55e8ff" : "#9b5fc7";
  const core = isFire ? "#fff264" : "#e9ffff";
  drawProjectileTrail(obj, glow, isRay ? 26 : 18);
  const cx = obj.x + obj.width / 2;
  const cy = obj.y + obj.height / 2;
  ctx.fillStyle = glow;
  ctx.fillRect(cx - 11, cy - 11, 22, 22);
  ctx.fillStyle = "#273052";
  ctx.fillRect(cx - 6, cy - 6, 12, 12);
  ctx.fillStyle = main;
  ctx.fillRect(cx - 5, cy - 5, 10, 10);
  ctx.fillStyle = core;
  ctx.fillRect(cx - 2, cy - 2, 4, 4);
  if (isRay) {
    ctx.strokeStyle = "rgba(233,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy);
    ctx.lineTo(cx + 10, cy);
    ctx.stroke();
  }
}

function drawProjectiles() {
  try {
    const playerShots = Array.isArray(projectiles) ? projectiles : [];
    for (const obj of playerShots) {
      if (!obj) continue;
      if (obj.type === "arrow") drawArrowProjectile(obj);
      else drawMagicProjectile(obj);
    }

    const enemyShots = Array.isArray(enemyProjectiles) ? enemyProjectiles : [];
    for (const obj of enemyShots) {
      if (!obj) continue;
      if (obj.type === "bossWave") {
        ctx.strokeStyle = "rgba(255, 79, 98, 0.85)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
        ctx.stroke();
        continue;
      }
      if (obj.type === "arrow") drawArrowProjectile(obj);
      else drawMagicProjectile(obj);
    }
  } catch (error) {
    drawWeaponPatchError("Erro projeteis: " + (error?.message || error));
  }
}

function drawWeaponDebugVisual() {
  if (!debugEnabled) return;
  const aim = safeAimForWeaponVisual();
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const key = safeCurrentWeaponKeyForVisual();
  const weapon = safeCurrentWeaponForVisual();

  ctx.save();
  ctx.strokeStyle = "rgba(255, 79, 98, 0.78)";
  ctx.fillStyle = "rgba(255, 79, 98, 0.10)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + aim.x * 58, centerY + aim.y * 58);
  ctx.stroke();

  if (currentMeleeAttack) {
    ctx.translate(centerX, centerY);
    ctx.rotate(currentMeleeAttack.angle || aim.angle);
    if (currentMeleeAttack.weaponKey === "spear") {
      ctx.fillRect(8, -6, currentMeleeAttack.range || weapon.range || 72, 12);
      ctx.strokeRect(8, -6, currentMeleeAttack.range || weapon.range || 72, 12);
    } else {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, currentMeleeAttack.range || weapon.range || 48, -(currentMeleeAttack.arc || Math.PI * 0.72) / 2, (currentMeleeAttack.arc || Math.PI * 0.72) / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(-Math.round(camera.x), -Math.round(camera.y));
  }

  ctx.font = "bold 12px Trebuchet MS, Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(26,31,61,0.88)";
  ctx.fillRect(centerX - 58, centerY - 45, 116, 18);
  ctx.fillStyle = "#fff264";
  ctx.fillText(`Arma: ${weapon.name || key}`, centerX, centerY - 32);
  ctx.textAlign = "start";
  ctx.restore();
}

function drawWeaponPatchError(message) {
  try {
    lastErrorMessage = message;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgba(26, 31, 61, 0.92)";
    ctx.fillRect(12, canvas.height - 46, Math.min(canvas.width - 24, 520), 34);
    ctx.fillStyle = "#ff7ab5";
    ctx.font = "bold 12px Trebuchet MS, Arial";
    ctx.fillText(message, 22, canvas.height - 24);
    ctx.restore();
  } catch (ignored) {
    // Evita tela preta em cascata.
  }
}

if (typeof window !== "undefined" && !window.ETERNAL_RIFT_WEAPON_VISUALS_PATCH) {
  window.ETERNAL_RIFT_WEAPON_VISUALS_PATCH = true;

  const spawnPlayerProjectileBeforeWeaponVisuals = spawnPlayerProjectile;
  spawnPlayerProjectile = function spawnPlayerProjectileVisible(config) {
    const cfg = { ...(config || {}) };
    const vx = Number(cfg.vx || 0);
    const vy = Number(cfg.vy || 0);
    cfg.angle = Number.isFinite(cfg.angle) ? cfg.angle : Math.atan2(vy, vx || 1);
    cfg.age = 0;
    cfg.minVisibleTime = cfg.minVisibleTime || 0.035;
    cfg.width = Math.max(4, Number(cfg.width || 10));
    cfg.height = Math.max(4, Number(cfg.height || 10));
    if (!Number.isFinite(cfg.x)) cfg.x = player.x + player.width / 2 - cfg.width / 2;
    if (!Number.isFinite(cfg.y)) cfg.y = player.y + player.height / 2 - cfg.height / 2;
    spawnPlayerProjectileBeforeWeaponVisuals(cfg);
  };

  const updateProjectilesBeforeWeaponVisuals = updateProjectiles;
  updateProjectiles = function updateProjectilesVisible(delta) {
    const list = Array.isArray(projectiles) ? projectiles : [];
    for (const obj of list) obj.age = Number(obj.age || 0) + delta;
    updateProjectilesBeforeWeaponVisuals(delta);
  };

  const fireWeaponProjectileBeforeWeaponVisuals = fireWeaponProjectile;
  fireWeaponProjectile = function fireWeaponProjectileVisible(weapon, aim) {
    const safeWeapon = weapon || safeCurrentWeaponForVisual();
    const safeAim = aim && Number.isFinite(aim.angle) ? aim : safeAimForWeaponVisual();
    weaponVisualState = {
      timer: safeWeapon.projectile === "arrow" ? 0.22 : 0.32,
      maxTimer: safeWeapon.projectile === "arrow" ? 0.22 : 0.32,
      weaponKey: safeWeapon.projectile === "arrow" ? "bow" : "staff",
      angle: safeAim.angle,
      kind: safeWeapon.projectile || "projectile"
    };
    fireWeaponProjectileBeforeWeaponVisuals(safeWeapon, safeAim);
  };

  const updateAttackBeforeWeaponVisuals = updateAttack;
  updateAttack = function updateAttackWeaponVisuals(delta) {
    weaponVisualState.timer = Math.max(0, Number(weaponVisualState.timer || 0) - delta);
    updateAttackBeforeWeaponVisuals(delta);
  };

  const drawBeforeWeaponVisuals = draw;
  draw = function drawWithEquippedWeapon() {
    try {
      drawBeforeWeaponVisuals();
      ctx.save();
      ctx.translate(-Math.round(camera.x), -Math.round(camera.y));
      drawEquippedWeapon();
      drawWeaponDebugVisual();
      ctx.restore();
    } catch (error) {
      drawWeaponPatchError("Erro visual: " + (error?.message || error));
    }
  };
}


// === Elemental boss swords patch ===
// Quatro espadas inspiradas nas referencias enviadas, desenhadas direto no Canvas.
// Elas so aparecem como recompensa ao abrir o bau do boss correspondente.
const ELEMENTAL_BOSS_SWORDS = {
  miniGuardiao: {
    bossKind: "miniGuardiao",
    weaponKey: "stormSword",
    name: "Espada Celeste da Tempestade",
    shortName: "Tempestade",
    element: "storm",
    damageType: "stormSword",
    bossName: "Mini Guardiao",
    chestTile: [36, 34],
    color: "#55e8ff",
    core: "#fff264",
    dark: "#1f7bd8",
    itemName: "Lamina Celeste da Tempestade"
  },
  reiSlime: {
    bossKind: "reiSlime",
    weaponKey: "fireSword",
    name: "Espada Vulcanica",
    shortName: "Vulcanica",
    element: "fire",
    damageType: "fireSword",
    bossName: "Rei Slime",
    chestTile: [61, 29],
    color: "#ff4f25",
    core: "#fff264",
    dark: "#9b221b",
    itemName: "Lamina Vulcanica"
  },
  serpenteLago: {
    bossKind: "serpenteLago",
    weaponKey: "iceSword",
    name: "Espada Glacial Cristalina",
    shortName: "Glacial",
    element: "ice",
    damageType: "iceSword",
    bossName: "Serpente do Lago",
    chestTile: [70, 23],
    color: "#73d5ff",
    core: "#e9ffff",
    dark: "#1f7bd8",
    itemName: "Lamina Glacial Cristalina"
  },
  bruxoSombrio: {
    bossKind: "bruxoSombrio",
    weaponKey: "shadowSword",
    name: "Espada Sombria Abissal",
    shortName: "Sombria",
    element: "shadow",
    damageType: "shadowSword",
    bossName: "Bruxo Sombrio",
    chestTile: [74, 13],
    color: "#9b5fc7",
    core: "#d9a8ff",
    dark: "#20152f",
    itemName: "Lamina Sombria Abissal"
  }
};

const ELEMENTAL_SWORD_BY_WEAPON = Object.values(ELEMENTAL_BOSS_SWORDS).reduce((acc, reward) => {
  acc[reward.weaponKey] = reward;
  return acc;
}, {});

const ELEMENTAL_SWORD_BY_DAMAGE = Object.values(ELEMENTAL_BOSS_SWORDS).reduce((acc, reward) => {
  acc[reward.damageType] = reward;
  return acc;
}, {});

var elementalSwordEffects = Array.isArray(globalThis.elementalSwordEffects) ? globalThis.elementalSwordEffects : [];
var shadowSwordHealCooldown = Number(globalThis.shadowSwordHealCooldown || 0);

function registerElementalBossSwords() {
  for (const reward of Object.values(ELEMENTAL_BOSS_SWORDS)) {
    if (weapons[reward.weaponKey]) continue;
    weapons[reward.weaponKey] = {
      name: reward.name,
      damage: reward.element === "shadow" ? 7 : 6,
      range: reward.element === "ice" ? 66 : 62,
      cooldown: reward.element === "storm" ? 0.34 : 0.38,
      arc: reward.element === "ice" ? Math.PI * 0.86 : Math.PI * 0.78,
      kind: "melee",
      damageType: reward.damageType,
      elemental: reward.element,
      bossWeapon: true
    };
  }
}

function elementalChestKey(bossKind) {
  return `elementalSword:${bossKind}`;
}

function elementalWeaponAlreadyUnlocked(weaponKey) {
  return Array.isArray(player.unlockedWeapons) && player.unlockedWeapons.includes(weaponKey);
}

function unlockElementalWeapon(weaponKey) {
  if (!weapons[weaponKey]) registerElementalBossSwords();
  if (!Array.isArray(player.unlockedWeapons)) player.unlockedWeapons = ["sword", "bow", "staff", "spear"];
  if (!player.unlockedWeapons.includes(weaponKey)) player.unlockedWeapons.push(weaponKey);
  currentWeaponIndex = player.unlockedWeapons.indexOf(weaponKey);
}

function syncElementalWeaponsFromSave() {
  if (!questBook.openedChests || typeof questBook.openedChests !== "object") questBook.openedChests = {};
  for (const reward of Object.values(ELEMENTAL_BOSS_SWORDS)) {
    if (questBook.openedChests[elementalChestKey(reward.bossKind)]) {
      unlockElementalWeapon(reward.weaponKey);
    }
  }
}

function elementalBossChestFromReward(reward, worldX = null, worldY = null) {
  const x = Number.isFinite(worldX) ? worldX : reward.chestTile[0] * TILE;
  const y = Number.isFinite(worldY) ? worldY : reward.chestTile[1] * TILE + 8;
  return {
    type: "elementalBossChest",
    bossKind: reward.bossKind,
    weaponKey: reward.weaponKey,
    x,
    y,
    width: TILE * 2,
    height: TILE,
    solid: true,
    message: `Bau elemental de ${reward.bossName}: abra para obter ${reward.name}.`,
    opened: false
  };
}

function refreshCurrentObjectListsForElementalChest() {
  if (currentScene === "home") objects = homeObjects;
  else if (currentScene === "shopInterior") objects = shopInteriorObjects;
  else if (currentScene === "mayorInterior") objects = mayorInteriorObjects;
  else if (currentScene === "crystalDimension") objects = crystalDimensionObjects;
  else objects = villageObjects;
  colliders = objects.filter((obj) => obj.solid);
  interactables = objects.filter((obj) => obj.message);
}

function removeElementalChestObject(bossKind) {
  for (let i = villageObjects.length - 1; i >= 0; i--) {
    const obj = villageObjects[i];
    if (obj?.type === "elementalBossChest" && obj.bossKind === bossKind) {
      villageObjects.splice(i, 1);
    }
  }
  refreshCurrentObjectListsForElementalChest();
}

function ensureElementalBossChests() {
  if (!questBook.defeatedBosses || typeof questBook.defeatedBosses !== "object") questBook.defeatedBosses = {};
  if (!questBook.openedChests || typeof questBook.openedChests !== "object") questBook.openedChests = {};

  for (const reward of Object.values(ELEMENTAL_BOSS_SWORDS)) {
    const opened = Boolean(questBook.openedChests[elementalChestKey(reward.bossKind)]);
    const defeated = Boolean(questBook.defeatedBosses[reward.bossKind]);
    const exists = villageObjects.some((obj) => obj?.type === "elementalBossChest" && obj.bossKind === reward.bossKind);
    if (opened) {
      if (exists) removeElementalChestObject(reward.bossKind);
      continue;
    }
    if (defeated && !exists) {
      villageObjects.push(elementalBossChestFromReward(reward));
    }
  }
  refreshCurrentObjectListsForElementalChest();
}

function spawnElementalBossChestForBoss(bossObj) {
  const reward = ELEMENTAL_BOSS_SWORDS[bossObj?.kind];
  if (!reward) return;
  if (questBook.openedChests?.[elementalChestKey(reward.bossKind)]) return;
  const exists = villageObjects.some((obj) => obj?.type === "elementalBossChest" && obj.bossKind === reward.bossKind);
  if (exists) return;
  const chestX = Math.round((bossObj.x + bossObj.width / 2) / TILE) * TILE;
  const chestY = Math.round((bossObj.y + bossObj.height / 2) / TILE) * TILE + 8;
  villageObjects.push(elementalBossChestFromReward(reward, chestX, chestY));
  refreshCurrentObjectListsForElementalChest();
  spawnFloatingText("Bau elemental apareceu!", chestX, chestY - 18, reward.color);
  showHudToast(`Bau de ${reward.shortName} apareceu perto do boss.`);
}

function openElementalBossChest(chestObj) {
  const reward = ELEMENTAL_BOSS_SWORDS[chestObj?.bossKind];
  if (!reward) return "Bau elemental: energia desconhecida.";
  if (!questBook.defeatedBosses?.[reward.bossKind]) {
    return `Bau elemental: derrote ${reward.bossName} para quebrar o selo.`;
  }
  if (!questBook.openedChests || typeof questBook.openedChests !== "object") questBook.openedChests = {};
  const key = elementalChestKey(reward.bossKind);
  if (questBook.openedChests[key] || elementalWeaponAlreadyUnlocked(reward.weaponKey)) {
    removeElementalChestObject(reward.bossKind);
    return `Bau elemental: ${reward.name} ja foi coletada.`;
  }

  questBook.openedChests[key] = true;
  chestObj.opened = true;
  unlockElementalWeapon(reward.weaponKey);
  if (!Array.isArray(inventory.itensBoss)) inventory.itensBoss = [];
  if (!inventory.itensBoss.includes(reward.itemName)) inventory.itensBoss.push(reward.itemName);
  inventory.fragmentos = Number(inventory.fragmentos || 0) + 4;
  player.mana = player.maxMana;
  awardXp(450, `Espada ${reward.shortName}`);
  playSound("chest");
  spawnFloatingText(`Nova arma: ${reward.shortName}!`, chestObj.x, chestObj.y - 22, reward.color);
  showHudToast(`${reward.name} desbloqueada! Use Tab para trocar ou equipe no inventario.`);
  removeElementalChestObject(reward.bossKind);
  updateHud();
  renderInventory();
  return `Bau elemental aberto! Voce recebeu ${reward.name}. Poder: ${getElementalSwordPowerText(reward.weaponKey)}`;
}

function getElementalSwordPowerText(weaponKey) {
  if (weaponKey === "stormSword") return "raios pulam para inimigos proximos.";
  if (weaponKey === "fireSword") return "explosao de fogo e queimadura.";
  if (weaponKey === "iceSword") return "congela e deixa inimigos lentos.";
  if (weaponKey === "shadowSword") return "rouba vida e cria energia sombria.";
  return "energia elemental.";
}

function drawElementalBossChest(obj) {
  const reward = ELEMENTAL_BOSS_SWORDS[obj.bossKind] || ELEMENTAL_BOSS_SWORDS.miniGuardiao;
  const x = obj.x;
  const y = obj.y;
  const pulse = 0.5 + Math.sin(performance.now() / 220) * 0.5;
  drawSoftShadow(x + 2, y + obj.height - 1, obj.width - 2, 6, 0.24);
  ctx.fillStyle = `${reward.color}33`;
  ctx.fillRect(x - 5, y - 8, obj.width + 10, obj.height + 14);
  pixelRect(x, y + 4, obj.width, obj.height - 4, reward.dark);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 4, y + 9, obj.width - 8, 4);
  ctx.fillStyle = reward.color;
  ctx.fillRect(x + 8, y + 7, obj.width - 16, 6);
  ctx.fillStyle = reward.core;
  ctx.fillRect(x + obj.width / 2 - 5, y + 13, 10, 10);
  ctx.fillStyle = "#fff3d6";
  ctx.fillRect(x + obj.width / 2 - 2, y + 15, 4, 6);
  ctx.fillStyle = `rgba(255,255,255,${0.18 + pulse * 0.22})`;
  ctx.fillRect(x + 11, y + 5, 13, 2);
  ctx.fillRect(x + obj.width - 24, y + 5, 8, 2);

  ctx.save();
  ctx.translate(x + obj.width / 2, y + 1);
  ctx.rotate(-Math.PI / 2);
  drawMiniElementalSwordSprite(reward.weaponKey, 0.62, true);
  ctx.restore();
}

function drawMiniElementalSwordSprite(weaponKey, scale = 1, chestMode = false) {
  const reward = ELEMENTAL_SWORD_BY_WEAPON[weaponKey] || ELEMENTAL_BOSS_SWORDS.miniGuardiao;
  ctx.save();
  ctx.scale(scale, scale);
  ctx.fillStyle = "rgba(255,255,255,0.10)";
  ctx.fillRect(7, -8, 44, 16);
  ctx.fillStyle = "#20152f";
  ctx.fillRect(-6, -4, 16, 8);
  ctx.fillStyle = "#7d4d38";
  ctx.fillRect(-5, -2, 15, 4);
  ctx.fillStyle = "#f5ce79";
  ctx.fillRect(8, -8, 5, 16);
  ctx.fillRect(3, -7, 5, 4);
  ctx.fillRect(3, 3, 5, 4);
  ctx.fillStyle = reward.dark;
  ctx.beginPath();
  ctx.moveTo(12, -9);
  ctx.lineTo(48, -6);
  ctx.lineTo(60, 0);
  ctx.lineTo(48, 6);
  ctx.lineTo(12, 9);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = reward.color;
  ctx.beginPath();
  ctx.moveTo(14, -6);
  ctx.lineTo(47, -4);
  ctx.lineTo(56, 0);
  ctx.lineTo(47, 4);
  ctx.lineTo(14, 6);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = reward.core;
  ctx.fillRect(18, -2, 28, 4);

  if (reward.element === "fire") {
    ctx.fillStyle = "rgba(255, 242, 100, 0.85)";
    ctx.fillRect(25, -7, 4, 14);
    ctx.fillRect(35, -8, 4, 16);
    ctx.fillStyle = "#ff8d4a";
    ctx.fillRect(31, -10, 4, 5);
    ctx.fillRect(42, 5, 4, 5);
  } else if (reward.element === "ice") {
    ctx.fillStyle = "rgba(233, 255, 255, 0.90)";
    ctx.fillRect(17, -8, 4, 16);
    ctx.fillRect(31, -8, 4, 16);
    ctx.fillRect(45, -4, 6, 8);
  } else if (reward.element === "shadow") {
    ctx.fillStyle = "rgba(32, 21, 47, 0.82)";
    ctx.fillRect(22, -4, 21, 8);
    ctx.fillStyle = "#d9a8ff";
    ctx.fillRect(26, -1, 15, 2);
  } else {
    ctx.fillStyle = "#fff264";
    ctx.fillRect(23, -5, 3, 10);
    ctx.fillRect(34, -5, 3, 10);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(28, -7, 3, 14);
  }

  if (!chestMode) {
    const spark = Math.sin(performance.now() / 120) > 0 ? 1 : 0;
    ctx.fillStyle = reward.element === "shadow" ? "rgba(155,95,199,.7)" : `${reward.core}cc`;
    ctx.fillRect(54, -10 + spark, 3, 3);
    ctx.fillRect(39, 9 - spark, 2, 2);
  }
  ctx.restore();
}

function drawElementalSwordInHand(weaponKey, progress = 0) {
  const reward = ELEMENTAL_SWORD_BY_WEAPON[weaponKey] || ELEMENTAL_BOSS_SWORDS.miniGuardiao;
  const thrust = progress > 0 ? Math.sin(Math.min(1, progress) * Math.PI) * 7 : 0;
  ctx.save();
  ctx.translate(7 + thrust, 0);
  drawMiniElementalSwordSprite(weaponKey, 0.58, false);
  ctx.restore();

  if (progress > 0) {
    ctx.fillStyle = `${reward.color}55`;
    ctx.fillRect(34 + thrust, -12, 18, 24);
  }
}

function drawElementalSwordSwingEffect(attack, progress) {
  const reward = ELEMENTAL_SWORD_BY_WEAPON[attack.weaponKey] || ELEMENTAL_BOSS_SWORDS.miniGuardiao;
  const range = attack.range || 62;
  const arc = attack.arc || Math.PI * 0.78;
  const sweep = -arc / 2 + arc * progress;
  ctx.strokeStyle = `${reward.color}dd`;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, range, sweep - 0.38, sweep + 0.38);
  ctx.stroke();
  ctx.strokeStyle = `${reward.core}99`;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(0, 0, range - 5, sweep - 0.18, sweep + 0.18);
  ctx.stroke();

  if (reward.element === "fire") {
    ctx.fillStyle = "rgba(255, 79, 37, 0.32)";
    ctx.beginPath();
    ctx.arc(range * 0.72, 0, 16 + Math.sin(progress * Math.PI) * 8, 0, Math.PI * 2);
    ctx.fill();
  } else if (reward.element === "ice") {
    ctx.fillStyle = "rgba(233, 255, 255, 0.38)";
    ctx.fillRect(range * 0.45, -10, 8, 20);
    ctx.fillRect(range * 0.70, -8, 6, 16);
  } else if (reward.element === "shadow") {
    ctx.strokeStyle = "rgba(155, 95, 199, 0.50)";
    ctx.lineWidth = 17;
    ctx.beginPath();
    ctx.arc(0, 0, range - 12, sweep - 0.12, sweep + 0.12);
    ctx.stroke();
  } else {
    ctx.strokeStyle = "rgba(233, 255, 255, 0.78)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(range * 0.42, -14);
    ctx.lineTo(range * 0.55, 0);
    ctx.lineTo(range * 0.44, 14);
    ctx.lineTo(range * 0.68, -2);
    ctx.stroke();
  }
}

function addElementalEffect(kind, x, y, color, core = "#fff3d6", radius = 40) {
  elementalSwordEffects.push({ kind, x, y, color, core, radius, timer: 0.42, maxTimer: 0.42 });
}

function directElementalDamage(enemyObj, amount, label, color) {
  if (!enemyObj || enemyObj.type !== "enemy" || !enemyObj.alive) return false;
  enemyObj.hp -= amount;
  spawnFloatingText(`${label} -${amount}`, enemyObj.x + enemyObj.width / 2, enemyObj.y - 12, color);
  if (enemyObj.hp <= 0) defeatEnemy(enemyObj);
  return true;
}

function applyElementalSwordEffect(target, reward) {
  if (!target || !target.alive || !reward) return;
  const tx = target.x + target.width / 2;
  const ty = target.y + target.height / 2;

  if (reward.element === "storm") {
    addElementalEffect("storm", tx, ty, reward.color, reward.core, 48);
    const nearby = villageObjects
      .filter((obj) => obj.type === "enemy" && obj.alive && obj !== target)
      .map((obj) => ({ obj, d: Math.hypot(obj.x + obj.width / 2 - tx, obj.y + obj.height / 2 - ty) }))
      .filter((entry) => entry.d < 115)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const entry of nearby) {
      directElementalDamage(entry.obj, 2, "RAIO", reward.color);
      addElementalEffect("chain", entry.obj.x + entry.obj.width / 2, entry.obj.y + entry.obj.height / 2, reward.color, reward.core, 34);
    }
    return;
  }

  if (reward.element === "fire") {
    addElementalEffect("fire", tx, ty, reward.color, reward.core, 58);
    target.burnTimer = Math.max(Number(target.burnTimer || 0), 2.2);
    target.burnTick = Math.min(Number(target.burnTick || 0), 0.1);
    for (const obj of villageObjects) {
      if (obj.type !== "enemy" || !obj.alive || obj === target) continue;
      const d = Math.hypot(obj.x + obj.width / 2 - tx, obj.y + obj.height / 2 - ty);
      if (d < 58) directElementalDamage(obj, 2, "FOGO", reward.color);
    }
    return;
  }

  if (reward.element === "ice") {
    addElementalEffect("ice", tx, ty, reward.color, reward.core, 46);
    target.freezeTimer = Math.max(Number(target.freezeTimer || 0), 2.0);
    target.attackCooldown = Math.max(target.attackCooldown || 0, 0.65);
    spawnFloatingText("LENTO", tx, ty - 22, reward.core);
    return;
  }

  if (reward.element === "shadow") {
    addElementalEffect("shadow", tx, ty, reward.color, reward.core, 44);
    target.shadowMarkTimer = Math.max(Number(target.shadowMarkTimer || 0), 2.4);
    if (shadowSwordHealCooldown <= 0 && player.health < player.maxHealth) {
      player.health = Math.min(player.maxHealth, player.health + 1);
      shadowSwordHealCooldown = 1.7;
      spawnFloatingText("+1 vida", player.x + player.width / 2, player.y - 16, reward.color);
      updateHud();
    }
  }
}

function drawElementalSwordEffects() {
  for (const fx of elementalSwordEffects) {
    const progress = 1 - clamp(fx.timer / Math.max(0.001, fx.maxTimer), 0, 1);
    const alpha = clamp(fx.timer / Math.max(0.001, fx.maxTimer), 0, 1);
    const radius = fx.radius * (0.35 + progress * 0.9);
    ctx.save();
    ctx.globalAlpha = alpha;
    if (fx.kind === "fire") {
      ctx.fillStyle = "rgba(255, 79, 37, 0.30)";
      ctx.beginPath();
      ctx.arc(fx.x, fx.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = fx.core;
      ctx.fillRect(fx.x - 5, fx.y - radius * 0.55, 10, radius * 0.7);
    } else if (fx.kind === "ice") {
      ctx.strokeStyle = fx.core;
      ctx.lineWidth = 3;
      ctx.strokeRect(fx.x - radius / 2, fx.y - radius / 2, radius, radius);
      ctx.fillStyle = `${fx.color}88`;
      ctx.fillRect(fx.x - 4, fx.y - radius / 2 - 6, 8, 12);
      ctx.fillRect(fx.x + radius / 2 - 6, fx.y - 4, 12, 8);
    } else if (fx.kind === "shadow") {
      ctx.strokeStyle = fx.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(fx.x, fx.y, radius * 0.75, progress * Math.PI * 2, progress * Math.PI * 2 + Math.PI * 1.35);
      ctx.stroke();
      ctx.fillStyle = "rgba(32, 21, 47, 0.45)";
      ctx.fillRect(fx.x - radius / 2, fx.y - radius / 2, radius, radius);
    } else {
      ctx.strokeStyle = fx.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(fx.x - radius * 0.55, fx.y - radius * 0.2);
      ctx.lineTo(fx.x - radius * 0.15, fx.y + radius * 0.05);
      ctx.lineTo(fx.x + radius * 0.08, fx.y - radius * 0.35);
      ctx.lineTo(fx.x + radius * 0.28, fx.y + radius * 0.32);
      ctx.lineTo(fx.x + radius * 0.58, fx.y - radius * 0.05);
      ctx.stroke();
      ctx.fillStyle = fx.core;
      ctx.fillRect(fx.x - 2, fx.y - 2, 4, 4);
    }
    ctx.restore();
  }
}

function drawElementalEnemyStatus(obj) {
  if (!obj || obj.type !== "enemy" || !obj.alive) return;
  const cx = obj.x + obj.width / 2;
  const cy = obj.y + obj.height / 2;
  if (obj.freezeTimer > 0) {
    ctx.strokeStyle = "rgba(233, 255, 255, 0.74)";
    ctx.lineWidth = 2;
    ctx.strokeRect(obj.x - 3, obj.y - 4, obj.width + 6, obj.height + 8);
  }
  if (obj.burnTimer > 0) {
    ctx.fillStyle = "rgba(255, 79, 37, 0.62)";
    ctx.fillRect(cx - 3, obj.y - 8, 6, 8);
    ctx.fillStyle = "rgba(255, 242, 100, 0.72)";
    ctx.fillRect(cx - 1, obj.y - 11, 3, 5);
  }
  if (obj.shadowMarkTimer > 0) {
    ctx.strokeStyle = "rgba(155, 95, 199, 0.70)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(obj.width, obj.height) / 2 + 6, 0, Math.PI * 2);
    ctx.stroke();
  }
}

if (typeof window !== "undefined" && !window.ETERNAL_RIFT_ELEMENTAL_BOSS_SWORDS_PATCH) {
  window.ETERNAL_RIFT_ELEMENTAL_BOSS_SWORDS_PATCH = true;
  registerElementalBossSwords();
  syncElementalWeaponsFromSave();
  ensureElementalBossChests();

  const getWeaponDescriptionBeforeElementalSwords = getWeaponDescription;
  getWeaponDescription = function getWeaponDescriptionElemental(weaponKey) {
    if (ELEMENTAL_SWORD_BY_WEAPON[weaponKey]) {
      const reward = ELEMENTAL_SWORD_BY_WEAPON[weaponKey];
      return `${reward.name}: ${getElementalSwordPowerText(weaponKey)} So pode ser obtida abrindo o bau do boss ${reward.bossName}.`;
    }
    return getWeaponDescriptionBeforeElementalSwords(weaponKey);
  };

  const defeatEnemyBeforeElementalSwords = defeatEnemy;
  defeatEnemy = function defeatEnemyElementalBossChest(obj) {
    const wasBoss = Boolean(obj?.boss);
    const bossKind = obj?.kind;
    defeatEnemyBeforeElementalSwords(obj);
    if (wasBoss && ELEMENTAL_BOSS_SWORDS[bossKind]) {
      spawnElementalBossChestForBoss(obj);
    }
  };

  const getQuestMessageBeforeElementalSwords = getQuestMessage;
  getQuestMessage = function getQuestMessageElementalChest(npcObj) {
    if (npcObj?.type === "elementalBossChest") return openElementalBossChest(npcObj);
    return getQuestMessageBeforeElementalSwords(npcObj);
  };

  const drawObjectBeforeElementalSwords = drawObject;
  drawObject = function drawObjectElementalBossChest(obj) {
    if (obj?.type === "elementalBossChest") return drawElementalBossChest(obj);
    return drawObjectBeforeElementalSwords(obj);
  };

  const drawEquippedWeaponBeforeElementalSwords = drawEquippedWeapon;
  drawEquippedWeapon = function drawEquippedWeaponElementalSwords() {
    const weaponKey = safeCurrentWeaponKeyForVisual();
    if (!ELEMENTAL_SWORD_BY_WEAPON[weaponKey]) return drawEquippedWeaponBeforeElementalSwords();
    try {
      const aim = safeAimForWeaponVisual();
      const progress = getWeaponVisualProgress();
      const angle = getWeaponVisualAngle(aim, weaponKey);
      const centerX = player.x + player.width / 2;
      const centerY = player.y + player.height / 2;
      const handX = centerX + Math.cos(angle) * 8;
      const handY = centerY + Math.sin(angle) * 7 + 3;
      ctx.save();
      ctx.translate(handX, handY);
      ctx.rotate(angle);
      if (Math.cos(angle) < -0.05) ctx.scale(1, -1);
      drawElementalSwordInHand(weaponKey, progress);
      ctx.restore();
    } catch (error) {
      drawWeaponPatchError("Erro espada elemental: " + (error?.message || error));
    }
  };

  const drawAttackBeforeElementalSwords = drawAttack;
  drawAttack = function drawAttackElementalSwords() {
    if (!currentMeleeAttack || !ELEMENTAL_SWORD_BY_WEAPON[currentMeleeAttack.weaponKey]) return drawAttackBeforeElementalSwords();
    try {
      const centerX = player.x + player.width / 2;
      const centerY = player.y + player.height / 2;
      const progress = 1 - clamp(currentMeleeAttack.timer / Math.max(0.001, currentMeleeAttack.maxTimer || attackTimer), 0, 1);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(currentMeleeAttack.angle || 0);
      drawElementalSwordSwingEffect(currentMeleeAttack, progress);
      ctx.restore();
    } catch (error) {
      drawWeaponPatchError("Erro ataque elemental: " + (error?.message || error));
    }
  };

  const damageEnemyBeforeElementalSwords = damageEnemy;
  damageEnemy = function damageEnemyElementalSwords(obj, amount, sourceX, sourceY, knockbackPower = 170, damageType = "fisico") {
    const reward = ELEMENTAL_SWORD_BY_DAMAGE[damageType];
    const ok = damageEnemyBeforeElementalSwords(obj, amount, sourceX, sourceY, knockbackPower, damageType);
    if (ok && reward && obj?.alive) applyElementalSwordEffect(obj, reward);
    return ok;
  };

  const updateEnemiesBeforeElementalSwords = updateEnemies;
  updateEnemies = function updateEnemiesElementalStatuses(delta) {
    shadowSwordHealCooldown = Math.max(0, shadowSwordHealCooldown - delta);
    for (const obj of villageObjects) {
      if (obj?.type !== "enemy" || !obj.alive) continue;
      obj.freezeTimer = Math.max(0, Number(obj.freezeTimer || 0) - delta);
      obj.shadowMarkTimer = Math.max(0, Number(obj.shadowMarkTimer || 0) - delta);
      if (obj.burnTimer > 0) {
        obj.burnTimer = Math.max(0, Number(obj.burnTimer || 0) - delta);
        obj.burnTick = Math.max(0, Number(obj.burnTick || 0) - delta);
        if (obj.burnTick <= 0) {
          obj.burnTick = 0.65;
          directElementalDamage(obj, 1, "QUEIMA", "#ff8d4a");
        }
      }
    }
    updateEnemiesBeforeElementalSwords(delta);
  };

  const moveEnemyTowardBeforeElementalSwords = moveEnemyToward;
  moveEnemyToward = function moveEnemyTowardElementalSlow(obj, dx, dy, delta, speedMultiplier = 1) {
    const freezeSlow = obj?.freezeTimer > 0 ? 0.38 : 1;
    const shadowSlow = obj?.shadowMarkTimer > 0 ? 0.78 : 1;
    return moveEnemyTowardBeforeElementalSwords(obj, dx, dy, delta, speedMultiplier * freezeSlow * shadowSlow);
  };

  const drawEnemyBeforeElementalSwords = drawEnemy;
  drawEnemy = function drawEnemyElementalStatus(obj) {
    drawEnemyBeforeElementalSwords(obj);
    drawElementalEnemyStatus(obj);
  };

  const updateAttackBeforeElementalSwords = updateAttack;
  updateAttack = function updateAttackElementalEffects(delta) {
    for (let i = elementalSwordEffects.length - 1; i >= 0; i--) {
      elementalSwordEffects[i].timer -= delta;
      if (elementalSwordEffects[i].timer <= 0) elementalSwordEffects.splice(i, 1);
    }
    updateAttackBeforeElementalSwords(delta);
  };

  const drawBeforeElementalSwords = draw;
  draw = function drawWithElementalSwordEffects() {
    drawBeforeElementalSwords();
    try {
      ctx.save();
      ctx.translate(-Math.round(camera.x), -Math.round(camera.y));
      drawElementalSwordEffects();
      ctx.restore();
    } catch (error) {
      drawWeaponPatchError("Erro efeitos elementais: " + (error?.message || error));
    }
  };

  const loadGameBeforeElementalSwords = loadGame;
  loadGame = function loadGameElementalSwords() {
    const ok = loadGameBeforeElementalSwords();
    registerElementalBossSwords();
    syncElementalWeaponsFromSave();
    ensureElementalBossChests();
    return ok;
  };

  renderInventory();
  updateHud();
}


// === Elemental sword inventory icon patch ===
if (typeof window !== "undefined" && !window.ETERNAL_RIFT_ELEMENTAL_SWORD_INVENTORY_ICONS_PATCH) {
  window.ETERNAL_RIFT_ELEMENTAL_SWORD_INVENTORY_ICONS_PATCH = true;

  function elementalSwordInventoryIconHtml(weaponKey) {
    const reward = ELEMENTAL_SWORD_BY_WEAPON[weaponKey] || ELEMENTAL_BOSS_SWORDS.miniGuardiao;
    return `<span class="inventory-icon-wrap"><svg class="inventory-art" viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3 22 9 19 23 16 29 13 23 10 9z" fill="${reward.color}" stroke="#273052" stroke-width="2"/>
      <path d="M16 5v20" stroke="${reward.core}" stroke-width="2"/>
      <path d="M10 18h12l-3 4h-6z" fill="#f5ce79" stroke="#5c413c" stroke-width="1.5"/>
      <rect x="14" y="22" width="4" height="7" fill="#7d4d38" stroke="#273052" stroke-width="1"/>
      <rect x="14" y="16" width="4" height="4" fill="${reward.core}"/>
      <path d="M8 12h3M21 12h3M9 25h4M19 25h4" stroke="${reward.color}" stroke-width="2" opacity=".9"/>
    </svg></span>`;
  }

  const renderInventoryGridBeforeElementalSwordIcons = renderInventoryGrid;
  renderInventoryGrid = function renderInventoryGridElementalSwordIcons(filteredItems, totalItems) {
    renderInventoryGridBeforeElementalSwordIcons(filteredItems, totalItems);
    if (!inventoryGrid) return;
    for (const item of filteredItems || []) {
      if (!item?.weaponKey || !ELEMENTAL_SWORD_BY_WEAPON[item.weaponKey]) continue;
      const safeId = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(item.id) : String(item.id).replace(/"/g, '\\"');
      const slot = inventoryGrid.querySelector(`[data-item-id="${safeId}"] .item-icon`);
      if (slot) slot.innerHTML = elementalSwordInventoryIconHtml(item.weaponKey);
    }
  };

  const renderItemDetailsBeforeElementalSwordIcons = renderItemDetails;
  renderItemDetails = function renderItemDetailsElementalSwordIcons(item) {
    renderItemDetailsBeforeElementalSwordIcons(item);
    if (!item?.weaponKey || !ELEMENTAL_SWORD_BY_WEAPON[item.weaponKey] || !itemDetailName) return;
    itemDetailName.innerHTML = `<span class="item-detail-icon-preview">${elementalSwordInventoryIconHtml(item.weaponKey)}</span><span>${item.name}</span>`;
  };
}


// === Reference texture patch inspired by provided village screenshot ===
if (typeof window !== "undefined" && !window.ETERNAL_RIFT_REFERENCE_TEXTURE_PATCH) {
  window.ETERNAL_RIFT_REFERENCE_TEXTURE_PATCH = true;

  function refGrassBlade(x, y, ox, oy, color) {
    fillPixelV2(x + ox, y + oy, 2, 8, color);
    fillPixelV2(x + ox + 2, y + oy - 3, 2, 6, color);
    fillPixelV2(x + ox + 4, y + oy + 1, 2, 6, color);
  }

  drawGrass = function drawGrassReferenceTexture(x, y, tileX, tileY) {
    const h = visualHashV2(tileX, tileY, 301);
    const base = h < 0.28 ? "#78c44b" : h < 0.62 ? "#6eb847" : "#84ce56";
    fillPixelV2(x, y, TILE, TILE, base);
    fillPixelV2(x, y + 26, TILE, 6, "rgba(49, 111, 45, 0.16)");
    fillPixelV2(x + 3, y + 3, 8, 3, "rgba(184, 235, 132, 0.22)");
    if (visualHashV2(tileX, tileY, 302) > 0.36) refGrassBlade(x, y, 5, 18, "#2e8746");
    if (visualHashV2(tileX, tileY, 303) > 0.53) refGrassBlade(x, y, 21, 11, "#3e9c56");
    if (visualHashV2(tileX, tileY, 304) > 0.72) fillPixelV2(x + 15, y + 8, 3, 3, "#9fe16e");
    if (visualHashV2(tileX, tileY, 305) > 0.78) {
      fillPixelV2(x + 10, y + 13, 2, 2, "#fff3d6");
      fillPixelV2(x + 13, y + 12, 2, 2, "#55c4ff");
    }
  };

  drawDirt = function drawDirtReferenceTexture(x, y, tileX, tileY) {
    const warm = (tileX + tileY) % 2 === 0;
    fillPixelV2(x, y, TILE, TILE, warm ? "#9f683a" : "#8f5d33");
    fillPixelV2(x, y + 25, TILE, 7, "rgba(63, 38, 24, 0.16)");
    fillPixelV2(x + 4, y + 5, 7, 3, "rgba(201, 145, 90, 0.24)");
    if (visualHashV2(tileX, tileY, 311) > 0.18) fillPixelV2(x + 19, y + 9, 5, 4, "#cbb8a3");
    if (visualHashV2(tileX, tileY, 312) > 0.38) fillPixelV2(x + 7, y + 19, 4, 3, "#d9cab8");
    if (visualHashV2(tileX, tileY, 313) > 0.57) fillPixelV2(x + 23, y + 20, 3, 2, "#6f4728");
    if (visualHashV2(tileX, tileY, 314) > 0.75) fillPixelV2(x + 13, y + 14, 3, 2, "#efe0bb");
  };

  drawPlaza = function drawPlazaReferenceTexture(x, y, tileX, tileY) {
    const base = (tileX + tileY) % 2 === 0 ? "#e8cb97" : "#dfbf87";
    fillPixelV2(x, y, TILE, TILE, base);
    ctx.strokeStyle = "rgba(114, 91, 70, 0.55)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
    fillPixelV2(x + 2, y + 2, TILE - 4, 2, "rgba(255, 245, 220, 0.18)");
    fillPixelV2(x + 2, y + 28, TILE - 4, 1, "rgba(112, 90, 68, 0.20)");
    if ((tileX + tileY) % 3 === 0) fillPixelV2(x + 11, y + 11, 6, 4, "rgba(255, 239, 165, 0.16)");
    if ((tileX * 2 + tileY) % 5 === 0) fillPixelV2(x + 23, y + 20, 4, 3, "rgba(123, 112, 88, 0.16)");
  };

  drawWater = function drawWaterReferenceTexture(x, y, tileX, tileY) {
    const t = performance.now() / 500;
    const waveA = Math.sin(t + tileX * 0.6 + tileY * 0.3) * 2;
    const waveB = Math.cos(t * 0.8 + tileX * 0.45) * 2;
    fillPixelV2(x, y, TILE, TILE, (tileX + tileY) % 2 === 0 ? "#4499dd" : "#3a8cd0");
    fillPixelV2(x, y + 25, TILE, 7, "rgba(16, 68, 128, 0.30)");
    fillPixelV2(x + 4, y + 10 + waveA, 10, 2, "rgba(210, 246, 255, 0.82)");
    fillPixelV2(x + 17, y + 18 - waveB, 10, 2, "rgba(125, 226, 255, 0.76)");
    if (visualHashV2(tileX, tileY, 321) > 0.65) fillPixelV2(x + 11, y + 23, 5, 2, "rgba(234,255,255,0.34)");
  };

  function drawReferenceRoof(x, y, width, roofColor) {
    fillPixelV2(x - 8, y + 14, width + 16, 34, "#29324d");
    fillPixelV2(x - 4, y + 17, width + 8, 27, roofColor);
    for (let rx = x - 1; rx < x + width; rx += 14) {
      fillPixelV2(rx, y + 20, 10, 5, "rgba(255,255,255,0.16)");
      fillPixelV2(rx + 1, y + 28, 11, 4, "rgba(34,39,63,0.16)");
      fillPixelV2(rx, y + 36, 10, 4, "rgba(255,255,255,0.08)");
    }
    fillPixelV2(x - 4, y + 42, width + 8, 5, "rgba(31, 25, 40, 0.28)");
  }

  function drawReferenceWindow(x, y, warm = false) {
    outlinePixelV2(x, y, 24, 22, warm ? "#ffd46d" : "#73d5ff", "#3a2630");
    fillPixelV2(x + 4, y + 4, 8, 6, warm ? "#fff1a7" : "#e9ffff");
    fillPixelV2(x + 13, y + 4, 2, 15, "#3a2630");
    fillPixelV2(x + 4, y + 11, 17, 2, "#3a2630");
  }

  function drawReferenceFlowerBox(x, y) {
    fillPixelV2(x, y + 7, 30, 7, "#8a5b3f");
    fillPixelV2(x + 3, y + 4, 5, 5, "#ff7ab5");
    fillPixelV2(x + 11, y + 2, 5, 6, "#fff264");
    fillPixelV2(x + 20, y + 4, 5, 5, "#6ddc77");
    fillPixelV2(x + 4, y + 10, 2, 4, "#26794d");
    fillPixelV2(x + 12, y + 9, 2, 5, "#26794d");
    fillPixelV2(x + 21, y + 10, 2, 4, "#26794d");
  }

  function drawReferenceDoor(x, y) {
    outlinePixelV2(x, y, 24, 32, "#98613f", "#3a2630");
    fillPixelV2(x + 4, y + 4, 16, 24, "#8c5639");
    fillPixelV2(x + 10, y + 3, 5, 4, "rgba(255,255,255,0.12)");
    fillPixelV2(x + 17, y + 16, 3, 3, "#f5ce79");
  }

  drawHouse = function drawHouseReferenceTexture(obj) {
    const x = obj.x;
    const y = obj.y;
    const variant = visualHashV2(Math.floor(x / TILE), Math.floor(y / TILE), obj.title?.length || 1);
    const roofColor = variant < 0.33 ? "#3e82de" : variant < 0.66 ? "#d04d57" : "#b87435";
    drawSoftShadow(x + 8, y + 88, obj.width - 4, 10, 0.26);
    outlinePixelV2(x + 7, y + 40, obj.width - 14, 52, "#f0e7d6", "#394066");
    fillPixelV2(x + 10, y + 44, obj.width - 20, 42, "#efe5d2");
    for (let yy = y + 50; yy < y + 82; yy += 11) fillPixelV2(x + 12, yy, obj.width - 24, 2, "rgba(135, 116, 97, 0.12)");
    fillPixelV2(x + 12, y + 46, 32, 4, "rgba(255,255,255,0.22)");
    drawReferenceRoof(x, y, obj.width, roofColor);
    if (variant > 0.68) {
      outlinePixelV2(x + 86, y + 5, 16, 26, "#a06b48", "#394066");
      fillPixelV2(x + 90, y + 8, 8, 5, "#f3c77a");
    }
    drawReferenceDoor(x + 24, y + 60);
    drawReferenceWindow(x + 70, y + 55, true);
    drawReferenceFlowerBox(x + 67, y + 76);
    if (obj.width > 96) {
      drawReferenceWindow(x + 8, y + 55, false);
      drawReferenceFlowerBox(x + 5, y + 76);
    }
    fillPixelV2(x + 27, y + 90, 18, 3, "rgba(35,31,42,0.26)");
  };

  drawPlayerHouse = function drawPlayerHouseReferenceTexture(obj) {
    const x = obj.x;
    const y = obj.y;
    drawSoftShadow(x + 10, y + 90, obj.width - 6, 10, 0.28);
    outlinePixelV2(x + 8, y + 42, obj.width - 16, 56, "#f0e7d6", "#394066");
    fillPixelV2(x + 12, y + 46, obj.width - 24, 46, "#efe5d2");
    drawReferenceRoof(x, y, obj.width, "#357bdb");
    outlinePixelV2(x + 84, y + 7, 18, 28, "#7d4d38", "#394066");
    fillPixelV2(x + 89, y + 11, 8, 5, "#f3c77a");
    drawReferenceDoor(x + 42, y + 62);
    drawReferenceWindow(x + 12, y + 58, true);
    drawReferenceWindow(x + 78, y + 58, true);
    drawReferenceFlowerBox(x + 9, y + 79);
    drawReferenceFlowerBox(x + 75, y + 79);
    fillPixelV2(x + 28, y + 95, 58, 4, "rgba(35,31,42,0.26)");
  };

  drawVillageGroundDetailsV2 = function drawVillageGroundDetailsReference() {
    const details = [
      [28.5, 20.4, "flowerBlue"], [35.2, 20.4, "flowerPink"], [41.2, 20.6, "flowerYellow"],
      [24.2, 27.8, "flowerBlue"], [43.6, 27.8, "flowerPink"], [32.0, 30.2, "flowerYellow"],
      [22.1, 23.0, "stoneBits"], [45.4, 23.6, "stoneBits"], [18.6, 33.0, "grassPatch"],
      [50.6, 34.0, "grassPatch"], [58.8, 27.0, "reed"], [64.8, 24.6, "reed"],
      [66.0, 23.0, "waterLily"], [36.0, 33.2, "grassPatch"], [12.0, 12.0, "flowerBlue"],
      [48.4, 10.4, "flowerPink"], [9.2, 40.5, "flowerYellow"], [71.2, 19.8, "flowerBlue"]
    ];
    for (const [tx, ty, kind] of details) {
      const x = tx * TILE;
      const y = ty * TILE;
      if (x < camera.x - 48 || x > camera.x + canvas.width + 48 || y < camera.y - 48 || y > camera.y + canvas.height + 48) continue;
      if (kind === "flowerBlue") drawTinyFlowerPatchV2(x, y, "#55c4ff");
      if (kind === "flowerPink") drawTinyFlowerPatchV2(x, y, "#ff7ab5");
      if (kind === "flowerYellow") drawTinyFlowerPatchV2(x, y, "#fff264");
      if (kind === "stoneBits") drawStoneBitsV2(x, y);
      if (kind === "grassPatch") drawGrassPatchV2(x, y);
      if (kind === "reed") drawReedsV2(x, y);
      if (kind === "waterLily") drawWaterLilyV2(x, y);
    }
  };
}


// === Autosave and future-proof save patch ===
if (typeof window !== "undefined" && !window.ETERNAL_RIFT_AUTOSAVE_FUTURE_PATCH) {
  window.ETERNAL_RIFT_AUTOSAVE_FUTURE_PATCH = true;

  const AUTOSAVE_BACKUP_KEY = `${SAVE_KEY}-backup`;
  let lastAutoSaveAt = 0;
  let autosaveTimerId = 0;

  function safePlainClone(value, fallback = null) {
    try {
      if (typeof structuredClone === "function") return structuredClone(value);
    } catch (error) {
      // Cai para JSON abaixo.
    }

    try {
      return JSON.parse(JSON.stringify(value));
    } catch (error) {
      return fallback;
    }
  }

  function getSerializableWeaponsSnapshot() {
    const snapshot = {};
    for (const [key, weapon] of Object.entries(weapons || {})) {
      if (!weapon || typeof weapon !== "object") continue;
      const plainWeapon = safePlainClone(weapon, null);
      if (!plainWeapon) continue;
      snapshot[key] = plainWeapon;
    }
    return snapshot;
  }

  function getFutureSaveState() {
    return {
      version: 2,
      savedAt: Date.now(),
      reason: "future-proof-save",
      player: safePlainClone(player, {}),
      inventory: safePlainClone(inventory, {}),
      quest: safePlainClone(quest, {}),
      questBook: safePlainClone(questBook, {}),
      dimensionQuest: safePlainClone(dimensionQuest, {}),
      activePowerUps: safePlainClone(activePowerUps, {}),
      unlockedWeapons: Array.isArray(player.unlockedWeapons) ? [...player.unlockedWeapons] : ["sword"],
      currentWeaponKey: typeof getCurrentWeaponKey === "function" ? getCurrentWeaponKey() : "sword",
      equippedPower,
      weapons: getSerializableWeaponsSnapshot(),
      openedChests: safePlainClone(questBook.openedChests || {}, {}),
      defeatedBosses: safePlainClone(questBook.defeatedBosses || {}, {}),
      collectedBossItems: safePlainClone(inventory.itensBoss || [], [])
    };
  }

  function buildSaveSnapshotFuture() {
    syncDimensionQuestState();
    normalizeLevelState();

    return {
      scene: currentScene,
      player: {
        name: getPlayerDisplayName(),
        x: player.x,
        y: player.y,
        level: player.level,
        xp: player.xp,
        xpToNextLevel: player.xpToNextLevel,
        maxLevel: player.maxLevel,
        totalXp: player.totalXp,
        skillPoints: player.skillPoints,
        damageBonus: player.damageBonus,
        speed: player.speed,
        baseSpeed: player.baseSpeed,
        defense: player.defense,
        health: player.health,
        maxHealth: player.maxHealth,
        mana: player.mana,
        maxMana: player.maxMana,
        oxygen: player.oxygen,
        maxOxygen: player.maxOxygen,
        isSwimming: player.isSwimming,
        spellCooldowns: { ...player.spellCooldowns },
        direction: player.direction,
        currentWeaponIndex,
        equippedPower,
        unlockedWeapons: Array.isArray(player.unlockedWeapons) ? [...player.unlockedWeapons] : ["sword"]
      },
      inventory: { ...inventory },
      quest: { ...quest },
      questBook: { ...questBook },
      unlockedPowers: { fireball: true, dash: true, shockwave: true, heal: true },
      activePowerUps: { ...activePowerUps },
      dimensionQuest: { ...dimensionQuest },
      dimensionCrystals: crystalDimensionObjects
        .filter((obj) => obj.type === "dimensionCrystal" && obj.activated)
        .map((obj) => obj.crystalIndex),
      powerUpsCollected: powerUps
        .filter((obj) => obj.collected)
        .map(getSaveObjectKey),
      collected: villageObjects
        .filter((obj) => (obj.type === "collectible" || obj.type === "crystal") && obj.collected)
        .map(getSaveObjectKey),
      enemies: villageObjects
        .filter((obj) => obj.type === "enemy")
        .map((obj) => ({ key: getSaveObjectKey(obj), alive: obj.alive, hp: obj.hp, phase: obj.phase })),
      lootItems: lootItems
        .filter((obj) => !obj.collected)
        .map((obj) => ({
          kind: obj.kind,
          itemName: obj.itemName,
          amount: obj.amount,
          x: obj.x,
          y: obj.y
        })),
      futureState: getFutureSaveState()
    };
  }

  function writeSaveSnapshotFuture(save, silent = false) {
    try {
      const payload = JSON.stringify(save);
      const ok = writeSaveRaw(payload);
      if (ok) {
        try {
          localStorage.setItem(AUTOSAVE_BACKUP_KEY, payload);
        } catch (error) {
          // Backup opcional: se falhar, o save principal continua valendo.
        }
      }
      if (!ok) return false;
      lastAutoSaveAt = Date.now();
      if (!silent) {
        startMessage.textContent = "Jogo salvo!";
        showHudToast("Jogo salvo!");
        saveNoticeTimer = 2;
      }
      return true;
    } catch (error) {
      console.error("Erro ao montar save", error);
      if (!silent) showHudToast("Erro ao salvar.");
      return false;
    }
  }

  const saveGameBeforeAutosaveFuture = saveGame;
  saveGame = function saveGameFutureProof() {
    const snapshot = buildSaveSnapshotFuture();
    return writeSaveSnapshotFuture(snapshot, false);
  };

  function autosaveNow(reason = "auto") {
    if (!gameStarted && startScreen && !startScreen.classList.contains("hidden")) return false;
    try {
      const snapshot = buildSaveSnapshotFuture();
      snapshot.futureState.reason = reason;
      return writeSaveSnapshotFuture(snapshot, true);
    } catch (error) {
      console.error("Autosave falhou", error);
      return false;
    }
  }

  function queueAutosave(reason = "queued") {
    if (Date.now() - lastAutoSaveAt < 1200) return;
    window.setTimeout(() => autosaveNow(reason), 0);
  }

  function restoreFutureState(save) {
    const future = save?.futureState;
    if (!future || typeof future !== "object") return;

    if (future.weapons && typeof future.weapons === "object") {
      for (const [key, weapon] of Object.entries(future.weapons)) {
        if (!weapon || typeof weapon !== "object") continue;
        if (!weapons[key] || weapon.bossWeapon || weapon.customWeapon) {
          weapons[key] = { ...weapon };
        }
      }
    }

    if (future.inventory && typeof future.inventory === "object") {
      Object.assign(inventory, future.inventory);
    }

    if (future.questBook && typeof future.questBook === "object") {
      Object.assign(questBook, future.questBook);
    }

    if (future.openedChests && typeof future.openedChests === "object") {
      if (!questBook.openedChests || typeof questBook.openedChests !== "object") questBook.openedChests = {};
      Object.assign(questBook.openedChests, future.openedChests);
    }

    if (future.defeatedBosses && typeof future.defeatedBosses === "object") {
      if (!questBook.defeatedBosses || typeof questBook.defeatedBosses !== "object") questBook.defeatedBosses = {};
      Object.assign(questBook.defeatedBosses, future.defeatedBosses);
    }

    if (future.dimensionQuest && typeof future.dimensionQuest === "object") {
      Object.assign(dimensionQuest, future.dimensionQuest);
    }

    if (future.activePowerUps && typeof future.activePowerUps === "object") {
      Object.assign(activePowerUps, future.activePowerUps);
    }

    const mergedWeapons = new Set([
      ...(Array.isArray(player.unlockedWeapons) ? player.unlockedWeapons : []),
      ...(Array.isArray(save.player?.unlockedWeapons) ? save.player.unlockedWeapons : []),
      ...(Array.isArray(future.unlockedWeapons) ? future.unlockedWeapons : [])
    ]);

    player.unlockedWeapons = [...mergedWeapons].filter((key) => weapons[key]);
    if (!player.unlockedWeapons.length) player.unlockedWeapons = ["sword"];

    if (future.currentWeaponKey && weapons[future.currentWeaponKey] && player.unlockedWeapons.includes(future.currentWeaponKey)) {
      currentWeaponIndex = player.unlockedWeapons.indexOf(future.currentWeaponKey);
    } else {
      currentWeaponIndex = clamp(currentWeaponIndex, 0, player.unlockedWeapons.length - 1);
    }

    if (future.equippedPower) equippedPower = future.equippedPower;
  }

  const loadGameBeforeAutosaveFuture = loadGame;
  loadGame = function loadGameFutureProof() {
    const raw = readSaveRaw() || (() => {
      try { return localStorage.getItem(AUTOSAVE_BACKUP_KEY); } catch (error) { return null; }
    })();

    let parsedSave = null;
    try {
      parsedSave = raw ? JSON.parse(raw) : null;
    } catch (error) {
      parsedSave = null;
    }

    const ok = loadGameBeforeAutosaveFuture();
    if (parsedSave) restoreFutureState(parsedSave);
    normalizeRuntimeState();
    updateHud();
    renderInventory();
    return ok || Boolean(parsedSave);
  };

  if (typeof unlockElementalWeapon === "function") {
    const unlockElementalWeaponBeforeAutosave = unlockElementalWeapon;
    unlockElementalWeapon = function unlockElementalWeaponAndAutosave(weaponKey) {
      const result = unlockElementalWeaponBeforeAutosave(weaponKey);
      queueAutosave("weapon-unlocked");
      return result;
    };
  }

  if (typeof openElementalBossChest === "function") {
    const openElementalBossChestBeforeAutosave = openElementalBossChest;
    openElementalBossChest = function openElementalBossChestAndAutosave(chestObj) {
      const result = openElementalBossChestBeforeAutosave(chestObj);
      queueAutosave("boss-chest-opened");
      return result;
    };
  }

  window.addEventListener("pagehide", () => autosaveNow("pagehide"));
  window.addEventListener("beforeunload", () => autosaveNow("beforeunload"));
  window.addEventListener("blur", () => autosaveNow("window-blur"));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") autosaveNow("visibility-hidden");
  });

  if (typeof document.onfreeze !== "undefined") {
    document.addEventListener("freeze", () => autosaveNow("page-freeze"));
  }

  autosaveTimerId = window.setInterval(() => {
    if (gameStarted && !gameOver) autosaveNow("interval");
  }, 10000);

  window.ETERNAL_RIFT_FORCE_AUTOSAVE = autosaveNow;
}

// === Mega biome expansion patch ===
if (typeof window !== "undefined" && !window.ETERNAL_RIFT_MEGA_BIOME_EXPANSION_PATCH) {
  window.ETERNAL_RIFT_MEGA_BIOME_EXPANSION_PATCH = true;

  const EXT_WORLD_COLS = 146;
  const EXT_WORLD_ROWS = 96;
  const EXT_WORLD_WIDTH = EXT_WORLD_COLS * TILE;
  const EXT_WORLD_HEIGHT = EXT_WORLD_ROWS * TILE;
  const BIOME_BOUNDS = {
    desert: { x1: 90, y1: 8, x2: 142, y2: 40 },
    frozen: { x1: 90, y1: 46, x2: 142, y2: 78 },
    swamp: { x1: 10, y1: 64, x2: 86, y2: 94 }
  };
  const ENV_TILES = {
    sand: "A",
    quicksand: "X",
    snow: "N",
    ice: "L",
    swamp: "H",
    mud: "U",
    toxicWater: "V"
  };

  function biomeContains(region, tileX, tileY) {
    return tileX >= region.x1 && tileX <= region.x2 && tileY >= region.y1 && tileY <= region.y2;
  }

  function getVillageMapCols() {
    return worldMap[0]?.length || MAP_COLS;
  }

  function getVillageMapRows() {
    return worldMap.length || MAP_ROWS;
  }

  function getMapTileAt(tileX, tileY) {
    if (tileX < 0 || tileY < 0 || tileY >= getVillageMapRows() || tileX >= getVillageMapCols()) return "G";
    return worldMap[tileY][tileX];
  }

  function setMapTile(tileX, tileY, tile) {
    if (tileX < 0 || tileY < 0 || tileY >= getVillageMapRows() || tileX >= getVillageMapCols()) return;
    worldMap[tileY][tileX] = tile;
  }

  function fillDynamicRect(startX, startY, width, height, tile) {
    for (let y = startY; y < startY + height; y++) {
      for (let x = startX; x < startX + width; x++) setMapTile(x, y, tile);
    }
  }

  function paintDynamicEllipse(centerX, centerY, radiusX, radiusY, tile) {
    for (let y = centerY - radiusY; y <= centerY + radiusY; y++) {
      for (let x = centerX - radiusX; x <= centerX + radiusX; x++) {
        const dx = (x - centerX) / radiusX;
        const dy = (y - centerY) / radiusY;
        if (dx * dx + dy * dy <= 1) setMapTile(x, y, tile);
      }
    }
  }

  function buildExpandedWorldMap() {
    const original = worldMap.map((row) => row.slice());
    worldMap.length = 0;
    for (let y = 0; y < EXT_WORLD_ROWS; y++) {
      worldMap.push(Array(EXT_WORLD_COLS).fill("G"));
    }
    for (let y = 0; y < original.length; y++) {
      for (let x = 0; x < original[y].length; x++) {
        worldMap[y][x] = original[y][x];
      }
    }

    // Faixas externas para a expansao.
    fillDynamicRect(82, 0, EXT_WORLD_COLS - 82, EXT_WORLD_ROWS, "G");
    fillDynamicRect(0, 60, EXT_WORLD_COLS, EXT_WORLD_ROWS - 60, "G");

    // Conexoes principais saindo da vila.
    fillDynamicRect(79, 22, 56, 4, "D"); // caminho leste
    fillDynamicRect(79, 56, 4, 26, "D"); // caminho sul
    fillDynamicRect(32, 58, 4, 22, "D"); // caminho sul central
    fillDynamicRect(34, 78, 40, 4, "D");
    fillDynamicRect(112, 24, 4, 58, "D");
    fillDynamicRect(96, 60, 36, 4, "D");

    // Deserto.
    fillDynamicRect(BIOME_BOUNDS.desert.x1, BIOME_BOUNDS.desert.y1, BIOME_BOUNDS.desert.x2 - BIOME_BOUNDS.desert.x1 + 1, BIOME_BOUNDS.desert.y2 - BIOME_BOUNDS.desert.y1 + 1, ENV_TILES.sand);
    fillDynamicRect(90, 22, 6, 4, "D");
    fillDynamicRect(96, 22, 32, 3, "D");
    fillDynamicRect(110, 12, 4, 24, "D");
    paintDynamicEllipse(103, 28, 5, 4, ENV_TILES.quicksand);
    paintDynamicEllipse(127, 17, 5, 4, "W");
    paintDynamicEllipse(131, 34, 4, 3, ENV_TILES.quicksand);
    fillDynamicRect(120, 10, 10, 8, "P");
    fillDynamicRect(116, 28, 12, 10, "P");

    // Congelado.
    fillDynamicRect(BIOME_BOUNDS.frozen.x1, BIOME_BOUNDS.frozen.y1, BIOME_BOUNDS.frozen.x2 - BIOME_BOUNDS.frozen.x1 + 1, BIOME_BOUNDS.frozen.y2 - BIOME_BOUNDS.frozen.y1 + 1, ENV_TILES.snow);
    fillDynamicRect(96, 60, 30, 4, "D");
    fillDynamicRect(110, 46, 4, 34, "D");
    paintDynamicEllipse(128, 56, 8, 5, ENV_TILES.ice);
    paintDynamicEllipse(100, 71, 6, 4, ENV_TILES.ice);
    fillDynamicRect(118, 68, 12, 8, "P");
    fillDynamicRect(94, 50, 10, 8, "P");

    // Pantano.
    fillDynamicRect(BIOME_BOUNDS.swamp.x1, BIOME_BOUNDS.swamp.y1, BIOME_BOUNDS.swamp.x2 - BIOME_BOUNDS.swamp.x1 + 1, BIOME_BOUNDS.swamp.y2 - BIOME_BOUNDS.swamp.y1 + 1, ENV_TILES.swamp);
    fillDynamicRect(30, 60, 4, 8, "D");
    fillDynamicRect(30, 68, 34, 4, "D");
    fillDynamicRect(62, 68, 4, 20, "D");
    fillDynamicRect(20, 78, 46, 3, ENV_TILES.mud);
    paintDynamicEllipse(19, 88, 8, 4, ENV_TILES.toxicWater);
    paintDynamicEllipse(48, 88, 9, 5, ENV_TILES.toxicWater);
    paintDynamicEllipse(74, 76, 7, 5, ENV_TILES.toxicWater);
    paintDynamicEllipse(60, 70, 5, 3, ENV_TILES.mud);
  }

  function biomeFeature(tileX, tileY, kind, options = {}) {
    const width = options.width || 24;
    const height = options.height || 24;
    return {
      type: "biomeFeature",
      kind,
      x: tileX * TILE + (options.offsetX ?? Math.max(0, (TILE - width) / 2)),
      y: tileY * TILE + (options.offsetY ?? Math.max(0, (TILE - height) / 2)),
      width,
      height,
      solid: Boolean(options.solid),
      message: options.message || "",
      damageOnTouch: options.damageOnTouch || 0,
      slowAmount: options.slowAmount || 0,
      rewardKey: options.rewardKey || "",
      rewardItems: options.rewardItems || null,
      chestId: options.chestId || "",
      opened: Boolean(options.opened),
      lit: Boolean(options.lit),
      hiddenUntil: options.hiddenUntil || "",
      role: options.role || "",
      title: options.title || "",
      points: options.points || 0
    };
  }

  function biomeCollectible(tileX, tileY, item, message = "") {
    const obj = collectible(tileX, tileY, item);
    if (message) obj.message = message;
    return obj;
  }

  buildExpandedWorldMap();

  function ensureBiomeQuestBook() {
    if (!questBook.biomeMissions || typeof questBook.biomeMissions !== "object") questBook.biomeMissions = {};
    if (!questBook.biomeMissions.desert) questBook.biomeMissions.desert = { oasisFound: false, scorpions: 0, pyramidOpened: false, crystalSolar: false };
    if (!questBook.biomeMissions.frozen) questBook.biomeMissions.frozen = { torches: 0, iceCrystals: 0, npcRescued: false, whiteWolfDefeated: false };
    if (!questBook.biomeMissions.swamp) questBook.biomeMissions.swamp = { poisonousHerbs: 0, witchCabinFound: false, waterPurified: false, giantFrogs: 0 };
    if (!questBook.biomeMissions.chests) questBook.biomeMissions.chests = {};
  }

  function ensureBiomeInventory() {
    if (!Array.isArray(inventory.itensBoss)) inventory.itensBoss = [];
    if (!Array.isArray(inventory.biomeRelics)) inventory.biomeRelics = [];
  }

  function grantUniqueRelic(itemName) {
    ensureBiomeInventory();
    if (!inventory.biomeRelics.includes(itemName)) inventory.biomeRelics.push(itemName);
    if (!inventory.itensBoss.includes(itemName)) inventory.itensBoss.push(itemName);
  }

  function hasRelic(itemName) {
    return Array.isArray(inventory.biomeRelics) && inventory.biomeRelics.includes(itemName);
  }

  const biomeObjectsToAdd = [
    sign(84, 23, "Expansao do mapa: siga para o leste para encontrar o Deserto e a Vila Congelada."),
    sign(33, 61, "Expansao do mapa: siga para o sul para entrar no Pantano dos Sussurros."),

    // Deserto.
    sign(96, 23, "Bioma Deserto: tome cuidado com a areia movediça e procure o oasis perdido."),
    npc(98, 24, "Sahir", "Sahir: O deserto guarda caravanas, ruinas e um templo soterrado.", "desertGuide"),
    npc(126, 18, "Mercador Nadir", "Mercador Nadir: Agua rara, amuletos e historias do deserto!", "shopkeeper"),
    biomeFeature(101, 15, "caravan", { width: 58, height: 34, solid: true, message: "Caravana de mercadores: caixas, tecidos e suprimentos cruzaram o deserto ate aqui." }),
    biomeFeature(126, 17, "oasis", { width: 48, height: 40, message: "Oasis perdido: voce encontrou uma das fontes mais raras do deserto.", role: "desertOasis" }),
    biomeFeature(123, 12, "sunTemple", { width: 76, height: 76, solid: true, message: "Piramide antiga: a entrada finalmente apareceu entre as dunas.", role: "sunTemple" }),
    biomeFeature(118, 30, "buriedRuins", { width: 62, height: 44, solid: true, message: "Ruinas enterradas: pedras antigas escondem segredos sob a areia." }),
    biomeFeature(109, 27, "solarStone", { width: 20, height: 26, message: "Pedra solar: ela pulsa com luz quente durante o dia." }),
    biomeFeature(133, 29, "solarStone", { width: 20, height: 26, message: "Pedra solar: um brilho dourado corta a tempestade de areia." }),
    biomeFeature(95, 32, "ancientBones", { width: 36, height: 18, message: "Ossos antigos: parecem restos de criaturas soterradas pelo tempo." }),
    biomeFeature(136, 31, "ancientBones", { width: 34, height: 18, message: "Ossos antigos: enormes costelas apontam para o ceu seco." }),
    biomeFeature(101, 28, "quicksandPit", { width: 36, height: 36, message: "Areia movedica: a superficie parece viva e tenta puxar quem se aproxima." }),
    biomeFeature(130, 34, "quicksandPit", { width: 34, height: 34, message: "Areia movedica: uma poça traiçoeira de areia densa e pesada." }),
    biomeFeature(92, 18, "cactus", { width: 24, height: 30, damageOnTouch: 1 }),
    biomeFeature(94, 30, "cactus", { width: 24, height: 30, damageOnTouch: 1 }),
    biomeFeature(108, 18, "cactus", { width: 24, height: 30, damageOnTouch: 1 }),
    biomeFeature(114, 34, "cactus", { width: 24, height: 30, damageOnTouch: 1 }),
    biomeFeature(136, 16, "cactus", { width: 24, height: 30, damageOnTouch: 1 }),
    biomeFeature(120, 27, "scorpionBurrow", { width: 24, height: 12, message: "Buraco de escorpiao: ha marcas frescas ao redor da areia." }),
    biomeFeature(99, 19, "scorpionBurrow", { width: 24, height: 12, message: "Buraco de escorpiao: parece que algo acabou de se esconder aqui." }),
    biomeCollectible(124, 14, "cristalSolar", "Cristal solar: um nucleo quente e brilhante, digno de um templo antigo."),
    biomeFeature(120, 35, "biomeChest", { width: 26, height: 22, message: "Bau do Deserto", role: "biomeChest", chestId: "desert", rewardItems: ["Espada Solar", "Cajado de Areia", "Botas do Deserto", "Amuleto Anti-Calor"] }),

    // Congelado.
    sign(100, 60, "Bioma Congelado: acenda as tochas, colete cristais de gelo e derrote o Yeti Ancestral."),
    npc(97, 62, "Astrid", "Astrid: A vila congelada precisa de ajuda para sobreviver ao frio eterno.", "frozenGuide"),
    biomeFeature(97, 52, "igloo", { width: 58, height: 44, solid: true, message: "Iglu: abrigo compacto e aquecido contra a neve." }),
    biomeFeature(122, 70, "woodLodge", { width: 72, height: 54, solid: true, message: "Casa de madeira com lareira: alguem ainda tenta viver no gelo." }),
    biomeFeature(125, 56, "iceBridge", { width: 72, height: 14, message: "Ponte de gelo: parece forte, mas algumas placas estao quebradicas." }),
    biomeFeature(127, 60, "frozenStatue", { width: 24, height: 34, message: "Estatua congelada: o gelo preservou cada detalhe do rosto." }),
    biomeFeature(100, 71, "iceCave", { width: 70, height: 50, solid: true, message: "Caverna congelada: o eco aqui dentro parece uma nevasca distante." }),
    biomeFeature(95, 50, "snowTree", { width: 28, height: 36, solid: true }),
    biomeFeature(102, 48, "snowTree", { width: 28, height: 36, solid: true }),
    biomeFeature(132, 48, "snowTree", { width: 28, height: 36, solid: true }),
    biomeFeature(137, 69, "snowTree", { width: 28, height: 36, solid: true }),
    biomeFeature(118, 55, "iceCrystal", { width: 20, height: 26, message: "Cristal de gelo: um brilho frio atravessa o ar." }),
    biomeFeature(133, 54, "iceCrystal", { width: 20, height: 26, message: "Cristal de gelo: ele parece ainda mais puro sob a neve." }),
    biomeFeature(95, 68, "frozenTorch", { width: 18, height: 30, message: "Tocha congelada: pressione E para acender.", role: "frozenTorch" }),
    biomeFeature(103, 68, "frozenTorch", { width: 18, height: 30, message: "Tocha congelada: pressione E para acender.", role: "frozenTorch" }),
    biomeFeature(131, 68, "frozenTorch", { width: 18, height: 30, message: "Tocha congelada: pressione E para acender.", role: "frozenTorch" }),
    biomeFeature(139, 68, "frozenTorch", { width: 18, height: 30, message: "Tocha congelada: pressione E para acender.", role: "frozenTorch" }),
    npc(135, 72, "Eirik", "Eirik: Estou preso no gelo... por favor, aqueça estas tochas!", "frozenVictim"),
    biomeCollectible(116, 54, "cristalGelo"),
    biomeCollectible(121, 53, "cristalGelo"),
    biomeCollectible(126, 54, "cristalGelo"),
    biomeCollectible(98, 70, "cristalGelo"),
    biomeCollectible(104, 72, "cristalGelo"),
    biomeFeature(120, 74, "biomeChest", { width: 26, height: 22, message: "Bau Congelado", role: "biomeChest", chestId: "frozen", rewardItems: ["Arco Congelante", "Espada de Gelo", "Armadura Polar", "Pocao Anti-Frio", "Botas Antiderrapantes"] }),

    // Pantano.
    sign(29, 70, "Pantano dos Sussurros: a nevoa, a lama e a agua venenosa deixam tudo mais perigoso."),
    npc(32, 70, "Mora", "Mora: O pantano esconde ervas venenosas, uma cabana abandonada e a Bruxa do Pantano.", "swampGuide"),
    biomeFeature(20, 84, "swampTree", { width: 28, height: 42, solid: true }),
    biomeFeature(26, 89, "swampTree", { width: 28, height: 42, solid: true }),
    biomeFeature(42, 72, "swampTree", { width: 28, height: 42, solid: true }),
    biomeFeature(69, 84, "swampTree", { width: 28, height: 42, solid: true }),
    biomeFeature(58, 78, "poisonMushroom", { width: 18, height: 18, message: "Cogumelo venenoso: exala um cheiro estranho e adocicado." }),
    biomeFeature(72, 79, "poisonMushroom", { width: 18, height: 18, message: "Cogumelo venenoso: seu topo brilha mesmo na nevoa." }),
    biomeFeature(52, 83, "gasPlant", { width: 20, height: 28, message: "Planta toxica: cuidado com o gas venenoso que ela libera.", damageOnTouch: 1 }),
    biomeFeature(76, 74, "gasPlant", { width: 20, height: 28, message: "Planta toxica: uma nuvem esverdeada fica presa entre as folhas.", damageOnTouch: 1 }),
    biomeFeature(64, 79, "brokenBridge", { width: 74, height: 18, message: "Ponte quebrada: algumas tabuas ainda se mantem de pe." }),
    biomeFeature(48, 71, "abandonedHouse", { width: 74, height: 56, solid: true, message: "Casa abandonada: o interior foi engolido pela umidade do pantano.", role: "witchCabin" }),
    biomeFeature(40, 89, "skullPile", { width: 28, height: 16, message: "Craneos e ossos: o brejo guarda memorias nada tranquilas." }),
    biomeFeature(55, 87, "skullPile", { width: 28, height: 16, message: "Craneos e ossos: parte da lama parece se mover ao redor deles." }),
    biomeFeature(70, 89, "purifyShrine", { width: 24, height: 30, message: "Totem do Brejo: pressione E para purificar a agua do pantano.", role: "purifyShrine" }),
    biomeCollectible(25, 83, "ervaVenenosa"),
    biomeCollectible(30, 88, "ervaVenenosa"),
    biomeCollectible(37, 80, "ervaVenenosa"),
    biomeCollectible(60, 90, "ervaVenenosa"),
    biomeCollectible(75, 84, "ervaVenenosa"),
    biomeFeature(69, 91, "biomeChest", { width: 26, height: 22, message: "Bau do Brejo", role: "biomeChest", chestId: "swamp", rewardItems: ["Cajado Venenoso", "Pocao Antidoto", "Armadura de Musgo", "Anel contra Veneno", "Lanca do Brejo"] })
  ];

  const biomeEnemiesToAdd = [
    enemy(100, 21, "escorpiao"), enemy(104, 25, "escorpiao"), enemy(108, 31, "escorpiao"), enemy(135, 28, "escorpiao"), enemy(132, 36, "escorpiao"),
    enemy(114, 20, "serpenteDeserto"), enemy(126, 23, "serpenteDeserto"), enemy(138, 18, "serpenteDeserto"),
    enemy(120, 32, "mumia"), enemy(122, 33, "mumia"), enemy(118, 36, "mumia"),
    enemy(128, 29, "esqueletoArqueiro"), enemy(137, 26, "esqueletoArqueiro"),
    enemy(111, 17, "golemAreia"), enemy(130, 13, "besouroGigante"), enemy(139, 33, "besouroGigante"),
    boss(124, 31, "faraoAreia"),

    enemy(101, 58, "loboGelo"), enemy(106, 62, "loboGelo"), enemy(135, 60, "loboGelo"), enemy(100, 74, "loboBranco"),
    enemy(120, 57, "slimeGelo"), enemy(129, 59, "slimeGelo"), enemy(110, 72, "slimeGelo"),
    enemy(126, 66, "espiritoCongelado"), enemy(117, 71, "espiritoCongelado"),
    enemy(98, 69, "morcegoNeve"), enemy(104, 73, "morcegoNeve"),
    enemy(132, 73, "golemGelo"), enemy(136, 70, "arqueiroCongelado"),
    boss(122, 67, "yetiAncestral"),

    enemy(24, 79, "sapoGigante"), enemy(27, 88, "sapoGigante"), enemy(64, 87, "sapoGigante"), enemy(77, 82, "sapoGigante"),
    enemy(42, 85, "mosquitoVenenoso"), enemy(58, 78, "mosquitoVenenoso"), enemy(73, 75, "mosquitoVenenoso"),
    enemy(33, 83, "slimeToxico"), enemy(56, 86, "slimeToxico"), enemy(75, 89, "slimeToxico"),
    enemy(48, 76, "bruxaPantano"), enemy(61, 81, "bruxaPantano"),
    enemy(39, 90, "zumbiLama"), enemy(51, 91, "zumbiLama"),
    enemy(70, 75, "serpenteAquatica"), enemy(17, 88, "serpenteAquatica"),
    boss(58, 84, "bruxaDoPantano")
  ];

  for (const obj of biomeObjectsToAdd) {
    if (!villageObjects.includes(obj)) villageObjects.push(obj);
  }
  for (const obj of biomeEnemiesToAdd) {
    if (!villageObjects.includes(obj)) villageObjects.push(obj);
  }

  ensureBiomeQuestBook();
  ensureBiomeInventory();

  function syncBiomeObjectState() {
    ensureBiomeQuestBook();
    ensureBiomeInventory();
    for (const obj of villageObjects) {
      if (obj.type === "biomeFeature" && obj.role === "biomeChest") {
        obj.opened = Boolean(questBook.biomeMissions.chests[obj.chestId]);
      }
      if (obj.type === "biomeFeature" && obj.role === "frozenTorch") {
        const litCount = questBook.biomeMissions.frozen.torches;
        const allTorches = villageObjects.filter((item) => item.type === "biomeFeature" && item.role === "frozenTorch");
        const index = allTorches.indexOf(obj);
        obj.lit = index >= 0 && index < litCount;
      }
      if (obj.type === "npc" && obj.role === "frozenVictim") {
        obj.message = questBook.biomeMissions.frozen.npcRescued
          ? "Eirik: Obrigado! A neve nao vai me prender de novo."
          : "Eirik: Estou preso no gelo... por favor, aqueça estas tochas!";
      }
    }
  }
  syncBiomeObjectState();

  const normalizeRuntimeStateBeforeBiomePatch = normalizeRuntimeState;
  normalizeRuntimeState = function normalizeRuntimeStateBiomePatch() {
    normalizeRuntimeStateBeforeBiomePatch();
    ensureBiomeQuestBook();
    ensureBiomeInventory();
    syncBiomeObjectState();
  };

  const resetProgressBeforeBiomePatch = resetProgressForNewGame;
  resetProgressForNewGame = function resetProgressForNewGameBiomePatch(name) {
    resetProgressBeforeBiomePatch(name);
    ensureBiomeQuestBook();
    ensureBiomeInventory();
    inventory.biomeRelics = [];
    questBook.biomeMissions = {
      desert: { oasisFound: false, scorpions: 0, pyramidOpened: false, crystalSolar: false },
      frozen: { torches: 0, iceCrystals: 0, npcRescued: false, whiteWolfDefeated: false },
      swamp: { poisonousHerbs: 0, witchCabinFound: false, waterPurified: false, giantFrogs: 0 },
      chests: {}
    };
    syncBiomeObjectState();
  };

  const setActiveSceneBeforeBiomePatch = setActiveScene;
  setActiveScene = function setActiveSceneBiomePatch(scene) {
    setActiveSceneBeforeBiomePatch(scene);
    if (currentScene === "village") {
      colliders = objects.filter((obj) => obj.solid);
      interactables = objects.filter((obj) => obj.message);
      syncBiomeObjectState();
    }
  };

  getSceneWidth = function getSceneWidthBiomePatch() {
    if (currentScene === "village") return EXT_WORLD_WIDTH;
    if (currentScene === "crystalDimension") return CRYSTAL_WIDTH;
    return HOME_WIDTH;
  };

  getSceneHeight = function getSceneHeightBiomePatch() {
    if (currentScene === "village") return EXT_WORLD_HEIGHT;
    if (currentScene === "crystalDimension") return CRYSTAL_HEIGHT;
    return HOME_HEIGHT;
  };

  isPointInVillageWater = function isPointInVillageWaterBiomePatch(x, y) {
    if (currentScene !== "village") return false;
    const tileX = Math.floor(x / TILE);
    const tileY = Math.floor(y / TILE);
    const tile = getMapTileAt(tileX, tileY);
    return tile === "W" || tile === ENV_TILES.toxicWater;
  };

  hitsWater = function hitsWaterBiomePatch(rect) {
    const left = Math.floor(rect.x / TILE);
    const right = Math.floor((rect.x + rect.width - 1) / TILE);
    const top = Math.floor(rect.y / TILE);
    const bottom = Math.floor((rect.y + rect.height - 1) / TILE);
    for (let y = top; y <= bottom; y++) {
      for (let x = left; x <= right; x++) {
        const tile = getMapTileAt(x, y);
        if (tile === "W" || tile === ENV_TILES.toxicWater) return true;
      }
    }
    return false;
  };

  projectileTouchesWater = function projectileTouchesWaterBiomePatch(obj) {
    return isPointInVillageWater(obj.x + obj.width / 2, obj.y + obj.height / 2);
  };

  const drawMapBeforeBiomePatch = drawMap;
  function drawSandTile(x, y, tileX, tileY) {
    ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#e7c067" : "#ddb45c";
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = "rgba(184, 121, 85, 0.45)";
    ctx.fillRect(x + 4, y + 7, 8, 2);
    ctx.fillRect(x + 20, y + 20, 7, 2);
    ctx.fillRect(x + 12, y + 15, 4, 2);
  }
  function drawQuicksandTile(x, y, tileX, tileY) {
    drawSandTile(x, y, tileX, tileY);
    ctx.fillStyle = "rgba(168, 95, 74, 0.38)";
    ctx.beginPath();
    ctx.arc(x + 16, y + 16, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(93, 56, 67, 0.48)";
    ctx.beginPath();
    ctx.arc(x + 16, y + 16, 6 + Math.sin((tileX + tileY + performance.now() / 420) * 0.8) * 1.4, 0, Math.PI * 2);
    ctx.stroke();
  }
  function drawSnowTile(x, y, tileX, tileY) {
    ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#edf5ff" : "#deebff";
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = "rgba(180, 205, 241, 0.65)";
    ctx.fillRect(x + 6, y + 8, 3, 3);
    ctx.fillRect(x + 20, y + 21, 4, 4);
    ctx.fillRect(x + 14, y + 14, 2, 2);
  }
  function drawIceTile(x, y, tileX, tileY) {
    ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#d4f3ff" : "#c1e6ff";
    ctx.fillRect(x, y, TILE, TILE);
    ctx.strokeStyle = "rgba(63, 143, 229, 0.42)";
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 24);
    ctx.lineTo(x + 16, y + 10);
    ctx.lineTo(x + 28, y + 18);
    ctx.stroke();
  }
  function drawSwampTile(x, y, tileX, tileY) {
    ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#49684d" : "#415f46";
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = "rgba(140, 165, 92, 0.28)";
    ctx.fillRect(x + 6, y + 20, 5, 5);
    ctx.fillRect(x + 18, y + 14, 4, 4);
  }
  function drawMudTile(x, y, tileX, tileY) {
    ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#705a44" : "#614d3b";
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = "rgba(39, 48, 82, 0.2)";
    ctx.fillRect(x + 6, y + 18, 16, 6);
  }
  function drawToxicWaterTile(x, y, tileX, tileY) {
    ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#417d5d" : "#376d52";
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = "rgba(154, 255, 114, 0.25)";
    ctx.fillRect(x + 4, y + 6, 10, 6);
    ctx.fillRect(x + 18, y + 16, 8, 5);
    ctx.strokeStyle = "rgba(195, 255, 131, 0.32)";
    ctx.beginPath();
    ctx.arc(x + 12, y + 22, 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawMap = function drawMapBiomePatch() {
    if (currentScene !== "village") {
      drawMapBeforeBiomePatch();
      return;
    }
    const cols = getVillageMapCols();
    const rows = getVillageMapRows();
    const startCol = Math.floor(camera.x / TILE) - 1;
    const endCol = Math.ceil((camera.x + canvas.width) / TILE) + 1;
    const startRow = Math.floor(camera.y / TILE) - 1;
    const endRow = Math.ceil((camera.y + canvas.height) / TILE) + 1;
    for (let y = startRow; y <= endRow; y++) {
      for (let x = startCol; x <= endCol; x++) {
        if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
        const tile = worldMap[y][x];
        const px = x * TILE;
        const py = y * TILE;
        if (tile === ENV_TILES.sand) drawSandTile(px, py, x, y);
        else if (tile === ENV_TILES.quicksand) drawQuicksandTile(px, py, x, y);
        else if (tile === ENV_TILES.snow) drawSnowTile(px, py, x, y);
        else if (tile === ENV_TILES.ice) drawIceTile(px, py, x, y);
        else if (tile === ENV_TILES.swamp) drawSwampTile(px, py, x, y);
        else if (tile === ENV_TILES.mud) drawMudTile(px, py, x, y);
        else if (tile === ENV_TILES.toxicWater) drawToxicWaterTile(px, py, x, y);
        else if (tile === "D") drawDirt(px, py, x, y);
        else if (tile === "W") drawWater(px, py, x, y);
        else if (tile === "F") drawForestGrass(px, py, x, y);
        else if (tile === "P") drawPlaza(px, py, x, y);
        else drawGrass(px, py, x, y);
      }
    }
    drawSceneGroundOverlayV2?.();
  };

  const drawSceneGroundOverlayV2BeforeBiomePatch = typeof drawSceneGroundOverlayV2 === "function" ? drawSceneGroundOverlayV2 : null;
  if (drawSceneGroundOverlayV2BeforeBiomePatch) {
    drawSceneGroundOverlayV2 = function drawSceneGroundOverlayV2BiomePatch() {
      drawSceneGroundOverlayV2BeforeBiomePatch();
      if (currentScene !== "village") return;
      const area = getAreaName();
      if (area === "Vila Congelada") {
        for (let i = 0; i < 26; i++) {
          const sx = camera.x + ((i * 137 + performance.now() * 0.03) % (canvas.width + 120)) - 60;
          const sy = camera.y + ((i * 89 + performance.now() * 0.11) % (canvas.height + 90)) - 45;
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.fillRect(sx, sy, 2, 2);
        }
      }
      if (area === "Pantano dos Sussurros") {
        ctx.fillStyle = "rgba(25, 38, 31, 0.12)";
        ctx.fillRect(camera.x, camera.y, canvas.width, canvas.height);
        for (let i = 0; i < 8; i++) {
          const fx = camera.x + ((i * 183 + performance.now() * 0.02) % (canvas.width + 80)) - 40;
          const fy = camera.y + 30 + (i * 47) % canvas.height;
          ctx.fillStyle = "rgba(180, 228, 180, 0.06)";
          ctx.fillRect(fx, fy, 90, 24);
        }
      }
      if (area === "Vila do Deserto") {
        ctx.fillStyle = "rgba(255, 214, 124, 0.05)";
        ctx.fillRect(camera.x, camera.y, canvas.width, canvas.height);
      }
    };
  }

  const drawObjectBeforeBiomePatch = drawObject;
  drawObject = function drawObjectBiomePatch(obj) {
    if (obj.type === "biomeFeature") {
      return drawBiomeFeature(obj);
    }
    drawObjectBeforeBiomePatch(obj);
  };

  function drawBiomeFeature(obj) {
    const x = obj.x;
    const y = obj.y;
    if (obj.kind === "cactus") {
      ctx.fillStyle = "#26794d";
      ctx.fillRect(x + 9, y + 2, 8, 24);
      ctx.fillRect(x + 4, y + 10, 6, 12);
      ctx.fillRect(x + 17, y + 12, 6, 11);
      ctx.fillStyle = "#d9ff73";
      ctx.fillRect(x + 8, y + 4, 1, 2); ctx.fillRect(x + 16, y + 9, 1, 2); ctx.fillRect(x + 20, y + 15, 1, 2);
      return;
    }
    if (obj.kind === "ancientBones") {
      ctx.fillStyle = "#e9dfcd";
      ctx.fillRect(x + 2, y + 8, obj.width - 4, 4);
      ctx.fillRect(x + 6, y + 4, 6, 14);
      ctx.fillRect(x + obj.width - 12, y + 4, 6, 14);
      return;
    }
    if (obj.kind === "quicksandPit") {
      ctx.fillStyle = "rgba(168, 95, 74, 0.55)";
      ctx.beginPath();
      ctx.arc(x + obj.width / 2, y + obj.height / 2, obj.width / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(93,56,67,0.55)";
      ctx.beginPath();
      ctx.arc(x + obj.width / 2, y + obj.height / 2, obj.width / 4, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }
    if (obj.kind === "oasis") {
      ctx.fillStyle = "#48a7e6";
      ctx.beginPath();
      ctx.ellipse(x + 22, y + 20, 18, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2f8b60";
      ctx.fillRect(x + 2, y + 18, 8, 14);
      ctx.fillRect(x + 32, y + 10, 8, 20);
      ctx.fillStyle = "#8f5a3f";
      ctx.fillRect(x + 4, y + 8, 4, 12);
      ctx.fillRect(x + 34, y + 4, 4, 14);
      return;
    }
    if (obj.kind === "sunTemple") {
      ctx.fillStyle = "#8f5a3f";
      ctx.fillRect(x + 6, y + 22, obj.width - 12, obj.height - 22);
      ctx.fillStyle = "#b87955";
      ctx.fillRect(x + 12, y + 10, obj.width - 24, 18);
      ctx.fillStyle = "#fff264";
      ctx.fillRect(x + obj.width / 2 - 5, y + 34, 10, 10);
      ctx.fillStyle = "#273052";
      ctx.fillRect(x + obj.width / 2 - 12, y + obj.height - 26, 24, 22);
      return;
    }
    if (obj.kind === "buriedRuins") {
      ctx.fillStyle = "#92817a";
      ctx.fillRect(x + 4, y + 10, obj.width - 8, obj.height - 10);
      ctx.fillStyle = "#706760";
      ctx.fillRect(x + 10, y + 4, 14, 10);
      ctx.fillRect(x + obj.width - 24, y + 12, 10, 18);
      return;
    }
    if (obj.kind === "solarStone") {
      pixelRect(x + 2, y + 4, 16, 20, "#e9dfcd", "#8f5a3f");
      ctx.fillStyle = "#fff264";
      ctx.fillRect(x + 6, y + 8, 8, 8);
      return;
    }
    if (obj.kind === "scorpionBurrow") {
      ctx.fillStyle = "#5d3843";
      ctx.fillRect(x + 2, y + 4, obj.width - 4, 6);
      return;
    }
    if (obj.kind === "caravan") {
      ctx.fillStyle = "#8f5a3f";
      ctx.fillRect(x + 4, y + 10, obj.width - 8, 16);
      ctx.fillStyle = "#d24c63";
      ctx.fillRect(x + 8, y + 2, obj.width - 16, 12);
      ctx.fillStyle = "#273052";
      ctx.fillRect(x + 10, y + 24, 10, 10);
      ctx.fillRect(x + obj.width - 20, y + 24, 10, 10);
      return;
    }
    if (obj.kind === "igloo") {
      ctx.fillStyle = "#edf5ff";
      ctx.beginPath();
      ctx.arc(x + obj.width / 2, y + obj.height / 2 + 6, 22, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(x + 12, y + 18, obj.width - 24, obj.height - 18);
      ctx.fillStyle = "#273052";
      ctx.fillRect(x + obj.width / 2 - 8, y + obj.height - 18, 16, 16);
      return;
    }
    if (obj.kind === "woodLodge" || obj.kind === "abandonedHouse") {
      ctx.fillStyle = obj.kind === "abandonedHouse" ? "#6d5c75" : "#b7b2bd";
      ctx.fillRect(x + 8, y + 24, obj.width - 16, obj.height - 24);
      ctx.fillStyle = obj.kind === "abandonedHouse" ? "#415f46" : "#3f8fe5";
      ctx.fillRect(x + 2, y + 10, obj.width - 4, 18);
      ctx.fillStyle = "#273052";
      ctx.fillRect(x + obj.width / 2 - 10, y + obj.height - 22, 20, 18);
      return;
    }
    if (obj.kind === "iceBridge") {
      ctx.fillStyle = "#c1e6ff";
      ctx.fillRect(x, y + 3, obj.width, 8);
      ctx.strokeStyle = "#8bcfff";
      ctx.strokeRect(x + 0.5, y + 3.5, obj.width - 1, 7);
      return;
    }
    if (obj.kind === "frozenStatue") {
      ctx.fillStyle = "#c7ccd4";
      ctx.fillRect(x + 7, y + 6, 10, 18);
      ctx.fillRect(x + 4, y + 22, 16, 10);
      ctx.fillStyle = "rgba(233,255,255,0.55)";
      ctx.fillRect(x + 4, y + 4, 18, 28);
      return;
    }
    if (obj.kind === "iceCave") {
      ctx.fillStyle = "#9cc7f2";
      ctx.fillRect(x + 4, y + 10, obj.width - 8, obj.height - 10);
      ctx.fillStyle = "#273052";
      ctx.fillRect(x + obj.width / 2 - 14, y + obj.height - 22, 28, 18);
      return;
    }
    if (obj.kind === "snowTree") {
      ctx.fillStyle = "#8f5a3f";
      ctx.fillRect(x + 10, y + 18, 8, 16);
      ctx.fillStyle = "#edf5ff";
      ctx.fillRect(x + 4, y + 10, 20, 10);
      ctx.fillRect(x + 2, y + 18, 24, 8);
      ctx.fillRect(x + 6, y + 4, 16, 8);
      return;
    }
    if (obj.kind === "iceCrystal") {
      ctx.fillStyle = "#8bcfff";
      ctx.fillRect(x + 8, y + 4, 8, 18);
      ctx.fillRect(x + 4, y + 10, 16, 8);
      ctx.fillStyle = "#e9ffff";
      ctx.fillRect(x + 10, y + 7, 4, 8);
      return;
    }
    if (obj.kind === "frozenTorch") {
      ctx.fillStyle = "#8f5a3f";
      ctx.fillRect(x + 7, y + 8, 4, 20);
      ctx.fillStyle = obj.lit ? "#fff264" : "#c7ccd4";
      ctx.fillRect(x + 4, y + 2, 10, 8);
      if (obj.lit) {
        ctx.fillStyle = "rgba(255, 242, 100, 0.28)";
        ctx.fillRect(x - 2, y - 2, 18, 16);
      }
      return;
    }
    if (obj.kind === "swampTree") {
      ctx.fillStyle = "#5d3843";
      ctx.fillRect(x + 10, y + 18, 8, 22);
      ctx.fillStyle = "#415f46";
      ctx.fillRect(x + 2, y + 8, 24, 12);
      ctx.fillRect(x + 6, y + 2, 18, 10);
      return;
    }
    if (obj.kind === "poisonMushroom") {
      ctx.fillStyle = "#fff264";
      ctx.fillRect(x + 4, y + 5, 10, 4);
      ctx.fillStyle = "#b46dff";
      ctx.fillRect(x + 2, y + 2, 14, 6);
      ctx.fillStyle = "#e9dfcd";
      ctx.fillRect(x + 7, y + 8, 4, 8);
      return;
    }
    if (obj.kind === "gasPlant") {
      ctx.fillStyle = "#26794d";
      ctx.fillRect(x + 8, y + 4, 4, 18);
      ctx.fillRect(x + 4, y + 11, 12, 8);
      ctx.fillStyle = "rgba(154, 255, 114, 0.28)";
      ctx.fillRect(x + 2, y, 16, 10);
      return;
    }
    if (obj.kind === "brokenBridge") {
      ctx.fillStyle = "#8f5a3f";
      for (let dx = 0; dx < obj.width; dx += 12) ctx.fillRect(x + dx, y + (dx % 24 === 0 ? 4 : 0), 8, 4);
      return;
    }
    if (obj.kind === "skullPile") {
      ctx.fillStyle = "#e9dfcd";
      ctx.fillRect(x + 2, y + 8, 10, 6);
      ctx.fillRect(x + 12, y + 5, 10, 8);
      return;
    }
    if (obj.kind === "purifyShrine") {
      pixelRect(x + 2, y + 4, 18, 22, "#49684d", "#273052");
      ctx.fillStyle = "#55e8ff";
      ctx.fillRect(x + 8, y + 10, 6, 6);
      return;
    }
    if (obj.kind === "biomeChest") {
      pixelRect(x, y + 3, obj.width, obj.height - 3, obj.opened ? "#76708e" : "#b87955");
      ctx.fillStyle = obj.opened ? "#55e8ff" : "#fff264";
      ctx.fillRect(x + 8, y + 8, 10, 6);
      return;
    }
    // fallback generico.
    pixelRect(x, y, obj.width, obj.height, "#9ba1ad");
  }

  const drawCollectibleBeforeBiomePatch = drawCollectible;
  drawCollectible = function drawCollectibleBiomePatch(obj) {
    if (obj.item === "cristalSolar") {
      const x = obj.x; const y = obj.y + Math.sin(performance.now() / 240) * 1.5;
      ctx.fillStyle = "#fff264";
      ctx.fillRect(x + 6, y + 1, 6, 16);
      ctx.fillRect(x + 3, y + 5, 12, 8);
      ctx.fillStyle = "#ffb347";
      ctx.fillRect(x + 7, y + 4, 4, 8);
      return;
    }
    if (obj.item === "cristalGelo") {
      const x = obj.x; const y = obj.y + Math.sin(performance.now() / 240) * 1.5;
      ctx.fillStyle = "#8bcfff";
      ctx.fillRect(x + 7, y + 1, 4, 16);
      ctx.fillRect(x + 4, y + 6, 10, 6);
      ctx.fillStyle = "#e9ffff";
      ctx.fillRect(x + 8, y + 4, 2, 8);
      return;
    }
    if (obj.item === "ervaVenenosa") {
      const x = obj.x; const y = obj.y + Math.sin(performance.now() / 240) * 1.5;
      ctx.fillStyle = "#26794d";
      ctx.fillRect(x + 8, y + 2, 2, 14);
      ctx.fillRect(x + 5, y + 7, 8, 4);
      ctx.fillStyle = "#9aff72";
      ctx.fillRect(x + 4, y + 4, 10, 4);
      return;
    }
    drawCollectibleBeforeBiomePatch(obj);
  };

  const getEnemyStatsBeforeBiomePatch = getEnemyStats;
  getEnemyStats = function getEnemyStatsBiomePatch(kind) {
    const base = getEnemyStatsBeforeBiomePatch(kind);
    const extra = {
      escorpiao: { width: 26, height: 18, hp: 5, damage: 1, speed: 62, aggroRange: 220, attackRange: 28, attackDelay: 0.92, coinReward: 8, dropTable: { coin: 0.9, potion: 0.08, powerUp: 0.14, loot: 0.25 }, xpReward: 12 },
      serpenteDeserto: { width: 32, height: 18, hp: 6, damage: 1, speed: 70, aggroRange: 240, attackRange: 34, attackDelay: 0.9, coinReward: 9, dropTable: { coin: 0.95, potion: 0.08, powerUp: 0.18, loot: 0.28 }, xpReward: 14 },
      mumia: { width: 22, height: 30, hp: 7, damage: 2, speed: 38, aggroRange: 210, attackRange: 28, attackDelay: 1.15, coinReward: 11, dropTable: { coin: 1, potion: 0.12, powerUp: 0.12, loot: 0.3 }, xpReward: 20 },
      esqueletoArqueiro: { width: 22, height: 28, hp: 6, damage: 1, speed: 48, aggroRange: 280, attackRange: 230, attackDelay: 1.3, coinReward: 12, projectileType: "arrow", dropTable: { coin: 1, potion: 0.1, powerUp: 0.16, loot: 0.32 }, xpReward: 18 },
      golemAreia: { width: 32, height: 34, hp: 12, damage: 2, speed: 32, aggroRange: 250, attackRange: 36, attackDelay: 1.35, coinReward: 15, defense: 1, projectileType: "sandBolt", dropTable: { coin: 1, potion: 0.18, powerUp: 0.22, loot: 0.38 }, xpReward: 26 },
      besouroGigante: { width: 26, height: 20, hp: 8, damage: 2, speed: 54, aggroRange: 220, attackRange: 32, attackDelay: 1.0, coinReward: 12, dropTable: { coin: 1, potion: 0.12, powerUp: 0.16, loot: 0.3 }, xpReward: 18 },
      faraoAreia: { width: 34, height: 42, hp: 54, damage: 3, speed: 44, aggroRange: 390, attackRange: 260, attackDelay: 1.05, coinReward: 85, boss: true, bossItem: "Coroa Solar", projectileType: "sandBolt", dropTable: { coin: 1, potion: 1, powerUp: 1, loot: 1 }, xpReward: 80 },
      loboGelo: { width: 28, height: 18, hp: 6, damage: 1, speed: 74, aggroRange: 250, attackRange: 30, attackDelay: 0.88, coinReward: 10, dropTable: { coin: 0.9, potion: 0.08, powerUp: 0.15, loot: 0.26 }, xpReward: 14 },
      loboBranco: { width: 30, height: 20, hp: 12, damage: 2, speed: 84, aggroRange: 290, attackRange: 32, attackDelay: 0.82, coinReward: 18, dropTable: { coin: 1, potion: 0.2, powerUp: 0.25, loot: 0.34 }, xpReward: 26 },
      slimeGelo: { width: 24, height: 21, hp: 5, damage: 1, speed: 44, aggroRange: 220, attackRange: 150, attackDelay: 1.32, coinReward: 8, projectileType: "iceShard", dropTable: { coin: 0.8, potion: 0.1, powerUp: 0.18, loot: 0.28 }, xpReward: 14 },
      espiritoCongelado: { width: 24, height: 28, hp: 6, damage: 1, speed: 62, aggroRange: 290, attackRange: 210, attackDelay: 1.22, coinReward: 12, canFly: true, projectileType: "iceShard", dropTable: { coin: 0.9, potion: 0.12, powerUp: 0.2, loot: 0.28 }, xpReward: 20 },
      morcegoNeve: { width: 24, height: 18, hp: 3, damage: 1, speed: 86, aggroRange: 250, attackRange: 28, attackDelay: 0.9, coinReward: 8, canFly: true, dropTable: { coin: 0.8, potion: 0.08, powerUp: 0.12, loot: 0.24 }, xpReward: 12 },
      golemGelo: { width: 32, height: 34, hp: 14, damage: 2, speed: 30, aggroRange: 250, attackRange: 185, attackDelay: 1.4, coinReward: 16, defense: 1, projectileType: "iceShard", dropTable: { coin: 1, potion: 0.16, powerUp: 0.2, loot: 0.34 }, xpReward: 28 },
      arqueiroCongelado: { width: 22, height: 28, hp: 6, damage: 1, speed: 48, aggroRange: 290, attackRange: 240, attackDelay: 1.3, coinReward: 13, projectileType: "iceArrow", dropTable: { coin: 1, potion: 0.12, powerUp: 0.18, loot: 0.32 }, xpReward: 18 },
      yetiAncestral: { width: 44, height: 46, hp: 58, damage: 3, speed: 36, aggroRange: 390, attackRange: 250, attackDelay: 1.15, coinReward: 88, boss: true, bossItem: "Pelagem Ancestral", projectileType: "iceShard", dropTable: { coin: 1, potion: 1, powerUp: 1, loot: 1 }, xpReward: 84 },
      sapoGigante: { width: 28, height: 20, hp: 7, damage: 1, speed: 56, aggroRange: 210, attackRange: 28, attackDelay: 0.95, coinReward: 9, dropTable: { coin: 0.9, potion: 0.08, powerUp: 0.16, loot: 0.26 }, xpReward: 15 },
      mosquitoVenenoso: { width: 18, height: 18, hp: 3, damage: 1, speed: 94, aggroRange: 250, attackRange: 155, attackDelay: 1.0, coinReward: 7, canFly: true, projectileType: "poison", dropTable: { coin: 0.8, potion: 0.06, powerUp: 0.12, loot: 0.18 }, xpReward: 12 },
      slimeToxico: { width: 24, height: 21, hp: 6, damage: 1, speed: 46, aggroRange: 230, attackRange: 150, attackDelay: 1.25, coinReward: 9, projectileType: "poison", dropTable: { coin: 0.9, potion: 0.1, powerUp: 0.18, loot: 0.28 }, xpReward: 15 },
      bruxaPantano: { width: 24, height: 32, hp: 8, damage: 2, speed: 42, aggroRange: 280, attackRange: 225, attackDelay: 1.25, coinReward: 14, projectileType: "poison", dropTable: { coin: 1, potion: 0.16, powerUp: 0.2, loot: 0.32 }, xpReward: 24 },
      zumbiLama: { width: 22, height: 30, hp: 8, damage: 2, speed: 34, aggroRange: 220, attackRange: 28, attackDelay: 1.18, coinReward: 10, dropTable: { coin: 1, potion: 0.1, powerUp: 0.12, loot: 0.24 }, xpReward: 18 },
      serpenteAquatica: { width: 34, height: 18, hp: 7, damage: 2, speed: 72, aggroRange: 250, attackRange: 34, attackDelay: 0.95, coinReward: 12, canSwim: true, projectileType: "poison", dropTable: { coin: 1, potion: 0.12, powerUp: 0.16, loot: 0.28 }, xpReward: 18 },
      bruxaDoPantano: { width: 34, height: 40, hp: 56, damage: 3, speed: 44, aggroRange: 390, attackRange: 260, attackDelay: 1.05, coinReward: 82, boss: true, bossItem: "Lagrima do Brejo", projectileType: "poison", dropTable: { coin: 1, potion: 1, powerUp: 1, loot: 1 }, xpReward: 82 }
    };
    return extra[kind] || base;
  };

  const getEnemyProjectileConfigBeforeBiomePatch = getEnemyProjectileConfig;
  getEnemyProjectileConfig = function getEnemyProjectileConfigBiomePatch(type, obj) {
    const existing = getEnemyProjectileConfigBeforeBiomePatch(type, obj);
    if (existing && !["sandBolt", "iceShard", "iceArrow", "poison"].includes(type)) return existing;
    const bossBoost = obj?.boss ? 1.18 : 1;
    const extraConfigs = {
      sandBolt: { width: 13, height: 13, speed: 180 * bossBoost, timer: 2.2 },
      iceShard: { width: 12, height: 12, speed: 185 * bossBoost, timer: 2.2 },
      iceArrow: { width: 14, height: 5, speed: 220 * bossBoost, timer: 2.1 },
      poison: { width: 12, height: 12, speed: 175 * bossBoost, timer: 2.1 }
    };
    return extraConfigs[type] || existing;
  };

  const getEnemyProjectileColorBeforeBiomePatch = getEnemyProjectileColor;
  getEnemyProjectileColor = function getEnemyProjectileColorBiomePatch(type) {
    if (type === "sandBolt") return { glow: "rgba(231, 192, 103, 0.34)", main: "#ddb45c", core: "#fff3d6" };
    if (type === "iceShard" || type === "iceArrow") return { glow: "rgba(139, 207, 255, 0.34)", main: "#8bcfff", core: "#e9ffff" };
    if (type === "poison") return { glow: "rgba(154, 255, 114, 0.34)", main: "#6fc95d", core: "#e9ffcb" };
    return getEnemyProjectileColorBeforeBiomePatch(type);
  };

  const fireBossPatternBeforeBiomePatch = fireBossPattern;
  fireBossPattern = function fireBossPatternBiomePatch(obj, targetX, targetY) {
    if (obj.kind === "faraoAreia") {
      for (const offset of [-0.35, 0, 0.35]) fireEnemyProjectile(obj, targetX, targetY, offset);
      spawnHazardZone("sandstorm", targetX, targetY, 42, 1.9, 1);
      return;
    }
    if (obj.kind === "yetiAncestral") {
      for (const offset of [-0.28, 0.28]) fireEnemyProjectile(obj, targetX, targetY, offset);
      spawnHazardZone("frost", targetX, targetY, 46, 1.8, 1);
      return;
    }
    if (obj.kind === "bruxaDoPantano") {
      for (const offset of [-0.42, 0, 0.42]) fireEnemyProjectile(obj, targetX, targetY, offset);
      spawnHazardZone("poisonCloud", targetX, targetY, 46, 2.1, 1);
      return;
    }
    fireBossPatternBeforeBiomePatch(obj, targetX, targetY);
  };

  const updateEnemiesBeforeBiomePatch = updateEnemies;
  updateEnemies = function updateEnemiesBiomePatch(delta) {
    updateEnemiesBeforeBiomePatch(delta);
    if (currentScene !== "village") return;
    for (const obj of villageObjects) {
      if (obj.type !== "enemy" || !obj.alive) continue;
      if (obj.kind === "slimeToxico" && obj.state === "chase" && Math.random() < delta * 0.45) {
        spawnHazardZone("poisonCloud", obj.x + obj.width / 2, obj.y + obj.height / 2, 28, 1.6, 1);
      }
      if (obj.kind === "golemAreia" && obj.state === "chase" && Math.random() < delta * 0.35) {
        spawnHazardZone("sandstorm", obj.x + obj.width / 2, obj.y + obj.height / 2, 28, 1.5, 1);
      }
      if ((obj.kind === "golemGelo" || obj.kind === "yetiAncestral") && obj.state === "chase" && Math.random() < delta * 0.28) {
        spawnHazardZone("frost", obj.x + obj.width / 2, obj.y + obj.height / 2, 28, 1.6, 1);
      }
    }
  };

  const drawHazardsBeforeBiomePatch = drawHazards;
  drawHazards = function drawHazardsBiomePatch() {
    drawHazardsBeforeBiomePatch();
    for (const obj of hazardZones) {
      const alpha = Math.max(0, obj.timer / obj.maxTimer);
      if (obj.type === "sandstorm") {
        ctx.strokeStyle = `rgba(231, 192, 103, ${0.45 * alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (obj.type === "frost") {
        ctx.strokeStyle = `rgba(139, 207, 255, ${0.55 * alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (obj.type === "poisonCloud") {
        ctx.fillStyle = `rgba(154, 255, 114, ${0.18 * alpha})`;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const getEnemyXpRewardBeforeBiomePatch = getEnemyXpReward;
  getEnemyXpReward = function getEnemyXpRewardBiomePatch(obj) {
    const extraRewards = {
      escorpiao: 40, serpenteDeserto: 45, mumia: 55, esqueletoArqueiro: 55, golemAreia: 70, besouroGigante: 50, faraoAreia: 1400,
      loboGelo: 40, loboBranco: 80, slimeGelo: 42, espiritoCongelado: 58, morcegoNeve: 36, golemGelo: 75, arqueiroCongelado: 60, yetiAncestral: 1500,
      sapoGigante: 42, mosquitoVenenoso: 34, slimeToxico: 44, bruxaPantano: 62, zumbiLama: 50, serpenteAquatica: 52, bruxaDoPantano: 1480
    };
    if (extraRewards[obj.kind]) return extraRewards[obj.kind];
    return getEnemyXpRewardBeforeBiomePatch(obj);
  };

  const getEnemyDisplayNameBeforeBiomePatch = getEnemyDisplayName;
  getEnemyDisplayName = function getEnemyDisplayNameBiomePatch(kind) {
    const extraNames = {
      escorpiao: "Escorpiao", serpenteDeserto: "Serpente do Deserto", mumia: "Mumia", esqueletoArqueiro: "Esqueleto Arqueiro", golemAreia: "Golem de Areia", besouroGigante: "Besouro Gigante", faraoAreia: "Farao de Areia",
      loboGelo: "Lobo de Gelo", loboBranco: "Lobo Branco", slimeGelo: "Slime de Gelo", espiritoCongelado: "Espirito Congelado", morcegoNeve: "Morcego de Neve", golemGelo: "Golem de Gelo", arqueiroCongelado: "Arqueiro Congelado", yetiAncestral: "Yeti Ancestral",
      sapoGigante: "Sapo Gigante", mosquitoVenenoso: "Mosquito Venenoso", slimeToxico: "Slime Toxico", bruxaPantano: "Bruxa do Pantano", zumbiLama: "Zumbi Enlameado", serpenteAquatica: "Serpente Aquatica", bruxaDoPantano: "Bruxa do Pantano"
    };
    return extraNames[kind] || getEnemyDisplayNameBeforeBiomePatch(kind);
  };

  const drawEnemyBeforeBiomePatch = drawEnemy;
  drawEnemy = function drawEnemyBiomePatch(obj) {
    drawEnemyBeforeBiomePatch(obj);
    if (["escorpiao", "besouroGigante"].includes(obj.kind)) {
      fillPixelV2(obj.x + 4, obj.y + 5, obj.width - 8, 4, "#8f5a3f");
    }
    if (["mumia", "esqueletoArqueiro"].includes(obj.kind)) {
      fillPixelV2(obj.x + 6, obj.y + 4, obj.width - 12, 6, "#e9dfcd");
    }
    if (["loboGelo", "loboBranco", "slimeGelo", "golemGelo", "yetiAncestral"].includes(obj.kind)) {
      fillPixelV2(obj.x + 5, obj.y + 5, Math.max(8, obj.width - 10), 4, "rgba(233,255,255,0.75)");
    }
    if (["mosquitoVenenoso", "slimeToxico", "bruxaPantano", "bruxaDoPantano"].includes(obj.kind)) {
      fillPixelV2(obj.x + 5, obj.y + 6, Math.max(8, obj.width - 10), 4, "rgba(154,255,114,0.65)");
    }
  };

  const defeatEnemyBeforeBiomePatch = defeatEnemy;
  defeatEnemy = function defeatEnemyBiomePatch(obj) {
    defeatEnemyBeforeBiomePatch(obj);
    ensureBiomeQuestBook();
    if (obj.kind === "escorpiao") questBook.biomeMissions.desert.scorpions = Math.min(5, questBook.biomeMissions.desert.scorpions + 1);
    if (obj.kind === "loboBranco") questBook.biomeMissions.frozen.whiteWolfDefeated = true;
    if (obj.kind === "sapoGigante") questBook.biomeMissions.swamp.giantFrogs = Math.min(4, questBook.biomeMissions.swamp.giantFrogs + 1);
    if (["faraoAreia", "yetiAncestral", "bruxaDoPantano"].includes(obj.kind)) {
      spawnFloatingText("Bau liberado!", obj.x, obj.y - 46, "#55e8ff");
      playSound("chest");
    }
  };

  const findInteractionBeforeBiomePatch = findInteraction;
  findInteraction = function findInteractionBiomePatch() {
    const found = findInteractionBeforeBiomePatch();
    return found;
  };

  function openBiomeChest(obj) {
    ensureBiomeQuestBook();
    ensureBiomeInventory();
    if (obj.opened || questBook.biomeMissions.chests[obj.chestId]) {
      return `${obj.message}: este bau ja foi aberto.`;
    }
    const bossRequired = obj.chestId === "desert" ? "faraoAreia" : obj.chestId === "frozen" ? "yetiAncestral" : "bruxaDoPantano";
    if (!questBook.defeatedBosses?.[bossRequired]) {
      return `${obj.message}: o selo do chefe ainda nao foi quebrado.`;
    }
    obj.opened = true;
    questBook.biomeMissions.chests[obj.chestId] = true;
    inventory.moedas += 35;
    inventory.pocoes += 1;
    for (const itemName of obj.rewardItems || []) grantUniqueRelic(itemName);
    awardXp(500, `Bau ${obj.chestId}`);
    playSound("chest");
    renderInventory();
    updateHud();
    return `${obj.message} aberto! Voce recebeu 35 moedas, 1 pocao e os itens: ${(obj.rewardItems || []).join(", ")}.`;
  }

  const getQuestMessageBeforeBiomePatch = getQuestMessage;
  getQuestMessage = function getQuestMessageBiomePatch(npcObj) {
    ensureBiomeQuestBook();
    if (npcObj.type === "biomeFeature" && npcObj.role === "desertOasis") {
      questBook.biomeMissions.desert.oasisFound = true;
      awardXp(150, "Oasis perdido");
      return npcObj.message;
    }
    if (npcObj.type === "biomeFeature" && npcObj.role === "sunTemple") {
      questBook.biomeMissions.desert.pyramidOpened = true;
      awardXp(150, "Piramide antiga");
      return npcObj.message;
    }
    if (npcObj.type === "biomeFeature" && npcObj.role === "frozenTorch") {
      if (!npcObj.lit) {
        npcObj.lit = true;
        questBook.biomeMissions.frozen.torches = Math.min(4, questBook.biomeMissions.frozen.torches + 1);
        playSound("crystal");
        awardXp(70, "Tocha acesa");
        return `Tocha congelada acesa! Progresso: ${questBook.biomeMissions.frozen.torches}/4.`;
      }
      return `Tocha congelada: ela ja esta acesa. Progresso: ${questBook.biomeMissions.frozen.torches}/4.`;
    }
    if (npcObj.type === "npc" && npcObj.role === "frozenVictim") {
      if (!questBook.biomeMissions.frozen.npcRescued && questBook.biomeMissions.frozen.torches >= 4) {
        questBook.biomeMissions.frozen.npcRescued = true;
        inventory.moedas += 12;
        awardXp(250, "NPC salvo no gelo");
        npcObj.message = "Eirik: Voce me salvou! Tome estas moedas e meu respeito.";
        return "Eirik: O calor das tochas me libertou! Receba 12 moedas pela ajuda.";
      }
      return npcObj.message;
    }
    if (npcObj.type === "biomeFeature" && npcObj.role === "witchCabin") {
      questBook.biomeMissions.swamp.witchCabinFound = true;
      awardXp(120, "Cabana da bruxa");
      return npcObj.message;
    }
    if (npcObj.type === "biomeFeature" && npcObj.role === "purifyShrine") {
      if (!questBook.biomeMissions.swamp.waterPurified && questBook.biomeMissions.swamp.poisonousHerbs >= 3) {
        questBook.biomeMissions.swamp.waterPurified = true;
        awardXp(220, "Agua purificada");
        return "Totem do Brejo: a agua do pantano foi purificada por enquanto.";
      }
      if (questBook.biomeMissions.swamp.waterPurified) return "Totem do Brejo: a agua segue purificada.";
      return "Totem do Brejo: colete ao menos 3 ervas venenosas antes de tentar purificar a agua.";
    }
    if (npcObj.type === "biomeFeature" && npcObj.role === "biomeChest") {
      return openBiomeChest(npcObj);
    }
    if (npcObj.type === "npc" && npcObj.role === "desertGuide") {
      return `Sahir: Oasis ${questBook.biomeMissions.desert.oasisFound ? "ok" : "pendente"} | Escorpioes ${questBook.biomeMissions.desert.scorpions}/5 | Piramide ${questBook.biomeMissions.desert.pyramidOpened ? "aberta" : "fechada"} | Cristal solar ${questBook.biomeMissions.desert.crystalSolar ? "coletado" : "perdido"}.`;
    }
    if (npcObj.type === "npc" && npcObj.role === "frozenGuide") {
      return `Astrid: Tochas ${questBook.biomeMissions.frozen.torches}/4 | Cristais de gelo ${questBook.biomeMissions.frozen.iceCrystals}/5 | Lobo branco ${questBook.biomeMissions.frozen.whiteWolfDefeated ? "derrotado" : "vivo"} | NPC ${questBook.biomeMissions.frozen.npcRescued ? "salvo" : "preso"}.`;
    }
    if (npcObj.type === "npc" && npcObj.role === "swampGuide") {
      return `Mora: Ervas ${questBook.biomeMissions.swamp.poisonousHerbs}/5 | Cabana ${questBook.biomeMissions.swamp.witchCabinFound ? "achada" : "oculta"} | Agua ${questBook.biomeMissions.swamp.waterPurified ? "purificada" : "toxica"} | Sapos ${questBook.biomeMissions.swamp.giantFrogs}/4.`;
    }
    return getQuestMessageBeforeBiomePatch(npcObj);
  };

  const collectWorldItemsBeforeBiomePatch = collectWorldItems;
  collectWorldItems = function collectWorldItemsBiomePatch() {
    ensureBiomeQuestBook();
    const playerRect = getPlayerRect();
    const pendingCustomCollects = villageObjects
      .filter((obj) => obj.type === "collectible" && !obj.collected && rectsOverlap(playerRect, obj) && ["cristalSolar", "cristalGelo", "ervaVenenosa"].includes(obj.item))
      .map((obj) => ({ key: getSaveObjectKey(obj), item: obj.item }));
    collectWorldItemsBeforeBiomePatch();
    let changed = false;
    for (const pending of pendingCustomCollects) {
      const obj = villageObjects.find((entry) => getSaveObjectKey(entry) === pending.key);
      if (!obj || !obj.collected) continue;
      if (pending.item === "cristalSolar" && !questBook.biomeMissions.desert.crystalSolar) {
        questBook.biomeMissions.desert.crystalSolar = true;
        grantUniqueRelic("Cristal Solar");
        awardXp(180, "Cristal Solar");
        playSound("crystal");
        changed = true;
      }
      if (pending.item === "cristalGelo") {
        questBook.biomeMissions.frozen.iceCrystals = Math.min(5, questBook.biomeMissions.frozen.iceCrystals + 1);
        awardXp(50, "Cristal de Gelo");
        changed = true;
      }
      if (pending.item === "ervaVenenosa") {
        questBook.biomeMissions.swamp.poisonousHerbs = Math.min(5, questBook.biomeMissions.swamp.poisonousHerbs + 1);
        awardXp(50, "Erva venenosa");
        changed = true;
      }
    }
    if (changed) {
      updateHud();
      renderInventory();
    }
  };

  const getPlayerSpeedBeforeBiomePatch = getPlayerSpeed;
  getPlayerSpeed = function getPlayerSpeedBiomePatch() {
    let speed = getPlayerSpeedBeforeBiomePatch();
    if (currentScene !== "village") return speed;
    const tileX = Math.floor((player.x + player.width / 2) / TILE);
    const tileY = Math.floor((player.y + player.height / 2) / TILE);
    const tile = getMapTileAt(tileX, tileY);
    if (tile === ENV_TILES.quicksand) speed *= hasRelic("Botas do Deserto") ? 0.9 : 0.55;
    if (tile === ENV_TILES.mud) speed *= hasRelic("Anel contra Veneno") ? 0.88 : 0.62;
    if (tile === ENV_TILES.ice) speed *= hasRelic("Botas Antiderrapantes") ? 1.05 : 1.12;
    return speed;
  };

  let biomeTickTimer = 0;
  const updateBeforeBiomePatch = update;
  update = function updateBiomePatch(delta) {
    updateBeforeBiomePatch(delta);
    if (!gameStarted || gameOver || currentScene !== "village") return;
    ensureBiomeQuestBook();
    biomeTickTimer = Math.max(0, biomeTickTimer - delta);
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;
    const tileX = Math.floor(centerX / TILE);
    const tileY = Math.floor(centerY / TILE);
    const tile = getMapTileAt(tileX, tileY);

    if (tile === ENV_TILES.ice && player.moving) {
      const step = directionVector(player.direction);
      const slideBoost = hasRelic("Botas Antiderrapantes") ? 6 : 18;
      const nextX = player.x + step.x * slideBoost * delta;
      const nextY = player.y + step.y * slideBoost * delta;
      if (canMoveTo(nextX, player.y)) player.x = nextX;
      if (canMoveTo(player.x, nextY)) player.y = nextY;
    }

    for (const obj of villageObjects) {
      if (obj.type !== "biomeFeature" || !obj.damageOnTouch) continue;
      if (rectsOverlap(getPlayerRect(), obj) && biomeTickTimer <= 0 && damageCooldown <= 0) {
        takeDamage(obj.damageOnTouch, obj.x + obj.width / 2, obj.y + obj.height / 2);
        biomeTickTimer = 0.9;
      }
    }

    if (tile === ENV_TILES.quicksand && biomeTickTimer <= 0 && damageCooldown <= 0) {
      takeDamage(1, centerX, centerY);
      spawnFloatingText("Areia movedica!", centerX, centerY - 20, "#fff264");
      biomeTickTimer = 1.1;
    }
    if ((tile === ENV_TILES.toxicWater || tile === ENV_TILES.mud) && biomeTickTimer <= 0 && damageCooldown <= 0 && !hasRelic("Anel contra Veneno")) {
      takeDamage(1, centerX, centerY);
      spawnFloatingText(tile === ENV_TILES.toxicWater ? "Agua venenosa!" : "Lama pesada!", centerX, centerY - 20, "#9aff72");
      biomeTickTimer = 1.1;
    }
    if (Array.isArray(hazardZones)) {
      for (const hazard of hazardZones) {
        if (!hazard || hazard.timer <= 0) continue;
        const distance = Math.hypot(centerX - hazard.x, centerY - hazard.y);
        if (distance <= hazard.radius && biomeTickTimer <= 0 && damageCooldown <= 0 && ["sandstorm", "frost", "poisonCloud"].includes(hazard.type)) {
          takeDamage(hazard.damage || 1, hazard.x, hazard.y);
          biomeTickTimer = 1.0;
        }
      }
    }
    camera.x = clamp(player.x + player.width / 2 - canvas.width / 2, 0, getSceneWidth() - canvas.width);
    camera.y = clamp(player.y + player.height / 2 - canvas.height / 2, 0, getSceneHeight() - canvas.height);
    playerPositionEl.textContent = getAreaName();
  };

  const getAreaNameBeforeBiomePatch = getAreaName;
  getAreaName = function getAreaNameBiomePatch() {
    if (currentScene !== "village") return getSceneName();
    const tileX = Math.floor(player.x / TILE);
    const tileY = Math.floor(player.y / TILE);
    if (biomeContains(BIOME_BOUNDS.desert, tileX, tileY)) return "Vila do Deserto";
    if (biomeContains(BIOME_BOUNDS.frozen, tileX, tileY)) return "Vila Congelada";
    if (biomeContains(BIOME_BOUNDS.swamp, tileX, tileY)) return "Pantano dos Sussurros";
    return getAreaNameBeforeBiomePatch();
  };

  const renderMissionsPanelBeforeBiomePatch = renderMissionsPanel;
  renderMissionsPanel = function renderMissionsPanelBiomePatch() {
    renderMissionsPanelBeforeBiomePatch();
    ensureBiomeQuestBook();
    if (!missionsList) return;
    const extraRows = [
      `<li><span>Deserto</span><strong>Oasis ${questBook.biomeMissions.desert.oasisFound ? "ok" : "?"} | Escorpioes ${questBook.biomeMissions.desert.scorpions}/5 | Piramide ${questBook.biomeMissions.desert.pyramidOpened ? "ok" : "?"} | Cristal ${questBook.biomeMissions.desert.crystalSolar ? "ok" : "?"}</strong></li>`,
      `<li><span>Congelado</span><strong>Tochas ${questBook.biomeMissions.frozen.torches}/4 | Cristais ${questBook.biomeMissions.frozen.iceCrystals}/5 | Lobo branco ${questBook.biomeMissions.frozen.whiteWolfDefeated ? "ok" : "?"} | NPC ${questBook.biomeMissions.frozen.npcRescued ? "ok" : "?"}</strong></li>`,
      `<li><span>Pantano</span><strong>Ervas ${questBook.biomeMissions.swamp.poisonousHerbs}/5 | Cabana ${questBook.biomeMissions.swamp.witchCabinFound ? "ok" : "?"} | Agua ${questBook.biomeMissions.swamp.waterPurified ? "ok" : "?"} | Sapos ${questBook.biomeMissions.swamp.giantFrogs}/4</strong></li>`
    ];
    missionsList.innerHTML += extraRows.join("");
  };

  const getCompactMissionTextBeforeBiomePatch = getCompactMissionText;
  getCompactMissionText = function getCompactMissionTextBiomePatch() {
    ensureBiomeQuestBook();
    const area = getAreaName();
    if (area === "Vila do Deserto") {
      if (!questBook.biomeMissions.desert.oasisFound) return "Deserto: ache o oasis perdido";
      if (questBook.biomeMissions.desert.scorpions < 5) return `Deserto: escorpioes ${questBook.biomeMissions.desert.scorpions}/5`;
      if (!questBook.biomeMissions.desert.pyramidOpened) return "Deserto: abra a piramide antiga";
      if (!questBook.biomeMissions.desert.crystalSolar) return "Deserto: pegue o cristal solar";
    }
    if (area === "Vila Congelada") {
      if (questBook.biomeMissions.frozen.torches < 4) return `Gelo: tochas ${questBook.biomeMissions.frozen.torches}/4`;
      if (!questBook.biomeMissions.frozen.whiteWolfDefeated) return "Gelo: derrote o lobo branco";
      if (questBook.biomeMissions.frozen.iceCrystals < 5) return `Gelo: cristais ${questBook.biomeMissions.frozen.iceCrystals}/5`;
      if (!questBook.biomeMissions.frozen.npcRescued) return "Gelo: salve o NPC preso";
    }
    if (area === "Pantano dos Sussurros") {
      if (questBook.biomeMissions.swamp.poisonousHerbs < 5) return `Pantano: ervas ${questBook.biomeMissions.swamp.poisonousHerbs}/5`;
      if (!questBook.biomeMissions.swamp.witchCabinFound) return "Pantano: ache a cabana da bruxa";
      if (!questBook.biomeMissions.swamp.waterPurified) return "Pantano: purifique a agua";
      if (questBook.biomeMissions.swamp.giantFrogs < 4) return `Pantano: sapos ${questBook.biomeMissions.swamp.giantFrogs}/4`;
    }
    return getCompactMissionTextBeforeBiomePatch();
  };

  const getInventoryItemsBeforeBiomePatch = getInventoryItems;
  getInventoryItems = function getInventoryItemsBiomePatch() {
    const items = getInventoryItemsBeforeBiomePatch();
    ensureBiomeInventory();
    for (const relic of inventory.biomeRelics) {
      items.push({
        id: `relic-${String(relic).replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
        name: relic,
        icon: "R",
        quantity: 1,
        category: "raros",
        typeLabel: "Bioma",
        rarity: "lendario",
        description: "Item unico obtido nas novas regioes expandidas do mapa.",
        effect: "Recompensa especial das aventuras pelos novos biomas.",
        locked: true
      });
    }
    return items;
  };

  const drawMiniMapBeforeBiomePatch = drawMiniMap;
  drawMiniMap = function drawMiniMapBiomePatch() {
    if (currentScene !== "village") {
      drawMiniMapBeforeBiomePatch();
      return;
    }
    miniCtx.clearRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);
    miniCtx.fillStyle = "rgba(39, 48, 82, 0.95)";
    miniCtx.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);
    const sx = miniMapCanvas.width / EXT_WORLD_WIDTH;
    const sy = miniMapCanvas.height / EXT_WORLD_HEIGHT;
    for (let y = 0; y < getVillageMapRows(); y++) {
      for (let x = 0; x < getVillageMapCols(); x++) {
        const tile = worldMap[y][x];
        let color = "#82dc83";
        if (tile === "W") color = "#48a7e6";
        else if (tile === ENV_TILES.sand || tile === ENV_TILES.quicksand) color = "#ddb45c";
        else if (tile === ENV_TILES.snow || tile === ENV_TILES.ice) color = tile === ENV_TILES.ice ? "#bfe6ff" : "#edf5ff";
        else if (tile === ENV_TILES.swamp || tile === ENV_TILES.mud || tile === ENV_TILES.toxicWater) color = tile === ENV_TILES.toxicWater ? "#4f8f66" : "#4c674d";
        else if (tile === "D") color = "#9c5744";
        else if (tile === "P") color = "#f2c27d";
        miniCtx.fillStyle = color;
        miniCtx.fillRect(x * TILE * sx, y * TILE * sy, Math.ceil(TILE * sx), Math.ceil(TILE * sy));
      }
    }
    miniCtx.fillStyle = "#fff264";
    for (const obj of villageObjects) {
      if (["house", "playerHouse", "shop"].includes(obj.type)) {
        miniCtx.fillRect(obj.x * sx, obj.y * sy, Math.max(2, obj.width * sx), Math.max(2, obj.height * sy));
      }
      if (obj.type === "biomeFeature" && ["sunTemple", "igloo", "abandonedHouse", "woodLodge", "oasis"].includes(obj.kind)) {
        miniCtx.fillRect(obj.x * sx, obj.y * sy, Math.max(2, obj.width * sx), Math.max(2, obj.height * sy));
      }
    }
    miniCtx.fillStyle = "#ff4f62";
    for (const obj of villageObjects) {
      if (obj.type === "enemy" && obj.boss && obj.alive) miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 6, 6);
    }
    miniCtx.fillStyle = "#55e8ff";
    for (const obj of villageObjects) {
      if (obj.type === "npc" && ["Sahir", "Astrid", "Mora"].includes(obj.name)) miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 5, 5);
    }
    miniCtx.fillStyle = "#d24c63";
    miniCtx.fillRect(player.x * sx - 3, player.y * sy - 3, 7, 7);
  };

  if (currentScene === "village") {
    objects = villageObjects;
    colliders = objects.filter((obj) => obj.solid);
    interactables = objects.filter((obj) => obj.message);
  }
}


// === Performance optimization patch for mobile/PC ===
if (typeof window !== "undefined" && !window.ETERNAL_RIFT_PERFORMANCE_PATCH) {
  window.ETERNAL_RIFT_PERFORMANCE_PATCH = true;

  const performanceSettings = {
    lite: urlParams.get("lite") === "1" || urlParams.get("leve") === "1" || Boolean(isMobile) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4),
    fpsMobile: 30,
    fpsPcLite: 45,
    fpsPc: 60,
    minimapCacheMs: 900,
    enemyWakeDistance: 920,
    bossWakeDistance: 1500,
    maxParticlesMobile: 70,
    maxProjectilesMobile: 55,
    maxFloatingTextsMobile: 24
  };

  window.ER_PERFORMANCE = performanceSettings;

  function getPerformanceFps() {
    if (performanceSettings.lite && isMobile) return performanceSettings.fpsMobile;
    if (performanceSettings.lite) return performanceSettings.fpsPcLite;
    return performanceSettings.fpsPc;
  }

  function setLiteMode(enabled, showToastMessage = true) {
    performanceSettings.lite = Boolean(enabled);
    if (showToastMessage && typeof showHudToast === "function") {
      showHudToast(performanceSettings.lite ? "Modo leve ativado" : "Modo leve desativado", 1.8);
    }
  }

  window.ETERNAL_RIFT_SET_LITE_MODE = setLiteMode;

  const updateDeviceModeBeforePerformance = updateDeviceMode;
  updateDeviceMode = function updateDeviceModePerformance() {
    updateDeviceModeBeforePerformance();
    if (isMobile) performanceSettings.lite = true;
  };

  window.addEventListener("keydown", (event) => {
    if (event.key === "F2") {
      event.preventDefault();
      setLiteMode(!performanceSettings.lite, true);
    }
  });

  function distanceToPlayer(obj) {
    const px = player.x + player.width / 2;
    const py = player.y + player.height / 2;
    return Math.hypot((obj.x + obj.width / 2) - px, (obj.y + obj.height / 2) - py);
  }

  function isEnemyAwakeForPerformance(obj) {
    if (!obj || obj.type !== "enemy") return true;
    if (!obj.alive) return true;
    if (isOnCamera(obj, 220)) return true;
    const maxDistance = obj.boss ? performanceSettings.bossWakeDistance : performanceSettings.enemyWakeDistance;
    return distanceToPlayer(obj) <= maxDistance;
  }

  const updateEnemiesBeforePerformance = updateEnemies;
  updateEnemies = function updateEnemiesPerformance(delta) {
    if (!performanceSettings.lite || currentScene !== "village") {
      updateEnemiesBeforePerformance(delta);
      return;
    }

    const originalList = villageObjects.slice();
    const filteredList = originalList.filter((obj) => obj.type !== "enemy" || isEnemyAwakeForPerformance(obj));
    villageObjects.length = 0;
    villageObjects.push(...filteredList);

    try {
      updateEnemiesBeforePerformance(delta);
    } finally {
      villageObjects.length = 0;
      villageObjects.push(...originalList);
    }
  };

  const updateNpcsBeforePerformance = updateNpcs;
  updateNpcs = function updateNpcsPerformance(delta) {
    if (!performanceSettings.lite || currentScene !== "village") {
      updateNpcsBeforePerformance(delta);
      return;
    }

    const originalList = villageObjects.slice();
    const filteredList = originalList.filter((obj) => obj.type !== "npc" || isOnCamera(obj, 420) || distanceToPlayer(obj) < 520);
    villageObjects.length = 0;
    villageObjects.push(...filteredList);

    try {
      updateNpcsBeforePerformance(delta);
    } finally {
      villageObjects.length = 0;
      villageObjects.push(...originalList);
    }
  };

  const updateBeforePerformance = update;
  update = function updatePerformance(delta) {
    updateBeforePerformance(delta);

    if (!performanceSettings.lite) return;

    if (Array.isArray(projectiles) && projectiles.length > performanceSettings.maxProjectilesMobile) {
      projectiles.splice(0, projectiles.length - performanceSettings.maxProjectilesMobile);
    }
    if (Array.isArray(enemyProjectiles) && enemyProjectiles.length > performanceSettings.maxProjectilesMobile) {
      enemyProjectiles.splice(0, enemyProjectiles.length - performanceSettings.maxProjectilesMobile);
    }
    if (Array.isArray(floatingTexts) && floatingTexts.length > performanceSettings.maxFloatingTextsMobile) {
      floatingTexts.splice(0, floatingTexts.length - performanceSettings.maxFloatingTextsMobile);
    }
    if (Array.isArray(hazardZones) && hazardZones.length > 28) {
      hazardZones.splice(0, hazardZones.length - 28);
    }
    if (Array.isArray(dashTrails) && dashTrails.length > 16) {
      dashTrails.splice(0, dashTrails.length - 16);
    }
  };

  const drawSceneGroundOverlayBeforePerformance = typeof drawSceneGroundOverlayV2 === "function" ? drawSceneGroundOverlayV2 : null;
  if (drawSceneGroundOverlayBeforePerformance) {
    let overlaySkip = 0;
    drawSceneGroundOverlayV2 = function drawSceneGroundOverlayPerformance() {
      if (!performanceSettings.lite) {
        drawSceneGroundOverlayBeforePerformance();
        return;
      }

      overlaySkip = (overlaySkip + 1) % (isMobile ? 3 : 2);
      if (overlaySkip !== 0) return;
      drawSceneGroundOverlayBeforePerformance();
    };
  }

  const drawProjectilesBeforePerformance = drawProjectiles;
  drawProjectiles = function drawProjectilesPerformance() {
    if (!performanceSettings.lite) {
      drawProjectilesBeforePerformance();
      return;
    }

    const savedProjectiles = projectiles.slice();
    const savedEnemyProjectiles = enemyProjectiles.slice();
    try {
      projectiles.length = 0;
      projectiles.push(...savedProjectiles.filter((obj) => isOnCamera(obj, 120)));
      enemyProjectiles.length = 0;
      enemyProjectiles.push(...savedEnemyProjectiles.filter((obj) => obj.type === "bossWave" || isOnCamera(obj, 120)));
      drawProjectilesBeforePerformance();
    } finally {
      projectiles.length = 0;
      projectiles.push(...savedProjectiles);
      enemyProjectiles.length = 0;
      enemyProjectiles.push(...savedEnemyProjectiles);
    }
  };

  const drawHazardsBeforePerformance = drawHazards;
  drawHazards = function drawHazardsPerformance() {
    if (!performanceSettings.lite) {
      drawHazardsBeforePerformance();
      return;
    }

    const savedHazards = hazardZones.slice();
    try {
      hazardZones.length = 0;
      hazardZones.push(...savedHazards.filter((obj) => isOnCamera({
        x: obj.x - obj.radius,
        y: obj.y - obj.radius,
        width: obj.radius * 2,
        height: obj.radius * 2
      }, 80)));
      drawHazardsBeforePerformance();
    } finally {
      hazardZones.length = 0;
      hazardZones.push(...savedHazards);
    }
  };

  const minimapCacheCanvas = document.createElement("canvas");
  const minimapCacheCtx = minimapCacheCanvas.getContext("2d");
  let minimapCacheTime = 0;
  let minimapCacheScene = "";
  let minimapCacheWidth = 0;
  let minimapCacheHeight = 0;

  function getMiniTileColor(tile) {
    if (tile === "W") return "#48a7e6";
    if (tile === "A" || tile === "X") return "#ddb45c";
    if (tile === "N") return "#edf5ff";
    if (tile === "L") return "#bfe6ff";
    if (tile === "H" || tile === "U") return "#4c674d";
    if (tile === "V") return "#4f8f66";
    if (tile === "D") return "#9c5744";
    if (tile === "P") return "#f2c27d";
    if (tile === "F") return "#5f9f55";
    return "#82dc83";
  }

  function redrawVillageMinimapBase(sx, sy) {
    minimapCacheCtx.clearRect(0, 0, minimapCacheCanvas.width, minimapCacheCanvas.height);
    minimapCacheCtx.fillStyle = "#82dc83";
    minimapCacheCtx.fillRect(0, 0, minimapCacheCanvas.width, minimapCacheCanvas.height);

    const rows = worldMap.length;
    const cols = worldMap[0]?.length || MAP_COLS;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const tile = worldMap[y][x];
        minimapCacheCtx.fillStyle = getMiniTileColor(tile);
        minimapCacheCtx.fillRect(x * TILE * sx, y * TILE * sy, Math.ceil(TILE * sx), Math.ceil(TILE * sy));
      }
    }

    minimapCacheCtx.fillStyle = "#fff264";
    for (const obj of villageObjects) {
      if (["house", "playerHouse", "shop"].includes(obj.type)) {
        minimapCacheCtx.fillRect(obj.x * sx, obj.y * sy, Math.max(2, obj.width * sx), Math.max(2, obj.height * sy));
      }
      if (obj.type === "biomeFeature" && ["sunTemple", "igloo", "abandonedHouse", "woodLodge", "oasis"].includes(obj.kind)) {
        minimapCacheCtx.fillRect(obj.x * sx, obj.y * sy, Math.max(2, obj.width * sx), Math.max(2, obj.height * sy));
      }
    }
  }

  const drawMiniMapBeforePerformance = drawMiniMap;
  drawMiniMap = function drawMiniMapPerformance() {
    if (currentScene !== "village") {
      drawMiniMapBeforePerformance();
      return;
    }

    const now = performance.now();
    const mapWidth = getSceneWidth();
    const mapHeight = getSceneHeight();
    const sx = miniMapCanvas.width / mapWidth;
    const sy = miniMapCanvas.height / mapHeight;

    if (
      minimapCacheCanvas.width !== miniMapCanvas.width ||
      minimapCacheCanvas.height !== miniMapCanvas.height ||
      minimapCacheScene !== currentScene ||
      minimapCacheWidth !== mapWidth ||
      minimapCacheHeight !== mapHeight ||
      now - minimapCacheTime > performanceSettings.minimapCacheMs
    ) {
      minimapCacheCanvas.width = miniMapCanvas.width;
      minimapCacheCanvas.height = miniMapCanvas.height;
      minimapCacheScene = currentScene;
      minimapCacheWidth = mapWidth;
      minimapCacheHeight = mapHeight;
      minimapCacheTime = now;
      redrawVillageMinimapBase(sx, sy);
    }

    miniCtx.clearRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);
    miniCtx.drawImage(minimapCacheCanvas, 0, 0);

    miniCtx.fillStyle = "#ff4f62";
    for (const obj of villageObjects) {
      if (obj.type === "enemy" && obj.boss && obj.alive) {
        miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 6, 6);
      }
    }

    miniCtx.fillStyle = "#55e8ff";
    for (const obj of villageObjects) {
      if (obj.type === "npc" && ["Nico", "Vendedor", "Beto", "Sahir", "Astrid", "Mora"].includes(obj.name)) {
        miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 5, 5);
      }
    }

    miniCtx.fillStyle = "#d24c63";
    miniCtx.fillRect(player.x * sx - 3, player.y * sy - 3, 7, 7);
  };

  let lastOptimizedFrameTime = 0;
  gameLoop = function gameLoopPerformance(time) {
    const targetFrameMs = 1000 / getPerformanceFps();

    if (time - lastOptimizedFrameTime < targetFrameMs) {
      requestAnimationFrame(gameLoop);
      return;
    }

    lastOptimizedFrameTime = time;
    const delta = Math.min((time - lastTime) / 1000, performanceSettings.lite ? 0.06 : 0.05);
    lastTime = time;

    try {
      update(delta);
      draw();
    } catch (error) {
      showErrorMessage(error);
    }

    requestAnimationFrame(gameLoop);
  };

  if (typeof showHudToast === "function") {
    setTimeout(() => {
      if (performanceSettings.lite) showHudToast("Modo leve automatico ativo. F2 alterna.", 2.4);
    }, 800);
  }
}
