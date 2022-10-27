import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import NFTActorClass "../nft/nft";
import HashMap "mo:base/HashMap";
import List "mo:base/List";

actor OpenD {

    var mapNFTs = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    var ownerNFTs = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
 
    public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal {
        let owner: Principal = msg.caller;

        Debug.print(debug_show(Cycles.balance()));
        Cycles.add(100_500_000_000);
        let newNFT = await NFTActorClass.NFT(name, owner, imgData);
        let newNFTPrincipal = await newNFT.getCanisterId();
        mapNFTs.put(newNFTPrincipal, newNFT);
        addToOwnership(owner, newNFTPrincipal);

        return newNFTPrincipal;
    };

    private func addToOwnership(owner: Principal, nftId:Principal) {
        var ownedNFTs : List.List<Principal> = switch (ownerNFTs.get(owner)) {
            case null { List.nil<Principal>() };
            case (?ownedNFTs) { ownedNFTs };
        };

        ownedNFTs := List.push(nftId, ownedNFTs);
        ownerNFTs.put(owner, ownedNFTs);
    };

    public query func getOwnedNFTs(owner: Principal) : async [Principal] {
        let ownedNFTs : List.List<Principal> = switch (ownerNFTs.get(owner)) {
            case null { List.nil<Principal>() };
            case (?ownedNFTs) { ownedNFTs };
        };

        return List.toArray(ownedNFTs);
    };
};
