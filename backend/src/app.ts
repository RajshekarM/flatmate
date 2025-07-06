import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import choreRoutes from "./routes/chores";
import dashboardRoute from './routes/dashboard';
import schedulerRoutes from './routes/scheduler';
import onDemandScheduler from './routes/onDemandAssignment'
import timedScheduler from './routes/scheduledAssignment'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("🚀 Backend is up!");
});
app.use('/api/dashboard',dashboardRoute)
app.use('/api/schedules', schedulerRoutes)
app.use('/api/chores',choreRoutes)
app.use('/api/timedSchdeuler', timedScheduler)
app.use('/app/onDemandChores',onDemandScheduler)

export default app;
