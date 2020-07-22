import * as _ from '../../src/Array'
import { pipe } from '../../src/function'
import { eqNumber } from '../../src/Eq'
import { Ord } from '../../src/Ord'

declare const rus: ReadonlyArray<unknown>
declare const rns: ReadonlyArray<number>
declare const rss: ReadonlyArray<string>
declare const rtns: ReadonlyArray<readonly [number, string]>

//
// zip
//

pipe(rns, _.zip(rss)) // $ExpectType readonly (readonly [number, string])[]

//
// zipWith
//

// $ExpectType readonly (readonly [number, string])[]
pipe(
  rns,
  _.zipWith(rss, (n, s) => [n, s] as const)
)

//
// unzip
//

_.unzip(rtns) // $ExpectType readonly [readonly number[], readonly string[]]
pipe(rtns, _.unzip) // $ExpectType readonly [readonly number[], readonly string[]]

//
// filter
//

// $ExpectType readonly number[]
pipe(
  rus,
  _.filter((u: unknown): u is number => typeof u === 'number')
)

//
// filterWithIndex
//

// $ExpectType readonly number[]
pipe(
  rus,
  _.filterWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// partition
//

// $ExpectType Separated<readonly unknown[], readonly number[]>
pipe(
  rus,
  _.partition((u: unknown): u is number => typeof u === 'number')
)

//
// partitionWithIndex
//

// $ExpectType Separated<readonly unknown[], readonly number[]>
pipe(
  rus,
  _.partitionWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// spanLeft
//

// $ExpectType Spanned<number, unknown>
pipe(
  rus,
  _.spanLeft((u: unknown): u is number => typeof u === 'number')
)

//
// lookup
//

_.lookup(0) // $ExpectType <A>(as: readonly A[]) => Option<A>

//
// elem
//

_.elem(eqNumber)(1) // $ExpectType (as: readonly number[]) => boolean

//
// difference
//

_.difference(eqNumber)([3, 4]) // $ExpectType (xs: readonly number[]) => readonly number[]

//
// intersection
//

_.intersection(eqNumber)([3, 4]) // $ExpectType (xs: readonly number[]) => readonly number[]

//
// union
//

_.union(eqNumber)([3, 4]) // $ExpectType (xs: readonly number[]) => readonly number[]

//
// zip
//

_.zip(['a', 'b']) // $ExpectType <A>(as: readonly A[]) => readonly (readonly [A, string])[]

//
// cons
//

_.cons(0) // $ExpectType (tail: readonly number[]) => NonEmptyArray<number>

//
// sort
//

declare const ord1: Ord<{ readonly a: string }>
interface X1 {
  readonly a: string
  readonly b: number
}
declare const x1s: ReadonlyArray<X1>

_.sort(ord1)(x1s) // $ExpectType ReadonlyArray<X1>

//
// sortBy
//

declare const ord2: Ord<X1>
declare const ord3: Ord<X1>
interface X2 {
  readonly a: string
  readonly b: number
  readonly c: boolean
}
declare const x2s: ReadonlyArray<X2>

_.sortBy([ord2, ord3])(x2s) // $ExpectType ReadonlyArray<X2>
