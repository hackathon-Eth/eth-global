import * as LitJsSdk from "@lit-protocol/lit-node-client";  

const client = new LitJsSdk.LitNodeClient({
  alertWhenUnauthorized: false,
  litNetwork: 'jalapeno',
});
const chain = "ethereum";

class Lit {
  litNodeClient

  async connect() {
    await client.connect()
    this.litNodeClient = client
  }
}

export default new Lit()
export { client, chain }