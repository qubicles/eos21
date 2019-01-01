pragma solidity ^0.4.22;

import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/** @title BlackHole 
 * 
 * @dev Implementation of the BlackHole contract.
 * It deadlocks ERC20 tockens and emit events on success.
 */
contract BlackHole {
    event Opened();
    event Teleport(uint amount, string note, address sender);
    event Closed();

    bool public closed = false;
    ERC20 public erc20Contract;
    uint public criticBlock;
    uint public minimumAmount;

    /** @dev Construction of the ETH BlackHole contract.
     * @param _erc20Contract The address of the ERC20 contract to attract tockens from.
     * @param _criticBlock BlackHole can be closed after it.
     * @param _minimumAmount the smallest amount BlackHole can attract.
     */
    constructor(address _erc20Contract, uint _criticBlock, uint _minimumAmount) public {
        erc20Contract = ERC20(_erc20Contract);
        criticBlock = _criticBlock;
        minimumAmount = _minimumAmount;
        emit Opened();
    }

    /** @dev It closes the BlackHole if critical block has been reached.
     */
    function close() public {
        require(!closed, "This BlackHole contract's active period has expired.");
        require(block.number >= criticBlock, "BlackHole hasn't reached the critical mass");
        closed = true;
        emit Closed();
    }

    /** @dev teleport attracts tokens and emit Teleport event
     * @param note Teleport event note.
     */
    function teleport(string note) public {
        uint amount = attract();
        emit Teleport(amount, note, msg.sender);
    }

    function attract() private returns (uint amount){
        require(!closed, "blackHole closed");
        uint balance = erc20Contract.balanceOf(msg.sender);
        uint allowed = erc20Contract.allowance(msg.sender, address(this));
        require(allowed >= minimumAmount, "less than minimum amount");
        require(balance == allowed, "blackHole must attract all your tokens");
        require(erc20Contract.transferFrom(msg.sender, address(this), balance), "blackHole can't attract your tokens");
        return balance;
    }
}