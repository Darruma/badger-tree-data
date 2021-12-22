import { BigInt } from "@graphprotocol/graph-ts"
import {
  BadgerTreeV2,
  Claimed,
  InsufficientFundsForRoot,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  RootProposed,
  RootUpdated,
  Unpaused
} from "../generated/BadgerTreeV2/BadgerTreeV2"
import { ExampleEntity } from "../generated/schema"

export function handleClaimed(event: Claimed): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.user = event.params.user
  entity.token = event.params.token

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.PAUSER_ROLE(...)
  // - contract.ROOT_PROPOSER_ROLE(...)
  // - contract.ROOT_VALIDATOR_ROLE(...)
  // - contract.UNPAUSER_ROLE(...)
  // - contract.claimed(...)
  // - contract.currentCycle(...)
  // - contract.encodeClaim(...)
  // - contract.getClaimableFor(...)
  // - contract.getClaimedFor(...)
  // - contract.getCurrentMerkleData(...)
  // - contract.getMerkleRootFor(...)
  // - contract.getPendingMerkleData(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.hasPendingRoot(...)
  // - contract.hasRole(...)
  // - contract.isClaimAvailableFor(...)
  // - contract.lastProposeBlockNumber(...)
  // - contract.lastProposeEndBlock(...)
  // - contract.lastProposeStartBlock(...)
  // - contract.lastProposeTimestamp(...)
  // - contract.lastPublishBlockNumber(...)
  // - contract.lastPublishEndBlock(...)
  // - contract.lastPublishStartBlock(...)
  // - contract.lastPublishTimestamp(...)
  // - contract.merkleContentHash(...)
  // - contract.merkleRoot(...)
  // - contract.paused(...)
  // - contract.pendingCycle(...)
  // - contract.pendingMerkleContentHash(...)
  // - contract.pendingMerkleRoot(...)
  // - contract.totalClaimed(...)
}

export function handleInsufficientFundsForRoot(
  event: InsufficientFundsForRoot
): void {}

export function handlePaused(event: Paused): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleRootProposed(event: RootProposed): void {}

export function handleRootUpdated(event: RootUpdated): void {}

export function handleUnpaused(event: Unpaused): void {}
