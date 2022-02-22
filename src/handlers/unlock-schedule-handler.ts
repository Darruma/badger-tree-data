import { UnlockScheduleSet } from '../../generated/RewardsLogger/RewardsLogger'
import { UnlockSchedule } from '../../generated/schema'
import {loadToken} from '../entities/token'
import { log } from '@graphprotocol/graph-ts'

export function handleUnlockScheduleSet(event: UnlockScheduleSet): void {
    log.debug("UnlockSchedule",[])

    let id = event.transaction.hash.toHexString()
        .concat("-")
        .concat(event.logIndex.toString())
    let unlockSchedule = UnlockSchedule.load(id) as UnlockSchedule
    if (unlockSchedule == null) {
        unlockSchedule = new UnlockSchedule(id)
        unlockSchedule.amount = event.params.totalAmount
        unlockSchedule.blockNumber = event.params.blockNumber
        unlockSchedule.timestamp = event.params.timestamp
        unlockSchedule.duration = event.params.duration
        unlockSchedule.vault = event.params.beneficiary.toHexString()
        unlockSchedule.start = event.params.start
        unlockSchedule.end = event.params.end
        unlockSchedule.token = loadToken(event.params.token).id
    }
    
    unlockSchedule.save()

}
