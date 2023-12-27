class IntStr {

    static range(begin, end) {
        const numbers = [];
        for (let i = begin; i < end; i++) {
            numbers.push(i);
        }
        return numbers;
    }

}

class Decoder {

    SYMBOLS_COUNT_IN_LINE = 16;

    decode(encryptedText, orders, utilSymbolsIndexes) {
        const splitText = this._splitTextBySixteenSymbols(encryptedText);
        const textWithoutTrashSymbols = this._removeTrashSymbolsFromText(splitText, utilSymbolsIndexes);
        const shiftedText = this._shiftSymbolsByOrder(textWithoutTrashSymbols, orders);
        return this._takePartialDecode(shiftedText);
    }

    _splitTextBySixteenSymbols(encryptedText) {
        const splitText = [];
        IntStr.range(0, encryptedText.length)
            .filter(i => i % this.SYMBOLS_COUNT_IN_LINE === 0)
            .map(i => encryptedText.slice(i, i + this.SYMBOLS_COUNT_IN_LINE))
            .forEach(line => splitText.push(line));
        return splitText;
    }

    _removeTrashSymbolsFromText(splitText, utilSymbolsIndexes) {
        const textWithoutTrashSymbols = [];
        splitText.forEach(line => {
            const lineWithoutTrashSymbols = line.split("")
                .filter((letter, i) => utilSymbolsIndexes.includes(i));

            textWithoutTrashSymbols.push(lineWithoutTrashSymbols);
        });
        return textWithoutTrashSymbols;
    }

    _shiftSymbolsByOrder(textWithoutTrashSymbols, orders) {
        const movementText = [];
        IntStr.range(0, textWithoutTrashSymbols.length).forEach(i =>
            IntStr.range(0, orders.length).forEach(j =>
                movementText.push(textWithoutTrashSymbols[i][orders[j].i] + textWithoutTrashSymbols[i][orders[j].j])));

        return movementText;
    }

    // Частичная, потому что известны только 'с', 'м', 'е', 'р', 'ш', '1'
    _takePartialDecode(shiftedText) {
        const partialDecodedText = shiftedText.map(encryptedLetter => Dictionary.getDecryptedLetter(encryptedLetter));
        const decryptedTable = Dictionary.getDecryptedTable();
        return [partialDecodedText, decryptedTable];
    }

}