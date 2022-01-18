import { RootProposed, RootUpdated } from "../../generated/BadgerTreeV2/BadgerTreeV2";
import { loadCycle } from "../entities/cycle";
import { log } from '@graphprotocol/graph-ts'

export function handleRootUpdated(event: RootUpdated): void {
    let cycle = loadCycle(event.params.cycle)
    cycle.root = event.params.root.toHexString()
    cycle.contentHash = event.params.contentHash.toHexString()
    cycle.startBlock = event.params.startBlock
    cycle.endBlock = event.params.endBlock

    cycle.save()
}


export function handleRootProposed(event: RootProposed): void {
    let cycle = loadCycle(event.params.cycle)
    cycle.root = event.params.root.toHexString()
    cycle.contentHash = event.params.contentHash.toHexString()
    cycle.startBlock = event.params.startBlock
    cycle.endBlock = event.params.endBlock

    log.debug(cycle.root,[])
    cycle.save()
}
