// Sidebar functionality
const toggleSidebar = (open = null) => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (!sidebar || !overlay) return;

  const isCurrentlyOpen = sidebar.classList.contains('open');
  const shouldOpen = open !== null ? open : !isCurrentlyOpen;

  if (shouldOpen) {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  } else {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
};

const setupSidebar = () => {
  const sidebarToggleButton = document.getElementById("sidebar-toggle");
  const overlay = document.getElementById("sidebar-overlay");
  const closeBtn = document.getElementById('sidebar-close-btn');
  const sidebar = document.getElementById('sidebar');

  // Setup toggle button
  if (sidebarToggleButton && !sidebarToggleButton.hasAttribute('data-sidebar-handler')) {
    sidebarToggleButton.setAttribute('data-sidebar-handler', 'true');
    sidebarToggleButton.addEventListener("click", () => toggleSidebar());
  }

  // Setup overlay click
  if (overlay && !overlay.hasAttribute('data-overlay-handler')) {
    overlay.setAttribute('data-overlay-handler', 'true');
    overlay.addEventListener("click", () => toggleSidebar(false));
  }

  // Setup close button
  if (closeBtn && !closeBtn.hasAttribute('data-close-handler')) {
    closeBtn.setAttribute('data-close-handler', 'true');
    closeBtn.addEventListener('click', () => toggleSidebar(false));
  }

  // Close sidebar when clicking on post links
  if (sidebar && !sidebar.hasAttribute('data-link-handler')) {
    sidebar.setAttribute('data-link-handler', 'true');
    sidebar.addEventListener('click', (e) => {
      if (e.target && e.target.closest('.post-link')) {
        toggleSidebar(false);
      }
    });
  }
};

// Theme toggle functionality
const handleThemeToggleClick = () => {
  const element = document.documentElement;
  const isDark = element.classList.toggle("dark");
  const theme = isDark ? "dark" : "light";

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem("theme", theme);
  }

  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  if (isDark) {
    sunIcon?.classList.remove('hidden');
    moonIcon?.classList.add('hidden');
  } else {
    sunIcon?.classList.add('hidden');
    moonIcon?.classList.remove('hidden');
  }
};

const setupTheme = () => {
  const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
  const prefersDark = typeof window !== 'undefined' && window.matchMedia ?
    window.matchMedia('(prefers-color-scheme: dark)').matches : false;

  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  const element = document.documentElement;
  const isDark = theme === 'dark';
  element.classList.toggle('dark', isDark);

  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  if (isDark) {
    sunIcon?.classList.remove('hidden');
    moonIcon?.classList.add('hidden');
  } else {
    sunIcon?.classList.add('hidden');
    moonIcon?.classList.remove('hidden');
  }

  if (typeof localStorage !== 'undefined' && !savedTheme) {
    localStorage.setItem('theme', theme);
  }

  const themeToggleButton = document.getElementById("theme-toggle");
  if (themeToggleButton && !themeToggleButton.hasAttribute('data-theme-handler')) {
    themeToggleButton.setAttribute('data-theme-handler', 'true');
    themeToggleButton.addEventListener("click", handleThemeToggleClick);
  }
};

// Initialize on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupSidebar();
      setupTheme();
    });
  } else {
    setupSidebar();
    setupTheme();
  }
}

// Make toggleSidebar available globally
if (typeof window !== 'undefined') {
  window.toggleSidebar = toggleSidebar;
}
