const { assert } = require("chai");

// Llamada al contrato 'Main'
const main = artifacts.require('main');

contract('main', accounts => {
    let instance;

    before("Instanciar", async () => {
        // Smart contract desplegado
        instance = await main.deployed();
    })

    it('Funcion: getOwner()', async () => {

        console.log('Acounts[0]:  ',accounts[0]);
        const direccionOwner = await instance.getOwner.call();
        console.log('Direccion Owner:  ',direccionOwner);
        assert.equal(accounts[0], direccionOwner);
    });

    it('Funcion: send_tokens(address _destinatario, uint _numTokens)', async () => {

        let balance_direccion = await instance.balance_direccion.call(accounts[0]);
        console.log('Balance de accounts[0]:  ', balance_direccion);
        let balance_contrato = await instance.balance_total.call();
        console.log('Balance del contrato:  ', balance_contrato);
        await instance.send_tokens(accounts[0], 10, {from: accounts[0]});
        balance_direccion = await instance.balance_direccion.call(accounts[0]);
        console.log('Balance de accounts[0]:  ', balance_direccion);
        balance_contrato = await instance.balance_total.call();
        console.log('Balance del contrato:  ', balance_contrato);

        assert.equal(balance_direccion, 10)
        assert.equal(balance_contrato,9990)

    })
})