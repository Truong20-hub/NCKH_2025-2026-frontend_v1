const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const ai_suggestionsRouter = require('./routes/ai_suggestions.route');
const goalsRouter = require('./routes/goals.route');
const notificationsRouter = require('./routes/notifications.route');
const progress_logsRouter = require('./routes/progress_logs.route');
const schedulesRouter = require('./routes/schedules.route');
const tasksRouter = require('./routes/tasks.route');
const time_slotsRouter = require('./routes/time_slots.route');
const usersRouter = require('./routes/users.route');

app.use('/api/ai_suggestions', ai_suggestionsRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/progress_logs', progress_logsRouter);
app.use('/api/schedules', schedulesRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/time_slots', time_slotsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message : 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
