export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (!serializedState) { return undefined; }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    /* eslint-disable no-unused-vars */
    const { routing, ...cleanState } = state;

    try {
        const serializedState = JSON.stringify(cleanState);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Nothing yet here
    }
};
