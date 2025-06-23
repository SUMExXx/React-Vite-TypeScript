import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/login/Page';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminOptions from '@/pages/admin-options/Page';
import AdminMain from '@/pages/admin/Page';
import AdminUsers from '@/pages/admin/users/Page';
import AdminGroups from '@/pages/admin/groups/Page';
import AdminDomains from '@/pages/admin/domains/Page';
import AdminUserAccess from '@/pages/admin/user-access/Page';
import RegisterPage from '@/pages/register/Page';
import AdminDataSource from '@/pages/admin/data-source/Page';

/* ------------------------- mention all routes here ------------------------ */

export default function AppRoutes() {

    // const { user } = useSelector((state) => state.user);

    // const protectedRoutes = [
    //     { path: "dashboard", element: <Dashboard /> }
    // ];

    return (
        <Router>
            <Routes>

                {/* ---------------------------- Public Routes ---------------------------- */}

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

                {/* ---------------------------- Private Routes ---------------------------- */}
                
                <Route
                    path="/admin-options/*"
                    element={
                        <ProtectedRoute>
                            <AdminOptions />
                        </ProtectedRoute>
                        // <>
                        //     <Sidebar />
                        //     <Topbar />
                        //     <Routes>
                        //         {protectedRoutes.map(({ path, element }, index) => (
                        //             <Route
                        //                 key={index}
                        //                 path={path}
                        //                 element={<ProtectedRoute>{element}</ProtectedRoute>}
                        //             />
                        //         ))}

                        //         {/* ----------------- admin path ----------------- */}
                        //         <Route
                        //             path="approval-request"
                        //             element={
                        //                 <ProtectedRoute>
                        //                     {hasPermission(user?.role, "update", "timesheet_approval")
                        //                         ? <ApprovalRequest />
                        //                         : <Navigate to="/app/dashboard" replace />
                        //                     }
                        //                 </ProtectedRoute>
                        //             }
                        //         />
                        //         <Route
                        //             path="employees-page"
                        //             element={
                        //                 <ProtectedRoute>
                        //                     {hasPermission(user?.role, "read", "employees")
                        //                         ? <EmployeesPage />
                        //                         : <Navigate to="/app/dashboard" replace />
                        //                     }
                        //                 </ProtectedRoute>
                        //             }
                        //         />
                        //     </Routes>
                        // </>
                    }
                />

                <Route path="/admin" element={<ProtectedRoute><AdminMain /></ProtectedRoute>}/>
                <Route path="/admin/*" element={<ProtectedRoute>
                    <Routes>
                        <Route path="/users" element={<AdminUsers />}/>
                        <Route path="/groups" element={<AdminGroups />} />
                        <Route path="/data-source" element={<AdminDataSource />} />
                        <Route path="/domains" element={<AdminDomains />} />
                        <Route path="/user-access" element={<AdminUserAccess />} />

                        {/* ---------------------------- Redirects ---------------------------- */}
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </ProtectedRoute>} />

                {/* ---------------------------- Redirects ---------------------------- */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}