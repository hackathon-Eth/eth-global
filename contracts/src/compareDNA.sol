// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

import {UltraVerifier} from "./testerVerifier/plonk_vk.sol";

contract compareDNA {
    UltraVerifier verifier;

    constructor(address _verifier) {
        verifier = UltraVerifier(_verifier);
    }

    function DNAcomparer(
        bytes memory _proof,
        bytes32[] memory _publicInputs,
        uint256[] memory _dna1,
        uint256[] memory _dna2
    ) public view returns (bool) {
        require(_dna1.length == 25, "DNA must be 25 characters");
        require(_dna2.length == 25, "DNA must be 25 characters");
        require(verifier.verify(_proof, _publicInputs),"Invalid proof and public inputs");
        
        return true;
    }

}

