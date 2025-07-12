<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Employee Directory</title>
    <link href="/css/style.css" rel="stylesheet"/></head>
<body>
    <div class="container">
        <!-- Main Content -->
        <div class="main-content">

            <!-- Header -->
            <div class="header">
                <h1>Employee Directory</h1>
                <div class="search-container">
                    <input class="search-input" id="searchInput" placeholder="Search by name or email" type="text"/>
                </div>
            </div>

            <!-- Controls -->
            <div class="controls">
                <label for="sortBy">Sort:</label>
                <select id="sortBy">
                    <option value="">--Select--</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="department">Department</option>
                    <option value="role">Role</option>
                </select>
                <label for="itemsPerPage">Show:</label>
                    <select id="itemsPerPage">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <!-- Employee Grid -->
            <div class="employee-grid" id="employeeGrid"></div>

            <!-- No Results -->
            <div class="no-results" id="noResults" style="display: none;">
                <h3>No employees found</h3>
                <p>Try adjusting your search criteria or filters</p>
            </div>

            <!-- Pagination -->
            <div class="pagination">
                <button class="pagination-btn" onclick="goToPage(currentPage - 1)">Previous</button>
                <span id="pageInfo"></span>
                <button class="pagination-btn" onclick="goToPage(currentPage + 1)">Next</button>
            </div>

            <!-- Footer -->
            <div class="footer1">
                @2025 Employee Directory App. All rights reserved.
            </div>
        </div>
        
        <!-- Sidebar -->
        <div class="sidebar">
            <h3>Filter Employees</h3>
            <div class="filter-group">
                <label for="firstNameFilter">First Name:</label>
                <input id="firstNameFilter" placeholder="" type="text"/>
            </div>
            <div class="filter-group">
                <label for="departmentFilter">Department:</label>
                <select id="departmentFilter">
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="IT">IT</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="roleFilter">Role:</label>
                <select id="roleFilter">
                    <option value="">All Roles</option>
                    <option value="Manager">Manager</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Associate">Associate</option>
                </select>
            </div>
            <div class="filter-buttons">
                <button class="btn btn-primary" onclick="applyFilters()">Apply</button>
                <button class="btn btn-secondary" onclick="clearFilters()">Reset</button>
            </div>
        </div>

    </div>
    
    <!-- Add Employee Button -->
    <button class="add-employee-btn" onclick="openAddModal()">+ Add Employee</button>

    <!-- Footer -->
    <div class="footer2">
        @2025 Employee Directory App. All rights reserved.
    </div>

    <!-- Add/Edit Employee Modal -->
    <div class="modal" id="employeeModal">
        <div class="modal-content">
            <h2 id="modalTitle">Add Employee</h2>
            <form id="employeeForm">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input id="firstName" name="firstName" required="" type="text"/>
                    <div class="error-message" id="firstNameError"></div>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input id="lastName" name="lastName" required="" type="text"/>
                    <div class="error-message" id="lastNameError"></div>
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input id="email" name="email" required="" type="email"/>
                    <div class="error-message" id="emailError"></div>
                </div>
                <div class="form-group">
                    <label for="department">Department *</label>
                    <select id="department" name="department" required="">
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="IT">IT</option>
                    </select>
                    <div class="error-message" id="departmentError"></div>
                </div>
                <div class="form-group">
                    <label for="role">Role *</label>
                    <select id="role" name="role" required="">
                        <option value="">Select Role</option>
                        <option value="Manager">Manager</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Associate">Associate</option>
                    </select>
                    <div class="error-message" id="roleError"></div>
                </div>
                <div class="form-actions">
                    <button class="btn btn-secondary" onclick="closeModal()" type="button">Cancel</button>
                    <button class="btn btn-primary" type="submit">Save Employee</button>
                </div>
            </form>
        </div>
    </div>

    <script src="/js/script.js"></script>
</body>
</html>