import http, { createServer } from 'http';
const PORT = process.env.PORT;
const users = [
  {
    id: 1,
    name: 'khin',
  },
  {
    id: 1,
    name: 'su',
  },
  {
    id: 1,
    name: 'wai',
  },
];
//logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// json middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

const getUserHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

const getUseHandlerById = (req, res) => {
  const id = req.url.split('/')[3];
  const user = users.find((u) => u.id === parseInt(id));
  if (user) {
    res.write(JSON.stringify(user));
    res.end();
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'User not found' }));
  }
  res.end();
};

const createUserHandler = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Route not found' }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === '/api/users' && req.method === 'GET') {
        getUserHandler(req, res);
      } else if (
        req.url.match(/^\/api\/users\/(\d+)$/) &&
        req.method === 'GET'
      ) {
        getUseHandlerById(req, res);
      } else if (req.url === '/api/users' && req.method === 'POST') {
        createUserHandler(req, res);
      } else {
        notFoundHandler();
      }
    });
  });
  //   if (req.url === '/api/users' && req.method === 'GET') {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.write(JSON.stringify(users));
  //     res.end();
  //   } else if (req.url.match(/^\/api\/users\/(\d+)$/) && req.method === 'GET') {
  //     const id = req.url.split('/')[3];
  //     console.log('id', id);
  //     const user = users.find((u) => u.id === parseInt(id));
  //     res.setHeader('Content-Type', 'application/json');
  //     if (user) {
  //       res.write(JSON.stringify(user));
  //       res.end();
  //     } else {
  //       res.statusCode = 404;
  //       res.write(JSON.stringify({ message: 'User not found' }));
  //     }
  //     res.end();
  //   } else {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.statusCode = 404;
  //     res.write(JSON.stringify({ message: 'Route not found' }));
  //     res.end();
  //   }
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
