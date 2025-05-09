import React, { lazy } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'
import PrivateRoute from './private-routes';
import Layout from '@/components/layout/layout';
const LoginPage = lazy(() => import('@/pages/login'));
const HomePage = lazy(() => import('@/pages/home'));
const ProductsPage = lazy(() => import('@/pages/products'));
const SalesPage = lazy(() => import('@/pages/sales'));
const PurchasesPage = lazy(() => import('@/pages/purchases'));
const ProductImagesPage = lazy(() => import('@/components/products/product-gallery-page'))
const CompanyPage = lazy(() => import('@/pages/company'))
const RouterContent: React.FC = () => {
    const location = useLocation();
    React.useEffect(() => {
        const fullPath = location.pathname + location.search;

        // Evita salvar a página de login como último caminho
        if (location.pathname !== '/') {
            localStorage.setItem('lastPath', fullPath);
        }
    }, [location]);


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
                            <ProductsPage />
                        </PrivateRoute>
                    } />
                    <Route path="products/gallery" element={
                        <PrivateRoute>
                            <ProductImagesPage />
                        </PrivateRoute>
                    } />
                    <Route path="sales" element={
                        <PrivateRoute>
                            < SalesPage />
                        </PrivateRoute>
                    }
                    />
                    <Route path="purchases" element={
                        <PrivateRoute>
                            < PurchasesPage />
                        </PrivateRoute>
                    }
                    />
                    <Route path="company" element={
                        <PrivateRoute>
                            < CompanyPage />
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