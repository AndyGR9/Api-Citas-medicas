const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



/*Realizamos ciertos cambios
ponemos el parametro del token,
ponermos en el client y en el audience 
eliminamos la linea del verify.catch
exportamos la funcion 
*/

async function googleVerify(token='') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  
      });
    
  const payload = ticket.getPayload();
  //Retornamos solo los datos que necesitaremos para nuestro 
  //usuario en base de datos

  //En primera instancia para probar mandamos a llamar el console
 // console.log(payload) 


//* /Segundo paso, retornamos los datos del payload para
//usarlo en nuestro metodo del controlador 


//Desestructuramos el payload y solo enviamos los datos que requerimos
//segun los llamamos en la base de datos 
 
   const {email,picture,name}=payload;

    return {
        email:email,
        picture:picture,
        name:name
          }; 

          
} 



module.exports={
    googleVerify
}





