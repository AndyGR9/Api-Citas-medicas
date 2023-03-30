

function validarCita(fechaCita, duracionCita, callback) {
    
    // Obtenemos la colección de citas
    const citas = db.collection('citas');
  
    // Validamos que la hora de la cita esté dentro del intervalo de 30 minutos
    if (fechaCita.getMinutes() % 30 !== 0) {
      return callback(new Error('La hora de la cita debe ser un múltiplo de 30 minutos.'));
    }
  
    // Validamos que la hora de la cita esté dentro del rango de tiempo permitido
    const horaInicio = new Date(fechaCita);
    horaInicio.setHours(8, 0, 0, 0);
  
    const horaFin = new Date(fechaCita);
    horaFin.setHours(17, 0, 0, 0);
  
    if (fechaCita < horaInicio || fechaCita > horaFin) {
      return callback(new Error('La hora de la cita debe estar dentro del horario permitido (8:00 am - 5:00 pm).'));
    }
  
    // Calculamos la hora de fin de la cita sumando la duración a la hora de inicio
    const horaFinCita = new Date(fechaCita.getTime() + (duracionCita * 60000));
  
    // Buscamos si ya existe una cita programada en el mismo intervalo de tiempo
    citas.findOne({
      $or: [
        {
          fecha: { $gte: fechaCita, $lt: horaFinCita }
        },
        {
          fechaFin: { $gt: fechaCita, $lte: horaFinCita }
        }
      ]
    }, function (error, resultado) {
      if (error) {
        return callback(error);
      }
  
      if (resultado) {
        return callback(new Error('Ya existe una cita programada en este intervalo de tiempo.'));
      }
  
      // Si no hay conflictos, ejecutamos el callback sin error
      callback(null);
    });
  }
  