const Navbar = () => {

    const setTheme = (theme: 'light' | 'dark') => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute('data-theme') as 'light' | 'dark';
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    };

    const logout = () => {
        if (confirm("Are you sure you want to logout?")) {
            alert("Logging out...");
            // window.location.href = '/logout';
        }
    };

    return (
        <nav className="flex items-center justify-between px-8 py-3 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
            <a href="#" className="flex items-center gap-3 no-underline">
                {/* Logo SVG if needed */}
                {/* <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none">
      <path d="M2 2 L22 2 L12 22 Z" fill="currentColor" />
    </svg> */}
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    AdminPanel
                </span>
            </a>

            <div className="flex items-center gap-5">
                <button
                    title="button"
                    type="button"
                    id="themeToggle"
                    onClick={toggleTheme}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white transition"
                >
                    <i className="fas fa-moon" id="themeIcon" />
                </button>

                <div className="relative group">
                    <button
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer focus:outline-none"
                        aria-haspopup="true"
                    >
                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-semibold flex items-center justify-center">
                            AD
                        </div>
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100 hidden sm:inline">
                            Admin User
                        </span>
                        <i className="fas fa-chevron-down text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 min-w-[180px] bg-white dark:bg-gray-700 rounded-xl shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-[-10px] group-hover:translate-y-0 transition-all z-50">
                        <a
                            href="#"
                            className="block px-5 py-3 text-gray-900 dark:text-gray-100 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-3"
                        >
                            <i className="fas fa-user-circle" /> My Profile
                        </a>
                        <a
                            href="#"
                            className="block px-5 py-3 text-gray-900 dark:text-gray-100 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-3"
                        >
                            <i className="fas fa-cog" /> Settings
                        </a>
                        <div className="border-t border-gray-300 dark:border-gray-600 my-1" />
                        <a
                            href="#"
                            onClick={logout}
                            className="block px-5 py-3 text-gray-900 dark:text-gray-100 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-3"
                        >
                            <i className="fas fa-sign-out-alt" /> Logout
                        </a>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar