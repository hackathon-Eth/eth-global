export const Hellix = () =>{
    const dnaItems = [];
    for (let i = 0; i < 24; i++) {
      dnaItems.push(
        <div key={i} style={{ '--i': i }}>{i}</div>
      );
    }
  
    return (
      <div className="wrapper">
        <div className="dna">
          {dnaItems}
        </div>
      </div>
    );
  
}