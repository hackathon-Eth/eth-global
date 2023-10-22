
# GeneLink

This project utilises zero knowledge proofs by Noir to allow users to share authentic genetic data with DNA testing companies without revealing their identity. We also decentralise the application by deploying smart contracts deployed on scroll, a layer 2 solution.

Another zk circuit is used for comparison of DNA by a smart contract to allow users to find relatives without revealing exposing DNA to untrusted or centralised users.

## Technology Used

### - Arcana: Web3 Auth

### - Noir: Zero Knowledge Proofs

### - Scroll: Layer 2 Solution

### - LIT Protocol: Ensuring proper access controls of the DNA and encrypting/decrypting it.

### - XMTP: We have used XMTP along with Lit in order to provide a decentralised and anonymous chat interface between two long-lost relatives.

### - IPFS: We have used IPFS to store the DNA data of the users in a decentralised manner.

## Detailed description

A disconcerting issue has surfaced in the realm of current web2 DNA laboratories and similar services: unauthorized access to sensitive Personally Identifiable Information (SPII). Recent news highlights the concerning practices wherein individuals’ genetic data is readily accessible to authorities without their consent. This alarming breach of privacy has garnered significant attention, particularly in countries like the USA and UK. The widespread concern lies in the fact that genetic information is unequivocally SPII, deserving the highest level of protection.
As revelations of unauthorized data access continue to emerge, the need for secure, consent-driven platforms like GeneLink, where individuals retain control over their genetic information, becomes increasingly evident.

GeneLink offers a critical solution to safeguard the privacy and security of genetic data while fostering connections within a trusted and transparent ecosystem.GeneLink is a forward-looking project that harnesses blockchain technology to reshape how individuals manage their genetic data. With the growing interest in DNA testing, privacy and data security have become paramount concerns. GeneLink addresses these issues by fine-tuning blockchain for DNA data protection, building on research found in papers such as:

1. https://www.iacr.org/archive/crypto2014/86160292/86160292.pdf
2. https://link.springer.com/chapter/10.1007/978-3-662-44381-1_18
3. https://dl.acm.org/doi/pdf/10.1145/3338498.3358652

Our technology stack relies on Arcana Auth for web3-based authentication, ensuring robust security. Using the LIT protocol, we encrypt users’ DNA, maintaining the privacy and integrity of biological information. We rely on the InterPlanetary File System (IPFS), a decentralized storage solution, to store this data.GeneLink’s standout feature is the emphasis on data authenticity and confidentiality. User DNA data is authenticated via digital signatures, guaranteeing data integrity.

Users can connect with long-lost relatives while preserving their privacy. For instance, users like Alice can upload a text file of their DNA data to verify its integrity, ensuring it hasn’t been tampered with. This provides peace of mind for individuals concerned about their data’s integrity. Users can also trace their genetic lineage and connect with relatives like Bob, potentially a second or third cousin, all within a secure and anonymous environment.GeneLink represents a significant step in DNA data management, balancing security and data-driven connections. It’s where blockchain, genetic data, and ancestral discovery converge.

## How it works

This project combines various technologies to create a secure and user-friendly platform. The frontend is built using React.js, while the backend relies on a Node-Express server for smooth data management.

Notably, the project uses Noir, a programming language from Aztec, to implement zero knowledge proofs, ensuring data privacy. The Lit protocol provides cryptographic encryption and access control for users, enhancing security.

To enable secure messaging and notifications in the chat component, XMTP is used, improving real-time communication
For deployment, the project utilizes the Scroll Network, a reliable hosting platform.
In summary, the project's tech stack, including React.js, Noir, Lit, XMTP, and Scroll Network, contributes to a secure and efficient platform.
