/**
 * =============================================================================
 * VEFA: FRATERNAL & CIVIC COMMUNITY ENGINE (VERSION 2.3.1 - REFACTORED RELEASE)
 * =============================================================================
 * File: app.js
 * Description: Core reactive engine featuring:
 *              - Admin Community Exchange Manager (Live Inline Edit & Delete)
 *              - Universal Tournament Creation & Annual Year-End Eclipse Engine
 *              - Volunteer Automation with Twilio/SMS Shift Reminders
 *              - Seated Leadership Registry & Trustee Meeting Audit Reports
 *              - Senior / Elderly Accessibility Suite & Speech Synthesizer
 *              - DevOps Hyper-Cockpit Console & REST API Sandbox
 * 
 * Copyright (c) 2027 VEFA: Fraternal & Civic Community Engine.
 * Please contact admin@vefa.club for more information.
 * License: MIT Open Source License (https://opensource.org/licenses/MIT)
 * =============================================================================
 */

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const AppState = {
  config: (function() {
    const saved = localStorage.getItem('fraternal_live_config');
    if (saved) {
      try { return { ...FRATERNAL_CONFIG, ...JSON.parse(saved) }; } catch(e) {}
    }
    return FRATERNAL_CONFIG;
  })(),

  theme: localStorage.getItem('fraternal_theme') || 'dark',
  fontSize: localStorage.getItem('fraternal_font_size') || 'normal',
  seniorMode: localStorage.getItem('fraternal_senior_mode') === 'true',
  highContrast: localStorage.getItem('fraternal_high_contrast') === 'true',
  soundEnabled: localStorage.getItem('fraternal_sound') !== 'false',
  activeCategory: 'all',
  searchQuery: '',
  activePaymentMethod: 'stripe',
  landingGatewayChosen: sessionStorage.getItem('vefa_gateway_chosen') === 'true',

  currentUser: JSON.parse(localStorage.getItem('fraternal_user_session')) || {
    role: 'guest',
    name: 'Community Neighbor',
    badge: 'Visitor',
    memberNumber: null
  },

  exchangeItems: JSON.parse(localStorage.getItem('fraternal_exchange_items')) || GENERIC_SEED_ITEMS,
  auctionItems: JSON.parse(localStorage.getItem('fraternal_auction_items')) || GENERIC_SEED_AUCTIONS,
  landmarks: (typeof GENERIC_SEED_LANDMARKS !== 'undefined') ? GENERIC_SEED_LANDMARKS : [],
  tournamentGames: JSON.parse(localStorage.getItem('fraternal_games')) || GENERIC_SEED_GAMES,
  hallOfFame: JSON.parse(localStorage.getItem('fraternal_hall_of_fame')) || (typeof GENERIC_HALL_OF_FAME !== 'undefined' ? GENERIC_HALL_OF_FAME : []),
  volunteerShifts: JSON.parse(localStorage.getItem('fraternal_shifts')) || GENERIC_SEED_SHIFTS,
  pins: JSON.parse(localStorage.getItem('fraternal_pins')) || GENERIC_SEED_PINS,
  liveFeedItems: [],
  hallDeposits: JSON.parse(localStorage.getItem('fraternal_hall_deposits')) || [
    { id: "dep-1", clientName: "Sarah Jenkins", eventDate: "2026-10-24", paymentMethod: "STRIPE", amount: 150.00, status: "Approved & Date Locked", timestamp: "2026-08-30T14:20:00Z" },
    { id: "dep-2", clientName: "Robert Hayes", eventDate: "2026-11-14", paymentMethod: "CASHAPP ($cashtag)", amount: 150.00, status: "Pending Review", timestamp: "2026-08-31T09:15:00Z" }
  ],
  rafflePot: 640.00,
  tvCurrentSlide: 0,
  activeDevOpsFile: 'config.js'
};

// =============================================================================
// WEB AUDIO SOUND SYNTHESIZER
// =============================================================================
class SoundFX {
  constructor() { this.ctx = null; }
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  playClick() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }
  playChime() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.05);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.05);
        osc.stop(this.ctx.currentTime + i * 0.05 + 0.3);
      });
    } catch(e) {}
  }
  playGavel() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch(e) {}
  }
}
const sfx = new SoundFX();

// =============================================================================
// SENIOR ACCESSIBILITY SUITE
// =============================================================================
function setFontSize(size) {
  AppState.fontSize = size;
  localStorage.setItem('fraternal_font_size', size);
  document.body.classList.remove('font-size-large', 'font-size-xlarge');
  if (size === 'large') document.body.classList.add('font-size-large');
  if (size === 'xlarge') document.body.classList.add('font-size-xlarge');

  document.querySelectorAll('.access-pill-size').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.size === size);
  });
  sfx.playClick();
  showToast(`Text Size: ${size.toUpperCase()}`, 'gold');
}

function toggleHighContrast() {
  AppState.highContrast = !AppState.highContrast;
  localStorage.setItem('fraternal_high_contrast', AppState.highContrast);
  document.body.classList.toggle('high-contrast-mode', AppState.highContrast);
  const btn = document.getElementById('contrast-toggle-btn');
  if (btn) btn.classList.toggle('active', AppState.highContrast);
  sfx.playClick();
  showToast(`High Contrast: ${AppState.highContrast ? 'ON' : 'OFF'}`, 'gold');
}

function toggleSeniorMode() {
  AppState.seniorMode = !AppState.seniorMode;
  localStorage.setItem('fraternal_senior_mode', AppState.seniorMode);
  document.body.classList.toggle('senior-mode', AppState.seniorMode);
  if (AppState.seniorMode) setFontSize('large');
  else setFontSize('normal');
  sfx.playChime();
  showToast(`Senior Mode: ${AppState.seniorMode ? 'ACTIVE' : 'STANDARD'}`, 'emerald');
}

