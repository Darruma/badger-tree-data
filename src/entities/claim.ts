import { Claim } from "../../generated/schema";
import { NONE, ZERO } from "../constants";

export function loadClaim(id: string): Claim {
    let claim = Claim.load(id) as Claim
    if(claim == null) {
        claim = new Claim(id)
        claim.amount = ZERO
        claim.user = NONE
        claim.token = NONE
        claim.cycle = NONE
        claim.timestamp = ZERO
        claim.blockNumber = ZERO
        claim.save()
    }
    return claim

}
