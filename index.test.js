import { replaceLogic } from './index';

describe( 'replaceLogic', () => {
  let notTranslatedFnMocked = jest.fn( str => `${str}!` );

  it( 'should return a function', () => {
    expect( replaceLogic ).to.be.a( 'function' );
  } );

  it( 'should return the string', () => {
    expect( replaceLogic( {
      1: '١',
      2: '٢',
    } )( 'hi this is me I have 1 caw and 2 dogs', 'balala', true ) ).to.eql( 'hi this is me I have ١ caw and ٢ dogs' )
  } );

  it( 'should be fluent about the numbers', () => {
    expect( replaceLogic( {
      1: 'One',
      2: 'Two',
    } )( 'hi this is me I have 1 caw and 2 dogs', '', true ) ).to.eql( 'hi this is me I have One caw and Two dogs' )
  } );

  it( 'should not do anything if shouldTranslate is false', () => {
    let notTranslatedFn = str => `${str}!`;
    expect( replaceLogic( {
      1: 'One',
      2: 'Two',
    } )( 'hi this is me I have 1 caw and 2 dogs', notTranslatedFn ) ).to.eql( 'hi this is me I have 1 caw and 2 dogs!' )
  } );

  it( 'should throw if non-string passed as first argument', () => {
    expect( () => {

      replaceLogic( { 1: 'One', 2: 'Two' } )( [ 'hi this is me I have 1 caw and 2 dogs' ], true );

    } ).to.throw()
  } );


  it( 'should run the provided function with the provided str as first argument if not translated', () => {
    let notTranslatedFnMocked = jest.fn();
    let mappings              = {};
    let theString             = 'the string';

    replaceLogic( mappings )( theString, notTranslatedFnMocked, false );

    expect( notTranslatedFnMocked.mock.calls[ 0 ][ 0 ] ).to.equal( theString );
    expect( notTranslatedFnMocked.mock.calls.length ).to.equal( 1 );
  } );

  it( 'should NOT run the provided function with the provided str as first argument if not translated', () => {
    let notTranslatedFnMocked = jest.fn();
    let mappings              = { a: 'b' };
    let theString             = 'the string';

    replaceLogic( mappings )( theString, notTranslatedFnMocked, true );

    expect( notTranslatedFnMocked.mock.calls.length ).to.equal( 0 );
  } );

} );