function readAnnouncementsAloud() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const text = `Lodge Announcements for ${AppState.config.organizationName} ${AppState.config.chapterNumber}. Next stated meeting is 1st and 3rd Tuesdays at 7:00 PM. Community exchange features 6 active member listings including free bicycles and kindergarten aid. Charity auctions include 4 lots with the County Fair VIP package at 285 dollars. Flat 150 dollar hall deposit reservations are active online.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    showToast('🔊 Reading Announcements Aloud...', 'emerald');
  } else {
    showToast('Speech synthesis not supported.', 'crimson');
  }
}

// =============================================================================
// TOAST NOTIFICATIONS & WEBHOOKS
// =============================================================================
function showToast(msg, type = 'gold') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `<span>${type === 'emerald' ? '✅' : (type === 'crimson' ? '⚠️' : '⭐')}</span> <span>${escapeHTML(msg)}</span>`;
  container.appendChild(toast);
  sfx.playClick();
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function dispatchWebhook(eventType, payload) {
  const cfg = AppState.config.webhooks;
  if (!cfg || !cfg.enabled) return;
  const body = {
    embeds: [{
      title: `🔔 ${AppState.config.shortName}: ${eventType}`,
      description: JSON.stringify(payload, null, 2),
      color: 13938487,
      timestamp: new Date().toISOString()
    }]
  };
  if (cfg.discordWebhookUrl) {
    fetch(cfg.discordWebhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {});
  }
}

// =============================================================================
// MANDATORY LANDING GATEWAY POPUP
// =============================================================================
function initLandingGateway() {
  const gatewayEl = document.getElementById('landing-gateway-modal');
  if (!gatewayEl) return;

  const urlParams = new URLSearchParams(window.location.search);
  const forceGateway = urlParams.get('gateway') === 'true';
  const forceDemo = urlParams.get('mode') === 'demo';

  if (forceDemo) {
    selectLandingChoice('demo');
    return;
  }

  if (!AppState.landingGatewayChosen || forceGateway) {
    gatewayEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } else {
    gatewayEl.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function selectLandingChoice(choice) {
  const gatewayEl = document.getElementById('landing-gateway-modal');
  sfx.playClick();

  if (choice === 'demo') {
    sessionStorage.setItem('vefa_gateway_chosen', 'true');
    AppState.landingGatewayChosen = true;
    if (gatewayEl) gatewayEl.style.display = 'none';
    document.body.style.overflow = '';
    showToast('✨ Interactive Live Demo Mode Active!', 'gold');
  } else if (choice === 'first_time') {
    localStorage.removeItem('fraternal_live_config');
    window.location.href = 'setup.html?mode=new';
  } else if (choice === 'update') {
    window.location.href = 'setup.html?mode=update';
  }
}

function saveSetup() {
  sfx.playClick();
  const configString = `/**
 * VEFA: Fraternal & Civic Community Engine (v2.3.1)
 * Saved Configuration File
 * © 2027 VEFA. Contact: admin@vefa.club
 */
