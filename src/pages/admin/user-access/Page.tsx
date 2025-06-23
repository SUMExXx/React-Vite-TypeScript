import { useEffect, useState } from 'react';
import AdminInternalNavbar from '@/components/AdminInternalNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import getCookie from '@/utils/getCookie';
import { API_BASE_URL } from '@/config';

const AdminUserAccess = () => {

    const token = getCookie('access_token');
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectedDatasets, setSelectedDatasets] = useState<(Dataset & {domain_id: number, domain_name: string})[]>([]);
    const [draggedItem, setDraggedItem] = useState<Dataset & { domain_id: number, domain_name: string } | null>(null);
    const [collapsedDomains, setCollapsedDomains] = useState<number[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [domainData, setDomainData] = useState<DomainDataset[] | null>(null);

    const fetchDomains = async () => {
        const res = await fetch(`${API_BASE_URL}/admin/domains-with-datasets`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })

        if (!res.ok) {
            console.error('Failed to fetch domains');
            return;
        }

        const data: DomainDataset[] = await res.json();
        setDomainData(data);
        setCollapsedDomains(data.map((d) => d.domain_id)); // Collapse all domains initially      
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
            setUsers(data)
        } else {
            console.error('Failed to fetch users:', data)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (
            draggedItem &&
            !selectedDatasets.some(
                (d) => d.dataset_id === draggedItem.dataset_id && d.dataset_name === draggedItem.dataset_name
            )
        ) {
            setSelectedDatasets([...selectedDatasets, draggedItem]);
        }
        setDraggedItem(null);
    };

    const toggleDomain = (domain_id: number) => {
        setCollapsedDomains((prev) =>
            prev.includes(domain_id)
                ? prev.filter((d) => d !== domain_id)
                : [...prev, domain_id]
        );
    };

    const getUserDatasets = async () => {
        const res = await fetch(`${API_BASE_URL}/admin/user-access/${selectedUser}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        const data:DomainDataset[] = await res.json();

        const holder: (Dataset & { domain_id: number, domain_name: string })[] = []

        data.forEach((domain) => {
            domain.datasets.forEach((dataset) => {
                holder.push({
                    domain_id: domain.domain_id,
                    domain_name: domain.domain_name,
                    ...dataset
                });
            });
        })

        setSelectedDatasets(holder);
    }

    const updateUserAccess = async () => {
        if (!selectedUser || selectedDatasets.length === 0) {
            alert('Please select a user and at least one dataset.');
            return;
        }

        const result = Object.values(
            selectedDatasets.reduce((datasets, item) => {
                if (!datasets[item.domain_id]) {
                    datasets[item.domain_id] = {
                        domain_id: item.domain_id,
                        dataset_ids: []
                    };
                }
                datasets[item.domain_id].dataset_ids.push(item.dataset_id);
                return datasets;
            }, {} as Record<number, { domain_id: number; dataset_ids: number[] }>)
        );

        console.log(result)

        const payload = {
            userId: selectedUser,
            access: result
        };

        const res = await fetch(`${API_BASE_URL}/admin/assign-user-access`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert('Access updated successfully!');
        } else {
            const errorData = await res.json();
            alert(`Failed to update access: ${errorData.message}`);
        }
    }

    useEffect(() => {
        fetchDomains();
        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            getUserDatasets();

        } else{
            setSelectedDatasets([]); // Reset selected datasets when user changes
            setDraggedItem(null);
        }
    }, [selectedUser]);

    return (
        <div className="flex min-h-screen">
            <AdminSidebar active={3} />

            <div className="flex-1 ml-64">
                <AdminInternalNavbar />
                <div className="p-4 max-h-[calc(100vh-80px)] h-full overflow-hidden gap-4 flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4">Assign Domain Access</h2>

                    {/* User Selection */}
                    <div className="">
                        <select
                            title="Select User"
                            value={selectedUser? selectedUser : ''}
                            onChange={(e) => {setSelectedUser(e.target.value==''? null : e.target.value)}}
                            className="w-full border rounded px-4 py-2"
                        >
                            <option value="">Select user</option>
                            {users.map((user, index) => (
                                <option key={index} value={user.user_id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-6 h-full overflow-y-hidden">
                        {/* Domains List */}
                        <div className="flex flex-col gap-4 w-1/2 border h-full overflow-y-hidden rounded p-4">
                            <input
                                type="text"
                                placeholder="Search domains or datasets..."
                                className="w-full px-3 py-2 border rounded"
                            />
                            <div className='overflow-y-scroll flex flex-col h-full w-full gap-1'>
                                {domainData?.map((domain, index) => (
                                    <div key={index} className="flex flex-col gap-1 pb-1">
                                        <div
                                            className="font-semibold text-gray-700 py-2 capitalize mb-1 cursor-pointer bg-sky-100 px-4 rounded flex items-center justify-between"
                                            onClick={() => toggleDomain(domain.domain_id)}
                                        >
                                            {domain.domain_name}
                                            <span className="text-gray-400 text-sm">
                                                {collapsedDomains.includes(domain.domain_id) ? '▸' : '▾'}
                                            </span>
                                        </div>

                                        {!collapsedDomains.includes(domain.domain_id) && (
                                            <div className="pl-4 flex flex-col gap-2">
                                                {domain.datasets.map((ds, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 pl-4 cursor-move hover:bg-gray-200 bg-gray-100 py-1 rounded border-l-4 border-sky-500"
                                                        draggable
                                                        onDragStart={() =>
                                                            setDraggedItem({...ds, domain_id: domain.domain_id, domain_name: domain.domain_name})
                                                        }
                                                    >
                                                        <span role="img">🗄️</span>
                                                        <span>{ds.dataset_name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Drop Zone */}
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className="flex flex-col justify-between items-center w-1/2 border rounded p-4 bg-gray-50 transition-shadow"
                        >
                            <h3 className="font-semibold mb-2">
                                Selected Datasets ({selectedDatasets.length} selected)
                            </h3>
                            {selectedDatasets.length === 0 ? (
                                <div className="text-center text-gray-400">
                                    <div className="text-4xl mb-2">☁️</div>
                                    Drag datasets here or select from the list
                                </div>
                            ) : (
                                <ul className="flex flex-col w-full h-full gap-2">
                                    {selectedDatasets.map((ds, i) => (
                                        <li
                                            key={i}
                                            className="bg-gray-100 px-3 py-1 rounded text-sm flex justify-between w-full hover:bg-gray-200 border-l-4 border-sky-500 cursor-pointer"
                                        >
                                            <span>
                                                <b>{`${ds.dataset_name} (${ds.domain_name})`}</b>
                                            </span>
                                            <button
                                                onClick={() =>
                                                    setSelectedDatasets((prev) =>
                                                        prev.filter((_, idx) => idx !== i)
                                                    )
                                                }
                                                className="text-red-500"
                                            >
                                                ✕
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <button onClick={updateUserAccess} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 cursor-pointer">
                                💾 Save Access
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserAccess;
