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

const server = createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url.match(/^\/api\/users\/(\d+)$/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    console.log('id', id);
    const user = users.find((u) => u.id === parseInt(id));
    res.setHeader('Content-Type', 'application/json');
    if (user) {
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
  }
});
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
