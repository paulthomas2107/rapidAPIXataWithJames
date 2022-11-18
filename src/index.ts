import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getXataClient, Job } from './xata';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const xata = getXataClient();

type MyResponse<T> =
  | {
      err: string;
    }
  | {
      data: T;
    };

app.use(express.json());

app.get('/api/jobs', async (req: Request, res: Response<MyResponse<Job[]>>) => {
  try {
    const jobs = await xata.db.job.getAll();
    return res.status(200).json({ data: jobs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Error occurred...' });
  }
});

app.post(
  '/api/jobs',
  async (req: Request<{}, {}, Job>, res: Response<MyResponse<Job>>) => {
    try {
      const job = req.body;
      const createdJob = await xata.db.job.create(job);
      return res.status(201).json({ data: createdJob });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Error occurred...' });
    }
  }
);

app.put(
  '/api/jobs/:id',
  async (
    req: Request<{ id: string }, {}, Job>,
    res: Response<MyResponse<Job>>
  ) => {
    try {
      const job = req.body;
      const id = req.params.id;
      const updatedJob = await xata.db.job.update(id, job);

      if (!updatedJob) {
        return res.status(404).json({ err: 'Job Not Found' });
      }

      return res.status(200).json({ data: updatedJob });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Error occurred...' });
    }
  }
);

app.delete('/api/jobs/:id', async (req: Request<{id: string}, {}, {}>, res: Response<MyResponse<Job>>) => {
  try {
    const id = req.params.id;
    const deletedRec = await xata.db.job.delete(id);

    if (!deletedRec) {
      return res.status(404).json({ err: 'Job Not Found' });
    }

    return res.status(200).json({data: deletedRec});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Error occurred...' });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
