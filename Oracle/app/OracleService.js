// Llamada a las dependencias del proyecto
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const fetch = require('node-fetch');

// Llamadas a los archivos .json
const contractJson = require('../build/contracts/Oracle.json');

// Instancia de web3
const web3 = new Web3('ws://127.0.0.1:7545');

// Información de direcciones de Ganache
const addressContract = '0xc511D80b8a89Ac008676a3ae7Cd860e3ea106172';
const contractInstance = new web3.eth.Contract(contractJson.abi, addressContract);
const privateKey = Buffer.from('a36452ac395feac5a5aec9ac775757a11db421cffda2fa767006808fef03ae3a', 'hex');
const address = '0x01E209056805c4D7195D02d77F632CBf3CA1e29B';

// Obtener el número de bloque
web3.eth.getBlockNumber().then(n => listenEvent(n-1));

// Función: listenEvent
function listenEvent(lastBlock) {
    contractInstance.events.Evento_calbackNewData({}, {fromBlock: lastBlock, toBlock: 'latest'}, (err, event) => {
        event ? updateData() : null;
        err ? console.log(err) : null;
    });
};

// Función: updateData()
function updateData() {
    START_DATE = '2015-09-07';
    END_DATE = '2015-09-08';
    API_KEY = 'DEMO_KEY';
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(json => setDataContract(json.element_count))
};

// Función: setDataContract()
function setDataContract(_value) {
    web3.eth.getTransactionCount(address, (err, txNum) => {
        
        contractInstance.methods.setNumberAsteroids(_value)
            .estimateGas({}, (err, gasAmount) => {
                
                let rawTx = {
                    nonce : web3.utils.toHex(txNum),
                    gasPrice : web3.utils.toHex(web3.utils.toWei('1.4', 'gwei')),
                    gasLimit : web3.utils.toHex(gasAmount),
                    to : addressContract,
                    value : '0x00',
                    data : contractInstance.methods.setNumberAsteroids(_value).encodeABI()
                }

                const tx = new Tx(rawTx);
                tx.sign(privateKey);
                const serializedTx = tx.serialize().toString('hex');
                web3.eth.sendSignedTransaction('0x' + serializedTx);

            });

    });
};