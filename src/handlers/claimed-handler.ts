import { Claimed } from "../../generated/BadgerTreeV2/BadgerTreeV2";
import { loadClaim } from "../entities/claim";
import { loadCycle } from "../entities/cycle";
import { loadToken, loadTokenBalance } from "../entities/token";
import { loadUser } from '../entities/user'

export function handleClaimed(event: Claimed): void {
    let id = event.transaction.hash.toHexString()
    .concat("-")
    .concat(event.logIndex.toString())
    let claim = loadClaim(id)
    let tokenBalance = loadTokenBalance(
        event.params.user,
        event.params.token
    )
    tokenBalance.amount = tokenBalance.amount.plus(event.params.amount)
    tokenBalance.save()

    claim.token = loadToken(event.params.token).id
    claim.amount = event.params.amount
    claim.cycle = loadCycle(event.params.cycle).id
    claim.blockNumber = event.params.blockNumber
    claim.timestamp = event.params.timestamp
    claim.user = loadUser(event.params.user).id
    claim.save()
}