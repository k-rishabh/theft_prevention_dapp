// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract TheftPrevention {
    event NewPhone(uint index, uint imei, bool stolen);
    event Stolen(uint256 imei);
    event Found(uint256 imei);

    struct Phone {
        uint256 imei;
        bool stolen;
    }

    Phone[] phones;
    Phone[] stolen;

    mapping (uint256 => address) imeiToOwner;
    mapping (uint256 => uint256) imeiToIndex;
    mapping (uint256 => uint256) imeiToStolenIndex;

    /* 
     * Register a new phone.
     * Update mappings.
     * Check whether imei is already registered.
     */
    function registerPhone (uint256 imei) public {
        if(phones.length == 0)
            phones.push(Phone(0, false)); // since default index mapping is 0, we ensure that no phone can be mapped to the 0th index.
        require(imeiToIndex[imei] == 0);

        phones.push(Phone(imei, false));
        uint id = phones.length - 1;
        imeiToIndex[imei] = id;
        imeiToOwner[imei] = msg.sender;
        emit NewPhone(imeiToIndex[imei], imei, false);
    }

    /*
     * Mark phone as stolen.
     * Check validity of caller.
     * Check phone status.
     */
    function markStolen (uint256 imei) public {
        require(imeiToOwner[imei] == msg.sender);
        require(phones[imeiToIndex[imei]].stolen == false);

        Phone storage phone = phones[imeiToIndex[imei]];
        phone.stolen = true;

        stolen.push(phone);
        uint id = stolen.length - 1;
        imeiToStolenIndex[imei] = id;

        emit Stolen(imei);
    }

    /*
     * Mark phone as found.
     * Check validity of caller.
     * Check phone status.
     */
    function markFound (uint256 imei) public {
        require(imeiToOwner[imei] == msg.sender);
        require(phones[imeiToIndex[imei]].stolen == true);

        Phone storage phone = phones[imeiToIndex[imei]];
        phone.stolen = false;

        uint idLast = stolen.length - 1;
        Phone storage lastStolen = stolen[idLast];

        uint idFound = imeiToStolenIndex[imei];
        delete stolen[idFound]; // delete phone that was found

        stolen[idFound] = lastStolen; // move last stolen phone to the gap in the array
        imeiToStolenIndex[lastStolen.imei] = idFound; // change mapping
        stolen.pop(); // pop the duplicate element

        emit Found(imei);
    }

    function findStolen() public view returns(Phone[] memory){
        return stolen;
    }
}