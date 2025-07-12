let employees = [
    { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', department: 'IT', role: 'Developer' },
    { id: 3, firstName: 'Charlie', lastName: 'Lee', email: 'charlie@example.com', department: 'Finance', role: 'Analyst' },
    { id: 4, firstName: 'Diana', lastName: 'Brown', email: 'diana@example.com', department: 'Marketing', role: 'Designer' },
    { id: 5, firstName: 'Eve', lastName: 'Davis', email: 'eve@example.com', department: 'Sales', role: 'Associate' },
    { id: 6, firstName: 'Frank', lastName: 'Miller', email: 'frank@example.com', department: 'Engineering', role: 'Senior Developer' },
    { id: 7, firstName: 'Grace', lastName: 'Wilson', email: 'grace@example.com', department: 'HR', role: 'Associate' },
    { id: 8, firstName: 'Henry', lastName: 'Taylor', email: 'henry@example.com', department: 'IT', role: 'Manager' },
    { id: 9, firstName: 'Ivy', lastName: 'Anderson', email: 'ivy@example.com', department: 'Finance', role: 'Manager' },
    { id: 10, firstName: 'Jack', lastName: 'Garcia', email: 'jack@example.com', department: 'Marketing', role: 'Analyst' },
    { id: 11, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', department: 'HR', role: 'Manager' },
    { id: 12, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', department: 'IT', role: 'Developer' },
    { id: 13, firstName: 'Charlie', lastName: 'Lee', email: 'charlie@example.com', department: 'Finance', role: 'Analyst' },
    { id: 14, firstName: 'Diana', lastName: 'Brown', email: 'diana@example.com', department: 'Marketing', role: 'Designer' },
    { id: 15, firstName: 'Eve', lastName: 'Davis', email: 'eve@example.com', department: 'Sales', role: 'Associate' },
    { id: 16, firstName: 'Frank', lastName: 'Miller', email: 'frank@example.com', department: 'Engineering', role: 'Senior Developer' },
    { id: 17, firstName: 'Grace', lastName: 'Wilson', email: 'grace@example.com', department: 'HR', role: 'Associate' },
    { id: 18, firstName: 'Henry', lastName: 'Taylor', email: 'henry@example.com', department: 'IT', role: 'Manager' },
    { id: 19, firstName: 'Ivy', lastName: 'Anderson', email: 'ivy@example.com', department: 'Finance', role: 'Manager' },
    { id: 20, firstName: 'Jack', lastName: 'Garcia', email: 'jack@example.com', department: 'Marketing', role: 'Analyst' }
];

// Initial Config
let currentPage = 1;
let itemsPerPage = 10;
let filteredEmployees = [...employees];
let isEditing = false;
let editingEmployeeId = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    renderEmployees();
    updatePagination();
});

function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 300));
    
    // Sort functionality
    document.getElementById('sortBy').addEventListener('change', handleSort);
    
    // Items per page
    document.getElementById('itemsPerPage').addEventListener('change', function() {
        itemsPerPage = parseInt(this.value);
        currentPage = 1;
        renderEmployees();
        updatePagination();
    });

    // Filter inputs
    document.getElementById('departmentFilter').addEventListener('change', applyFilters);
    document.getElementById('roleFilter').addEventListener('change', applyFilters);
    document.getElementById('firstNameFilter').addEventListener('input', debounce(applyFilters, 300));

    // Form submission
    document.getElementById('employeeForm').addEventListener('submit', handleFormSubmit);

    // Close modal on outside click
    document.getElementById('employeeModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    applyFilters();
}

function handleSort() {
    const sortBy = document.getElementById('sortBy').value;
    if (sortBy) {
        filteredEmployees.sort((a, b) => {
            const aValue = a[sortBy].toLowerCase();
            const bValue = b[sortBy].toLowerCase();
            return aValue.localeCompare(bValue);
        });
        renderEmployees();
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const departmentFilter = document.getElementById('departmentFilter').value;
    const roleFilter = document.getElementById('roleFilter').value;
    const firstNameFilter = document.getElementById('firstNameFilter').value.toLowerCase().trim();

    filteredEmployees = employees.filter(employee => {
        const matchesSearch = !searchTerm || 
            employee.firstName.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm);

        const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
        const matchesRole = !roleFilter || employee.role === roleFilter;
        const matchesFirstName = !firstNameFilter || employee.firstName.toLowerCase().includes(firstNameFilter);

        return matchesSearch && matchesDepartment && matchesRole && matchesFirstName;
    });

    currentPage = 1;
    renderEmployees();
    updatePagination();
}

