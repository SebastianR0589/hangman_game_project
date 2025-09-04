export function getFailNotice(rank) {
    const options = [
        `You will never be ${rank}`,
        `Maybe next season you will be ${rank}`,
        `Not good enough for ${rank}`,
        `Unlike you, I managed to reach ${rank} in my first season`,
        `You wish you were ${rank}`,
        `${rank} bites the dust`,
        `You gonna need cheats to reach ${rank}`,
            ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}