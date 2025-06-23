// src/App.tsx
import AdminInternalNavbar from '@/components/AdminInternalNavbar'
import AdminSidebar from '@/components/AdminSidebar'
import { API_BASE_URL } from '@/config'
import getCookie from '@/utils/getCookie'
import { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

const AdminDomains = () => {

    const [selectedUser, setSelectedUser] = useState<Domain | null>(null)

    const [filteredDomains, setFilteredDomains] = useState<Domain[]>([])
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
    const [formData, setFormData] = useState<Domain | null>(null);

    const [addDomainName, setAddDomainName] = useState<string>('');

    const token = getCookie('access_token');

    if (!token) {
        console.error('No access token found')
        return null
    }

    const fetchDomains = async () => {
        const response = await fetch(`${API_BASE_URL}/domains/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        })
        const data = await response.json()
        if (response.ok) {
            setFilteredDomains(data)
        } else {
            console.error('Failed to fetch domains:', data)
        }
    }

    const cancelEditDomainForm = () => {
        setShowForm(false);
        setFormData(null); // Reset form data when closing the form
        setSelectedUser(null); // Reset selected user when closing the form
        setShowAddUserForm(false); // Ensure the add user form is closed
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
                const response = await fetch(`${API_BASE_URL}/domains/${selectedUser?.domain_id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('Domain updated:', data);
                    // Optionally, refetch users after update
                    fetchDomains();
                    cancelEditDomainForm();
                } else {
                    console.error('Failed to update user:', data);
                    cancelEditDomainForm();
                }
            };
            updateUser();
        }
        cancelEditDomainForm();
    };

    const formChange = (domain: Domain) => {
        setSelectedUser(domain)
        setFormData(domain); // Reset form data when closing the form
        setShowForm(!showForm);
    }

    // Function to show the form for adding a new user

    const formChangeAddUser = () => { // Reset form data when closing the form
        setShowAddUserForm(!showForm);
    }

    const handleAddDomain = (e: React.FormEvent) => {
        e.preventDefault();

        const addUser = async () => {
            const response = await fetch(`${API_BASE_URL}/domains/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    domain_name: addDomainName,
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Domain updated:', data);
                // Optionally, refetch users after update
                cancelAddDomainForm()
                fetchDomains();
            } else {
                console.error('Failed to update user:', data);
                cancelAddDomainForm()
            }
        };

        if (!addDomainName) {
            console.error('All fields are required');
            cancelAddDomainForm()
            return;
        }

        addUser();
        cancelAddDomainForm()
    }

    const cancelAddDomainForm = () => {
        setShowAddUserForm(false);
        setAddDomainName('');
    }

    // Function to delete a user

    const deleteUser = async (domainId: number) => {
        const response = await fetch(`${API_BASE_URL}/domains/${domainId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json()

        if (response.ok) {
            console.log('User deleted:', data)
            // Optionally, refetch users after deletion
            fetchDomains()
        }
    }

    useEffect(() => {
        fetchDomains()
    }, [])

    return (
        // <div className={`flex min-h-screen ${darkMode ? 'dark' : ''}`}></div>
        <div className={`flex min-h-screen`}>
            <AdminSidebar active={1} />

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Top Navigation */}

                <AdminInternalNavbar />

                <div className='p-4'>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Domains</h1>
                        <button onClick={formChangeAddUser} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                            <FiPlus /> Add Domain
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
                                        <th className="p-3 text-left w-full max-w-[200px]">Domains</th>
                                        <th className="p-3 text-left w-full max-w-[200px]"></th>
                                    </tr>
                                </thead>
                                <tbody className='w-full flex flex-col justify-start items-start'>
                                    {
                                        filteredDomains.map((domain, index) => (
                                            <tr key={index} className="w-full border-b dark:border-gray-600 flex justify-between items-center">
                                                <td className="p-3 w-full max-w-[200px]">{domain.domain_name}</td>
                                                <td className="p-3 w-full max-w-[200px] flex justify-center items-center gap-2">
                                                    <button
                                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded cursor-pointer"
                                                        onClick={() => formChange(domain)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button onClick={() => deleteUser(domain.domain_id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
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
                    <div className='w-full absolute h-full top-0 left-0 flex justify-center items-center bg-gray-700/30'>
                        <form onSubmit={handleSubmit} className="flex flex-col justify-start items-center gap-4 bg-[#364153] p-8 rounded-lg max-w-[600px] w-full">
                            <input
                                type="text"
                                name="domain_name"
                                placeholder="Domain Name"
                                value={formData?.domain_name}
                                onChange={handleChange}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            <input
                                type="text"
                                name="prompts"
                                placeholder="Prompts"
                                value={formData?.prompts}
                                onChange={handleChange}
                                className="border px-3 py-2 h-[80px] w-full rounded-sm bg-white"
                            />
                            <button
                                type="submit"
                                className="bg-orange-400 hover:bg-orange-500 cursor-pointer text-white px-4 py-2 rounded w-full"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-red-400 hover:bg-red-500 cursor-pointer text-white px-4 py-2 rounded w-full"
                                onClick={cancelEditDomainForm}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                {showAddUserForm && (
                    <div className='w-full absolute h-full top-0 left-0 flex justify-center items-center bg-gray-700/30'>
                        <form onSubmit={handleAddDomain} className="flex flex-col justify-start items-center gap-4 bg-[#364153] p-8 rounded-lg max-w-[600px] w-full">
                            <input
                                type="text"
                                name="domain_name"
                                placeholder="Domain Name"
                                value={addDomainName}
                                onChange={(e) => setAddDomainName(e.target.value)}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            />
                            {/* <input
                                type="text"
                                name="prompts"
                                placeholder="Prompts"
                                value={addPrompts}
                                onChange={(e) => setAddPrompts(e.target.value)}
                                className="border px-3 py-2 w-full rounded-sm bg-white"
                            /> */}
                            <button
                                type="submit"
                                className="bg-orange-400 hover:bg-orange-500 cursor-pointer text-white px-4 py-2 rounded w-full"
                            >
                                Create Domain
                            </button>
                            <button
                                type="button"
                                className="bg-red-400 hover:bg-red-500 cursor-pointer text-white px-4 py-2 rounded w-full"
                                onClick={cancelAddDomainForm}
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

export default AdminDomains