const API_BASE = 'http://localhost:3000/api';
let isEditMode = false;

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  loadUser();
  showSection('dashboard');
});

// 1. Load User from LocalStorage
function loadUser() {
  const name = localStorage.getItem('username') || "Organizer";
  const email = localStorage.getItem('userEmail') || "org@eventhub.com";
  
  document.getElementById('top-username').textContent = name;
  document.getElementById('top-email').textContent = email;
  document.getElementById('drop-username').textContent = name;
  document.getElementById('drop-email').textContent = email;
  document.getElementById('user-initials').textContent = name.charAt(0).toUpperCase();
}

// 2. Navigation
function showSection(id) {
  // Hide all
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));

  // Show target
  document.getElementById(id + '-section').classList.add('active');
  const nav = document.getElementById('nav-' + id);
  if(nav) nav.classList.add('active');

  if(id === 'events') fetchMyEvents();
  if(id === 'dashboard') updateStats();
  
  // Reset form if navigating to create
  if(id === 'create' && !isEditMode) {
      document.getElementById('event-form').reset();
      document.getElementById('form-title').textContent = "Create New Event";
  }
  isEditMode = false;
}

function toggleDropdown() {
  document.getElementById('profile-dropdown').classList.toggle('active');
}

// 3. Create / Update Event
const btn = document.getElementById('save-btn');

btn.addEventListener('click', async (e) => {
    e.preventDefault();
    btn.disabled = true;

    const eventId = document.getElementById('edit-event-id').value;
    const titleInput = document.getElementById('ev-title');
    const descInput = document.getElementById('ev-desc');
    const locationInput = document.getElementById('ev-loc');
    const dateInput = document.getElementById('ev-date');
    const priceInput = document.getElementById('ev-price');
    const seatsInput = document.getElementById('ev-seats');
    const categoryInput = document.getElementById('ev-cat');
    const fileInput = document.getElementById('ev-files');

    // Build FormData using keys backend expects
    const formData = new FormData();
    formData.append('title', titleInput.value);
    formData.append('description', descInput.value);
    formData.append('location', locationInput.value);
    formData.append('event_date', dateInput.value);
    formData.append('price', priceInput.value);
    formData.append('total_seats', seatsInput.value);
    formData.append('category', categoryInput.value);
    if (fileInput.files[0]) formData.append('event-cover', fileInput.files[0]); // backend expects 'event-cover'

    // Determine URL and method
    let url = '';
    let method = '';
    if (eventId) {
        // Update existing event
        url = `${API_BASE}/events/${eventId}`;
        method = 'PUT';
    } else {
        // Create new event
        url = `${API_BASE}/events`;
        method = 'POST';
    }

    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            alert(eventId ? 'Event Updated Successfully!' : 'Event Created Successfully!');
            if (typeof showSection === 'function') showSection('events');
        } else {
            alert('Error: ' + (data.error || JSON.stringify(data)));
        }
    } catch (err) {
        console.error(err);
        alert('Error connecting to server');
    } finally {
        btn.disabled = false;
    }
    console.log('Form submitted with data:', {
        title: titleInput.value,
        description: descInput.value, 
        location: locationInput.value,
        event_date: dateInput.value,
        price: priceInput.value,
        total_seats: seatsInput.value,
        category: categoryInput.value,
        hasFile: fileInput.files[0] ? true : false
    });
});


// 4. Fetch and Render My Events (Edit Format)
async function fetchMyEvents() {
  const container = document.getElementById('events-list-container');
  container.innerHTML = "<p>Loading...</p>";

  try {
      const res = await fetch(API_BASE, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      let payload = await res.json();
      // Support both { events: [...] } and direct array responses
      const events = Array.isArray(payload) ? payload : (payload.events || payload);

      if(!events || events.length === 0) {
          container.innerHTML = "<p>No events found.</p>";
          return;
      }

      container.innerHTML = events.map(ev => `
          <div class="event-card">
              <img src="${(ev.images && ev.images[0]) || 'https://via.placeholder.com/150x100'}" alt="event">
              <div class="event-details">
                  <h4>${ev.title}</h4>
                  <p style="font-size:0.85rem; color:#6b7280">${ev.location} | ${new Date(ev.event_date).toLocaleDateString()}</p>
                  <p><strong>₹${ev.price || ev.ticket_price || 0}</strong></p>
              </div>
              <div class="event-actions">
                  <button class="btn btn-edit btn-sm" onclick="prepareEdit('${ev.id}')"><i data-lucide="edit-2"></i> Edit</button>
                  <button class="btn btn-delete btn-sm" onclick="deleteEvent('${ev.id}')"><i data-lucide="trash"></i></button>
              </div>
          </div>
      `).join('');
      lucide.createIcons();
  } catch (e) {
      container.innerHTML = "<p>Error loading data.</p>";
  }
}

// 5. Edit Logic
async function prepareEdit(id) {
  isEditMode = true;
    const res = await fetch(`${API_BASE}/${id}`);
    let payload = await res.json();
    const ev = payload.event || payload;

    document.getElementById('edit-event-id').value = ev.id;
    document.getElementById('ev-title').value = ev.title || '';
    document.getElementById('ev-cat').value = ev.category || '';
    document.getElementById('ev-date').value = ev.event_date ? ev.event_date.substring(0, 16) : '';
    document.getElementById('ev-loc').value = ev.location || '';
    document.getElementById('ev-price').value = ev.price || ev.ticket_price || '';
    document.getElementById('ev-seats').value = ev.total_seats || '';
    document.getElementById('ev-desc').value = ev.description || '';

  document.getElementById('form-title').textContent = "Edit Event";
  showSection('create');
}

async function deleteEvent(id) {
  if(!confirm('Delete this event?')) return;
  await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  fetchMyEvents();
}

async function updateStats() {
  const res = await fetch(`${API_BASE}/count`);
  const data = await res.json();
  document.getElementById('stat-events').textContent = data.count || 0;
}

function logout() {
  localStorage.clear();
  window.location.href = '/login.html';
}