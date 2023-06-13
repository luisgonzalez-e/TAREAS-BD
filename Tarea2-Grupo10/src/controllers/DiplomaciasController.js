import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // GET
  async getAll(req, res) {
    try {
      const diplomacies = await prisma.diplomacias.findMany();
      res.status(200).json(diplomacies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET por id
  async getById(req, res) {
    const { id_reino_1, id_reino_2 } = req.params;
    try {
      const diplomacia = await prisma.diplomacias.findMany({
        where: {
          AND: [
            { id_reino_1: Number(id_reino_1) },
            { id_reino_2: Number(id_reino_2) }
          ]
        }
      });
  
      if (diplomacia.length > 0) {
        res.status(200).json(diplomacia[0]);
      } else {
        res.status(404).send("Diplomacia no encontrada");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  ,

  // POST 
  async create(req, res) {
    try {
      const newDiplomacy = await prisma.diplomacias.create({ data: req.body });
      res.status(201).json(newDiplomacy);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT
  async update(req, res) {
    const { id_reino_1, id_reino_2 } = req.params;
    try {
      const updatedDiplomacy = await prisma.diplomacias.update({
        where: { id_reino_1_id_reino_2: { id_reino_1: Number(id_reino_1), id_reino_2: Number(id_reino_2) } },
        data: req.body
      });
      res.status(200).json(updatedDiplomacy);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,

  // DELETE
  async remove(req, res) {
    const { id_reino_1, id_reino_2 } = req.params;
    try {
      await prisma.diplomacias.delete({
        where: {
          id_reino_1_id_reino_2: {
            id_reino_1: Number(id_reino_1),
            id_reino_2: Number(id_reino_2)
          }
        }
      });
  
      res.status(204).send("Relación Defensa-Reino eliminada");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
};
