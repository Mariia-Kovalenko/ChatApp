import type { Bot } from './types';

export const BOTS: Bot[] = [
    { id: 'echo', name: 'Echo bot', desc: 'I repeat what you say...', online: true },
    { id: 'reverse', name: 'Reverse bot', desc: 'I turn your world upside down.', online: true },
    { id: 'spam', name: 'Spam bot', desc: 'Quantity over quality!', online: true },
    { id: 'ignore', name: 'Ignore bot', desc: '...', online: false },
  ];