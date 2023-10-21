import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

const client = new LitJsSdk.LitNodeClient({
  litNetwork: 'cayenne',
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