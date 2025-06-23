// src/App.tsx
import AdminInternalNavbar from '@/components/AdminInternalNavbar'
import AdminSidebar from '@/components/AdminSidebar'
import { API_BASE_URL } from '@/config'
import getCookie from '@/utils/getCookie'
import { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

const AdminUsers = () => {

    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
    const [formData, setFormData] = useState<User | null>(null);

    const token = getCookie('access_token');

    if (!token) {
        console.error('No access token found')
        return null
    }

    const fetchUsers = async () => {
        const response = await fetch(`${API_BASE_URL}/users/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        })
        const data = await response.json()
        if (response.ok) {
            setFilteredUsers(data)
        } else {
            console.error('Failed to fetch users:', data)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            if (!prev) return prev; // or handle initializing a new User object if needed
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData != selectedUser) {
            const updateUser = async () => {
                const response = await fetch(`${API_BASE_URL}/users/${selectedUser?.user_id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('User updated:', data);
                    // Optionally, refetch users after update
                    fetchUsers();
                } else {
                    console.error('Failed to update user:', data);
                }
            };
            updateUser();
        }
        setShowForm(false);
    };

    const cancelEditUserForm = () => {
        setShowForm(false);
        setSelectedUser(null);
        setFormData(null); // Reset form data when closing the form
    }

    const formChange = (user: User) => {
        setSelectedUser(user)
        setFormData(user); // Reset form data when closing the form
        setShowForm(!showForm);
    }

    // Function to show the form for adding a new user

    const [addUsername, setAddUsername] = useState<string>('');
    const [addEmail, setAddEmail] = useState<string>('');
    const [addFirstName, setAddFirstName] = useState<string>('');
    const [addLastName, setAddLastName] = useState<string>('');
    const [addIsAdmin, setAddIsAdmin] = useState<boolean>(false);
    const [addPassword, setAddPassword] = useState<string>('');

    const formChangeAddUser = () => { // Reset form data when closing the form
        setShowAddUserForm(!showForm);
    }

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        
        const addUser = async () => {
            const response = await fetch(`${API_BASE_URL}/users/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: addUsername,
                    email: addEmail,
                    first_name: addFirstName,
                    last_name: addLastName,
                    is_admin: addIsAdmin,
                    password: addPassword
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('User updated:', data);
                // Optionally, refetch users after update
                fetchUsers();
            } else {
                console.error('Failed to update user:', data);
            }
        };

        if (!addUsername || !addEmail || !addFirstName || !addLastName || !addPassword) {
            console.error('All fields are required');
            setShowAddUserForm(false);
            return;
        }

        addUser();
        setShowAddUserForm(false);
    }

    const cancelAddUserForm = () => {
        setShowAddUserForm(false);
        setAddUsername('');
        setAddEmail('');
        setAddFirstName('');
        setAddLastName('');
        setAddIsAdmin(false);
        setAddPassword('');
    }

    // Function to delete a user

    const deleteUser = async (userId: number) => {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_ids: [userId]
            })
        })
        
        if (response.ok) {
            // Optionally, refetch users after deletion
            fetchUsers()
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
       // <div className={`flex min-h-screen ${darkMode ? 'dark' : ''}`}></div>
        <div className={`flex min-h-screen`}>
            <AdminSidebar active={0} />

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Top Navigation */}

                <AdminInternalNavbar />

                <div className='p-4'>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Users</h1>
                        <button onClick={formChangeAddUser} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                            <FiPlus /> Add User
                        </button>
                    </div>

                    {/* Filters Card */}
                    {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700 mb-6">
                        <div className="p-4 border-b dark:border-gray-700">
                            <h3 className="font-medium">Filters</h3>
                        </div>
                        <div className="p-4 flex flex-wrap gap-5">
                            <div>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked className="rounded" />
                                    <span>By staff status</span>
                                </label>
                                <div className="ml-6 mt-2 space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="staffStatus" checked className="rounded-full" />
                                        <span>All</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="staffStatus" className="rounded-full" />
                                        <span>Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="staffStatus" className="rounded-full" />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>
                            
                        </div>
                    </div> */}

                    {/* Users Table Card */}
                    <div className="bg-white">
                        {/* <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                            <h3 className="font-medium">Select user to change</h3>
                            <div className="flex gap-2">
                                <select title='action' className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded px-3 py-1">
                                    <option>Action</option>
                                    <option>Delete selected users</option>
                                </select>
                                <select title='action' className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded px-3 py-1">
                                    <option>Action</option>
                                    <option>Delete selected users</option>
                                </select>
                                <select title='action' className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded px-3 py-1">
                                    <option>Action</option>
                                    <option>Delete selected users</option>
                                </select>
                                <select title='action' className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded px-3 py-1">
                                    <option>Action</option>
                                    <option>Delete selected users</option>
                                </select>
                                <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded">
                                    Go
                                </button>
                            </div>
                        </div> */}
                        <div className="overflow-x-auto bg-gray-50 dark:bg-gray-700 rounded-[16px] shadow border dark:border-gray-700">
                            <table className="w-full">
                                <thead className="bg-gray-50 w-full flex justify-start items-center border-b">
                                    <tr className='w-full flex justify-start items-center'>
                                        <th className="p-3 text-left w-full max-w-[200px]">Username</th>
                                        <th className="p-3 text-left w-full max-w-[300px]">Email address</th>
                                        <th className="p-3 text-left w-full max-w-[200px]">First name</th>
                                        <th className="p-3 text-left w-full max-w-[200px]">Last name</th>
                                        <th className="p-3 text-left w-full max-w-[200px]">Is Admin</th>
                                        <th className="p-3 text-left w-full max-w-[200px]"></th>
                                    </tr>
                                </thead>
                                <tbody className='w-full flex flex-col justify-start items-start'>
                                    {
                                        filteredUsers.map((user, index) => (
                                            <tr key={index} className="w-full border-b dark:border-gray-600 flex justify-start items-center">
                                                <td className="p-3 w-full max-w-[200px]">{user.username}</td>
                                                <td className="p-3 w-full max-w-[300px]">{user.email}</td>
                                                <td className="p-3 w-full max-w-[200px]">{user.first_name}</td>
                                                <td className="p-3 w-full max-w-[200px]">{user.last_name}</td>
                                                <td className="p-3 w-full max-w-[200px]">{user.is_admin ? 'Yes' : 'No'}</td>
                                                <td className="p-3 w-full max-w-[200px] flex justify-center items-center gap-2">
                                                    <button
                                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded cursor-pointer"
                                                        onClick={() => formChange(user)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button onClick={() => deleteUser(user.user_id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {showForm && (
                    <div className='w-full absolute h-full top-0 left-0 flex justify-center items-center'>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-[#364153] p-8 rounded-lg max-w-[600px] w-full">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData?.username}
                                onChange={handleChange}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData?.email}
                                onChange={handleChange}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData?.first_name}
                                onChange={handleChange}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData?.last_name}
                                onChange={handleChange}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="is_admin"
                                    checked={formData?.is_admin}
                                    onChange={handleChange}
                                    className='rounded-sm'
                                />
                                <span className='text-white'>Is Admin</span>
                            </label>
                            <button
                                type="submit"
                                className="bg-orange-400 hover:bg-orange-500 cursor-pointer text-white px-4 py-2 rounded w-full"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-red-400 hover:bg-red-500 cursor-pointer text-white px-4 py-2 rounded w-full"
                                onClick={cancelEditUserForm}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                {showAddUserForm && (
                    <div className='w-full absolute h-full top-0 left-0 flex justify-center items-center'>
                        <form onSubmit={handleAddUser} className="mt-4 space-y-4 bg-[#364153] p-8 rounded-lg max-w-[600px] w-full">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={addUsername}
                                onChange={(e) => setAddUsername(e.target.value)}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={addEmail}
                                onChange={(e) => setAddEmail(e.target.value)}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={addFirstName}
                                onChange={(e) => setAddFirstName(e.target.value)}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={addLastName}
                                onChange={(e) => setAddLastName(e.target.value)}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={addPassword}
                                onChange={(e) => setAddPassword(e.target.value)}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="is_admin"
                                    checked={addIsAdmin}
                                    onChange={(e) => setAddIsAdmin(e.target.checked)}
                                    className='rounded-sm'
                                />
                                <span className='text-white'>Is Admin</span>
                            </label>
                            <button
                                type="submit"
                                className="bg-orange-400 hover:bg-orange-500 cursor-pointer text-white px-4 py-2 rounded w-full"
                            >
                                Create User
                            </button>
                            <button
                                type="button"
                                className="bg-red-400 hover:bg-red-500 cursor-pointer text-white px-4 py-2 rounded w-full"
                                onClick={cancelAddUserForm}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default AdminUsers