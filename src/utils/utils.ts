// To shuffle the questions (embaralhar) so the correct answer won't always be in the same place

export const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
}