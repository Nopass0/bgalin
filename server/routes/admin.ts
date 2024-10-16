import express from "express";
import { PrismaClient } from "@prisma/client";
import type { Response } from "express"; // Изменено на type import
import type { CustomRequest } from "../middleware/admin"; // Изменено на type import
import { authAdminByCode } from "../middleware/admin";

const router = express.Router();
const prisma = new PrismaClient();

// Создание проекта
router.post(
  "/projects",
  authAdminByCode,
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { name, description, url, imageUrl } = req.body;
      const project = await prisma.project.create({
        data: {
          name,
          description,
          url,
          imageUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при создании проекта", error });
    }
  }
);

// Получение всех проектов
router.get(
  "/projects",
  authAdminByCode,
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const projects = await prisma.project.findMany();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении проектов", error });
    }
  }
);

// Редактирование проекта
router.put(
  "/projects/:id",
  authAdminByCode,
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, description, url, imageUrl } = req.body;
      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          name,
          description,
          url,
          imageUrl,
          updatedAt: new Date(),
        },
      });
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при обновлении проекта", error });
    }
  }
);

// Удаление проекта
router.delete(
  "/projects/:id",
  authAdminByCode,
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await prisma.project.delete({
        where: { id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Ошибка при удалении проекта", error });
    }
  }
);

// Изменение телеграм-аккаунта администратора
router.put(
  "/admin/telegram",
  authAdminByCode,
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { telegram } = req.body;
      const { id } = req.admin as { id: string }; // Явное приведение типа
      const updatedAdmin = await prisma.admin.update({
        where: { id },
        data: { telegram },
      });
      res.json(updatedAdmin);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка при обновлении телеграм-аккаунта", error });
    }
  }
);

export default router;
