// Author: Savannah Luy
// Purpose: this code applies colors to an opened document and saves each file as a png
// Date: Jul 21, 2022

var activeDoc = app.activeDocument;
var layer = activeDoc.artLayers;

alert("Applying 26 Colors");
function  ApplyLayerStyle(R,G,B,BlendMode){
    var idsetd = charIDToTypeID( "setd" );
    var desc102 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref62 = new ActionReference();
    var idPrpr = charIDToTypeID( "Prpr" );
    var idLefx = charIDToTypeID( "Lefx" );
    ref62.putProperty( idPrpr, idLefx );
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref62.putEnumerated( idLyr, idOrdn, idTrgt );
    desc102.putReference( idnull, ref62 );
    var idT = charIDToTypeID( "T   " );
    var desc103 = new ActionDescriptor();
    var idScl = charIDToTypeID( "Scl " );
    var idPrc = charIDToTypeID( "#Prc" );
    desc103.putUnitDouble( idScl, idPrc, 416.666667 );
    var idSoFi = charIDToTypeID( "SoFi" );
    var desc104 = new ActionDescriptor();
    var idenab = charIDToTypeID( "enab" );
    desc104.putBoolean( idenab, true );
    var idMd = charIDToTypeID( "Md  " );
    var idBlnM = charIDToTypeID( "BlnM" );
    var idlinearBurn = stringIDToTypeID( BlendMode );
    desc104.putEnumerated( idMd, idBlnM, idlinearBurn );
    var idOpct = charIDToTypeID( "Opct" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc104.putUnitDouble( idOpct, idPrc, 100.000000 );
    var idClr = charIDToTypeID( "Clr " );
    var desc105 = new ActionDescriptor();
    var idRd = charIDToTypeID( "Rd  " );
    desc105.putDouble( idRd, R );
    var idGrn = charIDToTypeID( "Grn " );
    desc105.putDouble( idGrn, G );
    var idBl = charIDToTypeID( "Bl  " );
    desc105.putDouble( idBl, B );
    var idRGBC = charIDToTypeID( "RGBC" );
    desc104.putObject( idClr, idRGBC, desc105 );
    var idSoFi = charIDToTypeID( "SoFi" );
    desc103.putObject( idSoFi, idSoFi, desc104 );
    var idLefx = charIDToTypeID( "Lefx" );
    desc102.putObject( idT, idLefx, desc103 );
    executeAction( idsetd, desc102, DialogModes.NO );
}

 //-- Get the original name ;

 function remove(fullName){
 //-- Locate the final position of the final . before the extension.
 var finalDotPosition = fullName.lastIndexOf( "." ) ;
 
 //-- check that position. If it isn't -1 (missing) return the text
 //--  up to that position.
 //-- Note, there are some odd things that can happen when passing
 //--  a file reference that begins with a single dot. Be wary.
 if ( finalDotPosition > -1 ) {
  return fullName.substr( 0 , finalDotPosition );
 }
 //-- implied else, return the original name because there is no dot.
 return fullName;
}

//rgb values and names
var red = [2, 255, 111, 0, 0, 0, 3, 0, 0, 0, 170, 108, 61, 38, 255, 255, 241, 138, 255, 249, 193, 121, 240, 198, 118, 72];
var green = [40, 191, 207, 178, 71, 58, 249, 196, 142, 82, 218, 202, 174, 96, 255, 220, 138, 83, 129, 53, 2, 36, 149, 0, 35, 18];
var blue = [81, 0, 235, 227, 186, 93, 230, 179, 170, 76, 145, 152, 43, 65, 59, 0, 0, 47, 137, 73, 48, 47, 205, 126, 108, 104];
var colName = ["-UC-Davis-Blue", "-UC-Davis-Gold", "-Rec-Pool", "-Tahoe", "-Gunrock", 
                "-Bodega", "-Rain", "-Arboretum", "-Putah-Creek", "-Delta", "-Farmer's-Market", 
                "-Sage", "-Quad", "-Redwood", "-Golden-State", "-Sunflower", "-Poppy", "-California", 
                "-Rose", "-Strawberry", "-Double-Decker", "-Merlot", "-Thiebaud-Icing", "-Redbud", "-Pinot", "-Cabernet"];


//choose folder
var myFolder = Folder.selectDialog ();

for(i in red, green, blue, colName){
// remove the extension 
var rem = remove(activeDoc.name);

//create a duplicate file
var currdoc = activeDoc.duplicate(rem+colName[i], false);

//apply colorOverlay
ApplyLayerStyle(red[i], green[i], blue[i], "colorOverlay");

//create new folder within chosen folder
var newFolder = new Folder(myFolder);

//save as png and close
currdoc.saveAs(newFolder, PNGSaveOptions, false, Extension.LOWERCASE);
currdoc.close(SaveOptions.DONOTSAVECHANGES);

}

