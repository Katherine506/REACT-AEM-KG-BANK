import { LoremIpsum } from 'lorem-ipsum';

class TitledWordsLorem extends LoremIpsum {
    generateHeading(len) {
        const words = this.generateWords(len);
        return words
            .split(' ')
            .map((w) => w.substr(0, 1).toUpperCase() + w.substr(1))
            .join(' ');
    }
}

export const lorem = new TitledWordsLorem({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});
