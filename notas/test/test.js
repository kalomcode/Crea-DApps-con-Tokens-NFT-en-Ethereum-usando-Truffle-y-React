// Llamada al contrato
const notas = artifacts.require('notas');

contract('notas', accounts => {
    it('1. Función: Evaluar(string memory _asignatura, string memory _idAlumno, uint _nota)', async () => {
        // Smart Contract desplegado
        let instance = await notas.deployed();
        // Llamada al método de evaluación del Smart Contract
        const tx1 = await instance.Evaluar('Matematicas', '12345X', 8, {from: accounts[0]});
        const tx2 = await instance.Evaluar('Biologia', '12345X', 7, {from: accounts[0]});
        // Imprimir valores:
        console.log(accounts[0]); // Dirección del profesor
        console.log(tx1); // Transacción de la evaluación académica de Matemáticas
        console.log(tx2); // Transacción de la evaluación académica de Biología
        // Comprobación de la información de la Blockchain
        const nota_alumno1 = await instance.VerNotas.call('Biologia','12345X', {from: accounts[1]});
        const nota_alumno2 = await instance.VerNotas.call('Matematicas','12345X', {from: accounts[1]});
        // Condición para pasar el test: nota_alumno = 9
        console.log(nota_alumno1);
        assert.equal(nota_alumno1, 7);
        console.log(nota_alumno2);
        assert.equal(nota_alumno2, 8);
    });

    it('2. Función: Revision( string memory _asignatura ,string memory _idAlumno )', async () => {
        // Smart Contract desplegado
        let instance = await notas.deployed();
        // Llamar al metodo de revisar exámenes
        const tx = await instance.Evaluar('Musica', '12345X', 5, {from: accounts[0]});

        const rev1 = await instance.Revision('Matematicas','12345X', {from: accounts[1]});
        const rev2 = await instance.Revision('Musica','02468T', {from: accounts[1]});
        console.log(rev1);
        console.log(rev2);

        const id_rev_matematicas = await instance.VerRevisiones.call('Matematicas',{from: accounts[0]});
        console.log(id_rev_matematicas);
        const id_rev_musica = await instance.VerRevisiones.call('Musica',{from: accounts[0]});
        console.log(id_rev_musica);

        assert.equal(id_rev_matematicas, '12345X');
        assert.equal(id_rev_musica, '02468T');
    });
});