const FRATERNAL_CONFIG = ${JSON.stringify(AppState.config, null, 2)};`;

  const blob = new Blob([configString], { type: 'application/javascript;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'config.js');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('💾 config.js Setup Saved & Exported!', 'emerald');
}

function restartSetup() {
  sfx.playClick();
  sessionStorage.removeItem('vefa_gateway_chosen');
  AppState.landingGatewayChosen = false;
  initLandingGateway();
}

// =============================================================================
// USER SESSION & ROLE MANAGEMENT
// =============================================================================
function updateUserSessionUI() {
  const nameEl = document.getElementById('session-name');
  const badgeEl = document.getElementById('session-role-badge');
  const avatarEl = document.getElementById('session-avatar');
  const officerBar = document.getElementById('officer-admin-bar');
  const devopsView = document.getElementById('devops-console-view');

  if (nameEl) nameEl.textContent = AppState.currentUser.name;
  if (badgeEl) {
    badgeEl.textContent = AppState.currentUser.badge;
    badgeEl.className = `role-pill ${AppState.currentUser.role}`;
  }
  if (avatarEl) {
    if (AppState.currentUser.role === 'devops') avatarEl.textContent = '🛠️';
    else if (AppState.currentUser.role === 'gamemaster') avatarEl.textContent = '🎲';
    else if (AppState.currentUser.role === 'officer') avatarEl.textContent = '⭐';
    else if (AppState.currentUser.role === 'member') avatarEl.textContent = AppState.config.branding.customCrestEmoji;
    else avatarEl.textContent = '👤';
  }

  const isOfficer = AppState.currentUser.role === 'officer';
  document.body.classList.toggle('admin-mode-active', isOfficer);
  if (officerBar) officerBar.classList.toggle('active', isOfficer);
  if (devopsView) {
    devopsView.classList.toggle('active', AppState.currentUser.role === 'devops');
    if (AppState.currentUser.role === 'devops') loadDevOpsFile(AppState.activeDevOpsFile);
  }

  renderExchangeItems();
}

function switchUserRole(role, name, badge) {
  AppState.currentUser = { role, name, badge, memberNumber: role === 'member' || role === 'gamemaster' || role === 'officer' ? '100-42' : null };
  localStorage.setItem('fraternal_user_session', JSON.stringify(AppState.currentUser));
  updateUserSessionUI();
  closeModal('auth-modal');
  sfx.playChime();
  showToast(`Active Profile: ${name} (${badge})`, 'emerald');
}

// =============================================================================
// MODAL CONTROLLER
// =============================================================================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
    sfx.playClick();
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
    sfx.playClick();
  }
}

function handleBackdropClick(e, id) {
  if (e.target.id === id) closeModal(id);
}

// =============================================================================
// MODULE 1: COMMUNITY EXCHANGE (WITH ADMIN EDIT & DELETE CONTROLS)
// =============================================================================
function setExchangeFilter(category, btn) {
  AppState.activeCategory = category;
  document.querySelectorAll('#exchange .pill-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderExchangeItems();
  sfx.playClick();
}

function renderExchangeItems() {
  const grid = document.getElementById('exchange-items-grid');
  if (!grid) return;

  let items = [...AppState.exchangeItems];
  if (AppState.activeCategory !== 'all') {
    if (AppState.activeCategory === 'giveaway') {
      items = items.filter(i => i.price === 0);
    } else {
      items = items.filter(i => i.category === AppState.activeCategory);
    }
  }

  if (AppState.searchQuery) {
    const q = AppState.searchQuery.toLowerCase();
    items = items.filter(i => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
  }

  grid.innerHTML = items.map(item => {
    const isFree = item.price === 0;
    return `
      <div class="glass-card exchange-card">
        <div class="admin-card-controls">
          <button class="admin-control-btn" onclick="openEditExchangeModal('${escapeHTML(item.id)}')">✏️ Edit</button>
          <button class="admin-control-btn delete" onclick="deleteExchangeItem('${escapeHTML(item.id)}')">🗑️ Remove</button>
        </div>
        <div class="card-image-wrap">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy">
          <span class="card-badge ${isFree ? 'badge-free' : 'badge-tag-sale'}">${isFree ? '🎁 Free Giveaway' : '🏷️ Tag Sale'}</span>
          <span class="card-price-chip">${isFree ? 'FREE' : `$${Number(item.price).toFixed(2)}`}</span>
        </div>
        <div class="card-body">
          <span class="card-category">${escapeHTML(item.category)} • ${escapeHTML(item.condition)}</span>
          <h3 class="card-title">${escapeHTML(item.title)}</h3>
          <p class="card-desc">${escapeHTML(item.description)}</p>
          <div class="card-footer">
            <span style="font-size: 0.82rem; color: var(--text-secondary);">👤 ${escapeHTML(item.sellerName)}</span>
            <button class="${isFree ? 'btn-emerald' : 'btn-primary'}" onclick="openClaimModal('${escapeHTML(item.id)}')">
              ${isFree ? 'Claim Free' : 'Inquire / Buy'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function deleteExchangeItem(id) {
  if (confirm("Are you sure you want to remove this listing?")) {
    AppState.exchangeItems = AppState.exchangeItems.filter(i => i.id !== id);
    localStorage.setItem('fraternal_exchange_items', JSON.stringify(AppState.exchangeItems));
    renderExchangeItems();
    sfx.playClick();
    showToast("Listing removed successfully.", "emerald");
    dispatchWebhook('DELETE_EXCHANGE_ITEM', { id, deletedBy: AppState.currentUser.name });
  }
}

function openEditExchangeModal(id) {
  const item = AppState.exchangeItems.find(i => i.id === id);
  if (!item) return;

  const idEl = document.getElementById('edit-item-id');
  const titleEl = document.getElementById('edit-title');
  const catEl = document.getElementById('edit-category');
  const priceEl = document.getElementById('edit-price');
  const descEl = document.getElementById('edit-desc');

  if (idEl) idEl.value = item.id;
  if (titleEl) titleEl.value = item.title;
  if (catEl) catEl.value = item.category;
  if (priceEl) priceEl.value = item.price;
  if (descEl) descEl.value = item.description;
  openModal('edit-item-modal');
}

function handleEditExchangeSubmit(event) {
  event.preventDefault();
  const id = document.getElementById('edit-item-id').value;
  const title = document.getElementById('edit-title').value;
  const category = document.getElementById('edit-category').value;
  const price = parseFloat(document.getElementById('edit-price').value || 0);
  const desc = document.getElementById('edit-desc').value;

  const item = AppState.exchangeItems.find(i => i.id === id);
  if (item) {
    item.title = title;
    item.category = category;
    item.price = price;
    item.type = price === 0 ? 'giveaway' : 'tag_sale';
    item.description = desc;
    localStorage.setItem('fraternal_exchange_items', JSON.stringify(AppState.exchangeItems));
    closeModal('edit-item-modal');
    renderExchangeItems();
    sfx.playChime();
    showToast(`Updated "${title}"!`, "emerald");
    dispatchWebhook('UPDATE_EXCHANGE_ITEM', { id, title, price, updatedBy: AppState.currentUser.name });
  }
}

function handlePostItemSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('post-title').value;
  const category = document.getElementById('post-category').value;
  const price = parseFloat(document.getElementById('post-price').value || 0);
  const image = document.getElementById('post-image-url').value;
  const desc = document.getElementById('post-desc').value;

  const newItem = {
    id: `item-${Date.now()}`,
    title,
    category,
    type: price === 0 ? 'giveaway' : 'tag_sale',
    price,
    condition: 'Like New',
    sellerName: AppState.currentUser.name,
    sellerContact: AppState.config.phoneMain,
    pickupLocation: AppState.config.address,
    description: desc,
    image,
    status: 'available',
    postedDate: new Date().toISOString().split('T')[0]
  };

  AppState.exchangeItems.unshift(newItem);
  localStorage.setItem('fraternal_exchange_items', JSON.stringify(AppState.exchangeItems));

  closeModal('post-item-modal');
  event.target.reset();
  renderExchangeItems();
  sfx.playChime();
  showToast(`Published "${title}"!`, 'emerald');
  dispatchWebhook('NEW_EXCHANGE_ITEM', { title, price, seller: AppState.currentUser.name });
}

function handleDirectPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX = 800;
      let w = img.width, h = img.height;
      if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } }
      else { if (h > MAX) { w *= MAX / h; h = MAX; } }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);

      const compressed = canvas.toDataURL('image/jpeg', 0.82);
      document.getElementById('post-image-url').value = compressed;
      document.getElementById('post-photo-preview').src = compressed;
      document.getElementById('post-photo-preview-wrap').style.display = 'block';
      showToast('📷 Photo compressed & attached!', 'emerald');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function openClaimModal(itemId) {
  const item = AppState.exchangeItems.find(i => i.id === itemId);
  if (!item) return;

  const bodyEl = document.getElementById('claim-modal-body');
  if (bodyEl) {
    bodyEl.innerHTML = `
      <h4>${escapeHTML(item.title)}</h4>
      <p style="color: var(--gold-accent); font-size: 1.3rem; font-weight: 700;">${item.price === 0 ? 'FREE ($0.00)' : `$${item.price.toFixed(2)}`}</p>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0.8rem 0;">Pickup Location: <strong>${escapeHTML(item.pickupLocation)}</strong></p>
      <button class="btn-emerald" style="width: 100%; justify-content: center;" onclick="confirmClaim('${escapeHTML(item.id)}')">Confirm Reservation Pass</button>
    `;
  }
  openModal('claim-item-modal');
}

function confirmClaim(itemId) {
  closeModal('claim-item-modal');
  sfx.playChime();
  showToast('Reservation pass confirmed! Details saved.', 'emerald');
}

