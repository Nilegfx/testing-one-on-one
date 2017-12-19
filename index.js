export const replaceLogic = function( mappings ) {
  return function ( str, notTranslatedSymbolFn, shouldTranslate ) {

    if(typeof str !== 'string') throw new Error(`str should be type of string, received ${typeof str}`);

    let pattern = Object.keys( mappings ).join( '|' );
    let regx    = new RegExp( `${pattern}`, 'g' );

    if ( shouldTranslate ) {
      return str.replace( regx, function ( match ) {
        return mappings[ match ];
      } );
    }
    return notTranslatedSymbolFn(str);
  };
};
