import { ReactNode } from 'react';
import Home from '@/pages/home';
import Header from "@/components/header";

const withFrontLayout = (component: ReactNode) => (
  <div>
    <Header/>
    {component}
  </div>
);

/*
 * Application route list.
 * Before adding a new route, check if it requires a particular layout.
 * e.g. wrap the element with the layout HOC
 */
const routes = [
  {
    path: '/',
    element: withFrontLayout(<Home />),
  },
];

export default routes;
