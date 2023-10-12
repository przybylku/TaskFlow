import * as crypto from 'crypto';

/**
 * 
 * @param p - password
 * @returns hashed password to save in database.
 */
export const hash = (p: string): string => {
  const hmac = crypto.createHmac('sha512', "ndsadasdikdh asdhja djasi dhujasid asiod hjasiudhuasi hjdaspdasuopdjasashjpasdjdasjdasjnksdad nas dasd asd d sd sd sd sd sd sd sakdasn djkhasnd aiuhbgryuighbdjhyvgvnb lghjkfdn vfihodsndasiof noyfdgihfdoiasdh nakuhnripugfnsibdakhdasouphgrifsuhnfadsfbhdnipfhnsdipgfdsbndfgihgfnrsepioufhaehjdaiupdhne fypgirsbngdrsiygbvndyfifnbvsdifbnsaedfbrsigyvbdfsxyigvbgsdfidsngdfnbubhndfugnvsi");
  hmac.update(p);
  return hmac.digest('hex');
};