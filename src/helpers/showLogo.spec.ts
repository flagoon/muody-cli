import { expect } from 'chai';
import * as figlet from 'figlet';
import { showLogo } from './showLogo';

const figletOutput = figlet.textSync('Muody', { horizontalLayout: 'full' });

describe('Show Logo', () => {
    it('should return valid string', () => {
        const logoOutput = showLogo('Muody');
        expect(logoOutput).to.equal(figletOutput);
    });
});
