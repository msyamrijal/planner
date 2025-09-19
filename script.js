// Configuration
const SHEET_CONFIG = {
    // Google Sheets public URL (CSV format)
    sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTcEUYNKssh36NHW_Rk7D89EFDt-ZWFdKxQI32L_Q1exbwNhHuGHWKh_W8VFSA8E58vjhVrumodkUv9/pub?output=csv',
    
    // Alternative URLs to try if the main one fails
    alternativeUrls: [
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vTcEUYNKssh36NHW_Rk7D89EFDt-ZWFdKxQI32L_Q1exbwNhHuGHWKh_W8VFSA8E58vjhVrumodkUv9/pub?gid=0&single=true&output=csv'
    ],
    
    // Cache duration in milliseconds (5 minutes)
    cacheDuration: 5 * 60 * 1000
};

// DOM Elements
const elements = {
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    errorMessage: document.getElementById('error-message'),
    dataContainer: document.getElementById('data-container'),
    tableHeader: document.getElementById('table-header'),
    tableBody: document.getElementById('table-body'),
    lastUpdated: document.getElementById('last-updated'),
    totalRows: document.getElementById('total-rows')
};

// State management
let cachedData = null;
let lastFetchTime = 0;

// Utility function to parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const result = [];
    
    for (let line of lines) {
        const row = [];
        let currentField = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];
            
            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    currentField += '"';
                    i++; // Skip the next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(currentField.trim());
                currentField = '';
            } else {
                currentField += char;
            }
        }
        
        // Add the last field
        row.push(currentField.trim());
        result.push(row);
    }
    
    return result;
}

// Function to create table headers
function createTableHeaders(headers) {
    const headerRow = document.createElement('tr');
    
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header || 'Column';
        th.setAttribute('role', 'columnheader');
        headerRow.appendChild(th);
    });
    
    elements.tableHeader.innerHTML = '';
    elements.tableHeader.appendChild(headerRow);
}

// Function to create table rows
function createTableRows(data) {
    elements.tableBody.innerHTML = '';
    
    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.setAttribute('role', 'row');
        
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || '';
            td.setAttribute('role', 'cell');
            tr.appendChild(td);
        });
        
        elements.tableBody.appendChild(tr);
    });
}

// Function to show loading state
function showLoading() {
    elements.loading.style.display = 'flex';
    elements.error.style.display = 'none';
    elements.dataContainer.style.display = 'none';
}

// Function to show error state
function showError(message) {
    elements.loading.style.display = 'none';
    elements.error.style.display = 'block';
    elements.dataContainer.style.display = 'none';
    elements.errorMessage.textContent = message;
}

// Function to show data
function showData() {
    elements.loading.style.display = 'none';
    elements.error.style.display = 'none';
    elements.dataContainer.style.display = 'block';
}

// Function to update info display
function updateInfo(rowCount) {
    const now = new Date();
    elements.lastUpdated.textContent = now.toLocaleString();
    elements.totalRows.textContent = rowCount;
}

// Function to fetch data from Google Sheets
async function fetchSheetData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/csv,text/plain,*/*'
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const csvData = await response.text();
        
        if (!csvData || csvData.trim().length === 0) {
            throw new Error('Empty response received');
        }
        
        return csvData;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Function to try multiple URLs
async function fetchDataWithFallback() {
    const urlsToTry = [SHEET_CONFIG.sheetUrl, ...SHEET_CONFIG.alternativeUrls];
    let lastError;
    
    for (const url of urlsToTry) {
        try {
            console.log(`Attempting to fetch from: ${url}`);
            const data = await fetchSheetData(url);
            return data;
        } catch (error) {
            console.warn(`Failed to fetch from ${url}:`, error.message);
            lastError = error;
        }
    }
    
    throw lastError || new Error('All fetch attempts failed');
}

// Main function to load and display data
async function loadData() {
    try {
        // Check cache first
        const now = Date.now();
        if (cachedData && (now - lastFetchTime) < SHEET_CONFIG.cacheDuration) {
            console.log('Using cached data');
            displayData(cachedData);
            return;
        }
        
        showLoading();
        
        // Fetch fresh data
        const csvData = await fetchDataWithFallback();
        const parsedData = parseCSV(csvData);
        
        if (parsedData.length === 0) {
            throw new Error('No data found in the spreadsheet');
        }
        
        // Cache the data
        cachedData = parsedData;
        lastFetchTime = now;
        
        displayData(parsedData);
        
    } catch (error) {
        console.error('Error loading data:', error);
        showError(`Failed to load data: ${error.message}`);
    }
}

// Function to display parsed data
function displayData(data) {
    if (data.length === 0) {
        showError('No data available to display');
        return;
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    createTableHeaders(headers);
    createTableRows(rows);
    updateInfo(rows.length);
    showData();
    
    console.log(`Displayed ${rows.length} rows with ${headers.length} columns`);
}

// Function to handle manual refresh
function refreshData() {
    cachedData = null;
    lastFetchTime = 0;
    loadData();
}

// Initialize the application
function init() {
    console.log('Initializing Google Sheets Data Display...');
    
    // Add refresh functionality (optional - you can add a refresh button to HTML if needed)
    window.refreshData = refreshData;
    
    // Load data immediately
    loadData();
    
    // Set up auto-refresh every 5 minutes
    setInterval(() => {
        console.log('Auto-refreshing data...');
        loadData();
    }, SHEET_CONFIG.cacheDuration);
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for testing (if needed)
window.loadData = loadData;
window.refreshData = refreshData;