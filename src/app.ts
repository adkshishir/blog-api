import express from 'express';
import routes from './routes';
import * as path from 'path';
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', routes.userRoutes);
app.use('/api', routes.categoryRoutes);
app.use('/api', routes.tagRoutes);
app.use('/api', routes.profileRoutes);
app.use('/api', routes.postRoutes);
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

// kill server on close the terminal
process.on('exit', () => {
  console.log(' \n Starting server again');
  process.exit(0);
});
