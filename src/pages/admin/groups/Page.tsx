// src/App.tsx
import AdminSidebar from '@/components/AdminSidebar'
import { useState } from 'react'
// import { FiCog, FiUsers, FiUserShield, FiDatabase, FiGlobe, FiUserTag, FiSearch, FiMoon, FiPlus } from 'react-icons/fi'

const AdminGroups = () => {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <div className={`flex min-h-screen ${darkMode ? 'dark' : ''}`}>
            <AdminSidebar active={1} />

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Top Navigation */}
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4 flex justify-between items-center">
                    <div className="relative w-72">
                        {/* <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                        <input
                            type="text"
                            placeholder="Start typing to filter..."
                            className="w-full pl-10 pr-4 py-2 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            {/* <FiMoon /> */}
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">AD</div>
                            <span className="hidden md:inline">Admin</span>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                {/* <div className="p-6">
                    {activeSection === 'users' && (
                        <UsersSection />
                    )}
                    {activeSection === 'groups' && (
                        <div>Groups Section Content</div>
                    )}
                    {activeSection === 'datasets' && (
                        <div>Datasets Section Content</div>
                    )}
                    {activeSection === 'domains' && (
                        <div>Domains Section Content</div>
                    )}
                    {activeSection === 'user-access' && (
                        <div>User Access Section Content</div>
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default AdminGroups