import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Token, TokenBalance } from '../../generated/schema';
import { ERC20 } from '../../generated/BadgerTreeV2/ERC20';
import { ZERO } from '../constants';
import { loadUser } from './user';

export function loadToken (address: Address): Token {
  let id = address.toHexString();
  let token = Token.load(id) as Token;
  if (token == null){ 
    let contract = ERC20.bind(address);
    token = new Token(id);
    token.name = contract.name()
    token.symbol = contract.symbol()
    token.decimals = BigInt.fromI32(contract.decimals());
    token.save();
  }
  
  return token;
}

export function loadTokenBalance(user: Address, token: Address): TokenBalance {
    let id = user.toHexString()
    .concat("-")
    .concat(token.toHexString())

    let tokenBalance = TokenBalance.load(id) as TokenBalance
    if (tokenBalance == null) {
        tokenBalance = new TokenBalance(id)
        tokenBalance.amount = ZERO
        tokenBalance.token = loadToken(token).id
        tokenBalance.user = loadUser(user).id
        tokenBalance.save()
    }
    return tokenBalance

}
