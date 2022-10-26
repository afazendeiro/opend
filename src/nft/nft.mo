import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class NFT (itemName: Text, itemOwner: Principal, itemContent: [Nat8]) {
    let name = itemName;
    let owner = itemOwner;
    let asset = itemContent;

    public query func getName() : async Text {
        return name;
    };

    public query func getOwner() : async Principal {
        return owner;
    };

    public query func getAsset() : async [Nat8] {
        return asset;
    };
};