// ============================================================
//  Note Taker — Client JS
//  Features: CRUD (incl. PUT/edit), search, GSAP animations,
//            toasts, delete confirm, timestamps, word/char count
// ============================================================

// === State ===
let activeNote = {};
let isEditing = false;
let allNotes = [];
let noteToDelete = null;

// === DOM ===
const noteTitle      = document.querySelector('.note-title');
const noteText       = document.querySelector('.note-textarea');
const saveNoteBtn    = document.querySelector('.save-note');
const newNoteBtn     = document.querySelector('.new-note');
const editNoteBtn    = document.querySelector('.edit-note');
const updateNoteBtn  = document.querySelector('.update-note');
const cancelEditBtn  = document.querySelector('.cancel-edit');
const noteList       = document.getElementById('noteList');
const searchInput    = document.querySelector('.search-input');
const charCountEl    = document.querySelector('.char-count');
const wordCountEl    = document.querySelector('.word-count');
const dateText       = document.querySelector('.date-text');
const toastContainer = document.getElementById('toastContainer');
const confirmOverlay = document.getElementById('confirmOverlay');
const confirmDialog  = document.getElementById('confirmDialog');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const confirmCancelBtn = document.getElementById('confirmCancelBtn');

// === Utilities ===
const show = (el) => el && el.classList.remove('hidden');
const hide = (el) => el && el.classList.add('hidden');

const formatDate = (timestamp) => {
  if (!timestamp) return '—';
  const date = new Date(Number(timestamp));
  if (isNaN(date.getTime())) return '—';
  const diff = Date.now() - date;
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'yesterday';
  if (days < 7)   return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const wordCount = (txt) => (txt.trim() ? txt.trim().split(/\s+/).length : 0);

const updateStats = () => {
  const txt = noteText.value;
  charCountEl.textContent = `${txt.length} char${txt.length !== 1 ? 's' : ''}`;
  wordCountEl.textContent = `${wordCount(txt)} word${wordCount(txt) !== 1 ? 's' : ''}`;
};

// === Toast ===
const showToast = (message, type = 'success') => {
  const iconMap = {
    success: 'fas fa-check-circle',
    error:   'fas fa-exclamation-circle',
    info:    'fas fa-info-circle',
  };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="${iconMap[type]} toast-icon"></i><span>${message}</span>`;
  toastContainer.appendChild(toast);

  gsap.fromTo(toast,
    { opacity: 0, x: 50, scale: 0.88 },
    { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
  );

  setTimeout(() => {
    gsap.to(toast, {
      opacity: 0, x: 50, duration: 0.3, ease: 'power2.in',
      onComplete: () => toast.remove()
    });
  }, 3200);
};

// === API ===
const getNotes    = ()       => fetch('/api/notes',       { method: 'GET',    headers: { 'Content-Type': 'application/json' } });
const saveNote    = (note)   => fetch('/api/notes',       { method: 'POST',   headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(note) });
const deleteNote  = (id)     => fetch(`/api/notes/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
const updateNote  = (id, n)  => fetch(`/api/notes/${id}`, { method: 'PUT',    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(n) });

// === Render active note in editor ===
const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.value = activeNote.title || '';
    noteText.value  = activeNote.text  || '';
    dateText.textContent = formatDate(activeNote.id);

    if (isEditing) {
      noteTitle.removeAttribute('readonly');
      noteText.removeAttribute('readonly');
      hide(editNoteBtn);
      show(updateNoteBtn);
      show(cancelEditBtn);
      noteTitle.focus();
    } else {
      noteTitle.setAttribute('readonly', '');
      noteText.setAttribute('readonly', '');
      show(editNoteBtn);
      hide(updateNoteBtn);
      hide(cancelEditBtn);
    }
  } else {
    // New note mode
    noteTitle.value = '';
    noteText.value  = '';
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    dateText.textContent = '—';
    hide(editNoteBtn);
    hide(updateNoteBtn);
    hide(cancelEditBtn);
    noteTitle.focus();
  }

  updateStats();
};

