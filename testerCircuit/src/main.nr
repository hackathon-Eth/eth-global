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

fn compare_dna_lc_string(dna1: [u32; 25], dna2: [u32; 25]) -> u32{
    // Compare two DNA samples with the longest common substring algorithm

    let mut count = 0;
    let mut max = 0;
    for i in 0..DNA_LENGTH {
        if(dna1[i] == dna2[i]){
            count += 1;
        }
        else {
            max = count;
            count = 0;
        }
    }

    std::println("Max: ");
    std::println(max);
    max * 100 / DNA_LENGTH
}

fn compare_dna_lc_sub(dna1: [u32; 25], dna2: [u32; 25]) -> u32{
    // Compare two DNA samples with the longest common subsequence algorithm
    
    let mut lcs = [[0; DNA_LENGTH + 1]; DNA_LENGTH + 1];
    for i in 0..DNA_LENGTH + 1 {
        for j in 0..DNA_LENGTH + 1{
            if (i==j) & (i == 0) & (j==0){
                lcs[i][j] = 0;
            }
            else if dna1[i-1] == dna2[j-1]{
                lcs[i][j] = lcs[i-1][j-1] + 1;
            }
            else{
               if(lcs[i-1][j] as u32 > lcs[i][j-1] as u32){
                   lcs[i][j] = lcs[i-1][j];
               }
               else{
                   lcs[i][j] = lcs[i][j-1];
               }
            }
        }
    }
    std::println("LCS: ");
    std::println(lcs[DNA_LENGTH][DNA_LENGTH]);
    lcs[DNA_LENGTH][DNA_LENGTH] * 100 / DNA_LENGTH
}

fn main(dna1:pub [u32; 25], dna2:pub [u32; 25], secret:pub Field, commitment:pub Field) -> pub u32{
    check_commitment(commitment, secret, dna1);
    compare_dna_lc_string(dna1, dna2)
    // compare_dna_lc_sub(dna1, dna2)
}