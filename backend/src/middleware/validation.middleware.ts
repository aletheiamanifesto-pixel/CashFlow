import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

// Middleware factory per validazione body con schema Zod
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const errors = formatZodErrors(result.error)
      res.status(400).json({ error: 'Dati non validi', details: errors })
      return
    }
    req.body = result.data
    next()
  }
}

// Middleware factory per validazione query params
export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      const errors = formatZodErrors(result.error)
      res.status(400).json({ error: 'Parametri query non validi', details: errors })
      return
    }
    next()
  }
}

function formatZodErrors(error: ZodError) {
  return error.errors.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }))
}
