const { request, response } = require("express");
const citas = require("../models/citas");
const Medico = require("../models/medico");
const moment = require('moment/moment');

// Middleware para validar citas
const validarCita = async (req = request, res = response, next) => {
  
  // Obtener la fecha y hora de la cita
  const hora = req.body.hora

  //Validacion adicional de formato para la hora
  if (!hora.includes(":")) {
    return res.status(400).json({ error: 'La hora ingresada es invalida' });
  }

  const fechaCita = moment(req.body.fecha, "DD/MM/YYYY");
  const horaCita = moment(hora, 'HH:mm')
  const medicoAsig = await Medico.findOne({ cedula: req.body.cedulaMedico })
  const fechaHoraCita = moment(fechaCita).add({ hours: horaCita.hours(), minutes: horaCita.minutes() });

  //Validar que el medico exista
  if (!medicoAsig) {
    return res.status(404).json({ error: 'No se encontró el medico' });
  }

  //Validar el formato de la fecha
  if (!moment(fechaCita, 'DD/MM/YYYY', true).isValid()) {
    return res.status(400).json({ error: 'Fecha no válida' });
  }

  //Validar el formato de la hora
  if (!horaCita.isValid()) {
    return res.status(400).json({ error: 'La hora ingresada es invalida' });
  }

  //Validar que la fecha y hora no sea anterior a la actual
  if (fechaHoraCita.isBefore(moment())) {
    return res.status(400).json({ error: 'La fecha y hora de la cita no pueden ser anteriores a la fecha y hora actual' });
  }

  //Validar que nos e realice una cita los domingos
  if (fechaCita.day() === 0) {
    return res.status(400).json({ error: 'No se pueden agendar citas los Domingos.' });
  }

  // Validar que la hora de la cita esté fuera de la hora libre
  if (horaCita.isBefore(moment('13:00', 'HH:mm')) && horaCita.isAfter(moment('11:59', 'HH:mm'))) {
    return res.status(400).json({
      error: 'La hora seleccionada es libre para los trabajadores'
    });
  } 

  if (horaCita.isBefore(moment('08:00', 'HH:mm')) || horaCita.isAfter(moment('17:00', 'HH:mm'))) {
    return res.status(400).json({
      error: 'La hora de la cita debe estar dentro del horario permitido (8:00 am a 5:00 pm)'
    });
  } 

  // Validar que la hora de la cita sea un múltiplo de 30 minutos
  if (horaCita.minute() % 30 !== 0) {
    return res.status(400).json({
      error: 'La hora de la cita debe tener un lapso de 30 minutos'
    });
  }


  // Validar que no haya otra cita reservada en la misma fecha, hora y medico
  citas.findOne({ fecha: fechaCita.toISOString(), hora: horaCita, cedulaMedico: medicoAsig.cedula })
    .then((citaExistente) => {
      if (citaExistente) {
        return res.status(409).json({ error: 'Ya hay otra cita reservada en la misma fecha,hora o medico' });
      } else {
        // No hay citas existentes, continua con el proceso de reserva
        next()
      }
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ error: 'Error al buscar citas en la base de datos' + err });
    });


};

module.exports = { validarCita }

