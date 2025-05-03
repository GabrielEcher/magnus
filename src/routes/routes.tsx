import React, { lazy, Suspense } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import PrivateRoute from './private-routes';
import Layout from '@/components/layout/layout';
const LoginPage = lazy(() => import('@/pages/login'));
const HomePage = lazy(() => import('@/pages/home'));
const ProductsPage = lazy(() => import('@/pages/products'));
const SalesPage = lazy(() => import('@/pages/sales'));
const PurchasesPage = lazy(() => import('@/pages/purchases'));

const RouterContent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        localStorage.setItem('lastPath', location.pathname);
    }, [location]);

    React.useEffect(() => {
        const savedPath = localStorage.getItem('lastPath');
        if (savedPath && savedPath !== '/') {
            navigate(savedPath);
        }
    }, [navigate]);

    return (
        // <Suspense fallback={<CentralLoader/>}>
            <Layout>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/app" >
                    <Route path="*" element={<HomePage />} />
                    <Route index element={<HomePage />} />
                    <Route path="products" element={
                        <PrivateRoute>
                        < ProductsPage/>
                        </PrivateRoute>
                    } 
                    />
                    <Route path="sales" element={
                        <PrivateRoute>
                        < SalesPage/>
                        </PrivateRoute>
                    }
                    />
                    <Route path="purchases" element={
                        <PrivateRoute>
                        < PurchasesPage/>
                        </PrivateRoute>
                    }
                    />
                </Route>
            </Routes>
        </Layout>
        // </Suspense>
        
    )
}



export const AppRouter: React.FC = () => {

    return (
        <BrowserRouter>
            <RouterContent />
        </BrowserRouter>
    );
};