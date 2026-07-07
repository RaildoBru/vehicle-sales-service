import app from './app.js';
import connectToDatabase from './database/database.config.js';

await connectToDatabase();
const PORT = process.env.PORT || 3000;



app.listen(PORT, '0.0.0.0',() => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
