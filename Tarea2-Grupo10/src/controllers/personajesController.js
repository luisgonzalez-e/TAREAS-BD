import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async create(req, res) {
    const { nombre, fuerza, fecha_nacimiento, objeto } = req.body;

    try {
      const personaje = await prisma.personajes.create({
        data: {
          nombre,
          fuerza,
          fecha_nacimiento,
          objeto
        }
      });

      res.status(201).json(personaje);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const personajes = await prisma.personajes.findMany();
      res.status(200).json(personajes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const personaje = await prisma.personajes.findUnique({
        where: { id: Number(id) },
      });

      if (personaje) {
        res.status(200).json(personaje);
      } else {
        res.status(404).json({ error: 'Personaje no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { nombre, fuerza, fecha_nacimiento, objeto } = req.body;

    try {
      const personaje = await prisma.personajes.update({
        where: { id: Number(id) },
        data: {
          nombre,
          fuerza,
          fecha_nacimiento,
          objeto
        },
      });

      res.status(200).json(personaje);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async remove(req, res) {
    const { id } = req.params;

    try {
      const personaje = await prisma.personajes.delete({
        where: { id: Number(id) },
      });

      res.status(200).json(personaje);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async personajeConMasKarts(req, res) {
    try {
      const [personaje] = await prisma.$queryRaw`
        SELECT p.*, COUNT(*) as numKarts
        FROM personajes as p
        JOIN karts as k ON p.id = k.id_personaje
        GROUP BY p.id
        ORDER BY numKarts DESC
        LIMIT 1
      `;
  
      if (personaje) {
        res.status(200).json({
          nombre: personaje.nombre,
          cantidadDeKarts: personaje.numkarts.toString(), // convertimos numKarts a un string
        });
      } else {
        res.status(404).send("Personaje no encontrado");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
,
async cantidadHabitantes(req, res) {
  const { id } = req.params;
  try {
    const cantidad = await prisma.personaje_habita_reino.count({
      where: {
        id_reino: Number(id),
      },
    });
    res.status(200).json({ cantidad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 
,
  async top5PersonajesConMasFuerza(req, res) {
    try {
      const personajes = await prisma.personajes.findMany({
        orderBy: {
          fuerza: 'desc',
        },
        take: 5
      });

      res.status(200).json(personajes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
