// PersonajeHabitaReinoController.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {

  async getAll(req, res) {
    try {
      const associations = await prisma.personaje_habita_reino.findMany();
      res.status(200).json(associations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getById(req, res) {
    const { id_personaje, id_reino } = req.params;
    try {
      const association = await prisma.personaje_habita_reino.findUnique({
        where: { id_personaje_id_reino: { id_personaje: Number(id_personaje), id_reino: Number(id_reino) } }
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

  async create(req, res) {
    try {
      const newAssociation = await prisma.personaje_habita_reino.create({ data: req.body });
      res.status(201).json(newAssociation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id_personaje, id_reino } = req.params;
    try {
      const updatedAssociation = await prisma.personaje_habita_reino.update({
        where: { id_personaje_id_reino: { id_personaje: Number(id_personaje), id_reino: Number(id_reino) } },
        data: req.body
      });
      res.status(200).json(updatedAssociation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,

  async remove(req, res) {
    const { id_personaje, id_reino } = req.params;
    try {
      const association = await prisma.personaje_habita_reino.findUnique({
        where: {
          id_personaje_id_reino: {
            id_personaje: Number(id_personaje),
            id_reino: Number(id_reino)
          }
        }
      });
  
      if (association) {
        await prisma.personaje_habita_reino.delete({
          where: {
            id_personaje_id_reino: {
              id_personaje: Number(id_personaje),
              id_reino: Number(id_reino)
            }
          }
        });
        res.status(204).send("Asociación eliminada");
      } else {
        res.status(404).send("Asociación no encontrada");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
  
};
