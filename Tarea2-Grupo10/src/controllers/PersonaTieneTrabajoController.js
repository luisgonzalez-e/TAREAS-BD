// PersonaTieneTrabajoController.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // GET
  async getAll(req, res) {
    try {
      const associations = await prisma.persona_tiene_trabajo.findMany();
      res.status(200).json(associations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET por id
  async getById(req, res) {
    let { id_personaje, id_reino } = req.params;
    
    if (isNaN(parseInt(id_personaje)) || isNaN(parseInt(id_reino))) {
      res.status(400).send('Los IDs deben ser números enteros');
      return;
    }
    
    id_personaje = parseInt(id_personaje);
    id_reino = parseInt(id_reino);
    
    try {
      const association = await prisma.personaje_habita_reino.findUnique({ where: { id_personaje, id_reino } });
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
      const newAssociation = await prisma.persona_tiene_trabajo.create({ data: req.body });
      res.status(201).json(newAssociation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT
  async update(req, res) {
    const { id_personaje, id_trabajo } = req.params;
    try {
      const updatedAssociation = await prisma.persona_tiene_trabajo.update({ where: { id_personaje: Number(id_personaje), id_trabajo: Number(id_trabajo) }, data: req.body });
      res.status(200).json(updatedAssociation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE
  async remove(req, res) {
    const { id_personaje, id_trabajo } = req.params;
    try {
      await prisma.persona_tiene_trabajo.delete({ where: { id_personaje: Number(id_personaje), id_trabajo: Number(id_trabajo) } });
      res.status(204).send("Asociación eliminada");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