function clearFilters() {
    document.getElementById('departmentFilter').value = '';
    document.getElementById('roleFilter').value = '';
    document.getElementById('firstNameFilter').value = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('sortBy').value = '';
    filteredEmployees = [...employees];
    currentPage = 1;
    renderEmployees();
    updatePagination();
}

function renderEmployees() {
    const grid = document.getElementById('employeeGrid');
    const noResults = document.getElementById('noResults');
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const employeesToShow = filteredEmployees.slice(startIndex, endIndex);

    if (employeesToShow.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';

    grid.innerHTML = employeesToShow.map(employee => `
        <div class="employee-card">
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Department:</strong> ${employee.department}</p>
            <p><strong>Role:</strong> ${employee.role}</p>
            <div class="employee-actions">
                <button class="btn btn-edit" onclick="editEmployee(${employee.id})">Edit</button>
                <button class="btn btn-delete" onclick="deleteEmployee(${employee.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function updatePagination() {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.querySelector('.pagination-btn:first-of-type');
    const nextBtn = document.querySelector('.pagination-btn:last-of-type');

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderEmployees();
        updatePagination();
    }
}

function openAddModal() {
    isEditing = false;
    editingEmployeeId = null;
    document.getElementById('modalTitle').textContent = 'Add Employee';
    document.getElementById('employeeForm').reset();
    clearFormErrors();
    document.getElementById('employeeModal').classList.add('active');
}

function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return;

    isEditing = true;
    editingEmployeeId = id;
    document.getElementById('modalTitle').textContent = 'Edit Employee';
    
    // Fill form with employee data
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('email').value = employee.email;
    document.getElementById('department').value = employee.department;
    document.getElementById('role').value = employee.role;
    
    clearFormErrors();
    document.getElementById('employeeModal').classList.add('active');
}

function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        employees = employees.filter(emp => emp.id !== id);
        applyFilters();
        renderEmployees();
        updatePagination();
    }
}

function closeModal() {
    document.getElementById('employeeModal').classList.remove('active');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearFormErrors();
    
    // Get form data
    const formData = new FormData(e.target);
    const employeeData = {
        firstName: formData.get('firstName').trim(),
        lastName: formData.get('lastName').trim(),
        email: formData.get('email').trim(),
        department: formData.get('department'),
        role: formData.get('role')
    };

    // Validate form
    if (!validateForm(employeeData)) {
        return;
    }

    if (isEditing) {
        // Update existing employee
        const employeeIndex = employees.findIndex(emp => emp.id === editingEmployeeId);
        if (employeeIndex !== -1) {
            employees[employeeIndex] = { ...employees[employeeIndex], ...employeeData };
        }
    } else {
        // Add new employee
        const newId = Math.max(...employees.map(emp => emp.id)) + 1;
        employees.push({ id: newId, ...employeeData });
    }

    // Refresh the display
    applyFilters();
    renderEmployees();
    updatePagination();
    closeModal();
}

function validateForm(data) {
    let isValid = true;

    // Validate first name
    if (!data.firstName) {
        showError('firstNameError', 'First name is required');
        isValid = false;
    }

    // Validate last name
    if (!data.lastName) {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    }

    // Validate email
    if (!data.email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        // Check for duplicate email (excluding current employee if editing)
        const existingEmployee = employees.find(emp => 
            emp.email.toLowerCase() === data.email.toLowerCase() && 
            (!isEditing || emp.id !== editingEmployeeId)
        );
        if (existingEmployee) {
            showError('emailError', 'This email address is already in use');
            isValid = false;
        }
    }

    // Validate department
    if (!data.department) {
        showError('departmentError', 'Department is required');
        isValid = false;
    }

    // Validate role
    if (!data.role) {
        showError('roleError', 'Role is required');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
}