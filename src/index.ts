import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getXataClient, Job } from './xata';

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 3000;

const xata = getXataClient();

app.get('/api/jobs', async (req: Request, res: Response) => {
  const jobs = await xata.db.job.getAll();
  res.json(jobs)
});

app.post('/api/jobs', async (req: Request, res: Response) => {
  res.json({ msg: "Hi Paul, it's post jobs..." });
});

app.put('/api/jobs/:id',async (req: Request, res: Response) => {
    res.json({ msg: "Hi Paul, it's put jobs..." });
  });

  app.delete('/api/jobs/:id',async (req: Request, res: Response) => {
    res.json({ msg: "Hi Paul, it's delete jobs..." });
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
