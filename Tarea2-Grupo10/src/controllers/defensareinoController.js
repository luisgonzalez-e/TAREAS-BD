import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // GET
  async getAll(req, res) {
    try {
      const defensaReino = await prisma.defensa_reino.findMany();
      res.status(200).json(defensaReino);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET por id
  async getById(req, res) {
    const { id_personaje, id_trabajo } = req.params;
    try {
      const association = await prisma.persona_tiene_trabajo.findUnique({
        where: { id_trabajo_id_personaje: { id_trabajo: Number(id_trabajo), id_personaje: Number(id_personaje) } }
      });
      if (association) {
        res.status(200).json(association);
      } else {
        res.status(404).send("Asociación no encontrada");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  ,

  // POST
  async create(req, res) {
    try {
      const { id_reino, id_defensa } = req.body;
      const newDefensaReino = await prisma.defensa_reino.create({
        data: {
          id_reino: Number(id_reino),
          id_defensa: Number(id_defensa)
        }
      });
      res.status(201).json(newDefensaReino);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT
  async update(req, res) {
    const { id_reino, id_defensa } = req.params;
    try {
      const updatedDefensaReino = await prisma.defensa_reino.update({
        where: { id_reino_id_defensa: { id_reino: parseInt(id_reino), id_defensa: parseInt(id_defensa) } },
        data: req.body
      });
      res.status(200).json(updatedDefensaReino);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,

  // DELETE
  async remove(req, res) {
    const { id_reino, id_defensa } = req.params;
    try {
      await prisma.defensa_reino.delete({
        where: { id_reino_id_defensa: { id_reino, id_defensa } }
      });
      res.status(204).send("Defensa Reino deleted");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
