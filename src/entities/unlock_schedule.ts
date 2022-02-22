import { UnlockSchedule } from '../../generated/schema'
import { NONE, ZERO } from "../constants";


export function loadUnlockSchedule(tx: string) {
  let unlockSchedule = UnlockSchedule.load(tx) as UnlockSchedule
  if(unlockSchedule == null) {

  }
}
