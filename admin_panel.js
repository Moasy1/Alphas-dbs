// Mock Data
const mockSubmissions = [
    { id: 'SUB-1001', name: 'John Doe', email: 'john@example.com', service: 'Web Development', date: '2026-07-01', status: 'pending', message: 'Looking for a new corporate website.' },
    { id: 'SUB-1002', name: 'Jane Smith', email: 'jane.smith@design.co', service: 'UI/UX Design', date: '2026-06-30', status: 'in-progress', message: 'Need a mobile app redesign.' },
    { id: 'SUB-1003', name: 'Robert Johnson', email: 'rob@techcorp.com', service: 'SEO Optimization', date: '2026-06-29', status: 'resolved', message: 'Want to improve google ranking.' },
    { id: 'SUB-1004', name: 'Emily Davis', email: 'emily@startup.io', service: 'Full Stack App', date: '2026-06-29', status: 'pending', message: 'Building an MVP for our SaaS product.' },
    { id: 'SUB-1005', name: 'Michael Wilson', email: 'm.wilson@agency.com', service: 'Web Development', date: '2026-06-28', status: 'resolved', message: 'E-commerce platform setup.' }
];

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-links a');
    const viewSections = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');

            // Hide all sections
            viewSections.forEach(sec => sec.classList.remove('active'));
            
            // Show target section
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Populate Dashboard Recent List
    const recentList = document.getElementById('dashboard-recent-list');
    mockSubmissions.slice(0, 3).forEach(sub => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="activity-dot"></div>
            <div class="activity-details">
                <p>${sub.name} requested ${sub.service}</p>
                <span>${sub.date} • ${sub.status}</span>
            </div>
        `;
        recentList.appendChild(li);
    });

    // Populate CRM Table
    const tableBody = document.getElementById('crm-table-body');
    
    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(sub => {
            let badgeClass = '';
            let statusText = '';
            
            switch(sub.status) {
                case 'pending': badgeClass = 'status-pending'; statusText = 'Pending'; break;
                case 'in-progress': badgeClass = 'status-inprogress'; statusText = 'In Progress'; break;
                case 'resolved': badgeClass = 'status-resolved'; statusText = 'Resolved'; break;
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${sub.id}</strong></td>
                <td>${sub.name}</td>
                <td>${sub.email}</td>
                <td>${sub.service}</td>
                <td>${sub.date}</td>
                <td><span class="status-badge ${badgeClass}">${statusText}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn-icon view-btn" data-id="${sub.id}" title="View Details"><i class='bx bx-show'></i></button>
                        <button class="btn-icon delete" title="Delete"><i class='bx bx-trash'></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-id');
                openModal(id);
            });
        });
        
        document.querySelectorAll('.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if(confirm('Are you sure you want to delete this submission?')) {
                    const row = btn.closest('tr');
                    row.style.opacity = '0';
                    setTimeout(() => row.remove(), 300);
                }
            });
        });
    }

    renderTable(mockSubmissions);

    // Filter Logic
    document.getElementById('status-filter').addEventListener('change', (e) => {
        const status = e.target.value;
        if(status === 'all') {
            renderTable(mockSubmissions);
        } else {
            const filtered = mockSubmissions.filter(s => s.status === status);
            renderTable(filtered);
        }
    });

    // Modal Logic
    const modal = document.getElementById('view-modal');
    const closeBtns = document.querySelectorAll('.close-btn, .close-modal-btn');
    const modalDetails = document.getElementById('modal-details');
    let currentEditingId = null;

    function openModal(id) {
        const data = mockSubmissions.find(s => s.id === id);
        if(!data) return;
        
        currentEditingId = id;
        
        modalDetails.innerHTML = `
            <div class="detail-row">
                <div class="detail-label">Submission ID</div>
                <div class="detail-value">${data.id}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Name</div>
                <div class="detail-value">${data.name}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Email</div>
                <div class="detail-value">${data.email}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Service Requested</div>
                <div class="detail-value">${data.service}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Message</div>
                <div class="detail-value" style="min-height: 80px;">${data.message}</div>
            </div>
        `;
        
        modal.classList.add('show');
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    });

    window.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Mark as resolved button
    document.getElementById('mark-resolved-btn').addEventListener('click', () => {
        if(currentEditingId) {
            const index = mockSubmissions.findIndex(s => s.id === currentEditingId);
            if(index !== -1) {
                mockSubmissions[index].status = 'resolved';
                // Re-render table if not filtered, or re-apply filter
                const filter = document.getElementById('status-filter').value;
                if(filter === 'all') renderTable(mockSubmissions);
                else renderTable(mockSubmissions.filter(s => s.status === filter));
                
                modal.classList.remove('show');
                alert('Submission marked as resolved!');
            }
        }
    });
});
