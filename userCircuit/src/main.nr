use dep::std;

global DNA_LENGTH: u32 = 25;

fn main(dna: pub [u32; DNA_LENGTH], secret: Field) -> pub Field {
    check_valid_dna(dna);
    caclulate_dna_commitment(secret, dna)
}

fn check_valid_dna(dna: [u32; 25]) {
    // Check that the DNA is valid.
    // Logic: DNA string should be of length 25 and only contain the characters A, C, G, and T.
    let mut flag = false;
    // A is 1 C is 2 G is 3 T is 4
    for i in 0..dna.len(){
        if (dna[i] == 1) | (dna[i] == 2) | (dna[i] == 3) | (dna[i] == 4){
            flag = true;
        } else {
            flag = false;
        }
    }

    assert(flag);
}

fn caclulate_dna_commitment(
    secret: Field,
    dna: [u32; 25]
) -> Field{
    let mut transcript = [0; DNA_LENGTH + 1];
    transcript[0] = secret;
    for i in 0..DNA_LENGTH {
        transcript[i + 1] = dna[i] as Field;
    }
    std::hash::pedersen(transcript)[0]
}

// Tester circuit
// fn check_commitments(
//     commitments: [Field; 1],
//     secrets: [Field; 1],
//     dna: [u32; 25]
// ){
// }

// fn compare_dna(dna1: str<25>, dna2: str<25>) -> u32{
//     // Compare two DNA strings.
//     // Logic: DNA strings should be of length 25 and only contain the characters A, C, G, and T.
//     // Return 1 if the strings are equal, 0 otherwise.
//     let mut flag = 0;
//     if (dna1 == dna2){
//         flag = 1;
//     };

//     flag
// }

// #[test]
// fn test_main() {
//     main(1, 2, 3, 4, 5, 6, 7);

//     // Uncomment to make test fail
//     // main(1, 1);
// }
