// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

import {UltraVerifier} from "./userVerifier/plonk_vk.sol";

contract AddDNA {
    UltraVerifier verifier;

    constructor(address _verifier) {
        verifier = UltraVerifier(_verifier);
    }

    function addDNA(
        bytes memory _proof,
        bytes32[] memory _publicInputs,
        uint256[] memory _dna
    ) public view returns (bool) {
        require(_dna.length == 25, "DNA must be 25 characters");
        require(verifier.verify(_proof, _publicInputs),"Invalid proof and public inputs");
        
        
        return true;
    }
}
