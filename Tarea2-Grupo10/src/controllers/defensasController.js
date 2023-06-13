import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // GET
  async getAll(req, res) {
    try {
      const defensaReinos = await prisma.defensa_reino.findMany();
      res.status(200).json(defensaReinos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET por id
  async getById(req, res) {
    const { id_reino, id_defensa } = req.params;
    try {
      const defensaReino = await prisma.defensa_reino.findUnique({ 
        where: { id_reino_id_defensa: { id_reino: 5, id_defensa: 3 } }
      });
      
      if (defensaReino) {
        res.status(200).json(defensaReino);
      } else {
        res.status(404).send("Relación Defensa-Reino no encontrada");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

// POST
async create(req, res) {
  try {
    const { defensa } = req.body; // Obtener la defensa del cuerpo de la solicitud
    const newDefensa = await prisma.defensas.create({ // Cambiar "defensa_reino" a "defensas"
      data: {
        defensa: defensa
      }
    });
    res.status(201).json(newDefensa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

,

  // PUT
  async update(req, res) {
    const { id_reino, id_defensa } = req.params;
    try {
      const updatedDefensaReino = await prisma.defensa_reino.update({ where: { id_reino: Number(id_reino), id_defensa: Number(id_defensa) }, data: req.body });
      res.status(200).json(updatedDefensaReino);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE
  async remove(req, res) {
    const { id_reino, id_defensa } = req.params;
    try {
      await prisma.diplomacias.delete({
        where: {
          id_reino_1_id_reino_2: {
            id_reino_1_id_reino: Number(id_reino),
            id_reino_2_id_reino: Number(id_defensa)
          }
        }
      });
      
      res.status(204).send("Relación Defensa-Reino eliminada");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
  
};
