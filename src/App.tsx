import {
  RouterProvider,
  createHashRouter,
  Navigate
} from "react-router-dom";
import {
  RecoilRoot,
} from 'recoil';

import { SignIn } from "./pages/SignIn";
import  Layout  from "./Components/Layout";
import { lazy, Suspense } from "react";

function App() {

  const Home = lazy(() => import('./pages/Home').then());
  const MyAccount = lazy(() => import('./pages/MyAccount').then(m => ({default: m.MyAccount})));
  const MyOrder = lazy(() => import('./pages/MyOrder').then(m => ({default: m.MyOrder})));
  const MyOrders = lazy(() => import('./pages/MyOrders').then(m => ({default: m.MyOrders})));
  const NotFound= lazy(() => import('./pages/NotFound').then(m => ({default: m.NotFound})));
  const ProductDetail = lazy(() => import('./pages/ProductDetail').then());

  const router = createHashRouter([
    {
      path: "/",
      element: (
        <Layout />
      ),
      children: [
        {
          index: true,
          path: "/",
          element: <Navigate to={`/all`}  />,
        },
        {
          path: "/:category",
          element: <Home />,
        },
        {
          path: "/my-account",
          element: <MyAccount />,
        },
        {
          path: "/my-order",
          element: <MyOrder />,
        },
        {
          path: "/my-orders",
          element: <MyOrders />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: '/products/:id',
          element: <ProductDetail />
        }
      ],
    },
    {
      path: '/sign-in',
      element: (
        <SignIn />
      ),
    }
  ], 
  {
    future: {
      v7_normalizeFormMethod: true
    }
  }
);

  return (
    <>
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </RecoilRoot>
    </>
  )
}

export default App
