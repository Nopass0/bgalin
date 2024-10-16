// server/src/app.ts

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import adminRoutes from "../routes/admin";
import projectRoutes from "../routes/projects";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Middleware для проверки и создания админа
app.use(async (req, res, next) => {
  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    await prisma.admin.create({
      data: {
        code: process.env.ADMIN_CODE || "default_admin_code",
        telegram: "@pbgal",
      },
    });
    console.log("Admin created with default settings");
  }
  next();
});

app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
