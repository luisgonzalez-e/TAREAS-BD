import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import morgan from 'morgan';

import personajesController from './controllers/personajesController.js';
import trabajosController from './controllers/trabajosController.js';
import kartsController from './controllers/kartsController.js';
import reinosController from './controllers/reinosController.js';
import personajeTieneTrabajoController from './controllers/PersonaTieneTrabajoController.js';
import personajehabitareinoController from './controllers/personajehabitareinoController.js';
import diplomacyController from './controllers/DiplomaciasController.js';
import defensasController from './controllers/defensasController.js';
import defensaReinoController from './controllers/defensareinoController.js';



const ENV = process.env;
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));


// Rutas para Personajes
app.get('/api/personajes', personajesController.getAll);
app.get('/api/personajes/:id', personajesController.getById);
app.post('/api/personajes', personajesController.create);
app.put('/api/personajes/:id', personajesController.update);
app.delete('/api/personajes/:id', personajesController.remove);


// Rutas para Trabajos
app.get('/api/trabajos', trabajosController.getAll);
app.get('/api/trabajos/:id', trabajosController.getById);
app.post('/api/trabajos', trabajosController.create);
app.put('/api/trabajos/:id', trabajosController.update);
app.delete('/api/trabajos/:id', trabajosController.remove);

// Rutas para Karts
app.get('/api/karts', kartsController.getAll);
app.get('/api/karts/:id', kartsController.getById);
app.post('/api/karts', kartsController.create);
app.put('/api/karts/:id', kartsController.update);
app.delete('/api/karts/:id', kartsController.remove);

// Rutas para Reinos
app.get('/api/reinos', reinosController.getAll);
app.get('/api/reinos/:id', reinosController.getById);
app.post('/api/reinos', reinosController.create);
app.put('/api/reinos/:id', reinosController.update);
app.delete('/api/reinos/:id', reinosController.remove);

// Rutas para PersonaTieneTrabajo
app.get('/api/personaje_tiene_trabajo', personajeTieneTrabajoController.getAll);
app.get('/api/personaje_tiene_trabajo/:id_personaje/:id_trabajo', personajeTieneTrabajoController.getById);
app.post('/api/personaje_tiene_trabajo', personajeTieneTrabajoController.create);
app.put('/api/personaje_tiene_trabajo/:id', personajeTieneTrabajoController.update);
app.delete('/api/personaje_tiene_trabajo/:id', personajeTieneTrabajoController.remove);

// Rutas para personajehabitareino
app.get('/api/personaje_habita_reino', personajehabitareinoController.getAll);
app.get('/api/personaje_habita_reino/:id_personaje/:id_reino', personajehabitareinoController.getById);
app.post('/api/personaje_habita_reino', personajehabitareinoController.create);
app.put('/api/personaje_habita_reino/:id_personaje/:id_reino', personajehabitareinoController.update);
app.delete('/api/personaje_habita_reino/:id_personaje/:id_reino', personajehabitareinoController.remove);




// Rutas para Diplomacias
app.get('/api/diplomacias', diplomacyController.getAll);
app.get('/api/diplomacias/:id_reino_1/:id_reino_2', diplomacyController.getById);
app.post('/api/diplomacias', diplomacyController.create);
app.put('/api/diplomacias/:id_reino_1/:id_reino_2', diplomacyController.update);
app.delete('/api/diplomacias/:id_reino_1/:id_reino_2', diplomacyController.remove);


//Rutas defensas
app.get('/api/defensas', defensasController.getAll);
app.get('/api/defensas/:id_reino/:id_defensa', defensasController.getById);
app.post('/api/defensas', defensasController.create);
app.put('/api/defensas/:id', defensasController.update);
app.delete('/api/defensas/:id', defensasController.remove);

//Rutas Defensa Reino
app.get('/api/defensa_reino', defensaReinoController.getAll);
app.get('/api/defensa_reino/:id_reino/:id_defensa', defensaReinoController.getById);
app.post('/api/defensa_reino', defensaReinoController.create);
app.put('/api/defensa_reino/:id_reino/:id_defensa', defensaReinoController.update);
app.delete('/api/defensa_reino/:id_reino/:id_defensa', defensaReinoController.remove);

//Rutas personalizadas
app.get('/api/top5personajesConMasFuerza', personajesController.top5PersonajesConMasFuerza);
app.get('/api/personajeConMasKarts', personajesController.personajeConMasKarts);
app.get('/api/cantidadHabitantes/:id', personajesController.cantidadHabitantes);
app.get('/api/gobernante/:id', reinosController.getGobernantesById);


app.use((_, res) => {
    res.status(404).json({ message: 'Not found Crack!' });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
  })

app.listen(ENV.API_PORT, () => {
    console.log(`Server running on port ${ENV.API_PORT}`);
})