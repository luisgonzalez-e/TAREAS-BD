import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // GET
  async getAll(req, res) {
    try {
      const karts = await prisma.karts.findMany();
      res.status(200).json(karts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET por id
  async getById(req, res) {
    const { id } = req.params;
    try {
      const kart = await prisma.karts.findUnique({ where: { id: Number(id) } });
      if (kart) {
        res.status(200).json(kart);
      } else {
        res.status(404).send("Kart no encontrado");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST
  async create(req, res) {
    try {
      const newKart = await prisma.karts.create({ data: req.body });
      res.status(201).json(newKart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT
  async update(req, res) {
    const { id } = req.params;
    try {
      const updatedKart = await prisma.karts.update({ where: { id: Number(id) }, data: req.body });
      res.status(200).json(updatedKart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE
  async remove(req, res) {
    const { id } = req.params;
    try {
      await prisma.karts.delete({ where: { id: Number(id) } });
      res.status(204).send("Kart eliminado");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
