import express from 'express';
import routes from './routes';
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use('/api/auth', routes.userRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});

// kill server with ctrl + c
process.on('SIGINT', () => {
  console.log(' \n Shutting down server');
  process.exit(0);
});
