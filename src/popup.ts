import './popup.css';

interface VideoDescriptor {
  index: number;
  label: string;
  width: number;
  height: number;
  playing: boolean;
  currentSpeed: number;
}

interface StoredState {
  lastSpeed: number;
  lastVideoIndex: number;
}

let selectedVideoIndex = 0;
let currentTabId: number | undefined;

async function getActiveTab(): Promise<chrome.tabs.Tab> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function sendToContent<T>(msg: object): Promise<T> {
  if (currentTabId == null) throw new Error('No active tab');
  return chrome.tabs.sendMessage(currentTabId, msg) as Promise<T>;
}

function el<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

function setSliderAndLabel(speed: number): void {
  el<HTMLInputElement>('speed-slider').value = String(speed);
  el('speed-label').textContent = `${speed.toFixed(1)}×`;

  document.querySelectorAll<HTMLElement>('.preset-btn').forEach((btn) => {
    btn.classList.toggle('active', parseFloat(btn.dataset.speed!) === speed);
  });
}

async function applySpeed(speed: number): Promise<void> {
  setSliderAndLabel(speed);
  try {
    await sendToContent({ type: 'SET_SPEED', videoIndex: selectedVideoIndex, speed });
    await chrome.storage.local.set({ lastSpeed: speed, lastVideoIndex: selectedVideoIndex });
  } catch {
    // Tab may have navigated away; ignore silently
  }
}

async function selectVideo(index: number): Promise<void> {
  selectedVideoIndex = index;

  document.querySelectorAll<HTMLElement>('.video-item').forEach((item) => {
    item.classList.toggle('selected', item.dataset.index === String(index));
  });

  try {
    const { speed } = await sendToContent<{ speed: number }>({
      type: 'GET_SPEED',
      videoIndex: index,
    });
    setSliderAndLabel(speed);
  } catch {
    // Ignore
  }

  await chrome.storage.local.set({ lastVideoIndex: index });
}

function renderVideoList(videos: VideoDescriptor[], selectedIdx: number): void {
  const list = el('video-list');
  list.innerHTML = '';

  if (videos.length <= 1) {
    list.classList.add('hidden');
    return;
  }

  list.classList.remove('hidden');
  videos.forEach((v) => {
    const item = document.createElement('div');
    item.className = 'video-item' + (v.index === selectedIdx ? ' selected' : '');
    item.dataset.index = String(v.index);

    const dims = v.width && v.height ? `${v.width}×${v.height}` : '';
    const statusClass = v.playing ? 'playing' : 'paused';
    const statusText = v.playing ? '▶ Playing' : '⏸ Paused';

    item.innerHTML = `
      <span class="video-label">${v.label}</span>
      ${dims ? `<span class="video-meta">${dims}</span>` : ''}
      <span class="video-status ${statusClass}">${statusText}</span>
    `;

    item.addEventListener('click', () => selectVideo(v.index));
    list.appendChild(item);
  });
}

function showControls(): void {
  el('controls').classList.remove('hidden');
  el('no-video').classList.add('hidden');
  el('error-msg').classList.add('hidden');
}

function showNoVideo(): void {
  el('no-video').classList.remove('hidden');
  el('controls').classList.add('hidden');
  el('error-msg').classList.add('hidden');
}

function showError(msg: string): void {
  const errEl = el('error-msg');
  errEl.textContent = msg;
  errEl.classList.remove('hidden');
  el('no-video').classList.add('hidden');
  el('controls').classList.add('hidden');
}

async function init(): Promise<void> {
  const tab = await getActiveTab();
  currentTabId = tab.id;

  const stored = (await chrome.storage.local.get([
    'lastSpeed',
    'lastVideoIndex',
  ])) as Partial<StoredState>;
  const lastSpeed = stored.lastSpeed ?? 1.0;
  const lastVideoIndex = stored.lastVideoIndex ?? 0;

  let videos: VideoDescriptor[] = [];
  try {
    videos = await sendToContent<VideoDescriptor[]>({ type: 'GET_VIDEOS' });
  } catch {
    showError('Cannot connect to this page.\nTry refreshing and reopening.');
    return;
  }

  if (!videos || videos.length === 0) {
    showNoVideo();
    return;
  }

  selectedVideoIndex = Math.min(lastVideoIndex, videos.length - 1);
  renderVideoList(videos, selectedVideoIndex);

  // Prefer the video's live playbackRate over stored speed
  const liveSpeed = videos[selectedVideoIndex]?.currentSpeed ?? lastSpeed;
  setSliderAndLabel(liveSpeed);
  showControls();
}

document.addEventListener('DOMContentLoaded', () => {
  const slider = el<HTMLInputElement>('speed-slider');

  slider.addEventListener('input', () => applySpeed(parseFloat(slider.value)));

  document.querySelectorAll<HTMLElement>('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => applySpeed(parseFloat(btn.dataset.speed!)));
  });

  init();
});
