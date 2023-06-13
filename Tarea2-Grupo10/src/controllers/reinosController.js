import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // GET
  async getAll(req, res) {
    try {
      const reinos = await prisma.reinos.findMany();
      res.status(200).json(reinos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET por id
  async getById(req, res) {
    const { id } = req.params;
    try {
      const reino = await prisma.reinos.findUnique({ where: { id: Number(id) } });
      if (reino) {
        res.status(200).json(reino);
      } else {
        res.status(404).send("Reino no encontrado");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST
  async create(req, res) {
    try {
      const newReino = await prisma.reinos.create({ data: req.body });
      res.status(201).json(newReino);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT
  async update(req, res) {
    const { id } = req.params;
    try {
      const updatedReino = await prisma.reinos.update({ where: { id: Number(id) }, data: req.body });
      res.status(200).json(updatedReino);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE
  async remove(req, res) {
    const { id } = req.params;
    try {
      await prisma.reinos.delete({ where: { id: Number(id) } });
      res.status(204).send("Reino eliminado");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getGobernantesById(req, res) {
    const { id } = req.params;
    try {
      if (id) {
        // Obtener gobernante de un reino específico
        const gobernante = await prisma.personaje_habita_reino.findFirst({
          where: {
            id_reino: Number(id),
            es_gobernante: true,
          },
          include: {
            ids: true,
            ids_reino: true,
          },
        });

        if (gobernante) {
          res.status(200).json(gobernante);
        } else {
          res.status(404).send("Reino no encontrado");
        }
      } else {
        // Obtener todos los gobernantes de todos los reinos
        const gobernantes = await prisma.personaje_habita_reino.findMany({
          where: { es_gobernante: true },
          include: { ids_reino: true, ids: true },
        });

        res.status(200).json(gobernantes);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
};
