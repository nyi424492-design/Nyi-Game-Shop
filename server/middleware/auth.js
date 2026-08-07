const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

async function verifyUserMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing authorization' });
    const token = authHeader.replace('Bearer ', '');
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' });
    req.user = { id: data.user.id, email: data.user.email };
    const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', data.user.id).maybeSingle();
    req.profile = profile || null;
    next();
  } catch (err) {
    console.error('auth middleware error', err);
    return res.status(500).json({ error: 'Auth check failed' });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    const userRole = req.profile?.role || 'free';
    const allowed = Array.isArray(role) ? role.includes(userRole) || userRole === 'owner' : userRole === role || userRole === 'owner';
    if (!allowed) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

module.exports = { verifyUserMiddleware, requireRole, supabaseAdmin };