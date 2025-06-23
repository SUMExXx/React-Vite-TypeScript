import useCheckSession from '@/utils/useCheckSession';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminOptions = () => {

    useCheckSession();

    // useEffect(() => {
    //     useCheckSession();
    //     // setTimeout(showSystemNotification, 3000);
    // }, []);    

    // const showSystemNotification = () => {
    //     const notification = document.createElement('div');
    //     notification.className = 'system-notification';
    //     notification.innerHTML = `
    //         <div class="notification-content">
    //             <i class="fas fa-check-circle"></i>
    //             <span>System is running smoothly</span>
    //         </div>
    //         `;
    //     document.body.appendChild(notification);

    //     setTimeout(() => {
    //         notification.classList.add('show');
    //     }, 100);
    //     setTimeout(() => {
    //         notification.classList.remove('show');
    //         setTimeout(() => notification.remove(), 300);
    //     }, 5000);
    // };

    return (
        <div data-theme="light" className="min-h-screen flex flex-col bg-white text-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-1 p-8 bg-gray-100">
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold mb-2">Welcome back, Admin</h1>
                    <p className="text-gray-500 text-base">Manage your system and users from this dashboard</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mt-8">
                    <div className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-xl p-8 shadow-sm transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-500">
                        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-orange-500 text-2xl">
                            <i className="fas fa-user"></i>
                        </div>
                        <h3 className="text-lg font-semibold mb-3">User Page</h3>
                        <p className="text-gray-500 mb-6 text-sm">Access your user dashboard.</p>
                        <a href="/user" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 hover:shadow-lg transition duration-300">
                            Go to User Pages <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>

                    <div className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-xl p-8 shadow-sm transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-500">
                        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-orange-500 text-2xl">
                            <i className="fas fa-cogs"></i>
                        </div>
                        <h3 className="text-lg font-semibold mb-3">Admin Panel</h3>
                        <p className="text-gray-500 mb-6 text-sm">Manage users and system settings.</p>
                        <a href="/admin" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 hover:shadow-lg transition duration-300">
                            Go to Admin Panel <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>

    );
};

export default AdminOptions;
