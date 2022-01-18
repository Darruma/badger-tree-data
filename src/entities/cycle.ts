import { Cycle } from "../../generated/schema";
import { NONE, ZERO } from "../constants";
import { BigInt } from '@graphprotocol/graph-ts';


export function loadCycle(cycleNumber: BigInt): Cycle{
    let id = cycleNumber.toString()
    let cycle = Cycle.load(id) as Cycle
    if(cycle == null) {
        cycle = new Cycle(id)
        cycle.root = NONE
        cycle.contentHash = NONE
        cycle.startBlock = ZERO
        cycle.endBlock = ZERO
        cycle.save()
    }
    return cycle 
}