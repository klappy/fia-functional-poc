export function guardAttempt(ledger,digest,record){
 if(ledger.approvedInputDigest!==digest)throw Error('Approved source input changed; hold synthesis');
 if(ledger.attempts.some(a=>a.id===record.id))throw Error('Prior uncertain or failed attempt; hold regeneration');
 if(ledger.attempts.length>=120||ledger.attempts.reduce((n,a)=>n+a.characters,0)+record.text.length>30000)throw Error('Cumulative synthesis cap reached');
}
