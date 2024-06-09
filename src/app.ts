import express from 'express';
import routes from './routes';
import * as path from 'path';
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', routes.userRoutes);
app.use('/api', routes.categoryRoutes);
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(path.join(__dirname, '../public'));
  console.log('Server is running on port: ' + PORT);
});

// kill server with ctrl + c
process.on('SIGINT', () => {
  console.log(' \n Shutting down server');
  process.exit(0);
});
