import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // GET
  async getAll(req, res) {
    try {
      const trabajos = await prisma.trabajos.findMany();
      res.status(200).json(trabajos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET por id
  async getById(req, res) {
    const { id } = req.params;
    try {
      const trabajo = await prisma.trabajos.findUnique({ where: { id: Number(id) } });
      if (trabajo) {
        res.status(200).json(trabajo);
      } else {
        res.status(404).send("Trabajo no encontrado");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST
  async create(req, res) {
    try {
      const newTrabajo = await prisma.trabajos.create({ data: req.body });
      res.status(201).json(newTrabajo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT
  async update(req, res) {
    const { id } = req.params;
    try {
      const updatedTrabajo = await prisma.trabajos.update({ where: { id: Number(id) }, data: req.body });
      res.status(200).json(updatedTrabajo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE
  async remove(req, res) {
    const { id } = req.params;
    try {
      await prisma.trabajos.delete({ where: { id: Number(id) } });
      res.status(204).send("Trabajo eliminado");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
