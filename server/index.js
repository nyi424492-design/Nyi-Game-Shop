/**
 * NYI AI Backend - Express starter
 * အလွန်အရေးကြီး: Secrets တွေကို .env သို့မဟုတ် Render secrets ထဲမှာသာ ထည့်ပါ။
 */

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const chatRouter = require('./routes/chat');
const paymentsRouter = require('./routes/payments');
const adminRouter = require('./routes/admin');
const { verifyUserMiddleware } = require('./middleware/auth');

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));

// Basic rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: 'Too many requests, slow down'
});
app.use(limiter);

// Routes
app.use('/api/chat', verifyUserMiddleware, chatRouter);
app.use('/api/payments', verifyUserMiddleware, paymentsRouter);
app.use('/api/admin', verifyUserMiddleware, adminRouter);

app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`NYI AI backend running on ${port}`));