var demonsMale = new Array("Jealousy", "Wrath", "Tears", "Sighing", "Suffering", "Lamentation", "Bitter Weeping")
var demonsMaleModifier = new Array("Jealous", "Wrathful", "Tearful", "Sighing", "Suffering", "Lamenting", "Embittered Weeping")

var demonsFemale = new Array("Wrath", "Pain", "Lust", "Sighing", "Cursedness", "Bitterness", "Quarelsomeness")
var demonsFemaleModifier = new Array("Wrathful", "Painful", "Lusty", "Sighing", "Cursed", "Bitter", "Quarelsome")

var angelsMale = new Array("Unenviousness", "Blessedness", "Joy", "Truth", "Unbegrudgingness", "Belovedness", "Trustworthyness")
var angelsMaleModifier = new Array("Unenvious", "Blessed", "Joyful", "True", "Unbegrudging", "Beloved", "Trustworthy")

var angelsFemale = new Array("Peace", "Gladness", "Rejoicing", "Blessedness", "Truth", "Love", "Faith")
var angelsFemaleModifier = new Array("Peaceful", "Glad", "Rejoicing", "Blessed", "Truthful", "Lovely", "Faithful")

var gates = new Array ("Calcination","Dissolution","Separation","Conjuction","Putrefaction","Congelation","Cibation","Sublimation","Fermentation","Exhaltation","Multiplication","Projection")
var gatesModifier = new Array ("Calcinated","Dissolved","Separated","Conjucted","Putrid","Congealed","Cibated","Sublime","Fermented","Exhaltated","Multiplied","Projected")
var gates12 = new Array(gates, gatesModifier)

var maleDemons = new Array (demonsMale, demonsMaleModifier)
var femaleDemons = new Array (demonsFemale, demonsFemaleModifier)
var maleAngels = new Array (angelsMale, angelsMaleModifier)
var femaleAngels = new Array(angelsFemale, angelsFemaleModifier)

var demonGroups = new Array(maleDemons,femaleDemons,maleAngels,femaleAngels);

var md_fd = new Array (maleDemons, femaleDemons)
var fd_md = new Array (femaleDemons, maleDemons)

var ma_fa = new Array (maleAngels, femaleAngels)
var fa_ma = new Array (femaleAngels, maleAngels)

var md_fa = new Array (maleDemons, femaleAngels)
var fa_md = new Array (femaleAngels, maleDemons)

var ma_fd = new Array (maleAngels, femaleDemons)
var fd_ma = new Array (femaleDemons, maleAngels)

var md_12 = new Array (maleDemons, gates12)
var fd_12 = new Array (femaleDemons, gates12)

var demonArray = new Array (
md_fd, 
md_fa, 
ma_fd, 
ma_fa, 
fd_md, 
fd_ma,
fa_md,
fa_ma
)

var angelLabels = new Array (ma_fd, ma_fa, fa_md, fa_ma);
var demonLabels = new Array (md_fd, md_fa, fd_md, fd_ma);

var demonGates = new Array(md_12, fd_12)

var demonArrayName = new Array(
"<b>The 49 Androgynous Demons</b><br> (from The 7 Androgynous Male Demons -x-  The 7 Androgynous Female Demons)",
"<b>The 49 Androgynous Cherubim</b><br> (from The 7 Androgynous Male Demons -x-  The 7 Androgynous Female Angels)",
"<b>The 49 Androgynous Cherubim</b><br> (from The 7 Androgynous Male Angels -x-  The 7 Androgynous Female Demons)",
"<b>The 49 Androgynous Angels</b><br>(from The 7 Androgynous Male Angels -x-  The 7 Androgynous Female Angels)",
"<b>The 49 Androgynous Demons</b><br> (from The 7 Androgynous Female Demons -x- The 7 Androgynous Male Demons)",
"<b>The 49 Androgynous Cherubim</b><br> (from The 7 Androgynous Female Demons -x- The 7 Androgynous Male Angels)",
"<b>The 49 Androgynous Cherubim</b><br> (from The 7 Androgynous Female Angels -x-  The 7 Androgynous Male Demons)",
"<b>The 49 Androgynous Angels</b><br> (from The 7 Androgynous Female Angels -x-  The 7 Androgynous Male Angels)")

demonLookUp = new Array ("md_fd", "md_fa", "ma_fd", "ma_fa", "fd_md", "fd_ma", "fa_md", "fa_ma")
 
var demonGatesName_X = new Array("The 7 Androgynous Male Demons", "The 7 Androgynous Female Demons");
var demonGatesName_Y = new Array("12 Gates of Sublime Transformation", "12 Gates of Sublime Transformation");

var demonGatesName = new Array("The 7 Androgynous Male Demons -x- 12 Gates of Sublime Transformation", "The 7 Androgynous Female Demons -x- 12 Gates of Sublime Transformation");



function gatedDemons() {
	var demonLabelA = gatesModifier[Math.floor(Math.random() * 12)];
	var demonLabelB = gatesModifier[Math.floor(Math.random() * 12)];
	var demonAngelGroup = demonGroups[Math.floor(Math.random()*2)][0][Math.floor(Math.random() * 7)];
	var spokeLabel = demonLabelA + " " + demonAngelGroup;
	return spokeLabel;
}

function gatedAngels() {
	var demonLabelA = gatesModifier[Math.floor(Math.random() * 12)];
	var demonLabelB = gatesModifier[Math.floor(Math.random() * 12)];
	var demonAngelGroup = demonGroups[Math.floor(Math.random()*2 + 2)][0][Math.floor(Math.random() * 7)];
	var spokeLabel = demonLabelA + " " + demonAngelGroup;
	return spokeLabel;
}

function angelDemons() {
	var group = angelLabels[Math.floor(Math.random() * 4)];
	var labelA = group[1][1][Math.floor(Math.random() * 7)];
	var entity = group[0][0][Math.floor(Math.random() * 7)];
	var spokeLabel = labelA + " " + entity;
	return spokeLabel;
}

function cherubim() {
	var group = demonArray[Math.floor(Math.random() * 8)];
	var labelA = group[1][1][Math.floor(Math.random() * 7)];
	var entity = group[0][0][Math.floor(Math.random() * 7)];
	var spokeLabel = labelA + " " + entity;
	return spokeLabel;
}

