import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/api/jobs', (req: Request, res: Response) => {
  res.json({ msg: "Hi Paul, it's get jobs..." });
});

app.post('/api/jobs', (req: Request, res: Response) => {
  res.json({ msg: "Hi Paul, it's post jobs..." });
});

app.put('/api/jobs/:id', (req: Request, res: Response) => {
    res.json({ msg: "Hi Paul, it's put jobs..." });
  });

  app.delete('/api/jobs/:id', (req: Request, res: Response) => {
    res.json({ msg: "Hi Paul, it's delete jobs..." });
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
