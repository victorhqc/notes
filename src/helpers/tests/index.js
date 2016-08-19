export const cleanResponse = ( actions, expectedActions ) => {
    expectedActions[0].requestedAt = actions[0].requestedAt;

    if ( actions[1].receivedAt ) {
        expectedActions[1].receivedAt = actions[1].receivedAt;
    }

    if ( actions[1].failedAt ) {
        expectedActions[1].failedAt = actions[1].failedAt;
    }

    return {
        expectedActions,
        actions
    };
};
