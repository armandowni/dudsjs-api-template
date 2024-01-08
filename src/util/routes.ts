import expressListEndpoints from 'express-list-endpoints'

// Get all defined routes
export const routesList = (app) => expressListEndpoints(app);

// Check if a route exists for a specific method and path
export function routeExists(app, method, path) {
  return routesList(app).some(
    (route) => route.methods.includes(method) && route.path === path
  );
}
