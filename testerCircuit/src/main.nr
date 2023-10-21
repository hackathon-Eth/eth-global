use dep::std;

global DNA_LENGTH: u32 = 25;

fn check_commitment(
    commitment: Field,
    secret: Field,
    dna: [u32; 25]
){
    let mut transcript = [0; DNA_LENGTH + 1];
    transcript[0] = secret;
    for j in 0..DNA_LENGTH {
        transcript[j + 1] = dna[j] as Field;
    }
    assert(commitment == std::hash::pedersen(transcript)[0]);
}

// fn find_lcs(dna1: [u32; 25], dna2: [u32; 25]) -> [u32; 25] {
//     let mut lcs = [[0; 26]; 26];
//     let mut max_length = 0;
//     let mut end_index = 0;

//     for i in 1..25 {
//         for j in 1..25 {
//             if dna1[i - 1] == dna2[j - 1] {
//                 lcs[i][j] = lcs[i - 1][j - 1] + 1;
//                 if lcs[i][j] > max_length {
//                     max_length = lcs[i][j];
//                     end_index = i;
//                 }
//             }
//         }
//     }

//     let mut result = [0; 25];
//     let mut index = 0;
//     while max_length > 0 {
//         result[index] = dna1[end_index - 1];
//         end_index -= 1;
//         index += 1;
//         max_length -= 1;
//     }

//     result.reverse();
//     result
// }

fn compare_dna(dna1: [u32; 25], dna2: [u32; 25]) -> u32{
    // Compare two DNA strings.
    // Logic: DNA strings should be of length 25 and only contain the characters A, C, G, and T.
    // Return 1 if the strings are equal, 0 otherwise.
    let mut flag = 0;
    if (dna1 == dna2){
        flag = 1;
    };

    flag
    // Yaha pe instead of flag it returns a percentage
}

fn main(dna1: [u32; 25], dna2: [u32; 25], secret: Field, commitment1: Field, commitment2: Field) -> pub u32{
    check_commitment(commitment1, secret, dna1);
    check_commitment(commitment2, secret, dna2);

    compare_dna(dna1, dna2)
}