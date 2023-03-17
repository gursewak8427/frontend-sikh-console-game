var Convertor;
(function (Convertor) {
    function convertStringUsingMapper(mapperConfig, stringToConvert) {
        var mapper = mapperConfig.mapper, maxWidth = mapperConfig.maxWidth, moveRightChars = mapperConfig.moveRightChars, moveLeftChars = mapperConfig.moveLeftChars, moveAcrossCharacters = mapperConfig.moveAcrossCharacters;
        var output = [];
        var charToAddOnRight = "";
        var charToMoveRightIndex = 0;
        for (var i = 0; i < stringToConvert.length; i++) {
            var j = maxWidth + 1;
            var matchFound = false;
            var charToMatch = "";
            while (matchFound === false && j--) {
                charToMatch = stringToConvert.substr(i, j);
				console.log("a",charToMatch);
                if (charToMatch in mapper) {
                    matchFound = true;
                    i = i + (j - 1);
                }
            }
            var charToAdd = void 0;
            if (matchFound) {
                charToAdd = mapper[charToMatch];
                console.log("found",charToMatch);
            }
            else {
                charToAdd = stringToConvert[i];
                console.log("not found",charToMatch);
            }
            if (charToAddOnRight) {
                if (charToMoveRightIndex < 1) {
                    charToMoveRightIndex = 1;
                    output.push(charToAdd);
                }
                else if (moveAcrossCharacters.indexOf(charToAdd) > -1) {
                    output.push(charToAdd);
                }
                else {
                    output.push(charToAddOnRight, charToAdd);
                    charToAddOnRight = null;
                    charToMoveRightIndex = 0;
                }
            }
            else if (moveRightChars.indexOf(charToAdd) > -1) {
                charToAddOnRight = charToAdd;
            }
            else if (moveLeftChars.indexOf(charToAdd) > -1 && output.length && matchFound) {
                insertCharOnLeft(output, moveAcrossCharacters, charToAdd, []);
            }
            else {
                output.push(charToAdd);
            }
        }
        if (charToAddOnRight) {
            output.push(charToAddOnRight);
        }
        return output.join("");
    }
    Convertor.convertStringUsingMapper = convertStringUsingMapper;
    function insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars) {
        var lastChar = chars.pop();
        if (lastChar) {
            if (moveLeftAcrossChars.indexOf(lastChar) > -1) {
                onRightChars.unshift(lastChar);
                insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars);
            }
            else {
                chars.push.apply(chars, [characterToAdd, lastChar].concat(onRightChars));
            }
        }
        else {
            chars.push.apply(chars, [characterToAdd].concat(onRightChars));
        }
    }
    function getMapper(to, from, compositions, moveAcrossCharSet) {
        var mappingLength = Math.max(to.characterCodes.length, from.characterCodes.length);
        var mapper = {};
        for (var i = 0; i < mappingLength; i++) {
            var fromChar = from.characterCodes[i];
            var toChar = to.characterCodes[i];
            if (fromChar && toChar) {
                mapper[getCharFromUnicode(fromChar)] = getCharFromUnicode(toChar);
            }
        }
        var maxWidth = 1;
        for (var _i = 0, compositions_1 = compositions; _i < compositions_1.length; _i++) {
            var compositionCharArrays = compositions_1[_i];
            var toCharacter = getCompositionCharacters(compositionCharArrays, to.characterCodes)[0];
            if (toCharacter) {
                var fromCharacters = getCompositionCharacters(compositionCharArrays, from.characterCodes);
                for (var _a = 0, fromCharacters_1 = fromCharacters; _a < fromCharacters_1.length; _a++) {
                    var fromChar = fromCharacters_1[_a];
                    maxWidth = Math.max(maxWidth, fromChar.length);
                    if (!(fromChar in mapper)) {
                        mapper[fromChar] = toCharacter;
                    }
                }
            }
        }
        var moveLeftCharIndexes = from.moveRightCharacters.filter(function (a) { return to.moveRightCharacters.indexOf(a) === -1; });
        var moveRightCharIndexes = to.moveRightCharacters.filter(function (a) { return from.moveRightCharacters.indexOf(a) === -1; });
        var moveAcrossCharacters = moveAcrossCharSet
            .map(function (a) { return getCompositionCharacters(a, to.characterCodes); })
            .reduce(function (a, b) { return a.concat(b); }, []);
        return {
            mapper: mapper,
            maxWidth: maxWidth,
            moveLeftChars: moveLeftCharIndexes.map(function (c) { return getCharFromUnicode(to.characterCodes[c]); }),
            moveAcrossCharacters: moveAcrossCharacters,
            moveRightChars: moveRightCharIndexes.map(function (c) { return getCharFromUnicode(to.characterCodes[c]); })
        };
    }
    Convertor.getMapper = getMapper;
    function getCompositionCharacters(compositionCharArrays, codes) {
        var characters = [];
        for (var _i = 0, compositionCharArrays_1 = compositionCharArrays; _i < compositionCharArrays_1.length; _i++) {
            var compositionChar = compositionCharArrays_1[_i];
            var isValid = true;
            var charCodes = [];
            for (var _a = 0, compositionChar_1 = compositionChar; _a < compositionChar_1.length; _a++) {
                var code = compositionChar_1[_a];
                var toCode = codes[code];
                if (toCode) {
                    charCodes.push(toCode);
                }
                else {
                    isValid = false;
                }
            }
            if (isValid) {
                characters.push(getCharFromUnicode.apply(void 0, charCodes));
            }
        }
        return characters;
    }
    function getCharFromUnicode() {
        var unicodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            unicodes[_i - 0] = arguments[_i];
        }
        return unicodes.map(function (c) { return String.fromCharCode(c); }).join("");
    }
})(Convertor || (Convertor = {}));

