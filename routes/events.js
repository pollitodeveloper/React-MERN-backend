/*
    Rutas de Usuarios / events
    host + /api/events
*/

const { Router } = require('express')
const router = Router();
const { check } = require('express-validator')
const { validarJWT } = require('../middlewares/validar-jwt')
const { actualizarEvento, crearEvento, eliminarEvento, getEventos } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');



//Todas tienen pasar por la validacion del JWT
router.use( validarJWT )    //Esto indica que cualquier peticion que se encuentre abajo de esto, tendra que tener su token


//Obtener eventos
router.get('/', getEventos)


//Crear eventos
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);


//Actualizar eventos
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ]
    ,
    actualizarEvento)


//Borrar eventos
router.delete('/:id', eliminarEvento)



module.exports = router;