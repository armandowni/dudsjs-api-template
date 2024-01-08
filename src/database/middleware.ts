export function middlewareApi(req, res, next) {
    //write down the middleware logic
    console.log('Testing Middleware Success');
    
    next();
  }