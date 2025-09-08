import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Dashboard/dashboard.tsx';
import App from './App.tsx';
import Analytics from './Dashboard/pages/Analytics.tsx';
import ProductsList from './Dashboard/pages/Products/Productlist.tsx';
import ProductDetail from './Dashboard/pages/Products/ProductDetail.tsx';
import AddProduct from './Dashboard/pages/Products/AddProduct.tsx';
import JourneyTimeline from './Dashboard/pages/Products/JourneyTimeline.tsx';


const router = createBrowserRouter([
 {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          { index: true, element: <Analytics /> },
          { path: "ProductsList", element: <ProductsList /> },
          { path: "ProductDetail", element: <ProductDetail /> },
          { path: "AddProduct", element: <AddProduct /> },
          { path: "JourneyTimeline", element: <JourneyTimeline /> },




        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
