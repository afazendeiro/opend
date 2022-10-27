import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { Principal } from "@dfinity/principal";
import { canisterId } from "../../../declarations/nft/index";

function Item(props) {
  const [nftName, setNftName] = React.useState("");
  const [nftOwner, setNftOwner] = React.useState("");
  const [nftBytes, setNftBytes] = React.useState("");

  const id = props.id;

  const localhost = "http://localhost:8080";
  const agent = new HttpAgent({ host: localhost });

  async function loadNFT() {
    console.log("PROPS-ITEM", canisterId);
    const NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    NFTActor.getName().then((name) => {
      setNftName(name);
    });

    NFTActor.getOwner().then((owner) => {
      setNftOwner(owner.toText());
    });

    NFTActor.getAsset().then((bytes) => {
      setNftBytes(
        URL.createObjectURL(
          new Blob([new Uint8Array(bytes).buffer], { type: "image/png" })
        )
      );
    });
  }

  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={nftBytes}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {nftName}
            <span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {nftOwner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
