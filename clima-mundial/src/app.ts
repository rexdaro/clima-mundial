import './style.css';



interface Persona {
  nombre: string,
  saludo: string,
  edad: number,

}

const personaManu: Persona = {
  nombre: 'Manuel Rivas',
  saludo: 'Hola mucho gusto',
  edad: 27,

}

const saludar = (persona: Persona): void => {

  console.log(`${persona.saludo}, soy ${persona.nombre} y tengo ${persona.edad} años.`);
  return
}


saludar(personaManu);

// Proyecto del Clima con TypeScript
// Sigue las instrucciones paso a paso. Si no entiendes algo, ¡pregunta!
// my api key: f985a7e0412f3b2c94c74112eb125d97

const apiKey:string = 'f985a7e0412f3b2c94c74112eb125d97';

interface ClimaData {
  name: string;           // Nombre de la ciudad (viene así en la API)
  main: {
    temp: number;         // Temperatura
    humidity: number;     // Humedad
  };
  weather: {
    description: string;  // Descripción del clima
    icon: string;         // Código del ícono
  }[];
}

const getClima = async(ciudad: string): Promise<ClimaData> => {

  const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
  
  if(!respuesta.ok){
    throw new Error('Ciudad no encontrada');
  }

  const datos:ClimaData = await respuesta.json();

  
  return datos; 
}

getClima('puerto ordaz')
.then(datos => {
  console.log(`Clima en ${datos.name}`);
  console.log(`- Temperatura: ${datos.main.temp}°C`);
  console.log(`- Humedad: ${datos.main.humidity}%`);
  console.log(`- Descripción: ${datos.weather[0].description}`);
})
.catch(error => {
  console.error('Error', error.message);
})





// mostrando el clima en html

const divResultado = document.getElementById('resultado');


const mostrarClima = (data: ClimaData): void => {
  const tarjetaClima = document.createElement('div')
  tarjetaClima.id = 'tarjeta-clima';

  const buttonEliminar = document.createElement('img');
  buttonEliminar.className = 'button-cerrar';
  buttonEliminar.src = '/src/images/icono-cerrar.svg';
  
  
  let ciudad = document.createElement('p');
  ciudad.textContent = `Hoy ${data.name} esta: ${data.weather[0].description}`

  let temperatura = document.createElement('p');
  temperatura.textContent = `Temperatura: °${data.main.temp}`

    let humedad = document.createElement('p');
  humedad.textContent = `Humedad: ${data.main.humidity}`

  let img = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  img.className = 'imagen-clima';

  if(tarjetaClima){
    tarjetaClima.appendChild(buttonEliminar);
    tarjetaClima.appendChild(ciudad);
    tarjetaClima.appendChild(img);
    tarjetaClima.appendChild(temperatura);
    tarjetaClima.appendChild(humedad);


  }
  
  

  divResultado?.appendChild(tarjetaClima);

  buttonEliminar.addEventListener('click', ()=>{
    tarjetaClima.remove();
  })
}


// funcion para cargar clima:
const cargarClima = async (ciudad: string) => {
  try {
    const datos = await getClima(ciudad);
    mostrarClima(datos);
  } catch (error: any) {
    console.error('Error al obtener clima:', error.message);
  }
};




// escribir en el buscador

const input = document.getElementById('ciudad') as HTMLInputElement | null;
const buttonBuscar = document.getElementById('buscar') as HTMLButtonElement | null;

if (buttonBuscar && input) {
  buttonBuscar.addEventListener('click', () => {
    cargarClima(input.value);
  })
}