// === Render note list (with optional search filter) ===
const renderNoteList = (notes) => {
  const query = (searchInput?.value || '').toLowerCase().trim();
  const filtered = query
    ? notes.filter(n =>
        (n.title || '').toLowerCase().includes(query) ||
        (n.text  || '').toLowerCase().includes(query)
      )
    : notes;

  noteList.innerHTML = '';

  if (!filtered.length) {
    noteList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${query ? '🔍' : '📝'}</div>
        <p class="empty-text">${query
          ? 'No notes match your search.'
          : 'No notes yet.<br/>Click + to write your first note.'
        }</p>
      </div>`;
    return;
  }

  const items = [];
  filtered.forEach(note => {
    const el = document.createElement('div');
    el.className = `note-item${String(note.id) === String(activeNote.id) ? ' active' : ''}`;
    el.setAttribute('data-note', JSON.stringify(note));

    const preview = note.text
      ? note.text.substring(0, 55) + (note.text.length > 55 ? '…' : '')
      : 'No content';

    el.innerHTML = `
      <div class="note-item-header">
        <span class="note-item-title">${note.title || 'Untitled'}</span>
        <button class="note-item-del delete-btn" data-id="${note.id}" title="Delete note">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div class="note-item-preview">${preview}</div>
      <div class="note-item-date">${formatDate(note.id)}</div>`;

    noteList.appendChild(el);
    items.push(el);
  });

  // Stagger entrance
  gsap.from(items, {
    opacity: 0,
    x: -18,
    duration: 0.35,
    stagger: 0.055,
    ease: 'power2.out',
  });
};

const getAndRenderNotes = () =>
  getNotes()
    .then(res => res.json())
    .then(data => {
      allNotes = data;
      renderNoteList(data);
    });

// === Handlers ===

const handleNoteSave = () => {
  const title = noteTitle.value.trim();
  const text  = noteText.value.trim();
  if (!title || !text) {
    showToast('Add a title and some text first.', 'error');
    return;
  }

  gsap.to(saveNoteBtn, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });

  saveNote({ title, text })
    .then(() => {
      showToast('Note saved!', 'success');
      activeNote = {};
      isEditing  = false;
      getAndRenderNotes();
      renderActiveNote();
    })
    .catch(() => showToast('Failed to save note.', 'error'));
};

const handleNoteUpdate = () => {
  const title = noteTitle.value.trim();
  const text  = noteText.value.trim();

  gsap.to(updateNoteBtn, { scale: 0.88, duration: 0.1, yoyo: true, repeat: 1 });

  updateNote(activeNote.id, { title, text })
    .then(() => {
      showToast('Note updated!', 'success');
      activeNote = { ...activeNote, title, text };
      isEditing  = false;
      getAndRenderNotes();
      renderActiveNote();
    })
    .catch(() => showToast('Failed to update note.', 'error'));
};

const handleNoteDelete = (id) => {
  noteToDelete = id;
  confirmOverlay.classList.add('visible');
  gsap.fromTo(confirmOverlay,
    { opacity: 0 },
    { opacity: 1, duration: 0.2 }
  );
  gsap.fromTo(confirmDialog,
    { opacity: 0, scale: 0.82, y: 20 },
    { opacity: 1, scale: 1,    y: 0,  duration: 0.4, ease: 'back.out(1.7)' }
  );
};

const closeConfirm = () => {
  gsap.to(confirmOverlay, {
    opacity: 0, duration: 0.2, ease: 'power2.in',
    onComplete: () => {
      confirmOverlay.classList.remove('visible');
      noteToDelete = null;
    }
  });
};

const confirmDelete = () => {
  if (!noteToDelete) return;

  // Animate the specific list item out first
  const items = noteList.querySelectorAll('.note-item');
  let target = null;
  items.forEach(item => {
    const d = JSON.parse(item.getAttribute('data-note'));
    if (String(d.id) === String(noteToDelete)) target = item;
  });

  closeConfirm();

  const doDelete = () => {
    deleteNote(noteToDelete)
      .then(() => {
        showToast('Note deleted.', 'info');
        if (String(activeNote.id) === String(noteToDelete)) {
          activeNote = {};
          isEditing  = false;
          renderActiveNote();
        }
        noteToDelete = null;
        getAndRenderNotes();
      })
      .catch(() => showToast('Failed to delete note.', 'error'));
  };

  if (target) {
    gsap.to(target, {
      opacity: 0, x: -30, height: 0, paddingTop: 0, paddingBottom: 0,
      marginBottom: 0, duration: 0.3, ease: 'power2.in',
      onComplete: doDelete,
    });
  } else {
    doDelete();
  }
};

const handleNoteView = (el) => {
  activeNote = JSON.parse(el.getAttribute('data-note'));
  isEditing  = false;
  renderActiveNote();
  renderNoteList(allNotes);

  gsap.fromTo('.note-title',    { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.25 });
  gsap.fromTo('.note-textarea', { opacity: 0 },         { opacity: 1,       duration: 0.35, delay: 0.05 });
};

const handleNewNoteView = () => {
  activeNote = {};
  isEditing  = false;
  renderActiveNote();
  renderNoteList(allNotes);

  // Spin the + icon
  const icon = newNoteBtn.querySelector('i');
  gsap.fromTo(icon, { rotation: 0 }, { rotation: 90, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 });
};

const handleEditMode = () => {
  isEditing = true;
  renderActiveNote();
  gsap.fromTo('.btn-update, .btn-cancel',
    { opacity: 0, scale: 0.88 },
    { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.7)' }
  );
};

const handleRenderSaveBtn = () => {
  if (!activeNote.id && noteTitle.value.trim() && noteText.value.trim()) {
    if (saveNoteBtn.classList.contains('hidden')) {
      show(saveNoteBtn);
      gsap.fromTo(saveNoteBtn, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
    }
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  }
  updateStats();
};

// === Event Listeners ===

saveNoteBtn?.addEventListener('click', handleNoteSave);
newNoteBtn?.addEventListener('click', handleNewNoteView);
editNoteBtn?.addEventListener('click', handleEditMode);
updateNoteBtn?.addEventListener('click', handleNoteUpdate);
cancelEditBtn?.addEventListener('click', () => { isEditing = false; renderActiveNote(); });
noteTitle?.addEventListener('input', handleRenderSaveBtn);
noteText?.addEventListener('input', handleRenderSaveBtn);
searchInput?.addEventListener('input', () => renderNoteList(allNotes));

// Delegated click on note list
noteList?.addEventListener('click', (e) => {
  const delBtn   = e.target.closest('.delete-btn');
  const noteItem = e.target.closest('.note-item');

  if (delBtn) {
    e.stopPropagation();
    handleNoteDelete(delBtn.getAttribute('data-id'));
  } else if (noteItem) {
    handleNoteView(noteItem);
  }
});

// Confirm dialog buttons
confirmDeleteBtn?.addEventListener('click', confirmDelete);
confirmCancelBtn?.addEventListener('click', closeConfirm);
confirmOverlay?.addEventListener('click', (e) => {
  if (e.target === confirmOverlay) closeConfirm();
});

// Nav button hover micro-animations
[saveNoteBtn, newNoteBtn].forEach(btn => {
  if (!btn) return;
  btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.12, duration: 0.18 }));
  btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1,    duration: 0.18 }));
});

// === Page Load ===
const init = () => {
  gsap.from('.app-navbar', { duration: 0.7, y: -50, opacity: 0, ease: 'power3.out' });
  gsap.from('.sidebar',    { duration: 0.8, x: -60, opacity: 0, ease: 'power3.out', delay: 0.15 });
  gsap.from('.editor',     { duration: 0.8, opacity: 0, x: 25,  ease: 'power3.out', delay: 0.25 });

  getAndRenderNotes();
};

init();