var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.anmolMapping = (_a = {},
        _a[1 /* IkOnkarVersion1a */] = 0x3c,
        _a[2 /* IkOnkarVersion1b */] = 0x3e,
        _a[4 /* IkOnkarVersion2a */] = 0x3c, /*0xc5, hsn*/
        _a[5 /* IkOnkarVersion2b */] = 0x3e,/*hsn 0xc6, */
        _a[6 /* IkOnkarVersion3 */] = 0x7b, /*hsn 0xa1,*/
        _a[11 /* Uà©³ */] = 0x61,
        //[Char.Uà¨‰]: 0x00,
        //[Char.Uà¨Š]: 0x00,
        _a[15 /* Oà¨“ */] = 0x45,
        _a[17 /* Aà¨… */] = 0x41,
        //[Char.Aà¨†]: 0x00,
        //[Char.Aà¨]: 0x00,
        //[Char.Oà¨”]: 0x00,
        _a[21 /* Eà©² */] = 0x65,
        //[Char.Eà¨‡]: 0x00,
        //[Char.Eà¨ˆ]: 0x00,
        //[Char.Eà¨]: 0x00,
        _a[25 /* Sà¨¸ */] = 0x73,
        _a[26 /* Hà¨¹ */] = 0x68,
        _a[27 /* Kà¨• */] = 0x6b,
        _a[28 /* Kà¨– */] = 0x4b,
        _a[29 /* Gà¨— */] = 0x67,
        _a[30 /* Gà¨˜ */] = 0x47,
        _a[31 /* Nà¨™ */] = 0x7c,
        _a[32 /* Cà¨š */] = 0x63,
        _a[33 /* Cà¨› */] = 0x43,
        _a[34 /* Jà¨œ */] = 0x6a,
        _a[35 /* Jà¨ */] = 0x4a,
        _a[36 /* Nà¨ž */] = 0x5c,
        _a[37 /* Tà¨Ÿ */] = 0x74,
        _a[38 /* Tà¨  */] = 0x54,
        _a[39 /* Dà¨¡ */] = 0x66,
        _a[40 /* Dà¨¢ */] = 0x46,
        _a[41 /* Nà¨£ */] = 0x78,
        _a[42 /* Tà¨¤ */] = 0x71,
        _a[43 /* Tà¨¥ */] = 0x51,
        _a[44 /* Dà¨¦ */] = 0x64,
        _a[45 /* Dà¨§ */] = 0x44,
        _a[46 /* Nà¨¨ */] = 0x6e,
        _a[47 /* Pà¨ª */] = 0x70,
        _a[48 /* Fà¨« */] = 0x50,
        _a[49 /* Bà¨¬ */] = 0x62,
        _a[50 /* Bà¨­ */] = 0x42,
        _a[51 /* Mà¨® */] = 0x6d,
        _a[52 /* Yà¨¯ */] = 0x58,
        _a[53 /* Rà¨° */] = 0x72,
        _a[54 /* Là¨² */] = 0x6c,
        _a[55 /* Và¨µ */] = 0x76,
        _a[56 /* Rà©œ */] = 0x56,
        _a[57 /* SPairiBindià¨¶ */] = 0x53,
        _a[58 /* KPairiBindià©™ */] = 0x5e,
        _a[59 /* GPairiBindià©š */] = 0x5a,
        _a[60 /* JPairiBindià©› */] = 0x7a,
        _a[61 /* FPairiBindià©ž */] = 0x26,
        _a[62 /* LPairiBindià¨³ */] = 0x4c,
        _a[63 /* PairiBindi */] = 0x25, /*hsn 0xe6,*/
        _a[65 /* Dot */] = 0x2e,
        _a[66 /* PairiHaha */] = 0x48,
        _a[68 /* PairiHahaDulainkar */] = 0x24, /*hsn 0xa7,*/
        _a[69 /* PairiRara */] = 0x52,
        _a[71 /* PairiRaraPairiBindi */] = 0x52, /*hsn 0xae,*/
        _a[72 /* PairiChacha */] = 0x2b, /*hsn 0xe7,*/
        _a[73 /* PairiTenka */] = 0x3b, /*hsn 0x2020,*/
        _a[74 /* PairiVava */] = 0x21, /*hsn 0xcd,*/
        _a[76 /* PairiYaiya */] = 0x23, /*hsn0xcf, */
        _a[77 /* PairiTata */] = 0x5f, /*hsn 0x153,*/
        _a[78 /* PairiNana */] = 0x2a, /*hsn 0x2dc,*/
        _a[79 /* HalfYaiyaRight */] = 0x27, /*hsn 0xce,*/
        _a[82 /* Tippi */] = 0x4d,
        //[Char.Bindi]: 0x00,
        //[Char.Visagra]: 0x00,
        _a[89 /* AddakAbove */] = 0x7e,/* hsn 0x60,*/
        _a[90 /* AddakRight */] = 0x7e,
        _a[91 /* AddakRight2 */] = 0x7e,/* hsn 0xa4,*/
        _a[92 /* AdakBindi */] = 0x0A01, /* hsn this not gurmukhi word */
        _a[85 /* Bindi */] = 0x4e,
        _a[86 /* Bindi2 */] = 0x4e,/* hsn 0x2c6, */
        //[Char.Yakash]: 0x00,
        _a[94 /* Kana */] = 0x77,
        _a[96 /* KanaBindi */] = 0x57,
        _a[97 /* Sihari */] = 0x69,
        _a[99 /* Bihari */] = 0x49,
        _a[103 /* Aunkar */] = 0x75,
        _a[104 /* Aunkar2 */] = 0x75,/* hsn 0xfc,*/
        _a[106 /* Dulainkar */] = 0x55,
        _a[107 /* Dulainkar2 */] = 0x55,/* hsn 0xa8,*/
        _a[109 /* Lavan */] = 0x79,
        _a[111 /* Dulavan */] = 0x59,
        _a[113 /* Hora */] = 0x6f,
        _a[115 /* Kanaura */] = 0x4f,
        _a[118 /* Virama */] = 0x40,
        //[Char.Udaat]: 0x00,
        _a[120 /* Danda */] = 0x5b,
        _a[124 /* DoubleDanda */] = 0x5d,
        _a[125 /* DoubleDanda2 */] = 0x5d,/* hsn 0xd2, */
        _a[126 /* GZero */] = 0x30,
        _a[127 /* GOne */] = 0x31,
        _a[129 /* GTwo */] = 0x32,
        _a[130 /* GThree */] = 0x33,
        _a[131 /* GFour */] = 0x34,
        _a[132 /* GFive */] = 0x35,
        _a[133 /* GSix */] = 0x36,
        _a[134 /* GSeven */] = 0x37,
        _a[135 /* GEight */] = 0x38,
        _a[136 /* GNine */] = 0x39,
        _a[137 /* EnglishZero */] = 0x30,
        _a[138 /* EnglishOne */] = 0x31,
        _a[139 /* EnglishTwo */] = 0x32,
        _a[140 /* EnglishThree */] = 0x33,
        _a[141 /* EnglishFour */] = 0x34,
        _a[142 /* EnglishFive */] = 0x35,
        _a[143 /* EnglishSix */] = 0x36,
        _a[144 /* EnglishSeven */] = 0x37,
        _a[145 /* EnglishEight */] = 0x38,
        _a[146 /* EnglishNine */] = 0x39,
        _a[147 /* Nu */] = 0x60, /* hsn mapped in font forge from 0x192 */
        _a[152 /* Khanda */] = 0xc7,
        _a[150 /* Divide */] = 0x2f,/*hsn */
        _a[151 /* Multiply */] = 0xbf,
        _a[154 /* FlowerDesign1 */] = 0x152,
        _a[155 /* FlowerDesign2 */] = 0x201a,
        _a[156 /* FlowerDesign3 */] = 0x2030,
        _a[157 /* FlowerDesign4 */] = 0xd3,
        _a[158 /* FlowerDesign5 */] = 0xd4,
        _a[159 /* Diamond */] = 0x24, /* hsn $ 0x2022,*/
        _a[160 /* KThind */] = 0xff,
        _a[161 /* Colon */] = 0x3a,
        _a[162 /* ColonFancy */] = 0x3a, /* hsn 0xda,*/
        _a[163 /* SemiColon */] = 0x00, /*hsn 0x3b,*/
        _a[166 /* Unknown1 */] = 0x7d,/*hsn 0xb4,  adha pair yaya */
        _a[167 /* TopRightExtention */] = 0xd8,
        _a[168 /* SingleQuoteCurlyLeft */] = 0x27, /*hsn*/
        _a[170 /* SingleQuoteCurlyRight */] = 0x27,/*hsn*/
        _a[172 /* DoubleQuoteCurlyLeft */] = 0x22,/*hsn*/
        _a[173 /* DoubleQuoteCurlyRight */] = 0x22,/*hsn*/
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));

