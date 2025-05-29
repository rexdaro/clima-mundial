import './style.css';



// interface Persona {
//   nombre: string,
//   saludo: string,
//   edad: number,

// }

// const personaManu: Persona = {
//   nombre: 'Manuel Rivas',
//   saludo: 'Hola mucho gusto',
//   edad: 27,

// }

// const saludar = (persona: Persona): void => {

//   console.log(`${persona.saludo}, soy ${persona.nombre} y tengo ${persona.edad} años.`);
//   return
// }


//saludar(personaManu);

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






// mostrando el clima en html ..

const divResultado = document.getElementById('resultado') as HTMLDivElement | null;



const mostrarClima = (data: ClimaData): void => {
  const tarjetaClima: HTMLDivElement = document.createElement('div')
  tarjetaClima.id = 'tarjeta-clima';

  const divButtonEliminar: HTMLDivElement = document.createElement('div');
  divButtonEliminar.className = 'div-button-eliminar';

  const divContenido: HTMLDivElement = document.createElement('div');
  divContenido.className = 'div-contenido';

  const buttonEliminar: HTMLImageElement = document.createElement('img');
  buttonEliminar.className = 'button-cerrar';
  buttonEliminar.src = '/src/images/icono-cerrar.svg';
  
  
  let ciudad: HTMLParagraphElement = document.createElement('p');
  ciudad.textContent = `Hoy en ${data.name} esta: ${data.weather[0].description}`

  let temperatura: HTMLParagraphElement = document.createElement('p');
  temperatura.textContent = `Temperatura: ${data.main.temp} °C`

  let humedad: HTMLParagraphElement = document.createElement('p');
  humedad.textContent = `Humedad: ${data.main.humidity}%`

  let img: HTMLImageElement = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  img.className = 'imagen-clima';

  

  divButtonEliminar.appendChild(buttonEliminar);

  
  divContenido.appendChild(temperatura);
  divContenido.appendChild(humedad);
  divContenido.appendChild(img);

  tarjetaClima.appendChild(divButtonEliminar);
  tarjetaClima.appendChild(divContenido);
  
  tarjetaClima.appendChild(ciudad);  

  divResultado?.appendChild(tarjetaClima);

  buttonEliminar.addEventListener('click', ()=>{
    tarjetaClima.remove();
  })
}


// funcion para cargar clima:
const cargarClima = async (ciudad: string): Promise<void> => {
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
    input.value = '';
  })

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
    cargarClima(input.value);
    input.value = '';
    }
  })

}
