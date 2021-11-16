// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {

    //https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY

    // Direccion del Owner
    address owner;

    // Numero asteroids
    uint public numberAsteroids;

    constructor(){
        owner = msg.sender;
    }

    event Evento_calbackNewData();

    modifier OnlyOwner() {
        require(msg.sender == owner, 'Only owner.');
        _;
    }

    // Recibe datos del oraculo
    function update() public OnlyOwner {
        emit Evento_calbackNewData();
    }

    // Funcion para configuracion manual del numero de asteroides
    function setNumberAsteroids(uint _num) public OnlyOwner {
        numberAsteroids = _num;
    }


}