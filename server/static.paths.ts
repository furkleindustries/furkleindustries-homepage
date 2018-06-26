import {
  routes,
} from '../src/app/routes';

export const ROUTES = routes.map((routeObj) => {
  return routeObj.path;
});

export default ROUTES;