// =============================================================================
// MODULE 2: CHARITY AUCTION ARENA (4+ LOTS)
// =============================================================================
function renderAuctionItems() {
  const grid = document.getElementById('auction-items-grid');
  if (!grid) return;

  grid.innerHTML = AppState.auctionItems.map(auc => `
    <div class="glass-card auction-card">
      <div class="card-image-wrap">
        <img src="${escapeHTML(auc.image)}" alt="${escapeHTML(auc.title)}" loading="lazy">
        <span class="card-badge badge-benefit">${escapeHTML(auc.cause)}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHTML(auc.title)}</h3>
        <p class="card-desc">${escapeHTML(auc.description)}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div>
            <span style="font-size: 0.76rem; color: var(--text-muted);">Current High Bid</span>
            <div style="font-size: 1.4rem; font-weight: 700; color: var(--gold-accent);">$${Number(auc.currentBid).toFixed(2)}</div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.76rem; color: var(--text-muted);">Est. Value: $${auc.estValue || 350}</span>
            <div style="font-size: 0.84rem; color: var(--emerald-green); font-weight: 700;">${auc.bidCount} Bids Placed</div>
          </div>
        </div>
        <button class="btn-emerald" style="width: 100%; justify-content: center;" onclick="openPlaceBidModal('${escapeHTML(auc.id)}')">
          🔨 Place Live Bid ($${auc.currentBid + auc.minIncrement}+)
        </button>
      </div>
    </div>
  `).join('');
}

function openPlaceBidModal(id) {
  const auc = AppState.auctionItems.find(a => a.id === id);
  if (!auc) return;

  const minBid = auc.currentBid + auc.minIncrement;
  const body = document.getElementById('bid-modal-body');
  if (body) {
    body.innerHTML = `
      <input type="hidden" id="bid-auc-id" value="${escapeHTML(auc.id)}">
      <h4>${escapeHTML(auc.title)}</h4>
      <div style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Benefiting: <strong>${escapeHTML(auc.cause)}</strong></div>
      <div style="font-size: 0.8rem; color: var(--gold-accent); margin-bottom: 1rem;">Current High Bid: <strong>$${auc.currentBid.toFixed(2)}</strong> (${auc.highestBidder || 'None'})</div>
      <div class="form-group">
        <label>Your Bid Amount ($ USD) (Minimum: $${minBid.toFixed(2)})</label>
        <input type="number" id="bid-amount-input" class="form-control" min="${minBid}" step="5" value="${minBid}" required>
      </div>
    `;
  }
  openModal('place-bid-modal');
}

function handlePlaceBidSubmit(event) {
  event.preventDefault();
  const id = document.getElementById('bid-auc-id').value;
  const amount = parseFloat(document.getElementById('bid-amount-input').value);

  const auc = AppState.auctionItems.find(a => a.id === id);
  if (auc && amount > auc.currentBid) {
    auc.currentBid = amount;
    auc.highestBidder = AppState.currentUser.name;
    auc.bidCount += 1;
    if (!auc.bids) auc.bids = [];
    auc.bids.unshift({ bidder: AppState.currentUser.name, amount, time: "Just now" });

    localStorage.setItem('fraternal_auction_items', JSON.stringify(AppState.auctionItems));
    closeModal('place-bid-modal');
    renderAuctionItems();
    sfx.playGavel();
    showToast(`🔨 Bid of $${amount.toFixed(2)} accepted! High bidder: ${AppState.currentUser.name}.`, 'emerald');
    dispatchWebhook('AUCTION_BID', { lot: auc.title, amount, bidder: AppState.currentUser.name });
  }
}

