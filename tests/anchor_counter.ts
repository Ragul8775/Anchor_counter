import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorCounter } from "../target/types/anchor_counter";
import { expect } from "chai";

describe("anchor_counter", () => {
const provider = anchor.AnchorProvider.env()
anchor.setProvider(provider);

const program = anchor.workspace.AnchorCounter as Program<AnchorCounter>;

const counter = anchor.web3.Keypair.generate();

it("it initialized!",async ()=>{
  const tx = await program.methods.initialize().accounts({counter:counter.publicKey}).signers([counter]).rpc()

  const account = await program.account.counter.fetch(counter.publicKey)
  expect(account.count.toNumber()).to.equal(0)
})
it("Increment The Count!",async ()=>{
  const tx = await program.methods.increment().accounts({counter:counter.publicKey,user:provider.wallet.publicKey}).rpc();
  const account = await program.account.counter.fetch(counter.publicKey);
  expect(account.count.toNumber()).to.equal(1);
})
it("Decrement The Count!",async ()=>{
  const tx = await program.methods.decrement().accounts({counter:counter.publicKey,user:provider.wallet.publicKey}).rpc();
  const account = await program.account.counter.fetch(counter.publicKey);
  expect(account.count.toNumber()).to.equal(0);
})
});
