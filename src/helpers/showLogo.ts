import * as figlet from 'figlet';

export const showLogo = (value: string): string => {
    return figlet.textSync('Muody', { horizontalLayout: 'full' });
};
