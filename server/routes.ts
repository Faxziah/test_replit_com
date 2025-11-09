import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const hashedPassword = await bcrypt.hash(validatedData.password, SALT_ROUNDS);
      
      const user = await storage.createUser({
        username: validatedData.username,
        password: hashedPassword,
      });
      
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ message: "Неверные данные", errors: error.errors });
      } else if (error.code === '23505') {
        res.status(409).json({ message: "Пользователь с таким логином уже существует" });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Ошибка сервера" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
