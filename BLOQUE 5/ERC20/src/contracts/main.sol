// SPDX-License-Identifier: MIT
pragma solidity >=0.4.4 <0.7.0;
import "./ERC-20.sol";

contract main {

    // Instancia del contrato token
    ERC20Basic private token;

    // Owner del contrato
    address public owner;

    // Diereccion del Smart Contract
    address public contrato;

    // Constructor
    constructor () public {
        token = new ERC20Basic(10000);
        owner = msg.sender;
        contrato = address(this);
    }

    // Obtenemos la direccion del Owner
    function getOwner() public view returns (address) {
        return owner;
    }

    //
    function getContract() public view returns (address) {
        return contrato;
    }

    // Compramos tokens mediante: direccion de destino y cantidad de tokens
    function send_tokens (address _destinatario, uint _numTokens) public {
        token.transfer(_destinatario, _numTokens);
    }

    // Obtenemos el balance de tokens de una direccion
    function balance_direccion(address _direccion) public view returns (uint) {
        return token.balanceOf(_direccion);
    }

    // Obtenemos el balance de tokens total del smart contract
    function balance_total() public view returns (uint) {
        return token.balanceOf(contrato);
    }
}