// =============================================================================
// MODULE 3: CIVIC HERITAGE & AUDIO WALKING TOUR
// =============================================================================
function renderHeritageTour() {
  const grid = document.getElementById('landmarks-tour-grid');
  if (!grid) return;

  grid.innerHTML = AppState.landmarks.map(l => `
    <div class="glass-card">
      <div class="card-image-wrap">
        <img src="${escapeHTML(l.image)}" alt="${escapeHTML(l.name)}" loading="lazy">
        <span class="card-badge badge-tag-sale">Year: ${escapeHTML(l.year)}</span>
      </div>
      <div class="card-body">
        <span class="card-category">${escapeHTML(l.style)} • ${escapeHTML(l.significance)}</span>
        <h3 class="card-title">${escapeHTML(l.name)}</h3>
        <p class="card-desc">${escapeHTML(l.desc)}</p>
        <div class="card-footer">
          <span style="font-size: 0.78rem; color: var(--text-secondary);">🎧 Audio: ${escapeHTML(l.audioDuration)}</span>
          <button class="btn-primary" style="font-size: 0.84rem;" onclick="playLandmarkAudio('${escapeHTML(l.id)}')">
            ▶️ Play Audio Tour
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function playLandmarkAudio(id) {
  const landmark = AppState.landmarks.find(l => l.id === id);
  if (!landmark) return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const narration = `Historic Landmark: ${landmark.name}, constructed in ${landmark.year} in the ${landmark.style} style. ${landmark.desc}. Significance: ${landmark.significance}.`;
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    sfx.playChime();
    showToast(`🎧 Playing Audio Tour for ${landmark.name}...`, 'emerald');
  }
}

// =============================================================================
// MODULE 4: TOURNAMENT ARENA & ANNUAL YEAR-ECLIPSE ENGINE
// =============================================================================
function renderTournamentArena() {
  const grid = document.getElementById('tournament-games-grid');
  if (!grid) return;

  grid.innerHTML = AppState.tournamentGames.map(game => `
    <div class="tournament-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
        <div>
          <span style="font-size: 0.76rem; color: var(--gold-accent); text-transform: uppercase; font-weight: 700;">${escapeHTML(game.category)} • Season ${game.seasonYear || 2026}</span>
          <h3 style="font-size: 1.3rem; font-weight: 700; margin-top: 0.2rem;">${escapeHTML(game.name)}</h3>
        </div>
        <span class="role-pill gamemaster">🎲 GM: ${escapeHTML(game.gameMaster.split(' ')[0])}</span>
      </div>

      <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
        🕒 <strong>Schedule:</strong> ${escapeHTML(game.schedule)}<br>
        📋 <strong>Format:</strong> ${escapeHTML(game.format)}
      </p>

      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Wins / Pts</th>
          </tr>
        </thead>
        <tbody>
          ${game.standings.slice(0, 4).map(s => `
            <tr>
              <td><strong style="color: ${s.rank === 1 ? 'var(--gold-accent)' : 'inherit'};">#${s.rank}</strong></td>
              <td>${escapeHTML(s.player)}</td>
              <td style="font-weight: 700; color: var(--emerald-green);">${s.score}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="display: flex; gap: 0.5rem; margin-top: auto; padding-top: 0.85rem; border-top: 1px solid var(--border-subtle);">
        <button class="btn-primary" style="flex: 1; font-size: 0.88rem; justify-content: center;" onclick="openScoreMatchModal('${escapeHTML(game.id)}')">
          🏆 Log Score
        </button>
        <button class="btn-secondary" style="font-size: 0.88rem;" onclick="showToast('Joined bracket for ${escapeHTML(game.name)}!', 'emerald')">
          + Join
        </button>
      </div>
    </div>
  `).join('');
}

function handleCreateCustomGame(event) {
  event.preventDefault();
  const name = document.getElementById('new-game-name').value;
  const category = document.getElementById('new-game-category').value;
  const schedule = document.getElementById('new-game-schedule').value;
  const format = document.getElementById('new-game-format').value;
  const gmName = document.getElementById('new-game-gm').value || AppState.currentUser.name;

  const newGame = {
    id: `game-${Date.now()}`,
    name,
    category,
    gameMaster: `${gmName} (Game Master)`,
    schedule,
    format,
    seasonYear: AppState.config.activeSeasonYear || 2026,
    standings: [
      { player: gmName, score: 100, rank: 1, wins: 1 },
      { player: "Lodge Challenger", score: 50, rank: 2, wins: 0 }
    ]
  };

  AppState.tournamentGames.unshift(newGame);
  localStorage.setItem('fraternal_games', JSON.stringify(AppState.tournamentGames));

  closeModal('add-game-modal');
  event.target.reset();
  renderTournamentArena();
  sfx.playChime();
  showToast(`🎲 Custom Game "${name}" created! ${gmName} is Game Master.`, 'emerald');
  dispatchWebhook('NEW_TOURNAMENT_GAME', { game: name, gm: gmName, schedule });
}

function openScoreMatchModal(gameId) {
  const game = AppState.tournamentGames.find(g => g.id === gameId);
  if (!game) return;

  const body = document.getElementById('score-match-body');
  if (body) {
    body.innerHTML = `
      <input type="hidden" id="match-game-id" value="${escapeHTML(game.id)}">
      <h4>${escapeHTML(game.name)}</h4>
      <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 1rem;">Game Master: <strong>${escapeHTML(game.gameMaster)}</strong></p>
      <div class="form-group">
        <label>Winning Player Name *</label>
        <input type="text" id="match-winner-name" class="form-control" placeholder="Player Name" required>
      </div>
      <div class="form-group">
        <label>Points / Score Awarded *</label>
        <input type="number" id="match-score-points" class="form-control" value="50" min="1" required>
      </div>
    `;
  }
  openModal('score-match-modal');
}

function handleLogScoreSubmit(event) {
  event.preventDefault();
  const gameId = document.getElementById('match-game-id').value;
  const player = document.getElementById('match-winner-name').value;
  const points = parseInt(document.getElementById('match-score-points').value || 50);

  const game = AppState.tournamentGames.find(g => g.id === gameId);
  if (game) {
    const existing = game.standings.find(s => s.player.toLowerCase() === player.toLowerCase());
    if (existing) {
      existing.score += points;
      existing.wins += 1;
    } else {
      game.standings.push({ player, score: points, rank: game.standings.length + 1, wins: 1 });
    }
    game.standings.sort((a, b) => b.score - a.score);
    game.standings.forEach((s, idx) => s.rank = idx + 1);

    localStorage.setItem('fraternal_games', JSON.stringify(AppState.tournamentGames));
    closeModal('score-match-modal');
    renderTournamentArena();
    sfx.playChime();
    showToast(`🏆 Score logged for ${player} in ${game.name}!`, 'emerald');
  }
}

function checkYearEclipse() {
  const currentYear = new Date().getFullYear();
  const activeSeason = AppState.config.activeSeasonYear || 2026;

  if (currentYear > activeSeason) {
    archiveSeasonToHallOfFame(activeSeason);
    AppState.config.activeSeasonYear = currentYear;
    localStorage.setItem('fraternal_live_config', JSON.stringify(AppState.config));
    showToast(`🎆 Year ${activeSeason} Eclipsed into ${currentYear}! Season Champions Archived to Hall of Fame.`, 'emerald');
    dispatchWebhook('YEAR_ECLIPSE_ROLLED', { oldYear: activeSeason, newYear: currentYear });
  }
}

function archiveSeasonToHallOfFame(year) {
  AppState.tournamentGames.forEach(game => {
    if (game.standings && game.standings.length > 0) {
      const champ = game.standings[0];
      const runnerUp = game.standings[1] || { player: 'None' };
      AppState.hallOfFame.unshift({
        year: year,
        game: game.name,
        champion: champ.player,
        runnerUp: runnerUp.player,
        winningScore: champ.score,
        archivedDate: new Date().toISOString().split('T')[0]
      });
      game.seasonYear = year + 1;
      game.standings.forEach(s => { s.score = 0; s.wins = 0; });
    }
  });
  localStorage.setItem('fraternal_hall_of_fame', JSON.stringify(AppState.hallOfFame));
  localStorage.setItem('fraternal_games', JSON.stringify(AppState.tournamentGames));
}

// =============================================================================
// MODULE 5: VOLUNTEER AUTOMATION WITH TWILIO / SMS REMINDERS
// =============================================================================
function renderVolunteerShifts() {
  const container = document.getElementById('volunteer-shifts-list');
  if (!container) return;

  container.innerHTML = AppState.volunteerShifts.map(s => `
    <div class="glass-card" style="padding: 1.1rem; margin-bottom: 0.85rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
      <div>
        <strong style="font-size: 1rem;">${escapeHTML(s.title)}</strong>
        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.2rem;">${escapeHTML(s.date)} • Needed: ${s.needed} (Claimed: ${s.claimed.length})</div>
      </div>
      <div style="display: flex; gap: 0.4rem;">
        <button class="btn-emerald" style="padding: 0.45rem 0.85rem; font-size: 0.82rem;" onclick="claimVolunteerShift('${escapeHTML(s.id)}')">
          ✋ Claim Shift
        </button>
        <button class="btn-secondary" style="padding: 0.45rem 0.65rem; font-size: 0.76rem;" onclick="sendVolunteerReminderSMS('${escapeHTML(s.id)}')">
          📱 Send SMS
        </button>
      </div>
    </div>
  `).join('');
}

function claimVolunteerShift(shiftId) {
  const shift = AppState.volunteerShifts.find(s => s.id === shiftId);
  if (shift) {
    if (!shift.claimed.includes(AppState.currentUser.name)) {
      shift.claimed.push(AppState.currentUser.name);
      localStorage.setItem('fraternal_shifts', JSON.stringify(AppState.volunteerShifts));
      renderVolunteerShifts();
      sfx.playChime();
      showToast(`✋ Shift claimed by ${AppState.currentUser.name}! Service hours logged.`, 'emerald');
    } else {
      showToast(`You have already claimed this shift!`, 'gold');
    }
  }
}

async function sendVolunteerReminderSMS(shiftId) {
  const shift = AppState.volunteerShifts.find(s => s.id === shiftId);
  if (!shift) return;

  sfx.playClick();
  showToast(`📱 Dispatching SMS Reminders via Twilio for "${shift.title}"...`, 'emerald');

  try {
    const res = await fetch('api/twilio.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shift_id: shift.id,
        shift_title: shift.title,
        recipients: shift.claimed,
        message: `Lodge Reminder: You are scheduled for "${shift.title}" on ${shift.date}. Thank you for your service!`
      })
    });
    const data = await res.json();
    showToast(`✓ Twilio SMS Reminders Sent to ${shift.claimed.length} volunteers!`, 'emerald');
  } catch(e) {
    showToast(`✓ Simulated SMS sent to ${shift.claimed.join(', ')}`, 'gold');
  }
}

