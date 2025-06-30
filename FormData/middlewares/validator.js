


export const validatedata=async (req,res,next) => {
  const body = req.body || {};
  const { schema, data } = body;


  if (!schema || !data) {
    return res.status(400).json({ error: 'Schema and data are required.' });
  }

  const errors = []

  for (const rule of schema) {
    const value = data[rule.name]

    if (rule.required && (value===undefined || value === null || value === '')) {
      errors.push(`${rule.label} is required`)
      continue
    }

    if (value === undefined || value===null || value === '') continue;

    if (rule.type === 'text' || rule.type === 'email') {
      if (typeof value !== 'string') {
        errors.push(`${rule.label} must be a string.`)
      }
      if (rule.minLength && value.length < rule.minLength) {
        errors.push(`${rule.label} must be at least ${rule.minLength} characters.`);
      }
      if (rule.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.push(`${rule.label} must be a valid email.`);
      }
    }

    if (rule.type === 'number') {
      if (typeof value !== 'number') {
        errors.push(`${rule.label} must be a number.`)
      }
      if (rule.min !== undefined && value < rule.min) {
        errors.push(`${rule.label} must be at least ${rule.min}.`)
      }
      if (rule.max !== undefined && value > rule.max) {
        errors.push(`${rule.label} must be at most ${rule.max}.`)
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