var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.unicodeMapping = (_a = {},
        _a[0 /* IkOnkarVersion1 */] = 0x0A74,
        //[Char.IkOnkarVersion1b]: ,
        //[Char.IkOnkarVersion2a]: ,
        //[Char.IkOnkarVersion2b]: ,
        //[Char.IkOnkarVersion3]: ,
        _a[11 /* Uà©³ */] = 0x0A73,
        _a[12 /* Uà¨‰ */] = 0x0A09,
        _a[14 /* Uà¨Š */] = 0x0A0A,
        _a[15 /* Oà¨“ */] = 0x0A13,
        _a[17 /* Aà¨… */] = 0x0A05,
        _a[18 /* Aà¨† */] = 0x0A06,
        _a[19 /* Aà¨ */] = 0x0A10,
        _a[20 /* Oà¨” */] = 0x0A14,
        _a[21 /* Eà©² */] = 0x0A72,
        _a[22 /* Eà¨‡ */] = 0x0A07,
        _a[23 /* Eà¨ˆ */] = 0x0A08,
        _a[24 /* Eà¨ */] = 0x0A0F,
        _a[25 /* Sà¨¸ */] = 0x0A38,
        _a[26 /* Hà¨¹ */] = 0x0A39,
        _a[27 /* Kà¨• */] = 0x0A15,
        _a[28 /* Kà¨– */] = 0x0A16,
        _a[29 /* Gà¨— */] = 0x0A17,
        _a[30 /* Gà¨˜ */] = 0x0A18,
        _a[31 /* Nà¨™ */] = 0x0A19,
        _a[32 /* Cà¨š */] = 0x0A1A,
        _a[33 /* Cà¨› */] = 0x0A1B,
        _a[34 /* Jà¨œ */] = 0x0A1C,
        _a[35 /* Jà¨ */] = 0x0A1D,
        _a[36 /* Nà¨ž */] = 0x0A1E,
        _a[37 /* Tà¨Ÿ */] = 0x0A1F,
        _a[38 /* Tà¨  */] = 0x0A20,
        _a[39 /* Dà¨¡ */] = 0x0A21,
        _a[40 /* Dà¨¢ */] = 0x0A22,
        _a[41 /* Nà¨£ */] = 0x0A23,
        _a[42 /* Tà¨¤ */] = 0x0A24,
        _a[43 /* Tà¨¥ */] = 0x0A25,
        _a[44 /* Dà¨¦ */] = 0x0A26,
        _a[45 /* Dà¨§ */] = 0x0A27,
        _a[46 /* Nà¨¨ */] = 0x0A28,
        _a[47 /* Pà¨ª */] = 0x0A2A,
        _a[48 /* Fà¨« */] = 0x0A2B,
        _a[49 /* Bà¨¬ */] = 0x0A2C,
        _a[50 /* Bà¨­ */] = 0x0A2D,
        _a[51 /* Mà¨® */] = 0x0A2E,
        _a[52 /* Yà¨¯ */] = 0x0A2F,
        _a[53 /* Rà¨° */] = 0x0A30,
        _a[54 /* Là¨² */] = 0x0A32,
        _a[55 /* Và¨µ */] = 0x0A35,
        _a[56 /* Rà©œ */] = 0x0A5C,
        _a[57 /* SPairiBindià¨¶ */] = 0x0A36,
        _a[58 /* KPairiBindià©™ */] = 0x0A59,
        _a[59 /* GPairiBindià©š */] = 0x0A5A,
        _a[60 /* JPairiBindià©› */] = 0x0A5B,
        _a[61 /* FPairiBindià©ž */] = 0x0A5E,
        _a[62 /* LPairiBindià¨³ */] = 0x0A33,
        _a[63 /* PairiBindi */] = 0x0A3C,
        //[Char.Dot]:,
        //[Char.PairiHaha]: ,
        //[Char.PairiRara]: 
        //[Char.PairiChacha]: ,
        //[Char.PairiTenka]: ,
        //[Char.PairiVava]: ,
        //[Char.PairiYaiya]: ,
        //[Char.PairiTata]: ,
        //[Char.PairiNana]: c,
        //[Char.HalfYaiya]:e,
        _a[82 /* Tippi */] = 0x0A70,
        _a[85 /* Bindi */] = 0x0A02,
        _a[87 /* Visagra */] = 0x0A03,
        _a[90 /* AddakRight */] = 0x0A71,
        //[Char.Addak2]: 0x00,
        //[Char.AdakBindi]: 0x00,
        //[Char.Bindi]:
        _a[93 /* Yakash */] = 0x0A75,
        _a[94 /* Kana */] = 0x0A3E,
        // [Char.KanaBindi]: 
        _a[97 /* Sihari */] = 0x0A3F,
        _a[99 /* Bihari */] = 0x0A40,
        _a[103 /* Aunkar */] = 0x0A41,
        _a[106 /* Dulainkar */] = 0x0A42,
        _a[109 /* Lavan */] = 0x0A47,
        _a[111 /* Dulavan */] = 0x0A48,
        _a[113 /* Hora */] = 0x0A4B,
        _a[115 /* Kanaura */] = 0x0A4C,
        _a[118 /* Virama */] = 0x0A4D,
        _a[119 /* Udaat */] = 0x0A51,
        _a[120 /* Danda */] = 0x0964,
        _a[124 /* DoubleDanda */] = 0x0965,
        _a[126 /* GZero */] = 0x0A66,
        _a[127 /* GOne */] = 0x0A67,
        _a[129 /* GTwo */] = 0x0A68,
        _a[130 /* GThree */] = 0x0A69,
        _a[131 /* GFour */] = 0x0A6A,
        _a[132 /* GFive */] = 0x0A6B,
        _a[133 /* GSix */] = 0x0A6C,
        _a[134 /* GSeven */] = 0x0A6D,
        _a[135 /* GEight */] = 0x0A6E,
        _a[136 /* GNine */] = 0x0A6F,
        _a[137 /* EnglishZero */] = 0x30,
        _a[138 /* EnglishOne */] = 0x31,
        _a[139 /* EnglishTwo */] = 0x32,
        _a[140 /* EnglishThree */] = 0x33,
        _a[141 /* EnglishFour */] = 0x34,
        _a[142 /* EnglishFive */] = 0x35,
        _a[143 /* EnglishSix */] = 0x36,
        _a[144 /* EnglishSeven */] = 0x37,
        _a[145 /* EnglishEight */] = 0x38,
        _a[146 /* EnglishNine */] = 0x39,
        //[Char.Nu]: ,
        //[Char.Khanda]: ,
        _a[150 /* Divide */] = 0xf7,
        _a[151 /* Multiply */] = 0xd7,
        //[Char.FlowerDesign1]: ,
        //[Char.FlowerDesign2]: ,
        //[Char.FlowerDesign3]: ,
        //[Char.FlowerDesign4]: ,
        //[Char.FlowerDesign5]: ,
        _a[160 /* KThind */] = 0xff,
        _a[161 /* Colon */] = 0x3a,
        _a[163 /* SemiColon */] = 0x3b,
        _a[168 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[170 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[172 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[173 /* DoubleQuoteCurlyRight */] = 0x201d,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));

var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.drChatrikMappings = (_a = {},
        _a[1 /* IkOnkarVersion1a */] = 0xc3,
        _a[2 /* IkOnkarVersion1b */] = 0xc4,
        _a[11 /* Uà©³ */] = 0x41,
        _a[17 /* Aà¨… */] = 0x61,
        _a[21 /* Eà©² */] = 0x65,
        _a[25 /* Sà¨¸ */] = 0x73,
        _a[26 /* Hà¨¹ */] = 0x68,
        _a[27 /* Kà¨• */] = 0x6b,
        _a[28 /* Kà¨– */] = 0x4b,
        _a[29 /* Gà¨— */] = 0x67,
        _a[30 /* Gà¨˜ */] = 0x47,
        _a[31 /* Nà¨™ */] = 0xd5,
        _a[32 /* Cà¨š */] = 0x63,
        _a[33 /* Cà¨› */] = 0x43,
        _a[34 /* Jà¨œ */] = 0x6a,
        _a[35 /* Jà¨ */] = 0x4a,
        _a[36 /* Nà¨ž */] = 0xd6,
        _a[37 /* Tà¨Ÿ */] = 0x74,
        _a[38 /* Tà¨  */] = 0x54,
        _a[39 /* Dà¨¡ */] = 0x7a,
        _a[40 /* Dà¨¢ */] = 0x5a,
        _a[41 /* Nà¨£ */] = 0x78,
        _a[42 /* Tà¨¤ */] = 0x71,
        _a[43 /* Tà¨¥ */] = 0x51,
        _a[44 /* Dà¨¦ */] = 0x64,
        _a[45 /* Dà¨§ */] = 0x44,
        _a[46 /* Nà¨¨ */] = 0x6e,
        _a[47 /* Pà¨ª */] = 0x70,
        _a[48 /* Fà¨« */] = 0x50,
        _a[49 /* Bà¨¬ */] = 0x62,
        _a[50 /* Bà¨­ */] = 0x42,
        _a[51 /* Mà¨® */] = 0x6d,
        _a[52 /* Yà¨¯ */] = 0x58,
        _a[53 /* Rà¨° */] = 0x72,
        _a[54 /* Là¨² */] = 0x6c,
        _a[55 /* Và¨µ */] = 0x76,
        _a[56 /* Rà©œ */] = 0x56,
        _a[57 /* SPairiBindià¨¶ */] = 0xc8,
        _a[58 /* KPairiBindià©™ */] = 0xc9,
        _a[59 /* GPairiBindià©š */] = 0xca,
        _a[60 /* JPairiBindià©› */] = 0xcb,
        _a[61 /* FPairiBindià©ž */] = 0xcc,
        _a[62 /* LPairiBindià¨³ */] = 0xdc,
        _a[63 /* PairiBindi */] = 0xe6,
        _a[63 /* PairiBindi */] = 0xe6,
        _a[64 /* PairiBindi2 */] = 0x4c,
        _a[65 /* Dot */] = 0x5b,
        _a[66 /* PairiHaha */] = 0x48,
        _a[69 /* PairiRara */] = 0x52,
        _a[82 /* Tippi */] = 0x4d,
        _a[83 /* Tippi2 */] = 0x53,
        _a[85 /* Bindi */] = 0x4e,
        _a[90 /* AddakRight */] = 0x77,
        _a[91 /* AddakRight2 */] = 0x57,
        _a[92 /* AdakBindi */] = 0x0A01,
        _a[94 /* Kana */] = 0x66,
        _a[96 /* KanaBindi */] = 0x46,
        _a[97 /* Sihari */] = 0x69,
        _a[99 /* Bihari */] = 0x49,
        _a[103 /* Aunkar */] = 0x75,
        _a[106 /* Dulainkar */] = 0x55,
        _a[109 /* Lavan */] = 0x79,
        _a[111 /* Dulavan */] = 0x59,
        _a[113 /* Hora */] = 0x6f,
        _a[115 /* Kanaura */] = 0x4f,
        _a[118 /* Virama */] = 0xd9,
        _a[120 /* Danda */] = 0x2e,
        _a[122 /* Danda2 */] = 0x7c,
        _a[123 /* Danda3 */] = 0xbb,
        _a[124 /* DoubleDanda */] = 0x5d,
        _a[125 /* DoubleDanda2 */] = 0xab,
        _a[126 /* GZero */] = 0xfa,
        _a[127 /* GOne */] = 0xf1,
        _a[129 /* GTwo */] = 0xf2,
        _a[130 /* GThree */] = 0xf3,
        _a[131 /* GFour */] = 0xf4,
        _a[132 /* GFive */] = 0xf5,
        _a[133 /* GSix */] = 0xf6,
        _a[134 /* GSeven */] = 0xf7,
        _a[135 /* GEight */] = 0xf8,
        _a[136 /* GNine */] = 0xf9,
        _a[137 /* EnglishZero */] = 0x30,
        _a[138 /* EnglishOne */] = 0x31,
        _a[139 /* EnglishTwo */] = 0x32,
        _a[140 /* EnglishThree */] = 0x33,
        _a[141 /* EnglishFour */] = 0x34,
        _a[142 /* EnglishFive */] = 0x35,
        _a[143 /* EnglishSix */] = 0x36,
        _a[144 /* EnglishSeven */] = 0x37,
        _a[145 /* EnglishEight */] = 0x38,
        _a[146 /* EnglishNine */] = 0x39,
        _a[161 /* Colon */] = 0x3a,
        _a[162 /* ColonFancy */] = 0xda,
        _a[163 /* SemiColon */] = 0x3b,
        _a[168 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[170 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[172 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[173 /* DoubleQuoteCurlyRight */] = 0x201d,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));

var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.awazeMappings = (_a = {},
        //[Char.IkOnkarVersion1a]: 0x3c,
        //[Char.IkOnkarVersion1b]: 0x3e,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: 0xc6,
        _a[6 /* IkOnkarVersion3 */] = 0xf7,
        _a[9 /* Onkar1 */] = 0xd8,
        _a[10 /* Onkar2 */] = 0xa3,
        _a[11 /* Uà©³ */] = 0x75,
        //[Char.Uà¨‰]: 0x00,
        //[Char.Uà¨Š]: 0x00,
        _a[15 /* Oà¨“ */] = 0x6f,
        _a[17 /* Aà¨… */] = 0x61,
        //[Char.Aà¨†]: 0x00,
        //[Char.Aà¨]: 0x00,
        //[Char.Oà¨”]: 0x00,
        _a[21 /* Eà©² */] = 0x65,
        //[Char.Eà¨‡]: 0x00,
        //[Char.Eà¨ˆ]: 0x00,
        _a[24 /* Eà¨ */] = 0xb4,
        _a[25 /* Sà¨¸ */] = 0x73,
        _a[26 /* Hà¨¹ */] = 0x68,
        _a[27 /* Kà¨• */] = 0x63,
        _a[28 /* Kà¨– */] = 0x6b,
        _a[29 /* Gà¨— */] = 0x67,
        _a[30 /* Gà¨˜ */] = 0x47,
        _a[31 /* Nà¨™ */] = 0x4c,
        _a[32 /* Cà¨š */] = 0x43,
        _a[33 /* Cà¨› */] = 0x78,
        _a[34 /* Jà¨œ */] = 0x6a,
        _a[35 /* Jà¨ */] = 0x4a,
        _a[36 /* Nà¨ž */] = 0x4d,
        _a[37 /* Tà¨Ÿ */] = 0x74,
        _a[38 /* Tà¨  */] = 0x54,
        _a[39 /* Dà¨¡ */] = 0x44,
        _a[40 /* Dà¨¢ */] = 0x51,
        _a[41 /* Nà¨£ */] = 0x4e,
        _a[42 /* Tà¨¤ */] = 0x56,
        _a[43 /* Tà¨¥ */] = 0x57,
        _a[44 /* Dà¨¦ */] = 0x64,
        _a[45 /* Dà¨§ */] = 0x59,
        _a[46 /* Nà¨¨ */] = 0x6e,
        _a[47 /* Pà¨ª */] = 0x70,
        _a[48 /* Fà¨« */] = 0x66,
        _a[49 /* Bà¨¬ */] = 0x62,
        _a[50 /* Bà¨­ */] = 0x42,
        _a[51 /* Mà¨® */] = 0x6d,
        _a[52 /* Yà¨¯ */] = 0x79,
        _a[53 /* Rà¨° */] = 0x72,
        _a[54 /* Là¨² */] = 0x6c,
        _a[55 /* Và¨µ */] = 0x76,
        _a[56 /* Rà©œ */] = 0x52,
        _a[57 /* SPairiBindià¨¶ */] = 0x53,
        _a[58 /* KPairiBindià©™ */] = 0x4b,
        _a[59 /* GPairiBindià©š */] = 0x5a,
        _a[60 /* JPairiBindià©› */] = 0x7a,
        _a[61 /* FPairiBindià©ž */] = 0x46,
        //[Char.LPairiBindià¨³]: 0x4c,
        _a[63 /* PairiBindi */] = 0xe6,
        _a[65 /* Dot */] = 0x50,
        _a[66 /* PairiHaha */] = 0x48,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a[69 /* PairiRara */] = 0x71,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[72 /* PairiChacha */] = 0xe7,
        _a[73 /* PairiTenka */] = 0x2020,
        _a[74 /* PairiVava */] = 0x58,
        _a[76 /* PairiYaiya */] = 0xcf,
        _a[77 /* PairiTata */] = 0x153,
        _a[78 /* PairiNana */] = 0x2dc,
        _a[80 /* HalfYaiyaLeft */] = 0x77,
        _a[82 /* Tippi */] = 0x2a,
        _a[84 /* TippiRight */] = 0x5e,
        //[Char.Visagra]: 0x00,
        _a[89 /* AddakAbove */] = 0x26,
        _a[90 /* AddakRight */] = 0x25,
        //[Char.AddakRight2]: 0xa4,
        _a[92 /* AdakBindi */] = 0x0A01,
        _a[85 /* Bindi */] = 0x3a,
        _a[86 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[94 /* Kana */] = 0x41,
        _a[96 /* KanaBindi */] = 0x3b,
        _a[97 /* Sihari */] = 0x69,
        _a[99 /* Bihari */] = 0x49,
        _a[101 /* BihariBindi */] = 0x192,
        _a[103 /* Aunkar */] = 0x55,
        _a[104 /* Aunkar2 */] = 0xfc,
        _a[106 /* Dulainkar */] = 0x3c,
        //[Char.Dulainkar2]: 0xa8,
        _a[109 /* Lavan */] = 0x45,
        _a[111 /* Dulavan */] = 0x3e,
        _a[113 /* Hora */] = 0x7e,
        _a[115 /* Kanaura */] = 0x4f,
        _a[116 /* Kanaura2 */] = 0xf8,
        _a[118 /* Virama */] = 0x40,
        //[Char.Udaat]: 0x00,
        _a[120 /* Danda */] = 0x2e,
        _a[121 /* DandaLong */] = 0xa2,
        _a[124 /* DoubleDanda */] = 0x7c,
        //[Char.DoubleDanda2]: 0xd2,
        _a[126 /* GZero */] = 0x201a,
        _a[127 /* GOne */] = 0x2044,
        _a[129 /* GTwo */] = 0xa4,
        _a[130 /* GThree */] = 0x2039,
        _a[131 /* GFour */] = 0x203a,
        _a[132 /* GFive */] = 0xf001,
        _a[133 /* GSix */] = 0xf002,
        _a[134 /* GSeven */] = 0x2021,
        _a[135 /* GEight */] = 0xb0,
        //[Char.GNine]: 0xf9,
        _a[137 /* EnglishZero */] = 0x30,
        _a[138 /* EnglishOne */] = 0x31,
        _a[139 /* EnglishTwo */] = 0x32,
        _a[140 /* EnglishThree */] = 0x33,
        _a[141 /* EnglishFour */] = 0x34,
        _a[142 /* EnglishFive */] = 0x35,
        _a[143 /* EnglishSix */] = 0x36,
        _a[144 /* EnglishSeven */] = 0x37,
        _a[145 /* EnglishEight */] = 0x38,
        _a[146 /* EnglishNine */] = 0x39,
        _a[147 /* Nu */] = 0x2dc,
        _a[148 /* NanaDulainkar */] = 0xb6,
        _a[152 /* Khanda */] = 0x2da,
        _a[153 /* Khanda2 */] = 0x2202,
        //[Char.Divide]: 0x2039,
        _a[151 /* Multiply */] = 0xbf,
        _a[154 /* FlowerDesign1 */] = 0x152,
        //[Char.FlowerDesign2]: 0x201a,
        _a[156 /* FlowerDesign3 */] = 0x2030,
        _a[157 /* FlowerDesign4 */] = 0xd3,
        _a[158 /* FlowerDesign5 */] = 0xd4,
        _a[159 /* Diamond */] = 0x2022,
        _a[160 /* KThind */] = 0xff,
        _a[161 /* Colon */] = 0x5c,
        _a[163 /* SemiColon */] = 0xdf,
        _a[164 /* SemiColon2 */] = 0xab,
        _a[165 /* SemiColon3 */] = 0x2026,
        _a[166 /* Unknown1 */] = 0xb4,
        _a[167 /* TopRightExtention */] = 0xd8,
        _a[168 /* SingleQuoteCurlyLeft */] = 0x60,
        _a[169 /* SingleQuoteCurlyLeft2 */] = 0xa7,
        _a[170 /* SingleQuoteCurlyRight */] = 0x24,
        _a[171 /* SingleQuoteCurlyRight2 */] = 0xa1,
        _a[172 /* DoubleQuoteCurlyLeft */] = 0x2122,
        _a[173 /* DoubleQuoteCurlyRight */] = 0x23,
        _a[175 /* SquareBracketLeft */] = 0x5b,
        _a[176 /* SquareBracketLeft2 */] = 0x7b,
        _a[177 /* SquareBracketRight */] = 0x5d,
        _a[178 /* SquareBracketRight2 */] = 0x7d,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));

var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.satluj = (_a = {},
        _a[0 /* IkOnkarVersion1 */] = 0xfd,
        //[Char.IkOnkarVersion1b]: 0x3e,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: 0xc6,
        //[Char.IkOnkarVersion3]: 0xf7,
        //[Char.Onkar1]: 0xd8,
        //[Char.Onkar2]: 0xa3,
        _a[11 /* Uà©³ */] = 0xc0,
        //[Char.Uà¨‰]: 0x00,
        //[Char.Uà¨Š]: 0x00,
        _a[15 /* Oà¨“ */] = 0xfa,
        _a[17 /* Aà¨… */] = 0xc1,
        //[Char.Aà¨†]: 0x00,
        //[Char.Aà¨]: 0x00,
        //[Char.Oà¨”]: 0x00,
        _a[21 /* Eà©² */] = 0xc2,
        //[Char.Eà¨‡]: 0x00,
        //[Char.Eà¨ˆ]: 0x00,
        //[Char.Eà¨]: 0xb4,
        _a[25 /* Sà¨¸ */] = 0xc3,
        _a[26 /* Hà¨¹ */] = 0xd4,
        _a[27 /* Kà¨• */] = 0xd5,
        _a[28 /* Kà¨– */] = 0xd6,
        _a[29 /* Gà¨— */] = 0xd7,
        _a[30 /* Gà¨˜ */] = 0xd8,
        _a[31 /* Nà¨™ */] = 0xd9,
        _a[32 /* Cà¨š */] = 0xda,
        _a[33 /* Cà¨› */] = 0xdb,
        _a[34 /* Jà¨œ */] = 0xdc,
        _a[35 /* Jà¨ */] = 0xde,
        _a[36 /* Nà¨ž */] = 0xdf,
        _a[37 /* Tà¨Ÿ */] = 0xe0,
        _a[38 /* Tà¨  */] = 0xe1,
        _a[39 /* Dà¨¡ */] = 0xe2,
        _a[40 /* Dà¨¢ */] = 0xe3,
        _a[41 /* Nà¨£ */] = 0xe4,
        _a[42 /* Tà¨¤ */] = 0xe5,
        _a[43 /* Tà¨¥ */] = 0xe6,
        _a[44 /* Dà¨¦ */] = 0xe7,
        _a[45 /* Dà¨§ */] = 0xe8,
        _a[46 /* Nà¨¨ */] = 0xe9,
        _a[47 /* Pà¨ª */] = 0xea,
        _a[48 /* Fà¨« */] = 0xeb,
        _a[49 /* Bà¨¬ */] = 0xec,
        _a[50 /* Bà¨­ */] = 0xed,
        _a[51 /* Mà¨® */] = 0xee,
        _a[52 /* Yà¨¯ */] = 0xef,
        _a[53 /* Rà¨° */] = 0xf0,
        _a[54 /* Là¨² */] = 0xf1,
        _a[55 /* Và¨µ */] = 0xf2,
        _a[56 /* Rà©œ */] = 0xf3,
        _a[57 /* SPairiBindià¨¶ */] = 0xf4,
        _a[58 /* KPairiBindià©™ */] = 0xf5,
        _a[59 /* GPairiBindià©š */] = 0xf6,
        _a[60 /* JPairiBindià©› */] = 0xf7,
        _a[61 /* FPairiBindià©ž */] = 0xf8,
        _a[62 /* LPairiBindià¨³ */] = 0xff,
        //[Char.PairiBindi]: 0xe6,
        //[Char.Dot]: 0x50,
        //[Char.PairiHaha]: 0x48,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a[69 /* PairiRara */] = 0xcc,
        _a[70 /* PairiRaraLeft */] = 0x7a,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[72 /* PairiChacha */] = 0x7b,
        _a[73 /* PairiTenka */] = 0x7c,
        _a[74 /* PairiVava */] = 0xc9,
        //[Char.PairiYaiya]: 0xcf,
        _a[77 /* PairiTata */] = 0x7d,
        _a[78 /* PairiNana */] = 0xa5,
        //[Char.HalfYaiyaLeft]: 0x77,
        _a[81 /* TippiLeft */] = 0xa7,
        _a[82 /* Tippi */] = 0xbf,
        //[Char.TippiRight]: 0x5e,
        //[Char.Visagra]: 0x00,
        //[Char.AddakAbove]: 0x26,
        //[Char.AddakRight]: 0x25,
        //[Char.AddakRight2]: 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        _a[85 /* Bindi */] = 0xba,
        //[Char.Bindi2]: 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[94 /* Kana */] = 0xc5,
        _a[96 /* KanaBindi */] = 0xbb,
        _a[97 /* Sihari */] = 0xc7,
        _a[99 /* Bihari */] = 0xc6,
        _a[101 /* BihariBindi */] = 0xc4,
        //[Char.Aunkar]: 0x55,
        //[Char.Aunkar2]:0xfc,
        _a[106 /* Dulainkar */] = 0xb1,
        _a[107 /* Dulainkar2 */] = 0xc8,
        _a[109 /* Lavan */] = 0xb6,
        _a[111 /* Dulavan */] = 0xcb,
        //[Char.Hora]: 0x7e,
        _a[115 /* Kanaura */] = 0xcf,
        //[Char.Kanaura2]: 0xf8,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a[120 /* Danda */] = 0xa2,
        _a[122 /* Danda2 */] = 0xcd,
        //[Char.DandaLong]: 0xa2,
        _a[124 /* DoubleDanda */] = 0xa3,
        _a[125 /* DoubleDanda2 */] = 0xa8,
        _a[126 /* GZero */] = 0x30,
        _a[127 /* GOne */] = 0x31,
        _a[129 /* GTwo */] = 0x32,
        _a[130 /* GThree */] = 0x33,
        _a[131 /* GFour */] = 0x34,
        _a[132 /* GFive */] = 0x35,
        _a[133 /* GSix */] = 0x36,
        _a[134 /* GSeven */] = 0x37,
        _a[135 /* GEight */] = 0x38,
        _a[136 /* GNine */] = 0x39,
        _a[137 /* EnglishZero */] = 0x40,
        _a[138 /* EnglishOne */] = 0x41,
        _a[139 /* EnglishTwo */] = 0x42,
        _a[140 /* EnglishThree */] = 0x43,
        _a[141 /* EnglishFour */] = 0x44,
        _a[142 /* EnglishFive */] = 0x45,
        _a[143 /* EnglishSix */] = 0x46,
        _a[144 /* EnglishSeven */] = 0x47,
        _a[145 /* EnglishEight */] = 0x48,
        _a[146 /* EnglishNine */] = 0x49,
        _a[147 /* Nu */] = 0xf9,
        //[Char.NanaDulainkar] : 0xb6,
        //[Char.Khanda]: 0x2da,
        //[Char.Khanda2]: 0x2202,
        //[Char.Divide]: 0x2039,
        //[Char.Multiply]: 0xbf,
        //[Char.FlowerDesign1]: 0x152,
        //[Char.FlowerDesign2]: 0x201a,
        //[Char.FlowerDesign3]: 0x2030,
        //[Char.FlowerDesign4]: 0xd3,
        //[Char.FlowerDesign5]: 0xd4,
        //[Char.Diamond]:0x2022,
        //[Char.KThind] : 0xff,        
        _a[161 /* Colon */] = 0x3a,
        _a[163 /* SemiColon */] = 0x3b,
        //[Char.Unknown1]: 0xb4,
        _a[167 /* TopRightExtention */] = 0xce,
        _a[168 /* SingleQuoteCurlyLeft */] = 0xd2,
        //[Char.SingleQuoteCurlyLeft2]: 0xa7,
        _a[170 /* SingleQuoteCurlyRight */] = 0xd3,
        //[Char.SingleQuoteCurlyRight2]: 0xa1,
        //[Char.DoubleQuoteCurlyLeft]: 0x2122,
        //[Char.DoubleQuoteCurlyRight]: 0x23, 
        //[Char.SquareBracketLeft]: 0x5b,
        //[Char.SquareBracketLeft2]: 0x7b,
        //[Char.SquareBracketRight]: 0x5d,
        //[Char.SquareBracketRight2]: 0x7d,
        _a[179 /* KakaPairiRara */] = 0xb4,
        _a[13 /* Uà¨‰Bindi */] = 0xaa,
        _a[180 /* LalaDulainkar */] = 0xac,
        _a[181 /* LalaAunkar */] = 0xab,
        _a[182 /* LalaTippi */] = 0xa6,
        _a[183 /* Tà¨¥Aunkar */] = 0x00,
        _a[184 /* Cà¨šAunkar */] = 0x00,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));

var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.asees = (_a = {},
        _a[0 /* IkOnkarVersion1 */] = 0xc5,
        _a[1 /* IkOnkarVersion1a */] = 0x2039,
        //[Char.IkOnkarVersion1b]: 0x3e,
        _a[3 /* IkOnkarVersion2 */] = 0xc6,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: ,
        _a[6 /* IkOnkarVersion3 */] = 0xa1,
        _a[7 /* IkOnkarVersion4 */] = 0xe5,
        _a[8 /* IkOnkarVersion5 */] = 0x3e,
        //[Char.Onkar1]: 0xd8,
        //[Char.Onkar2]: 0xa3,
        _a[11 /* Uà©³ */] = 0x54,
        //[Char.Uà¨‰]: 0x00,
        //[Char.Uà¨Š]: 0x00,
        _a[15 /* Oà¨“ */] = 0x55,
        _a[17 /* Aà¨… */] = 0x6e,
        //[Char.Aà¨†]: 0x00,
        //[Char.Aà¨]: 0x00,
        //[Char.Oà¨”]: 0x00,
        _a[21 /* Eà©² */] = 0x4a,
        //[Char.Eà¨‡]: 0x00,
        //[Char.Eà¨ˆ]: 0x00,
        //[Char.Eà¨]: 0xb4,
        _a[25 /* Sà¨¸ */] = 0x3b,
        _a[26 /* Hà¨¹ */] = 0x6a,
        _a[27 /* Kà¨• */] = 0x65,
        _a[28 /* Kà¨– */] = 0x79,
        _a[29 /* Gà¨— */] = 0x72,
        _a[30 /* Gà¨˜ */] = 0x78,
        _a[31 /* Nà¨™ */] = 0x43,
        _a[32 /* Cà¨š */] = 0x75,
        _a[33 /* Cà¨› */] = 0x53,
        _a[34 /* Jà¨œ */] = 0x69,
        _a[35 /* Jà¨ */] = 0x4d,
        _a[36 /* Nà¨ž */] = 0x52,
        _a[37 /* Tà¨Ÿ */] = 0x4e,
        _a[38 /* Tà¨  */] = 0x6d,
        _a[39 /* Dà¨¡ */] = 0x76,
        _a[40 /* Dà¨¢ */] = 0x59,
        _a[41 /* Nà¨£ */] = 0x44,
        _a[42 /* Tà¨¤ */] = 0x73,
        _a[43 /* Tà¨¥ */] = 0x45,
        _a[44 /* Dà¨¦ */] = 0x64,
        _a[45 /* Dà¨§ */] = 0x58,
        _a[46 /* Nà¨¨ */] = 0x42,
        _a[47 /* Pà¨ª */] = 0x67,
        _a[48 /* Fà¨« */] = 0x63,
        _a[49 /* Bà¨¬ */] = 0x70,
        _a[50 /* Bà¨­ */] = 0x47,
        _a[51 /* Mà¨® */] = 0x77,
        _a[52 /* Yà¨¯ */] = 0x3a,
        _a[53 /* Rà¨° */] = 0x6f,
        _a[54 /* Là¨² */] = 0x62,
        _a[55 /* Và¨µ */] = 0x74,
        _a[56 /* Rà©œ */] = 0x56,
        _a[57 /* SPairiBindià¨¶ */] = 0x50,
        _a[58 /* KPairiBindià©™ */] = 0x5c,
        _a[59 /* GPairiBindià©š */] = 0x7d,
        _a[60 /* JPairiBindià©› */] = 0x49,
        _a[61 /* FPairiBindià©ž */] = 0x7c,
        _a[62 /* LPairiBindià¨³ */] = 0x2b,
        _a[63 /* PairiBindi */] = 0x61,
        _a[65 /* Dot */] = 0x48,
        _a[66 /* PairiHaha */] = 0x51,
        _a[68 /* PairiHahaDulainkar */] = 0xa7,
        _a[69 /* PairiRara */] = 0x71,
        _a[70 /* PairiRaraLeft */] = 0xae,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[72 /* PairiChacha */] = 0xe7,
        _a[73 /* PairiTenka */] = 0x2020,
        _a[74 /* PairiVava */] = 0x5f,
        _a[76 /* PairiYaiya */] = 0xcf,
        _a[77 /* PairiTata */] = 0x153,
        _a[78 /* PairiNana */] = 0x2dc,
        _a[79 /* HalfYaiyaRight */] = 0xce,
        //[Char.HalfYaiyaLeft]: 0x77,
        _a[82 /* Tippi */] = 0x7a,
        //[Char.TippiRight]: 0x5e,
        //[Char.Visagra]: 0x00,
        _a[89 /* AddakAbove */] = 0x5a,
        _a[90 /* AddakRight */] = 0x7e,
        _a[91 /* AddakRight2 */] = 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        _a[85 /* Bindi */] = 0x41,
        _a[86 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[94 /* Kana */] = 0x6b,
        _a[96 /* KanaBindi */] = 0x4b,
        _a[97 /* Sihari */] = 0x66,
        _a[99 /* Bihari */] = 0x68,
        //[Char.BihariBindi]: 0x192,
        _a[103 /* Aunkar */] = 0x5b,
        //[Char.Aunkar2]:0xfc,
        _a[106 /* Dulainkar */] = 0x7b,
        _a[107 /* Dulainkar2 */] = 0xa8,
        _a[109 /* Lavan */] = 0x2f,
        _a[111 /* Dulavan */] = 0x3f,
        _a[113 /* Hora */] = 0x27,
        _a[115 /* Kanaura */] = 0x22,
        //[Char.Kanaura2]: 0xf8,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a[120 /* Danda */] = 0x2e,
        //[Char.DandaLong]: 0xa2,
        _a[124 /* DoubleDanda */] = 0x5d,
        _a[125 /* DoubleDanda2 */] = 0xd2,
        _a[126 /* GZero */] = 0xfa,
        _a[127 /* GOne */] = 0xf1,
        _a[129 /* GTwo */] = 0xf2,
        _a[130 /* GThree */] = 0xf3,
        _a[131 /* GFour */] = 0xf4,
        _a[132 /* GFive */] = 0xf5,
        _a[133 /* GSix */] = 0xf6,
        _a[134 /* GSeven */] = 0xf7,
        _a[135 /* GEight */] = 0xf8,
        _a[136 /* GNine */] = 0xf9,
        _a[137 /* EnglishZero */] = 0x30,
        _a[138 /* EnglishOne */] = 0x31,
        _a[139 /* EnglishTwo */] = 0x32,
        _a[140 /* EnglishThree */] = 0x33,
        _a[141 /* EnglishFour */] = 0x34,
        _a[142 /* EnglishFive */] = 0x35,
        _a[143 /* EnglishSix */] = 0x36,
        _a[144 /* EnglishSeven */] = 0x37,
        _a[145 /* EnglishEight */] = 0x38,
        _a[146 /* EnglishNine */] = 0x39,
        _a[147 /* Nu */] = 0x192,
        //[Char.NanaDulainkar] : 0xb6,
        _a[149 /* RaraAunkar */] = 0x57,
        _a[152 /* Khanda */] = 0xc7,
        //[Char.Khanda2]: 0x2202,
        //[Char.Divide]: 0x2039,
        _a[151 /* Multiply */] = 0x25,
        _a[154 /* FlowerDesign1 */] = 0x152,
        _a[155 /* FlowerDesign2 */] = 0x201a,
        _a[156 /* FlowerDesign3 */] = 0x2030,
        _a[157 /* FlowerDesign4 */] = 0xd3,
        _a[158 /* FlowerDesign5 */] = 0xd4,
        //[Char.Diamond]:0x2022,
        _a[160 /* KThind */] = 0xff,
        _a[161 /* Colon */] = 0x4c,
        _a[162 /* ColonFancy */] = 0xda,
        _a[163 /* SemiColon */] = 0x6c,
        //[Char.Unknown1]: 0xb4,
        _a[167 /* TopRightExtention */] = 0x46,
        _a[168 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[170 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[172 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[173 /* DoubleQuoteCurlyRight */] = 0x201d,
        _a[174 /* DoubleQuoteCurlyRight2 */] = 0x40,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));

var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.joy = (_a = {},
        _a[0 /* IkOnkarVersion1 */] = 0x2dd,
        //[Char.IkOnkarVersion1b]: 0x3e,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: 0xc6,
        //[Char.IkOnkarVersion3]: 0xf7,
        //[Char.Onkar1]: 0xd8,
        //[Char.Onkar2]: 0xa3,
        _a[11 /* Uà©³ */] = 0x54,
        //[Char.Uà¨‰]: 0x00,
        //[Char.Uà¨Š]: 0x00,
        _a[15 /* Oà¨“ */] = 0x55,
        _a[16 /* Oà¨“2 */] = 0x2d9,
        _a[17 /* Aà¨… */] = 0x6e,
        //[Char.Aà¨†]: 0x00,
        //[Char.Aà¨]: 0x00,
        //[Char.Oà¨”]: 0x00,
        _a[21 /* Eà©² */] = 0x4a,
        //[Char.Eà¨‡]: 0x00,
        //[Char.Eà¨ˆ]: 0x00,
        //[Char.Eà¨]: 0xb4,
        _a[25 /* Sà¨¸ */] = 0x3b,
        _a[26 /* Hà¨¹ */] = 0x6a,
        _a[27 /* Kà¨• */] = 0x65,
        _a[28 /* Kà¨– */] = 0x79,
        _a[29 /* Gà¨— */] = 0x72,
        _a[30 /* Gà¨˜ */] = 0x78,
        _a[31 /* Nà¨™ */] = 0x43,
        _a[32 /* Cà¨š */] = 0x75,
        _a[33 /* Cà¨› */] = 0x53,
        _a[34 /* Jà¨œ */] = 0x69,
        _a[35 /* Jà¨ */] = 0x4d,
        _a[36 /* Nà¨ž */] = 0x52,
        _a[37 /* Tà¨Ÿ */] = 0x4e,
        _a[38 /* Tà¨  */] = 0x6d,
        _a[39 /* Dà¨¡ */] = 0x76,
        _a[40 /* Dà¨¢ */] = 0x59,
        _a[41 /* Nà¨£ */] = 0x44,
        _a[42 /* Tà¨¤ */] = 0x73,
        _a[43 /* Tà¨¥ */] = 0x45,
        _a[44 /* Dà¨¦ */] = 0x64,
        _a[45 /* Dà¨§ */] = 0x58,
        _a[46 /* Nà¨¨ */] = 0x42,
        _a[47 /* Pà¨ª */] = 0x67,
        _a[48 /* Fà¨« */] = 0x63,
        _a[49 /* Bà¨¬ */] = 0x70,
        _a[50 /* Bà¨­ */] = 0x47,
        _a[51 /* Mà¨® */] = 0x77,
        _a[52 /* Yà¨¯ */] = 0x3a,
        _a[53 /* Rà¨° */] = 0x6f,
        _a[54 /* Là¨² */] = 0x62,
        _a[55 /* Và¨µ */] = 0x74,
        _a[56 /* Rà©œ */] = 0x56,
        _a[57 /* SPairiBindià¨¶ */] = 0xd9,
        _a[58 /* KPairiBindià©™ */] = 0x131,
        _a[59 /* GPairiBindià©š */] = 0x2c6,
        _a[60 /* JPairiBindià©› */] = 0x2dc,
        _a[61 /* FPairiBindià©ž */] = 0xaf,
        _a[62 /* LPairiBindià¨³ */] = 0x2c7,
        //[Char.PairiBindi]: 0xe6,
        //[Char.Dot]: 0x50,
        _a[66 /* PairiHaha */] = 0x51,
        _a[67 /* PairiHaha2 */] = 0x2211,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a[69 /* PairiRara */] = 0xc3,
        _a[70 /* PairiRaraLeft */] = 0x71,
        //[Char.PairiRaraPairiBindi]: 0x71,
        //[Char.PairiChacha]: 0x7b,
        //[Char.PairiTenka]: 0x7c,
        _a[74 /* PairiVava */] = 0x60,
        _a[75 /* PairiVava2 */] = 0x2026,
        //[Char.PairiYaiya]: 0xcf,
        _a[79 /* HalfYaiyaRight */] = 0x203a,
        //[Char.PairiTata]: 0x7d,
        //[Char.PairiNana]: 0xa5,
        //[Char.HalfYaiyaLeft]: 0x77,
        //[Char.TippiLeft]: 0xa7,
        _a[82 /* Tippi */] = 0x7a,
        _a[83 /* Tippi2 */] = 0xf8,
        _a[84 /* TippiRight */] = 0x2265,
        //[Char.Visagra]: 0x00,
        _a[88 /* AddakLeft */] = 0xe6,
        _a[89 /* AddakAbove */] = 0xba,
        _a[90 /* AddakRight */] = 0xb5,
        //[Char.AddakRight2]: 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        _a[85 /* Bindi */] = 0x222b,
        _a[86 /* Bindi2 */] = 0x41,
        //[Char.Yakash]: 0x00,
        _a[94 /* Kana */] = 0x6b,
        _a[95 /* Kana2 */] = 0x2248,
        _a[96 /* KanaBindi */] = 0xaa,
        _a[97 /* Sihari */] = 0x66,
        _a[98 /* Sihari2 */] = 0xab,
        _a[99 /* Bihari */] = 0x68,
        _a[100 /* Bihari2 */] = 0x2206,
        _a[101 /* BihariBindi */] = 0x5d,
        _a[102 /* BihariBindi2 */] = 0x192,
        _a[103 /* Aunkar */] = 0x5b,
        _a[104 /* Aunkar2 */] = 0x221e,
        _a[105 /* Aunkar3 */] = 0x3c0,
        _a[106 /* Dulainkar */] = 0x7b,
        _a[107 /* Dulainkar2 */] = 0xb1,
        _a[108 /* Dulainkar3 */] = 0xbb,
        _a[109 /* Lavan */] = 0x2f,
        _a[110 /* Lavan2 */] = 0x2202,
        _a[111 /* Dulavan */] = 0x3f,
        _a[112 /* Dulavan2 */] = 0x2b,
        _a[113 /* Hora */] = 0xd8,
        _a[114 /* Hora2 */] = 0x27,
        _a[115 /* Kanaura */] = 0x22,
        _a[116 /* Kanaura2 */] = 0x2126,
        _a[117 /* KanauraRight */] = 0x153,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a[120 /* Danda */] = 0xd5,
        _a[122 /* Danda2 */] = 0x2e,
        //[Char.DandaLong]: 0xa2,
        //[Char.DoubleDanda]: 0xa3,
        //[Char.DoubleDanda2]: 0xa8,
        _a[126 /* GZero */] = 0xa0,
        _a[127 /* GOne */] = 0xa1,
        _a[128 /* GOne1 */] = 0x49,
        _a[129 /* GTwo */] = 0xa2,
        _a[130 /* GThree */] = 0xa3,
        _a[131 /* GFour */] = 0xa4,
        //[Char.GFive]: 0x35,
        _a[133 /* GSix */] = 0xa6,
        _a[134 /* GSeven */] = 0xa7,
        //[Char.GEight]: 0x38,
        _a[136 /* GNine */] = 0xa9,
        _a[137 /* EnglishZero */] = 0x30,
        _a[138 /* EnglishOne */] = 0x31,
        _a[139 /* EnglishTwo */] = 0x32,
        _a[140 /* EnglishThree */] = 0x33,
        _a[141 /* EnglishFour */] = 0x34,
        _a[142 /* EnglishFive */] = 0x35,
        _a[143 /* EnglishSix */] = 0x36,
        _a[144 /* EnglishSeven */] = 0x37,
        _a[145 /* EnglishEight */] = 0x38,
        _a[146 /* EnglishNine */] = 0x39,
        _a[147 /* Nu */] = 0x2d8,
        //[Char.NanaDulainkar] : 0xb6,
        //[Char.Khanda]: 0x2da,
        //[Char.Khanda2]: 0x2202,
        //[Char.Divide]: 0x2039,
        //[Char.Multiply]: 0xbf,
        //[Char.FlowerDesign1]: 0x152,
        //[Char.FlowerDesign2]: 0x201a,
        //[Char.FlowerDesign3]: 0x2030,
        //[Char.FlowerDesign4]: 0xd3,
        //[Char.FlowerDesign5]: 0xd4,
        //[Char.Diamond]:0x2022,
        //[Char.KThind] : 0xff,        
        //[Char.Colon]: 0x3a,
        _a[163 /* SemiColon */] = 0x6c,
        //[Char.Unknown1]: 0xb4,
        _a[167 /* TopRightExtention */] = 0x152,
        _a[168 /* SingleQuoteCurlyLeft */] = 0x201c,
        //[Char.SingleQuoteCurlyLeft2]: 0xa7,
        _a[170 /* SingleQuoteCurlyRight */] = 0x201d,
        //[Char.SingleQuoteCurlyRight2]: 0xa1,
        _a[172 /* DoubleQuoteCurlyLeft */] = 0x161,
        _a[173 /* DoubleQuoteCurlyRight */] = 0x40,
        //[Char.SquareBracketLeft]: 0x5b,
        //[Char.SquareBracketLeft2]: 0x7b,
        //[Char.SquareBracketRight]: 0x5d,
        //[Char.SquareBracketRight2]: 0x7d,
        _a[179 /* KakaPairiRara */] = 0xa5,
        _a[13 /* Uà¨‰Bindi */] = 0x2122,
        _a[180 /* LalaDulainkar */] = 0xa8,
        _a[181 /* LalaAunkar */] = 0xb4,
        //[Char.LalaTippi]: 0xa6,
        //[Char.Tà¨¥Aunkar]: 0x00,
        //[Char.Cà¨šAunkar]: 0x00,
        _a[185 /* Hai */] = 0x57,
        _a[186 /* Hai2 */] = 0x2db,
        _a[183 /* Tà¨¥Aunkar */] = 0x2da,
        _a[184 /* Cà¨šAunkar */] = 0xb8,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));

var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.gurbaniLipi = (_a = {},
        _a[126 /* GZero */] = 0x30,
        _a[127 /* GOne */] = 0x31,
        _a[129 /* GTwo */] = 0x32,
        _a[130 /* GThree */] = 0x33,
        _a[131 /* GFour */] = 0x34,
        _a[132 /* GFive */] = 0x35,
        _a[133 /* GSix */] = 0x36,
        _a[134 /* GSeven */] = 0x37,
        _a[135 /* GEight */] = 0x38,
        _a[136 /* GNine */] = 0x39,
        _a[137 /* EnglishZero */] = 0x30,
        _a[138 /* EnglishOne */] = 0x31,
        _a[139 /* EnglishTwo */] = 0x32,
        _a[140 /* EnglishThree */] = 0x33,
        _a[141 /* EnglishFour */] = 0x34,
        _a[142 /* EnglishFive */] = 0x35,
        _a[143 /* EnglishSix */] = 0x36,
        _a[144 /* EnglishSeven */] = 0x37,
        _a[145 /* EnglishEight */] = 0x38,
        _a[146 /* EnglishNine */] = 0x39,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));

///<reference path="../convertor/convertor" />
///<reference path="./charEnum" />
///<reference path="./mappings/anmolFontMappings" />
///<reference path="./mappings/unicodeFontMappings" />
///<reference path="./mappings/drChatrikFontMappings" />
///<reference path="./mappings/awazeFont" />
///<reference path="./mappings/satluj" />
///<reference path="./mappings/asees" />
///<reference path="./mappings/joy" />
///<reference path="./mappings/gurbaniLipi" />


var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    var moveAcrossChaSet = [
        [[66 /* PairiHaha */], [67 /* PairiHaha2 */], [118 /* Virama */, 26 /* Hà¨¹ */]],
        [[69 /* PairiRara */], [70 /* PairiRaraLeft */], [118 /* Virama */, 53 /* Rà¨° */]],
        [[72 /* PairiChacha */], [118 /* Virama */, 32 /* Cà¨š */]],
        [[73 /* PairiTenka */], [118 /* Virama */, 37 /* Tà¨Ÿ */]],
        [[74 /* PairiVava */], [75 /* PairiVava2 */], [118 /* Virama */, 55 /* Và¨µ */]],
        [[76 /* PairiYaiya */], [118 /* Virama */, 52 /* Yà¨¯ */, 118 /* Virama */, 52 /* Yà¨¯ */]],
        [[77 /* PairiTata */], [118 /* Virama */, 42 /* Tà¨¤ */]],
        [[78 /* PairiNana */], [118 /* Virama */, 46 /* Nà¨¨ */]],
        [[71 /* PairiRaraPairiBindi */], [69 /* PairiRara */, 63 /* PairiBindi */],
            [69 /* PairiRara */, 64 /* PairiBindi2 */], [63 /* PairiBindi */, 118 /* Virama */, 53 /* Rà¨° */], [64 /* PairiBindi2 */, 118 /* Virama */, 53 /* Rà¨° */]],
    ];
    var ikOnkarVersion1 = [[0 /* IkOnkarVersion1 */], [1 /* IkOnkarVersion1a */, 2 /* IkOnkarVersion1b */], [1 /* IkOnkarVersion1a */], [127 /* GOne */, 9 /* Onkar1 */]];
    var ikOnkarVersion2 = [[3 /* IkOnkarVersion2 */], [4 /* IkOnkarVersion2a */, 5 /* IkOnkarVersion2b */], [4 /* IkOnkarVersion2a */], [127 /* GOne */, 10 /* Onkar2 */]];
    var ikOnkarVersion3 = [[6 /* IkOnkarVersion3 */]];
    var compositions = moveAcrossChaSet.concat([
        ikOnkarVersion1,
        ikOnkarVersion2,
        ikOnkarVersion3,
        ikOnkarVersion1.concat(ikOnkarVersion2, ikOnkarVersion3, [[7 /* IkOnkarVersion4 */], [8 /* IkOnkarVersion5 */]]),
        [[127 /* GOne */], [128 /* GOne1 */]],
        [[85 /* Bindi */], [86 /* Bindi2 */]],
        [[99 /* Bihari */], [100 /* Bihari2 */]],
        [[97 /* Sihari */], [98 /* Sihari2 */]],
        [[109 /* Lavan */], [110 /* Lavan2 */]],
        [[111 /* Dulavan */], [112 /* Dulavan2 */]],
        [[94 /* Kana */], [95 /* Kana2 */]],
        [[79 /* HalfYaiyaRight */], [118 /* Virama */, 52 /* Yà¨¯ */]],
        [[92 /* AdakBindi */], [90 /* AddakRight */, 85 /* Bindi */]],
        [[18 /* Aà¨† */], [17 /* Aà¨… */, 94 /* Kana */]],
        [[18 /* Aà¨† */, 85 /* Bindi */], [17 /* Aà¨… */, 96 /* KanaBindi */]],
        [[22 /* Eà¨‡ */], [97 /* Sihari */, 21 /* Eà©² */], [98 /* Sihari2 */, 21 /* Eà©² */]],
        [[23 /* Eà¨ˆ */], [21 /* Eà©² */, 99 /* Bihari */]],
        [[12 /* Uà¨‰ */], [11 /* Uà©³ */, 103 /* Aunkar */]],
        [[14 /* Uà¨Š */], [11 /* Uà©³ */, 106 /* Dulainkar */]],
        [[15 /* Oà¨“ */], [16 /* Oà¨“2 */]],
        [[15 /* Oà¨“ */], [16 /* Oà¨“2 */], [9 /* Onkar1 */], [10 /* Onkar2 */]],
        [[24 /* Eà¨ */], [21 /* Eà©² */, 109 /* Lavan */], [21 /* Eà©² */, 110 /* Lavan2 */]],
        [[19 /* Aà¨ */], [17 /* Aà¨… */, 111 /* Dulavan */], [17 /* Aà¨… */, 112 /* Dulavan2 */]],
        [[20 /* Oà¨” */], [17 /* Aà¨… */, 117 /* KanauraRight */], [17 /* Aà¨… */, 115 /* Kanaura */]],
        [[62 /* LPairiBindià¨³ */], [54 /* Là¨² */, 63 /* PairiBindi */]],
        [[57 /* SPairiBindià¨¶ */], [25 /* Sà¨¸ */, 63 /* PairiBindi */]],
        [[58 /* KPairiBindià©™ */], [28 /* Kà¨– */, 63 /* PairiBindi */]],
        [[59 /* GPairiBindià©š */], [29 /* Gà¨— */, 63 /* PairiBindi */]],
        [[60 /* JPairiBindià©› */], [34 /* Jà¨œ */, 63 /* PairiBindi */]],
        [[61 /* FPairiBindià©ž */], [48 /* Fà¨« */, 63 /* PairiBindi */]],
        [[124 /* DoubleDanda */], [120 /* Danda */, 120 /* Danda */], [125 /* DoubleDanda2 */]],
        [[106 /* Dulainkar */], [107 /* Dulainkar2 */], [108 /* Dulainkar3 */]],
        [[103 /* Aunkar */], [104 /* Aunkar2 */], [105 /* Aunkar3 */]],
        [[120 /* Danda */], [122 /* Danda2 */], [123 /* Danda3 */], [121 /* DandaLong */]],
        [[96 /* KanaBindi */], [94 /* Kana */, 85 /* Bindi */]],
        [[90 /* AddakRight */], [91 /* AddakRight2 */]],
        [[89 /* AddakAbove */], [90 /* AddakRight */], [91 /* AddakRight2 */], [88 /* AddakLeft */]],
        [[0 /* IkOnkarVersion1 */], [1 /* IkOnkarVersion1a */, 2 /* IkOnkarVersion1b */], [1 /* IkOnkarVersion1a */]],
        [[63 /* PairiBindi */], [64 /* PairiBindi2 */]],
        [[82 /* Tippi */], [83 /* Tippi2 */], [84 /* TippiRight */], [81 /* TippiLeft */]],
        [[147 /* Nu */], [46 /* Nà¨¨ */, 106 /* Dulainkar */, 82 /* Tippi */], [46 /* Nà¨¨ */, 82 /* Tippi */, 106 /* Dulainkar */], [148 /* NanaDulainkar */, 82 /* Tippi */]],
        [[148 /* NanaDulainkar */], [46 /* Nà¨¨ */, 106 /* Dulainkar */]],
        [[154 /* FlowerDesign1 */], [155 /* FlowerDesign2 */], [156 /* FlowerDesign3 */], [157 /* FlowerDesign4 */], [158 /* FlowerDesign5 */]],
        [[68 /* PairiHahaDulainkar */], [118 /* Virama */, 26 /* Hà¨¹ */, 106 /* Dulainkar */]],
        [[101 /* BihariBindi */], [102 /* BihariBindi2 */], [99 /* Bihari */, 85 /* Bindi */], [100 /* Bihari2 */, 85 /* Bindi */]],
        [[113 /* Hora */], [114 /* Hora2 */]],
        [[115 /* Kanaura */], [116 /* Kanaura2 */], [117 /* KanauraRight */]],
        [[168 /* SingleQuoteCurlyLeft */], [169 /* SingleQuoteCurlyLeft2 */]],
        [[170 /* SingleQuoteCurlyRight */], [171 /* SingleQuoteCurlyRight2 */]],
        [[173 /* DoubleQuoteCurlyRight */], [174 /* DoubleQuoteCurlyRight2 */]],
        [[152 /* Khanda */], [153 /* Khanda2 */]],
        [[161 /* Colon */], [162 /* ColonFancy */]],
        [[163 /* SemiColon */], [164 /* SemiColon2 */], [165 /* SemiColon3 */]],
        [[149 /* RaraAunkar */], [53 /* Rà¨° */, 103 /* Aunkar */], [53 /* Rà¨° */, 104 /* Aunkar2 */]],
        [[179 /* KakaPairiRara */], [27 /* Kà¨• */, 69 /* PairiRara */], [27 /* Kà¨• */, 118 /* Virama */, 53 /* Rà¨° */]],
        [[12 /* Uà¨‰ */], [11 /* Uà©³ */, 103 /* Aunkar */]],
        [[180 /* LalaDulainkar */], [54 /* Là¨² */, 106 /* Dulainkar */], [54 /* Là¨² */, 107 /* Dulainkar2 */]],
        [[181 /* LalaAunkar */], [54 /* Là¨² */, 103 /* Aunkar */], [54 /* Là¨² */, 104 /* Aunkar2 */]],
        [[182 /* LalaTippi */], [54 /* Là¨² */, 82 /* Tippi */], [83 /* Tippi2 */]],
        [[183 /* Tà¨¥Aunkar */], [43 /* Tà¨¥ */, 103 /* Aunkar */], [43 /* Tà¨¥ */, 104 /* Aunkar2 */]],
        [[184 /* Cà¨šAunkar */], [32 /* Cà¨š */, 103 /* Aunkar */], [32 /* Cà¨š */, 104 /* Aunkar2 */]],
        [[185 /* Hai */], [186 /* Hai2 */], [26 /* Hà¨¹ */, 111 /* Dulavan */]],
        [[13 /* Uà¨‰Bindi */], [12 /* Uà¨‰ */, 85 /* Bindi */], [11 /* Uà©³ */, 103 /* Aunkar */, 85 /* Bindi */]],
    ]);
    var fontConvertorConfigs = {
        "Arial Unicode MS": {
            moveRightCharacters: [97 /* Sihari */],
            characterCodes: makeArray(PunjabiFontConvertor.unicodeMapping)
        },
        "AnmolUni": {
            moveRightCharacters: [97 /* Sihari */],
            characterCodes: makeArray(PunjabiFontConvertor.unicodeMapping)
        },
        "AnmolLipi": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.anmolMapping)
        },
        "DrChatrikWeb": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.drChatrikMappings)
        },
        "Awaze": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.awazeMappings)
        },
        "Satluj": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.satluj)
        },
        "Asees": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.asees)
        },
        "Joy": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.joy)
        },
        "GurbaniLipi": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.anmolMapping, PunjabiFontConvertor.gurbaniLipi)
        },
        "GurmukhiLys020": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.anmolMapping)
        }
    };
    function convert(str, toFontName, fromFontName) {
        var to = fontConvertorConfigs[toFontName];
        var from = fontConvertorConfigs[fromFontName];
        var mapperConfig = Convertor.getMapper(to, from, compositions, moveAcrossChaSet);
		/*Test example*/
        /*mapperConfig.mapper["ੵ"] = "m";gursewak*/
		/*mapperConfig.mapper["ਃ"] = "G";*/
		/*mapperConfig.mapper["ੑ"] = "n";gursewak*/
		/*mapperConfig.mapper["x"] = "w";gursewak*/
        /*Unicode Starts*/
        mapperConfig.mapper["ੵ"] = "}";
        mapperConfig.mapper["ਃ"] = ":"; 
        mapperConfig.mapper["ੑ"] = "@";
        mapperConfig.mapper["੶"] = ".";


        /*Pending Anmol lippi GurbaniAkhar.ttf Mapping to ASCII*/
        mapperConfig.mapper["´"] = "}"; // pair adha yaya  (like mirrored haha),
        mapperConfig.mapper["µ"] = "M"; // Tippi
        mapperConfig.mapper["Å"] = "<"; // IkOnkarLeftpart
        mapperConfig.mapper["Æ"] = ">"; // IkOnkarRightpart
        mapperConfig.mapper["ƒ"] = "`"; // Full Nuu

        mapperConfig.mapper["†"] = ";"; // pair tenka
        mapperConfig.mapper["ˆ"] = "N"; // bindi
        mapperConfig.mapper["’"] = ")"; // single gurbani quote to bracket
        mapperConfig.mapper["‘"] = "("; // single quote to brackt
        mapperConfig.mapper["˜"] = "*"; // pair nanna
        mapperConfig.mapper["ˆ"] = "="; // upper left bindi
        mapperConfig.mapper["œ"] = "_"; // pair ttatta
        mapperConfig.mapper["ç"] = "+"; // pair chacha
        mapperConfig.mapper["æ"] = "%"; // pair lower left bindi
        mapperConfig.mapper["Ú"] = ":"; // double circle like colon (lite haha sound) 
        mapperConfig.mapper["Ø"] = "/"; // upper extension little line for bindi tippi in sttm
        mapperConfig.mapper["Ò"] = "]"; // do dandiya
        mapperConfig.mapper["Ï"] = "#"; // pair yaya full roop without upper closing line (not having in sttm) check unicode too before adding,
        mapperConfig.mapper["Î"] = "'"; // half big yaya add new (having in sttm)
        mapperConfig.mapper["Í"] = "!"; // pair vava
        mapperConfig.mapper["Æ"] = ">"; // IkOnkarRight part
        mapperConfig.mapper["Å"] = "<"; // left part
        mapperConfig.mapper["·"] = "."; // centre dot mapped with full stop
        mapperConfig.mapper["®"] = "R"; // pair rara
        mapperConfig.mapper["°"] = "N"; // circular big hollow bindi mapped with solid bindi
        mapperConfig.mapper["§"] = "$"; //  pair haha with dulainkar
        mapperConfig.mapper["¤"] = "~"; // adhakk
        mapperConfig.mapper["¡"] = "<>"; // full ekOnkar 
        mapperConfig.mapper["¨"] = "-"; // dulainker in extended ascii for under pair rara
        mapperConfig.mapper["ü"] = "{"; // aunker in extended ascii for under pair rara gives us \" for escape sequence 
        mapperConfig.mapper["`"] = "~"; 
        mapperConfig.mapper["î"] = "'"; 
        mapperConfig.mapper["Ñ"] = "o";  // extend hora not in sttm search but in sttm keypad 

        mapperConfig.mapper["ù"] = "9";  // extend 9 not in sttm search but in sttm keypad 
        mapperConfig.mapper["ø"] = "8";  // extend hora not in sttm search but in sttm keypad ù
        mapperConfig.mapper["÷"] = "7";  // extend hora not in sttm search but in sttm keypad ù
        mapperConfig.mapper["ö"] = "6";  // extend hora not in sttm search but in sttm keypad ù
        mapperConfig.mapper["õ"] = "5";  // extend hora not in sttm search but in sttm keypad ù
        mapperConfig.mapper["ô"] = "4";  // extend hora not in sttm search but in sttm keypad ù
        mapperConfig.mapper["ó"] = "3";  // extend hora not in sttm search but in sttm keypad ù
        mapperConfig.mapper["ò"] = "2";  // extend hora not in sttm search but in sttm keypad ù
        mapperConfig.mapper["ñ"] = "1";  // extend hora not in sttm search but in sttm keypad ù
        mapperConfig.mapper["ú"] = "0";  // extend hora not in sttm search but in sttm keypad ù å
        mapperConfig.mapper["å"] = ">";  //extended onkar right portion 
        mapperConfig.mapper["-"] = " ";  // to avoid printing of other character at - Anl-h¤k Az lib mnsUr 
        mapperConfig.mapper["”"] = "\\\"";  // extended quote
        mapperConfig.mapper["“"] = "\\\"";  // extended quote 



        
        






        
        


		
		console.log("b",mapperConfig);
        return Convertor.convertStringUsingMapper(mapperConfig, str);
    }
    PunjabiFontConvertor.convert = convert;
    function makeArray() {
        var configs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            configs[_i - 0] = arguments[_i];
        }
        var c = [];
        for (var _a = 0, configs_1 = configs; _a < configs_1.length; _a++) {
            var a = configs_1[_a];
            for (var x in a) {
                if (a.hasOwnProperty(x)) {
                    c[x] = a[x];
                }
            }
        }
        return c;
    }
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));