function buyRaffleTickets() {
  AppState.rafflePot += 20.00;
  sfx.playChime();
  const potEl = document.getElementById('raffle-pot-amount');
  if (potEl) potEl.textContent = `$${AppState.rafflePot.toFixed(2)}`;
  showToast(`🎟️ 10 50/50 Raffle Tickets Confirmed!`, 'emerald');
}

// =============================================================================
// MODULE 6: SEATED LEADERSHIP REGISTRY & TRUSTEE AUDIT REPORTS
// =============================================================================
function renderSeatedOfficers() {
  const tbody = document.getElementById('officer-roster-tbody');
  if (!tbody) return;

  tbody.innerHTML = (AppState.config.seatedOfficers || []).map(off => `
    <tr>
      <td><strong>${escapeHTML(off.title)}</strong></td>
      <td>${escapeHTML(off.name)}</td>
      <td>${escapeHTML(off.term)}</td>
      <td style="color: var(--gold-accent);">${escapeHTML(off.phone)}</td>
    </tr>
  `).join('');
}

function generateTrusteeAuditReport() {
  sfx.playClick();
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    let totalDeposits = AppState.hallDeposits.reduce((acc, d) => acc + (d.amount || 150.00), 0);
    printWindow.document.write(`
      <html>
      <head>
        <title>Trustee Meeting Audit Report - ${escapeHTML(AppState.config.organizationName)}</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; color: #1e293b; max-width: 800px; margin: 0 auto; }
          h1, h2 { color: #0a192f; }
          table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
          th, td { border: 1px solid #cbd5e1; padding: 0.65rem; text-align: left; }
          th { background: #f1f5f9; }
          .summary { background: #f8fafc; padding: 1rem; border-left: 4px solid #d4af37; margin: 1.5rem 0; }
        </style>
      </head>
      <body>
        <h1>${escapeHTML(AppState.config.organizationName)} ${escapeHTML(AppState.config.chapterNumber)}</h1>
        <h2>Monthly Trustee Meeting & Financial Audit Report</h2>
        <p>Generated: ${new Date().toLocaleDateString()} | Active Season: ${AppState.config.activeSeasonYear}</p>
        
        <div class="summary">
          <strong>Deposit Balance:</strong> $${totalDeposits.toFixed(2)} USD<br>
          <strong>Active Auction Bids:</strong> 4 Lots Active<br>
          <strong>50/50 Raffle Pot:</strong> $${AppState.rafflePot.toFixed(2)} USD
        </div>

        <h3>Hall Rental $150 Reservation Deposits</h3>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Date</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${AppState.hallDeposits.map(d => `
              <tr>
                <td>${escapeHTML(d.clientName)}</td>
                <td>${escapeHTML(d.eventDate)}</td>
                <td>${escapeHTML(d.paymentMethod)}</td>
                <td>$${(d.amount || 150.00).toFixed(2)}</td>
                <td>${escapeHTML(d.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h3>Seated Officers & Trustees</h3>
        <table>
          <thead><tr><th>Title</th><th>Officer Name</th><th>Term</th></tr></thead>
          <tbody>
            ${(AppState.config.seatedOfficers || []).map(o => `<tr><td>${escapeHTML(o.title)}</td><td>${escapeHTML(o.name)}</td><td>${escapeHTML(o.term)}</td></tr>`).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    showToast('📄 Trustee Audit Report Generated!', 'emerald');
  }
}

// =============================================================================
// OFFICER COMMAND CENTER
// =============================================================================
function openOfficerStudio() {
  renderDepositLedger();
  renderSeatedOfficers();
  openModal('officer-studio-modal');
}

function renderDepositLedger() {
  const tbody = document.getElementById('officer-deposit-tbody');
  if (!tbody) return;

  tbody.innerHTML = AppState.hallDeposits.map(dep => `
    <tr>
      <td><strong>${escapeHTML(dep.clientName)}</strong></td>
      <td>${escapeHTML(dep.eventDate)}</td>
      <td><span class="role-pill guest">${escapeHTML(dep.paymentMethod)}</span></td>
      <td style="font-weight: 700; color: var(--gold-accent);">$150.00</td>
      <td>
        <select class="form-control" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; min-height: 36px;" onchange="updateDepositStatus('${escapeHTML(dep.id)}', this.value)">
          <option value="Pending Review" ${dep.status === 'Pending Review' ? 'selected' : ''}>Pending Review</option>
          <option value="Approved & Date Locked" ${dep.status === 'Approved & Date Locked' ? 'selected' : ''}>Approved & Date Locked</option>
          <option value="Post-Event Inspected" ${dep.status === 'Post-Event Inspected' ? 'selected' : ''}>Post-Event Inspected</option>
          <option value="Deposit Refunded" ${dep.status === 'Deposit Refunded' ? 'selected' : ''}>Deposit Refunded</option>
        </select>
      </td>
    </tr>
  `).join('');
}

function updateDepositStatus(id, newStatus) {
  const dep = AppState.hallDeposits.find(d => d.id === id);
  if (dep) {
    dep.status = newStatus;
    localStorage.setItem('fraternal_hall_deposits', JSON.stringify(AppState.hallDeposits));
    sfx.playChime();
    showToast(`Updated ${dep.clientName} status to: ${newStatus}`, 'emerald');
  }
}

function exportDepositsCSV() {
  let csv = "ID,Client Name,Event Date,Payment Method,Amount,Status,Timestamp\n";
  AppState.hallDeposits.forEach(d => {
    csv += `"${d.id}","${d.clientName}","${d.eventDate}","${d.paymentMethod}",150.00,"${d.status}","${d.timestamp}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'LODGE_HALL_DEPOSITS.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📊 Deposit Ledger Exported to CSV!', 'emerald');
}

function broadcastTickerAlert() {
  const msg = prompt("Enter breaking announcement to broadcast on Live Ticker & TV Kiosks:");
  if (msg && msg.trim()) {
    const tickerEl = document.getElementById('ticker-content');
    if (tickerEl) tickerEl.innerHTML = `<span>🚨 <strong>OFFICER BROADCAST</strong>: ${escapeHTML(msg.trim())}</span>`;
    sfx.playChime();
    showToast('🚨 Live Broadcast Dispatched to Ticker & TV Kiosks!', 'emerald');
    dispatchWebhook('OFFICER_BROADCAST', { message: msg.trim() });
  }
}

// =============================================================================
// MODULE 7: MULTI-PAYMENT HUB FOR $150 HALL DEPOSIT
// =============================================================================
function switchPaymentTab(method) {
  AppState.activePaymentMethod = method;
  const tabs = ['stripe', 'cashapp', 'venmo', 'chime', 'check'];
  tabs.forEach(t => {
    const btn = document.getElementById(`pay-tab-${t}`);
    const view = document.getElementById(`pay-view-${t}`);
    if (btn) btn.classList.toggle('active', t === method);
    if (view) view.style.display = (t === method) ? 'block' : 'none';
  });

  const submitBtn = document.getElementById('dep-submit-btn');
  if (submitBtn) {
    if (method === 'stripe') submitBtn.textContent = 'Authorize via Stripe ($150)';
    else if (method === 'cashapp') submitBtn.textContent = 'Confirm Cash App Payment ($150)';
    else if (method === 'venmo') submitBtn.textContent = 'Confirm Venmo Payment ($150)';
    else if (method === 'chime') submitBtn.textContent = 'Confirm Chime / Zelle Payment ($150)';
    else if (method === 'check') submitBtn.textContent = 'Confirm Check / Cash Hold ($150)';
  }
  sfx.playClick();
}

async function handleHallDepositSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('dep-name').value;
  const date = document.getElementById('dep-date').value;
  const method = AppState.activePaymentMethod;

  let ref = '';
  if (method === 'cashapp') ref = document.getElementById('dep-cashapp-ref').value;
  if (method === 'venmo') ref = document.getElementById('dep-venmo-ref').value;
  if (method === 'chime') ref = document.getElementById('dep-chime-ref').value;

  const depositRecord = {
    id: `dep-${Date.now()}`,
    clientName: name,
    eventDate: date,
    paymentMethod: method.toUpperCase() + (ref ? ` (${ref})` : ''),
    amount: 150.00,
    status: 'Approved & Date Locked',
    timestamp: new Date().toISOString()
  };

  AppState.hallDeposits.unshift(depositRecord);
  localStorage.setItem('fraternal_hall_deposits', JSON.stringify(AppState.hallDeposits));

  closeModal('hall-deposit-modal');
  sfx.playChime();
  showToast(`💳 $150 Reservation Deposit Confirmed via ${method.toUpperCase()} for ${name}!`, 'emerald');
  dispatchWebhook('HALL_DEPOSIT', { name, date, method: method.toUpperCase(), amount: 150.00 });
}

// =============================================================================
// DEVOPS HYPER-COCKPIT ENGINE
// =============================================================================
const DEVOPS_CODE_FILES = {
  'config.js': `// VEFA Platform Configuration\nconst FRATERNAL_CONFIG = ${JSON.stringify(FRATERNAL_CONFIG, null, 2)};`,
  'agent.md': `# VEFA Agentic AI Harness\n// Tool interfaces & autonomous cron triggers for Claude/Gemini/OpenAI`,
  'api/twilio.php': `<?php\n// Twilio SMS Volunteer Dispatcher\nrequire_once 'vendor/autoload.php';\n// Dispatches SMS shift reminders`,
  'api/scrape.php': `<?php\n// 2026 Anti-Blocker Scraper with SSRF Filter\n$resolvedIp = gethostbyname($domainHost);\nif (filter_var($resolvedIp, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE) === false) {\n    http_response_code(403);\n    exit('SSRF Blocked');\n}`,
  'api/stripe.php': `<?php\n// Stripe Checkout Generator for $150 Deposits\nheader('Content-Type: application/json');\n$session = ['id' => 'cs_test_' . bin2hex(random_bytes(8)), 'amount' => 15000];\necho json_encode($session);`,
  'api/deposits.php': `<?php\n// Multi-Channel Deposit Recording API\nrequire_once 'db.php';\n$pdo = getDBConnection();`,
  'database.sql': `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, role VARCHAR(32));\nCREATE TABLE IF NOT EXISTS hall_deposits (id VARCHAR(64) PRIMARY KEY, amount DECIMAL(10,2));`,
  'docker-compose.yml': `version: '3.8'\nservices:\n  web:\n    image: php:8.2-apache\n    ports:\n      - "8080:80"\n    volumes:\n      - ./:/var/www/html`,
  'openapi.json': `{\n  "openapi": "3.1.0",\n  "info": { "title": "VEFA Platform API", "version": "2.3.1" }\n}`
};

function loadDevOpsFile(fileName) {
  AppState.activeDevOpsFile = fileName;
  const codeEl = document.getElementById('devops-code-display');
  const titleEl = document.getElementById('devops-active-file-title');
  if (codeEl) codeEl.textContent = DEVOPS_CODE_FILES[fileName] || '// File not found';
  if (titleEl) titleEl.textContent = fileName;

  document.querySelectorAll('.devops-file-item').forEach(item => {
    item.classList.toggle('active', item.dataset.file === fileName);
  });
}

function copyDevOpsCode() {
  const code = DEVOPS_CODE_FILES[AppState.activeDevOpsFile] || '';
  navigator.clipboard.writeText(code).then(() => {
    sfx.playClick();
    showToast(`📋 Copied ${AppState.activeDevOpsFile} to clipboard!`, 'cyan');
  });
}

async function runDevOpsApiTest() {
  const endpoint = document.getElementById('devops-api-select').value;
  const outputEl = document.getElementById('devops-api-response');
  if (!outputEl) return;

  outputEl.textContent = "⏳ Sending simulated API request...";
  sfx.playClick();

  setTimeout(() => {
    let mockResponse = {};
    if (endpoint === 'scrape') {
      mockResponse = { status: "success", title: "American Fraternal Lodge", motto: "Charity • Justice • Fellowship", tier: "tier1_direct_html", latency_ms: 48 };
    } else if (endpoint === 'stripe') {
      mockResponse = { status: "success", session_id: "cs_test_" + Math.random().toString(36).substr(2, 9), amount: 150.00, currency: "USD", mode: "deposit" };
    } else if (endpoint === 'deposits') {
      mockResponse = { status: "success", count: AppState.hallDeposits.length, records: AppState.hallDeposits };
    } else if (endpoint === 'twilio') {
      mockResponse = { status: "success", dispatched: 2, message: "Volunteer shift reminders sent successfully." };
    }
    outputEl.textContent = JSON.stringify(mockResponse, null, 2);
    showToast(`✓ API ${endpoint} returned 200 OK`, 'emerald');
  }, 400);
}

// =============================================================================
// TV KIOSK & CORKBOARD
// =============================================================================
function toggleTVKiosk() {
  const tvView = document.getElementById('tv-kiosk-view');
  if (!tvView) return;
  tvView.classList.toggle('active');
  sfx.playClick();
  updateTVClock();
}

function updateTVClock() {
  const clock = document.getElementById('tv-clock');
  if (clock) clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateTVClock, 1000);

function cycleTVCarousel() {
  const slides = document.querySelectorAll('.tv-slide');
  if (!slides || slides.length === 0) return;
  slides.forEach((s, idx) => s.classList.toggle('active', idx === AppState.tvCurrentSlide));
  AppState.tvCurrentSlide = (AppState.tvCurrentSlide + 1) % slides.length;
}
setInterval(cycleTVCarousel, 15000);

function renderPlanogramBoard() {
  const surface = document.getElementById('corkboard-surface');
  if (!surface) return;

  surface.innerHTML = AppState.pins.map(pin => `
    <div class="pin-note-card" draggable="true">
      <span class="pushpin-head">📌</span>
      <strong>${escapeHTML(pin.title)}</strong>
      <div style="font-size: 0.74rem; color: #64748b; margin-top: 0.4rem; text-transform: uppercase;">Type: ${escapeHTML(pin.type)}</div>
    </div>
  `).join('');
}

function printPlanogramLayout() {
  sfx.playClick();
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    const qrSvg = `<svg viewBox="0 0 100 100" width="70" height="70"><rect x="5" y="5" width="25" height="25" fill="#0a192f"/><rect x="70" y="5" width="25" height="25" fill="#0a192f"/><rect x="5" y="70" width="25" height="25" fill="#0a192f"/><circle cx="50" cy="50" r="10" fill="#d4af37"/></svg>`;
    printWindow.document.write(`
      <html>
      <head>
        <title>Bulletin Board Plan-o-gram & QR Cards</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 2rem; }
          .grid { display: grid; grid-template-columns: repeat(${AppState.config.bulletinBoard.gridCols}, 1fr); gap: 15px; max-width: 800px; margin: 2rem auto; }
          .card { border: 2px dashed #333; padding: 1rem; border-radius: 4px; min-height: 100px; text-align: left; display: flex; flex-direction: column; justify-content: space-between; }
        </style>
      </head>
      <body>
        <h2>${escapeHTML(AppState.config.organizationName)} ${escapeHTML(AppState.config.chapterNumber)}</h2>
        <h3>Lobby Bulletin Board Plan-o-gram</h3>
        <div class="grid">
          ${AppState.pins.map(p => `
            <div class="card">
              <div><strong>${escapeHTML(p.title)}</strong><br><small style="color: #666;">[${escapeHTML(p.type.toUpperCase())}]</small></div>
              <div style="margin-top: 0.5rem; text-align: right;">${qrSvg}</div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  }
}

// =============================================================================
// INITIALIZATION
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  document.title = `${AppState.config.organizationName} ${AppState.config.chapterNumber} | VEFA Community Platform v2.3.1`;
  const brandName = document.getElementById('brand-org-name');
  const brandCrest = document.getElementById('brand-crest-emoji');
  const heroMotto = document.getElementById('hero-motto');

  if (brandName) brandName.textContent = `${AppState.config.organizationName} ${AppState.config.chapterNumber}`;
  if (brandCrest) brandCrest.textContent = AppState.config.branding.customCrestEmoji;
  if (heroMotto) heroMotto.textContent = AppState.config.motto;

  const cashAppEl = document.getElementById('dep-cashapp-handle');
  const venmoEl = document.getElementById('dep-venmo-handle');
  const chimeEl = document.getElementById('dep-chime-sign');
  const zelleEl = document.getElementById('dep-zelle-email');

  if (cashAppEl) cashAppEl.textContent = AppState.config.payments.cashAppHandle || '$Lodge100Community';
  if (venmoEl) venmoEl.textContent = AppState.config.payments.venmoHandle || '@Lodge100-Charity';
  if (chimeEl) chimeEl.textContent = AppState.config.payments.chimeSign || '$Lodge100Anytown';
  if (zelleEl) zelleEl.textContent = AppState.config.payments.zelleRecipient || 'treasurer@communitylodge100.org';

  if (AppState.fontSize) setFontSize(AppState.fontSize);
  if (AppState.highContrast) toggleHighContrast();
  if (AppState.seniorMode) toggleSeniorMode();

  initLandingGateway();
  updateUserSessionUI();
  checkYearEclipse();
  renderExchangeItems();
  renderAuctionItems();
  renderHeritageTour();
  renderTournamentArena();
  renderVolunteerShifts();
  renderPlanogramBoard();
});
