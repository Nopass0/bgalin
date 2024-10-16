// server/middleware/auth.ts

import type { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Расширяем интерфейс Request для добавления свойства admin
export interface CustomRequest extends Request {
  admin?: { id: string }; // Уточняем тип admin
}

export const authAdminByCode = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { code } = req.headers;

  if (!code) {
    res.status(401).json({ message: "Код не предоставлен" });
    return;
  }

  const admin = await prisma.admin.findUnique({
    where: { code: String(code) },
  });

  if (!admin) {
    res.status(403).json({ message: "Недостаточно прав" });
    return;
  }

  req.admin = admin;
  next();
};
