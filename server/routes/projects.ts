import express from "express";
import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();

// Получение всех проектов
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(projects);
  } catch (error) {
    console.error("Ошибка при получении проектов:", error);
    res.status(500).json({ message: "Ошибка при получении проектов" });
  }
});

// Получение одного проекта по ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      res.status(404).json({ message: "Проект не найден" });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error("Ошибка при получении проекта:", error);
    res.status(500).json({ message: "Ошибка при получении проекта" });
  }
});

export default router;

