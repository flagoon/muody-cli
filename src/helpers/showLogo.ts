import clear from 'clear';
import * as figlet from 'figlet';

export const showLogo = (value: string): string => {
    clear();
    return figlet.textSync(value, { horizontalLayout: 'full' });
};
