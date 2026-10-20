fetch('https://jsonplaceholder.typicode.com/users')
    .then(responde => responde.json())
    .then((usuarios) => {
        const lista = document.getElementById('usuarios');
        usuarios.forEach(usuario => {
            //Pintar todos los usuarios de la API rest usando
            //innnerHTML en lista: nombre, email y teléfono
            lista.innerHTML += `
            <div>
                <h2>${usuario.name}</h2>
                <p>${usuario.email}</p>
                <p>${usuario.phone}</p>
            </div>
            `;     
        });
    })
    .catch((error)=> console.error(error));
    