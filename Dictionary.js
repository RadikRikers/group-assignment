class Dictionary {

    static rules = {
        'MB': 'С',
        'CM': 'с',
        'HD': 'м',
        'EM': 'е',
        'HC': 'р',
        'OE': 'ш',
        'DC': '1',
        'BM': '',
        'AA': ' ',

        'ON': 'к',
        'IO': 'и',
        'GN': '.',
        'GF':'т',
        'PD': 'л',
        'DD': 'г',
        'AL': '8',
        'BE': 'я',
        'IK': 'о',
        'HC': 'р',
        'KB': '4',
        'AF': 'з',
        'OO': 'у',
        'AN': 'а',
        'HD': 'м',
        'HH': 'п',
        'OE': 'ш',
        'JA': 'н',
        'CP': 'ц',
        'FH': 'в',
        'EI': 'й',
        'NF': 'ь',
        'NB': 'ж',
        'NO': 'д',
        'PJ': 'ю',
        'CK': 'ч',
        'KC': 'х',
        'KJ': 'К',
        'HF': 'Н',
        'HN': 'Б',
        'PG': 'А',
        'EO': 'В',
        'JE': ',',
        'KK': 'б',
        'GH': '7',
        'MB': 'С',
        'MF': 'ы',
        'JD': 'Р',
        'LJ': 'Ч',
        'CC': 'ф',
        'JF': 'Э',
        'FC': 'Ш',
        'LA': 'П',
        'HI': 'э',
        'BF': '6',
        'EG': '-',
        'FO': '9',
        'GA': '3',
        'PH': '5',
        'MK': 'Ю',
        'KO': 'О',
        'FP': 'Т',
        'DH': 'Д',
        'ED': 'щ',
        'AJ': '0',
        'IC': 'Г',
        'HA': 'У',
        'OP': '2',
        'MH': '-',
        'CF': '(',
        'HM': ')',
    }

    static getDecryptedTable() {
        const alphabet = Array.from(
            new Set(
                Object.keys(this.rules).map(encryptedPair => encryptedPair[0]).sort()
            )
        );
        const decryptedTable = [['--']];
        decryptedTable[0].push(...alphabet);


        alphabet.forEach((letter, i) => {
            decryptedTable.push(new Array(alphabet.length + 1).fill("~"));
            decryptedTable[i + 1][0] = letter;
        })


        const decryptedLetters = Object.values(this.rules);
        Object.keys(this.rules).forEach((encryptedPair, k) => {
            const i = alphabet.indexOf(encryptedPair[0]) + 1;
            const j = alphabet.indexOf(encryptedPair[1]) + 1;
            decryptedTable[i][j] = decryptedLetters[k];
        })

        return decryptedTable;
    }


    static getDecryptedLetter(encrypted) {
        return Object.keys(this.rules).find(rule => rule === encrypted) ? this.rules[encrypted] : '?';
    }

}